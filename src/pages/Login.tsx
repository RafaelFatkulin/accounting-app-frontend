import React, {useState} from "react";
import {AuthForm} from "../components/common/AuthForm";
import {AuthFormTitle} from "../components/common/AuthForm/FormTitle";
import {AuthFormLink} from "../components/common/AuthForm/FormLink";
import {Input} from "../components/common/Input";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {formValidate} from "../utils/formValidate";
import {AuthFormError} from "../components/common/AuthForm/AuthFormError";
import {Button} from "../components/common/Button";
import {IAuthFormErrors} from "../interfaces/IAuthFormErrors";
import {IAuthFormData} from "../interfaces/IAuthFormData";
import {authFormSchema} from "../utils/formSchemas";
import {useStore} from "../hooks/useStore";

export const Login = observer(() => {
  const authStore = useStore('authStore')
  const navigate = useNavigate()
  const [formData, setFormData] = useState<IAuthFormData>({
    login: "",
    password: ""
  })
  const [errors, setErrors] = useState<IAuthFormErrors>({
    login: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    authStore.setError("");
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const activeElement = document.activeElement as HTMLInputElement;
    if (activeElement) {
      activeElement.blur();
    }

    const errorsResult = formValidate(formData, authFormSchema)

    errorsResult ? setErrors(errorsResult) : setErrors({})

    if (!errors.login && !errors.password) {
      await authStore.auth(formData.login, formData.password, 'login')
      if (authStore.isAuthenticated()) {
        navigate('/')
      }
    }
  }

  return (
    <AuthForm onSubmit={handleLogin}>
      <AuthFormTitle>Логин</AuthFormTitle>
      <Input
        label={'Логин'}
        name={"login"}
        value={formData.login}
        type={'text'}
        onChange={handleChange}
        onFocus={handleChange}
        error={errors.login}
      />
      <Input
        label={'Пароль'}
        name={"password"}
        value={formData.password}
        type={'password'}
        onChange={handleChange}
        onFocus={handleChange}
        error={errors.password}
      />
      {authStore.error && <AuthFormError>{authStore.error}</AuthFormError>}
      <Button type={"submit"} form>Войти</Button>
      <AuthFormLink type={'register'} />
    </AuthForm>
  )
})