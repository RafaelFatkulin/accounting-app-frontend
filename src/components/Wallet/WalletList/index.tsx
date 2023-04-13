import React from "react";

import './WalletList.scss'

interface Props {
  children: React.ReactNode
}

export const WalletList: React.FC<Props> = ({children}) => {
  return (
    <ul className='wallet-list'>
      {children}
    </ul>
  )
}