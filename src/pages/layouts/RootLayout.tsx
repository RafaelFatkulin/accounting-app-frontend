import {Container} from "../../components/common/Container";
import {Outlet} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {Header} from "../../components/common/Header";

export const RootLayout = () => {
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerHeight, setHeaderHeight] = useState<number>()
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  useEffect(() => {
    setHeaderHeight(headerRef.current?.offsetHeight)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(headerHeight !== undefined && scrollTop > headerHeight)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Header headerRef={headerRef} className={isScrolled ? 'header-scrolled' : ''}/>
      <main style={{marginTop: headerHeight ? headerHeight + 48 : '', marginBottom: '36px'}}>
        <Container>
          <Outlet/>
        </Container>
      </main>
    </>
  )
}