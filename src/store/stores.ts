import React from "react";
import {AuthStore} from "./authStore";
import {WalletStore} from "./walletStore";

export const stores = Object.freeze({
  authStore: new AuthStore(),
  walletStore: new WalletStore()
})

export const storesContext = React.createContext(stores)
export const StoresProvider = storesContext.Provider