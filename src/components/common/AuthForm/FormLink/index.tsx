import React from "react";
import {Link} from "react-router-dom";
import './AuthFormLink.scss'

interface Props {
  type: "login" | "register"
}

const LoginLink = () => {
  return (
    <>Уже есть аккаунт? <Link to={'/login'} data-text={"Войдите"}>Войдите</Link></>
  )
}

const RegisterLink = () => {
  return (
    <>Еще нет аккаунта? <Link to={'/register'} data-text={"Зарегистрируйтесь"}>Зарегистрируйтесь</Link></>
  )
}

export const AuthFormLink: React.FC<Props> = ({type}) => {
  return (
    <span className="auth-form__link">
      {
        type === "login" ? (
          <LoginLink />
        ) : (
         <RegisterLink />
        )}
    </span>
  )
}