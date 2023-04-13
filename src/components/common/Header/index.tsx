import React, {RefObject, useContext} from "react";
import {AuthStoreContext} from "../../../contexts/authStore.context";
import {Container} from "../Container";
import {HeaderLogo} from "./HeaderLogo";
import {NavLink} from "react-router-dom";
import {Button} from "../Button";
import './Header.scss';

interface Props {
  headerRef: RefObject<any>,
  className: string
}

export const Header: React.FC<Props> = ({headerRef, className}) => {
  const {authStore} = useContext(AuthStoreContext)

  return (
    <header className={`header ${className}`} ref={headerRef}>
      <Container>
        <div className="header__inner">
          <HeaderLogo/>
          <NavLink className='header__link' to={'/'}>Кошельки</NavLink>
          <Button type={'button'} onClick={() => authStore.logout()}>Выйти</Button>
        </div>
      </Container>
    </header>
  )
}