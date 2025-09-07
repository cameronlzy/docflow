import { UserStats } from "@/types/user.types.js"
import http from "./httpService"
import { Project, ProjectFull, ResponseStatus } from "@/types/project.types.js"

type UserStatsResponse = {
  data: UserStats
  status: ResponseStatus
}

type ProjectResponse = {
  data: {
    project: ProjectFull
  }
  status: ResponseStatus
}

type UserProjectsResponse = {
  data: {
    projects: Project[]
  }
  status: ResponseStatus
}

type DeleteResponse = {
  data: {
    message: string
  }
  status: ResponseStatus
}

type CreateProjectReq = { title: string; description: string }
type CreateProjectRes = {
  status: "success"
  data: { project: { _id: string } }
}

const apiEndpoint: string = `${process.env.NEXT_PUBLIC_API_URL}/projects`

export async function getCurrentUserStats(): Promise<UserStats> {
  const res = await http.get<UserStatsResponse>(`${apiEndpoint}/stats`)
  return res.data.data
}

export async function getCurrentUserProjects(): Promise<Project[]> {
  const res = await http.get<UserProjectsResponse>(`${apiEndpoint}`)
  return res.data.data.projects
}

export async function getProject(projectId: string): Promise<ProjectFull> {
  const res = await http.get<ProjectResponse>(`${apiEndpoint}/${projectId}`)
  return res.data.data.project
}

export async function uploadProjectFile(projectId: string, file: File) {
  const fd = new FormData()
  fd.append("file", file)
  const { data } = await http.post(`${apiEndpoint}/${projectId}/upload`, fd)
  return data
}

export async function createProject(payload: CreateProjectReq) {
  const { data } = await http.post<CreateProjectRes>(
    `${apiEndpoint}`,
    payload,
    { withCredentials: true }
  )
  return data.data.project
}

export async function deleteProject(_id: string) {
  await http.delete<DeleteResponse>(`${apiEndpoint}/${_id}`, {
    withCredentials: true,
  })
}
