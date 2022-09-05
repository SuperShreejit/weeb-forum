import { object, string } from "yup"
import { FORM_ERRORS } from "../constants/forms"

export type CreatePostDataType = {
  title: string
  post: string
  keys: string
}

export const createPostInitialValues = {
  title: '',
  post: '',
  keys: ''
}

export const createPostValidationSchema = object({
	title: string().trim().required(FORM_ERRORS.MISSING_TITLE),
	post: string().trim().required(FORM_ERRORS.MISSING_POST),
	keys: string().trim().optional(),
})