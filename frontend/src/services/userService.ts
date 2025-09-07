import { User } from "@/types/user.types.js"
import http from "./httpService"

type CurrentUserResponse = {
  data: {
    user: User
  }
  status: "success" | "fail" | "error"
}

const apiEndpoint: string = `${process.env.NEXT_PUBLIC_API_URL}/users`

export async function getCurrentUser(): Promise<User> {
  const res = await http.get<CurrentUserResponse>(`${apiEndpoint}/me`)
  console.log(res)
  return res.data.data.user
}
