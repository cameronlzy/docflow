import { success } from "../helpers/response.js"
import AppError from "../utils/appError.js"
import { catchAsync } from "../utils/catchAsync.js"
import File from "../models/file.model.js"
import Project from "../models/project.model.js"
import fs from "fs"
import path from "path"

const ALLOWED_TYPES = ["pdf", "png", "jpg", "docx"]
const isOwnerOrAdmin = (doc, user) =>
  user && (user.role === "admin" || String(doc.owner) === String(user.id))

// Expect multer to have set req.file (memory or disk storage)
export const createFile = catchAsync(async (req, res, next) => {
  if (!req.file) return next(new AppError("No file uploaded", 400))

  const { originalname, mimetype, size } = req.file
  const ext = (path.extname(originalname) || "").replace(".", "").toLowerCase()

  if (!ALLOWED_TYPES.includes(ext))
    return next(new AppError(`Unsupported type: ${ext}`, 400))

  const doc = await File.create({
    type: ext,
    originalName: originalname,
    filename: req.file.filename || originalname,
    mimeType: mimetype,
    size,
    path: req.file.path, // present if disk storage
    url: req.file.url, // optional if you upload to S3 and attach url
    owner: req.user.id,
  })

  // Optional: attach to a project if provided
  const { projectId } = req.body || {}
  if (projectId) {
    const project = await Project.findById(projectId)
    if (!project) return next(new AppError("Project not found", 404))
    if (!isOwnerOrAdmin(project, req.user))
      return next(new AppError("Forbidden", 403))
    if (project.files.length >= 4)
      return next(new AppError("A project can have at most 4 files", 400))

    project.files.push(doc._id)
    await project.save()
  }

  res.status(201).json(success({ file: doc }, 201))
})

export const getFile = catchAsync(async (req, res, next) => {
  const file = await File.findById(req.params.id)
  if (!file) return next(new AppError("File not found", 404))
  if (!isOwnerOrAdmin(file, req.user))
    return next(new AppError("Forbidden", 403))

  if (req.query.download && file.path) {
    res.setHeader("Content-Type", file.mimeType || "application/octet-stream")
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${file.originalName}"`
    )
    return fs.createReadStream(file.path).pipe(res)
  }

  res.status(200).json(success({ file }))
})

export const updateFile = catchAsync(async (req, res, next) => {
  const file = await File.findById(req.params.id)
  if (!file) return next(new AppError("File not found", 404))
  if (!isOwnerOrAdmin(file, req.user))
    return next(new AppError("Forbidden", 403))

  // allow limited metadata updates
  const allowed = ["originalName", "url"]
  for (const k of allowed) {
    if (k in req.body) file[k] = req.body[k]
  }
  await file.save()
  res.status(200).json(success({ file }))
})

export const deleteFile = catchAsync(async (req, res, next) => {
  const file = await File.findById(req.params.id)
  if (!file) return next(new AppError("File not found", 404))
  if (!isOwnerOrAdmin(file, req.user))
    return next(new AppError("Forbidden", 403))

  // remove references from any projects
  await Project.updateMany({ files: file._id }, { $pull: { files: file._id } })

  // remove local disk file if present
  if (file.path) {
    fs.unlink(file.path, () => {})
  }

  await file.deleteOne()
  res.status(204).json(success(204, null))
})
