import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {AuthStoreContext} from "../contexts/authStore.context";

export const useAuth = () => {
  const {authStore} = useContext(AuthStoreContext)
  const navigate = useNavigate()

  useEffect(()=> {
    authStore.checkAuthentication()
    if(!authStore.isAuthenticated() && !authStore.user) navigate('/login')
  }, [authStore.isAuthenticated()])
}