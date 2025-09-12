import { ApiResponse, LoginInput } from "@/types/api.types.js"
import http from "./httpService"

const apiEndpoint: string = `${process.env.NEXT_PUBLIC_API_URL}/users`

type EmailLogin = { email: string; password: string }
type UsernameLogin = { username: string; password: string }
type FinalLoginRequest = EmailLogin | UsernameLogin

function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export async function login<T = unknown>(
  user: LoginInput
): Promise<ApiResponse<T>> {
  const finalUser: FinalLoginRequest = isValidEmail(user.identifier)
    ? { email: user.identifier, password: user.password }
    : { username: user.identifier, password: user.password }

  const { data } = await http.post<ApiResponse<T>>(
    `${apiEndpoint}/login`,
    finalUser
  )
  return data
}

export async function verifyEmail<T = unknown>(
  verificationToken: string
): Promise<ApiResponse<T>> {
  const { data } = await http.post<ApiResponse<T>>(
    `${apiEndpoint}/verify-email/${verificationToken}`
  )
  return data
}

export async function sendVerificationEmail<T = unknown>(
  email: string
): Promise<ApiResponse<T>> {
  const { data } = await http.post<ApiResponse<T>>(
    `${apiEndpoint}/send-email`,
    { email }
  )
  return data
}

export async function register<
  Resp = unknown,
  Body extends object = Record<string, unknown>
>(user: Body): Promise<Resp> {
  const { data } = await http.post<Resp>(`${apiEndpoint}/signup`, user)
  return data
}

export async function logout(): Promise<void> {
  await http.post(`${apiEndpoint}/logout`, null)
}
