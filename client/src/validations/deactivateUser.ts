import { object, string } from 'yup'
import { FORM_ERRORS, INPUT_LENGTH, REGEX } from '../constants/forms'

export type DeactivateUserValuesType = {
	otp: string
	password: string
}

export const deactivateUserInitialValues = {
	otp: '',
	password: '',
}

export const deactivateUserValidationSchema = object({
	otp: string()
		.trim()
		.required(FORM_ERRORS.MISSING_OTP)
		.length(INPUT_LENGTH.OTP, FORM_ERRORS.INVALID_OTP_LENGTH)
		.matches(REGEX.OTP, FORM_ERRORS.INVALID_OTP),
	password: string()
		.trim()
		.required(FORM_ERRORS.MISSING_PASSWORD)
})
