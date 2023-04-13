import {Schema} from "joi";

interface IFormData {
  login: string,
  password: string,
  confirmPassword?: string
}

export const formValidate = (formData: IFormData, schema: Schema) => {
  const errors: {[key: string]: string} = {}
  const {error} = schema.validate(formData, {abortEarly: false})

  if(!error) return null

  if(error) {
    for(let item of error.details) {
      errors[item.path[0]] = item.message;
    }
  }

  return errors
}