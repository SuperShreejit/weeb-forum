import { object, string } from 'yup'
import { FORM_ERRORS } from '../constants/forms'

export type SearchDataType = {
	search: string
}

export const searchInitialValues = {
  search: '',
}

export const searchValidationSchema = object({
  search: string().trim().required(FORM_ERRORS.MISSING_SEARCH),
})