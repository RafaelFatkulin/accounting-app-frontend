import React from "react";
import {WalletStore} from '../store/walletStore'

interface IWalletStoreContext {
  walletStore: WalletStore
}

const walletStore = new WalletStore()

export const WalletStoreContext = React.createContext<IWalletStoreContext>({
  walletStore
})