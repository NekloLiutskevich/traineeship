import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from 'shared/lib/firebase/config'
import {
  type IParamsLogin,
  type IParamsRegister,
  type IUserCredentialResponse,
} from 'entities/Auth/api/types'

export const app = initializeApp(firebaseConfig)
export const authFirebase = getAuth(app)

class Api {
  login(params: IParamsLogin): Promise<IUserCredentialResponse> {
    return signInWithEmailAndPassword(authFirebase, params.email, params.password)
  }

  register(params: IParamsRegister): Promise<IUserCredentialResponse> {
    return createUserWithEmailAndPassword(authFirebase, params.email, params.password)
  }

  logout(): Promise<void> {
    return signOut(authFirebase)
  }
}
export const AuthApi = new Api()
