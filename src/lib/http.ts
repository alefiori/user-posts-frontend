import { API_URL, AUTH_TOKEN_KEY } from "./constants"
import { getCookie } from "./cookie"

type HttpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

const getHeaders = (isJson: boolean): Headers => {
  const headers = new Headers()
  if (isJson) {
    headers.append("Content-Type", "application/json")
  }
  const token = getCookie(AUTH_TOKEN_KEY)
  if (token) {
    headers.append("Authorization", `Bearer ${token}`)
  }
  return headers
}

export const getHttpResponse = async <Response>(
  path: string,
  method: HttpMethods = "GET",
  body?: object | FormData
): Promise<Response> => {
  const isJson = !(body instanceof FormData)
  const headers = getHeaders(isJson)
  const options: RequestInit = {
    method,
    headers,
    body: isJson ? JSON.stringify(body) : body,
  }
  const response = await fetch(`${API_URL}/${path}`, options)
  const res = await response.json()
  if (!response.ok) {
    throw new Error(res.message)
  }
  return res
}
