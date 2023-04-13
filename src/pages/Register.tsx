import React, {useState} from "react";
import {AuthForm} from "../components/common/AuthForm";
import {AuthFormTitle} from "../components/common/AuthForm/FormTitle";
import {observer} from "mobx-react-lite";
import {Input} from "../components/common/Input";
import {useNavigate} from "react-router-dom";
import {IAuthFormData} from '../interfaces/IAuthFormData'
import {IAuthFormErrors} from '../interfaces/IAuthFormErrors'
import {registerFormSchema} from "../utils/formSchemas";
import {formValidate} from "../utils/formValidate";
import {Button} from "../components/common/Button";
import {AuthFormError} from "../components/common/AuthForm/AuthFormError";
import {AuthFormLink} from "../components/common/AuthForm/FormLink";
import {useStore} from "../hooks/useStore";

export const Register = observer(() => {
  const authStore = useStore('authStore')
  const navigate = useNavigate()
  const [formData, setFormData] = useState<IAuthFormData>({
    login: "",
    password: "",
    confirmPassword: ""
  })
  const [errors, setErrors] = useState<IAuthFormErrors>({
    login: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
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

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const activeElement = document.activeElement as HTMLInputElement
    if (activeElement) {
      activeElement.blur()
    }

    const errorsResult = formValidate(formData, registerFormSchema)

    errorsResult ? setErrors(errorsResult) : setErrors({})

    if (formData.password !== formData.confirmPassword) {
      setErrors((prevState) => ({
        ...prevState,
        confirmPassword: "Пароли не одинаковы",
      }))
    }

    if (!errors.login && !errors.password) {
      await authStore.auth(formData.login, formData.password, 'registration')
      if (authStore.isAuthenticated()) {
        navigate('/')
      }
    }
  }

  return (
    <AuthForm onSubmit={handleRegister}>
      <AuthFormTitle>Регистрация</AuthFormTitle>
      <Input
        label={'Логин'}
        name={"login"}
        value={formData.login}
        error={errors.login}
        type={'text'}
        onChange={handleChange}
        onFocus={handleChange}
      />
      <Input
        label={'Пароль'}
        name={"password"}
        value={formData.password}
        error={errors.password}
        type={'password'}
        onChange={handleChange}
        onFocus={handleChange}
      />
      <Input
        label={'Повторите пароль'}
        name={"confirmPassword"}
        value={formData.confirmPassword}
        error={errors.confirmPassword}
        type={'password'}
        onChange={handleChange}
        onFocus={handleChange}
      />
      {authStore.error && <AuthFormError>{authStore.error}</AuthFormError>}
      <Button type={"submit"} form>Зарегистрироваться</Button>
      <AuthFormLink type={'login'}/>
    </AuthForm>
  )
})