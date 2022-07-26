import { object, string } from 'yup'
import { FORM_ERRORS } from '../constants/forms'

export type ForgotPasswordType = { email: string }

export const initialForgotPasswordValues = { email: '' }

export const forgotPasswordValidationSchema = object({
	email: string()
		.trim()
		.required(FORM_ERRORS.MISSING_EMAIL)
		.email(FORM_ERRORS.INVALID_EMAIL),
})
