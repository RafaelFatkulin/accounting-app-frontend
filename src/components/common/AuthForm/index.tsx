import React from "react";
import './AuthForm.scss';

interface Props {
  children: React.ReactNode
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}

export const AuthForm: React.FC<Props> = ({children, onSubmit}) => {
  return (
    <form className='auth-form' onSubmit={onSubmit}>
      {children}
    </form>
  )
}