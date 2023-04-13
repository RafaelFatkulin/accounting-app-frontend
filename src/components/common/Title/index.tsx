import React from "react";

import './Title.scss';

interface Props {
  children: React.ReactNode;
}

export const Title: React.FC<Props> = ({children}) => {
  return (
    <>
      <h1 className='title'>{children}</h1>
    </>
  )
}