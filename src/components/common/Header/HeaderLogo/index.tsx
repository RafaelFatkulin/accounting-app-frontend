import React from "react";
import {NavLink} from "react-router-dom";

import './HeaderLogo.scss';

export const HeaderLogo: React.FC = () => {
  return (
    <NavLink to={'/'} className='header__logo'>
      W
    </NavLink>
  )
}