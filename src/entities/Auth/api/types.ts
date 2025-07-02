import { type UserCredential, type User } from 'firebase/auth'

export type IParamsLogin = {
  email: string
  password: string
}

export type IUserCredentialResponse = UserCredential
export type IUserResponse = User

export type IParamsRegister = {
  email: string
  password: string
}
