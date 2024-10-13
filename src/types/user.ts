export type UserCredentials = {
  email: string
  password: string
}

export type UserCreate = UserCredentials & {
  firstName: string
  lastName: string
  pictureUrl?: string
}

export type UserUpdate = Partial<UserCreate>

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  pictureUrl?: string
}

export type UserAuth = {
  id: number
  token: string
}
