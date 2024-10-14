import { getHttpResponse } from "@/lib/http"
import {
  User,
  UserAuth,
  UserCreate,
  UserCredentials,
  UserUpdate,
} from "@/types/user"

const USER_API = "users"

export const createUser = async (user: UserCreate) =>
  getHttpResponse<UserAuth>(USER_API, "POST", user)

export const getUser = async (id: number) =>
  getHttpResponse<User>(`${USER_API}/${id}`)

export const updateUser = async (id: number, user: UserUpdate) =>
  getHttpResponse<User>(`${USER_API}/${id}`, "PATCH", user)

export const updateUserPassword = async (
  id: number,
  body: { oldPassword: string; newPassword: string }
) =>
  getHttpResponse<{ message: string }>(
    `${USER_API}/${id}/password`,
    "PATCH",
    body
  )

export const deleteUser = async (id: number) =>
  getHttpResponse<{ message: string }>(`${USER_API}/${id}`, "DELETE")

export const authenticateUser = async (credentials: UserCredentials) =>
  getHttpResponse<UserAuth>(`${USER_API}/authenticate`, "POST", credentials)

export const uploadUserImage = async (id: number, image: File) => {
  const formData = new FormData()
  formData.append("file", image)
  return getHttpResponse<{ url: string }>(
    `${USER_API}/${id}/image`,
    "POST",
    formData
  )
}
