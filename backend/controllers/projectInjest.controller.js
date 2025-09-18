import { success } from "../helpers/response.js"
import AppError from "../utils/appError.js"
import { catchAsync } from "../utils/catchAsync.js"
import { publish } from "../services/sse.js"
import Project from "../models/project.model.js"
import crypto from "crypto"
import mongoose from "mongoose"

const toObjectId = (id) => new mongoose.Types.ObjectId(id)

const enqueueProject = async (projectId) => {
  if (!process.env.ZAPIER_WEBHOOK_URL) return
  await fetch(process.env.ZAPIER_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ZAPIER_KEY || "",
    },
    body: JSON.stringify({ projectId }),
  })
}

const verifyHmac = (req) => {
  const secret = process.env.ZAPIER_SIGNING_SECRET
  if (!secret) return true
  const sig = req.headers["x-signature"]
  if (!sig || !req.rawBody) return false
  const h = crypto
    .createHmac("sha256", secret)
    .update(req.rawBody)
    .digest("hex")
  try {
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(h))
  } catch {
    return false
  }
}

export const addSources = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id)
  if (!project) return next(new AppError("Project not found", 404))
  if (
    !(
      req.user &&
      (req.user.role === "admin" ||
        String(project.owner) === String(req.user.id))
    )
  )
    return next(new AppError("Forbidden", 403))

  const payload = Array.isArray(req.body?.sources) ? req.body.sources : []
  if (!payload.length) return next(new AppError("No sources", 400))
  const normalized = payload
    .filter(
      (s) => s && typeof s.name === "string" && typeof s.locator === "string"
    )
    .map((s) => ({ name: s.name.trim(), locator: s.locator.trim() }))
  if (!normalized.length) return next(new AppError("Invalid sources", 400))

  project.sources.push(...normalized)
  project.status = "processing"
  await project.save()

  await enqueueProject(String(project._id))

  const added = project.sources
    .slice(-normalized.length)
    .map((s) => ({ _id: s._id, name: s.name }))
  res
    .status(202)
    .json(
      success(
        { projectId: project._id, addedCount: added.length, sources: added },
        202
      )
    )
})

export const getProjectState = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id).select(
    "status summary sources._id sources.name sources.status sources.summary owner"
  )
  if (!project) return next(new AppError("Project not found", 404))
  if (
    !(
      req.user &&
      (req.user.role === "admin" ||
        String(project.owner) === String(req.user.id))
    )
  )
    return next(new AppError("Forbidden", 403))
  res.status(200).json(
    success({
      project: {
        _id: project._id,
        status: project.status,
        summary: project.summary,
        sources: project.sources.map((s) => ({
          _id: s._id,
          name: s.name,
          status: s.status,
          summary: s.summary,
        })),
      },
    })
  )
})

export const ingestionCallback = catchAsync(async (req, res, next) => {
  if (!verifyHmac(req)) return next(new AppError("Invalid signature", 401))

  const { projectSummary } = req.body || {}
  const uploadToken = req.params.uploadToken
  if (!uploadToken) {
    return next(new AppError("Upload Token required", 400))
  }

  const hash = crypto.createHash("sha256").update(uploadToken).digest("hex")

  const project = await Project.findOne({ uploadToken: hash })
  if (!project) return next(new AppError("Project not found", 404))

  if (typeof projectSummary === "string") {
    project.summary = projectSummary
    project.status = "completed"
  } else {
    project.status = "failed"
  }

  await project.save()

  publish("project-status", { projectId: project._id, status: project.status })

  res
    .status(200)
    .json(success({ message: "Project successfully updated" }, 200))
})
