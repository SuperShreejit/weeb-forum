import { ref } from 'yup'
import { string, object } from 'yup'
import {
	FIELD_NAMES,
	FORM_ERRORS,
	INPUT_LENGTH,
	REGEX,
} from '../constants/forms'

export type ResetPasswordValuesType = {
	newPassword: string
	confirmPassword: string
	otp: string
	email: string
}

export const resetPasswordInitialValues = {
	newPassword: '',
	confirmPassword: '',
	otp: '',
	email: ''
}

export const resetPasswordValidationSchema = object({
	newPassword: string()
		.trim()
		.required(FORM_ERRORS.MISSING_PASSWORD)
		.min(INPUT_LENGTH.PASSWORD_MIN, FORM_ERRORS.INVALID_PASSWORD_LENGTH)
		.max(INPUT_LENGTH.PASSWORD_MAX, FORM_ERRORS.INVALID_PASSWORD_LENGTH)
		.matches(REGEX.PASSWORD, FORM_ERRORS.INVALID_PASSWORD),
	confirmPassword: string()
		.trim()
		.required(FORM_ERRORS.MISSING_PASSWORD)
		.oneOf(
			[ref(FIELD_NAMES.CONFIRM_NEW_PASSWORD)],
			FORM_ERRORS.PASSWORD_DIFFERENT,
		),
	otp: string()
		.trim()
		.required(FORM_ERRORS.MISSING_OTP)
		.length(INPUT_LENGTH.OTP, FORM_ERRORS.INVALID_OTP_LENGTH)
		.matches(REGEX.OTP, FORM_ERRORS.INVALID_OTP),
	email: string()
		.trim()
		.required(FORM_ERRORS.MISSING_EMAIL)
		.email(FORM_ERRORS.INVALID_EMAIL),
})
