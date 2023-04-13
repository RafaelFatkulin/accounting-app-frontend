import React from "react";
import './Container.scss';

interface Props {
  children: React.ReactNode,
  center?: boolean
}

export const Container: React.FC<Props> = ({children, center}) => {
  return (
    <div className={`container ${center ? 'container-center' : ''}`}>
      {children}
    </div>
  )
}