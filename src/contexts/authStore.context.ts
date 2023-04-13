import React from "react";
import {AuthStore} from '../store/authStore'

interface IAuthStoreContext {
  authStore: AuthStore
}

const authStore = new AuthStore()

export const AuthStoreContext = React.createContext<IAuthStoreContext>({
  authStore
})