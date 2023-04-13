import Joi from "joi";

export const authFormSchema = Joi.object({
  login: Joi.string().min(8).max(255).required().messages({
    'string.base': 'Логин должен быть строкой',
    'string.empty': 'Логин не может быть пустым',
    'string.min': 'Минимальная длина логина - {#limit} знаков',
    'string.max': 'Минимальная длина логина - {#limit} знаков',
  }),
  password: Joi.string().min(8).max(72).required().messages({
    'string.base': 'Пароль должен быть строкой',
    'string.empty': 'Пароль не может быть пустым',
    'string.min': 'Минимальная длина пароля - {#limit} знаков',
    'string.max': `Минимальная длина пароля - {#limit} знаков`,
  }),
})

export const registerFormSchema = Joi.object({
  login: Joi.string().min(8).max(255).required().messages({
    'string.base': 'Логин должен быть строкой',
    'string.empty': 'Логин не может быть пустым',
    'string.min': 'Минимальная длина логина - {#limit} знаков',
    'string.max': 'Минимальная длина логина - {#limit} знаков',
  }),
  password: Joi.string().min(8).max(72).required().messages({
    'string.base': 'Пароль должен быть строкой',
    'string.empty': 'Пароль не может быть пустым',
    'string.min': 'Минимальная длина пароля - {#limit} знаков',
    'string.max': `Минимальная длина пароля - {#limit} знаков`,
  }),
  confirmPassword: Joi.string().min(8).max(72).required().messages({
    'string.base': 'Пароль должен быть строкой',
    'string.empty': 'Пароль не может быть пустым',
    'string.min': 'Минимальная длина пароля - {#limit} знаков',
    'string.max': `Минимальная длина пароля - {#limit} знаков`,
  }),
})