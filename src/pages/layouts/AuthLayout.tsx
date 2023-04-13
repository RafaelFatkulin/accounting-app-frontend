import {Container} from "../../components/common/Container";
import {Outlet} from "react-router-dom";

export const AuthLayout = () => {
  return (
    <Container center>
      <Outlet/>
    </Container>
  )
}