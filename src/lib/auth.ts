import { authenticateUser, createUser } from "@/apis/user"
import { UserCreate, UserCredentials } from "@/types/user"
import { AUTH_TOKEN_KEY, USER_ID_KEY } from "./constants"
import { getCookie, removeCookie, setCookie } from "./cookie"

export const login = async (credentials: UserCredentials): Promise<void> => {
  const { id, token } = await authenticateUser(credentials)
  setCookie(AUTH_TOKEN_KEY, token)
  setCookie(USER_ID_KEY, id.toString())
}

export const signup = async (user: UserCreate): Promise<void> => {
  const { id, token } = await createUser(user)
  setCookie(AUTH_TOKEN_KEY, token)
  setCookie(USER_ID_KEY, id.toString())
}

export const logout = (): void => {
  removeCookie(AUTH_TOKEN_KEY)
  removeCookie(USER_ID_KEY)
}

export const isLoggedIn = (): boolean =>
  !!getCookie(AUTH_TOKEN_KEY) && !!getCookie(USER_ID_KEY)
