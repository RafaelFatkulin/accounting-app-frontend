import React from "react";
import './AuthFormError.scss';

interface Props {
  children: React.ReactNode
}

export const AuthFormError: React.FC<Props> = ({children}) => {
  return (
    <p className='auth-form__error'>{children}</p>
  )
}