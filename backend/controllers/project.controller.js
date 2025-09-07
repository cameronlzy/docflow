import { success } from "../helpers/response.js"
import AppError from "../utils/appError.js"
import { catchAsync } from "../utils/catchAsync.js"
import APIFeatures from "../utils/apiFeatures.js"
import Project from "../models/project.model.js"
import { validateProject } from "../validators/project.validator.js"
import User from "../models/user.model.js"

const isOwnerOrAdmin = (doc, user) =>
  user && (user.role === "admin" || String(doc.owner) === String(user.id))

export const getAllProjects = catchAsync(async (req, res, next) => {
  const baseQuery = req.user?.role === "admin" ? {} : { owner: req.user.id }
  const features = new APIFeatures(
    Project.find(baseQuery),
    req.query,
    req._aliasOptions,
    req.originalUrl
  ).implementFeatures()
  const projects = await features.query
  res.status(200).json({ ...success({ projects }), results: projects.length })
})

export const getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id)
  if (!project) return next(new AppError("Project not found", 404))
  if (!isOwnerOrAdmin(project, req.user))
    return next(new AppError("Forbidden", 403))
  res.status(200).json(success({ project }))
})

export const createProject = catchAsync(async (req, res, next) => {
  const { error: validationError, value } = validateProject(req.body)
  if (validationError)
    return next(new AppError(validationError.details[0].message, 400))

  const title = value.title
  const description = value.description ?? ""

  const project = await Project.create({
    title,
    description,
    owner: req.user.id,
    status: "pending",
  })

  res.status(201).json(success({ project }, 201))
})

export const deleteProject = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id)
  if (!project) return next(new AppError("Project not found", 404))
  if (!isOwnerOrAdmin(project, req.user))
    return next(new AppError("Forbidden", 403))
  await project.deleteOne()
  res.status(204).json(success(204, null))
})

export const getUserProjectStats = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user?._id)
  if (!user) return next(new AppError("User not found", 404))
  const stats = await user.getProjectStats()
  res.status(200).json(success(stats, 200))
})
