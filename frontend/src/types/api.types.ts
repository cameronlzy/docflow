export type LoginInput = { identifier: string; password: string }
export type ApiResponse<T> = {
  data: T
  meta?: unknown
}
