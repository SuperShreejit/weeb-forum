import { object, string } from 'yup'
import { FORM_ERRORS } from '../constants/forms'

export enum CONTENT {
  POST = 'post',
  USER = 'user',
}

export type SearchDataType = {
	search: string
	content: CONTENT
}

export const searchInitialValues = {
  search: '',
  content: CONTENT.POST
}

export const searchValidationSchema = object({
  search: string().trim().required(FORM_ERRORS.MISSING_SEARCH),
  content: string().trim().required(FORM_ERRORS.MISSING_CONTENT)
})