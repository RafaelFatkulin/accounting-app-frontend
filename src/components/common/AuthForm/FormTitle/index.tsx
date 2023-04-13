import React from "react";

import './AuthFormTitle.scss';

interface Props {
  children: React.ReactNode;
}

export const AuthFormTitle: React.FC<Props> = ({children}) => {
  return (
    <h3 className='auth-form__title'>{children}</h3>
  )
}