import { object, string } from 'yup'
import { FORM_ERRORS, INPUT_LENGTH, REGEX } from '../constants/forms'

export type VerifyEmailValuesType = {
	email: string
	otp: string
}

export const verifyEmailInitialValues = {
	email: '',
	otp: '',
}

export const verifyEmailValidationSchema = object({
	email: string()
		.trim()
		.required(FORM_ERRORS.MISSING_EMAIL)
		.email(FORM_ERRORS.INVALID_EMAIL),
	otp: string()
		.trim()
		.required(FORM_ERRORS.MISSING_OTP)
		.length(INPUT_LENGTH.OTP, FORM_ERRORS.INVALID_OTP_LENGTH)
		.matches(REGEX.OTP, FORM_ERRORS.INVALID_OTP),
})
