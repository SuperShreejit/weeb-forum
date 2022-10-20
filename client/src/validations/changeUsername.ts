import { object, string } from 'yup'
import { FORM_ERRORS } from '../constants/forms'

export type ChangeUsernameType = { username: string, password: string }

export const initialChangeUsernameValues = { username: '', password: '' }

export const ChangeUsernameValidationSchema = object({
	username: string()
		.trim()
		.required(FORM_ERRORS.MISSING_USERNAME)
		.email(FORM_ERRORS.INVALID_USERNAME),
	password: string()
		.trim()
		.required(FORM_ERRORS.MISSING_PASSWORD)
})
