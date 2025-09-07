import Project from "../models/project.model.js"
import AppError from "../utils/appError.js"
import { catchAsync } from "../utils/catchAsync.js"
import { google } from "googleapis"
import { Readable } from "stream"

function driveClient() {
  const creds = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON)
  const auth = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  })
  return google.drive({ version: "v3", auth })
}

function bufferToStream(buffer) {
  const stream = new Readable()
  stream.push(buffer)
  stream.push(null)
  return stream
}

function inferType(file) {
  const lower = file.originalname.toLowerCase()
  if (lower.endsWith(".pdf") || file.mimetype === "application/pdf")
    return "pdf"
  if (
    lower.endsWith(".docx") ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  )
    return "docx"
  return null
}

export const uploadFileForProject = catchAsync(async (req, res, next) => {
  const projectId = req.params.id
  const project = await Project.findById(projectId)
  if (!project) return next(new AppError("Project not found", 404))
  if (!req.file) return next(new AppError("No file uploaded", 400))

  const folderId = process.env.DRIVE_FOLDER_ID
  if (!folderId) return next(new AppError("DRIVE_FOLDER_ID not set", 500))

  const drive = driveClient()

  const name = `project_${projectId}__${req.file.originalname}`
  const requestBody = {
    name,
    parents: [folderId],
    description: `${project.description || ""}`,
    appProperties: { projectId },
  }

  const uploadRes = await drive.files.create({
    requestBody,
    media: {
      mimeType: req.file.mimetype,
      body: bufferToStream(req.file.buffer),
    },
    fields: "id, name, webViewLink, webContentLink",
    supportsAllDrives: true,
  })

  const type = inferType(req.file)
  if (!type)
    return next(new AppError("Only PDF or DOCX files are allowed", 400))
  if ((project.sources?.length || 0) >= 4)
    return next(new AppError("A project can have at most 4 sources", 400))

  project.sources.push({
    name: req.file.originalname,
    type,
    size: req.file.size,
  })
  await project.save()

  res.status(201).json({
    ok: true,
    driveFile: uploadRes.data,
    project,
  })
})
