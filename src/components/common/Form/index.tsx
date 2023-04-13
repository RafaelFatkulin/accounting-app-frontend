import React from "react";
import './Form.scss'

interface Props {
  children: React.ReactNode
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}

export const Form: React.FC<Props> = ({children, onSubmit}) => {
  return (
    <form className='form'>

    </form>
  )
}