// Project file types
export type FileType = "pdf" | "document"

// Project status options
export type ProjectStatus = "completed" | "pending"

export type ResponseStatus = "success" | "fail" | "error"

// Main project interface
export type Project = {
  _id: string
  title: string
  description: string
  fileCount: number
  createdAt: string
  updatedAt: string
  status: ProjectStatus
}

export type ProjectFile = {
  _id: string
  name: string
  type: string
  size: string
}

export type ProjectFull = {
  _id: string
  title: string
  description: string
  fileCount: number
  createdAt: string
  updatedAt: string
  status: ProjectStatus
  summary?: string
  sources: ProjectFile[]
}

// For API responses or collections
export type ProjectsResponse = {
  projects: Project[]
  totalCount: number
  page?: number
  limit?: number
}

// For creating new projects
export type CreateProjectRequest = {
  title: string
  description: string
  fileTypes?: FileType[]
  tags?: string[]
}

// For updating existing projects
export type UpdateProjectRequest = {
  title?: string
  description?: string
  status?: ProjectStatus
  tags?: string[]
}
