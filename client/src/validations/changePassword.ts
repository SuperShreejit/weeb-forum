import { object, ref, string } from 'yup'
import {
	FIELD_NAMES,
	FORM_ERRORS,
	INPUT_LENGTH,
	REGEX,
} from '../constants/forms'

export type ChangePasswordType = {
	oldPassword: string
	newPassword: string
	confirmPassword: string
}

export const initialChangePasswordValues = {
	oldPassword: '',
	newPassword: '',
	confirmPassword: '',
}

export const ChangePasswordValidationSchema = object({
	oldPassword: string().trim().required(FORM_ERRORS.MISSING_PASSWORD),
	newPassword: string()
		.trim()
		.required(FORM_ERRORS.MISSING_PASSWORD)
		.min(INPUT_LENGTH.PASSWORD_MIN, FORM_ERRORS.INVALID_PASSWORD_LENGTH)
		.max(INPUT_LENGTH.PASSWORD_MAX, FORM_ERRORS.INVALID_PASSWORD_LENGTH)
		.matches(REGEX.PASSWORD, FORM_ERRORS.INVALID_PASSWORD)
		.notOneOf([ref(FIELD_NAMES.OLD_PASSWORD)], FORM_ERRORS.PASSWORD_SAME),
	confirmPassword: string()
		.trim()
		.required(FORM_ERRORS.MISSING_PASSWORD)
		.oneOf(
			[ref(FIELD_NAMES.CONFIRM_NEW_PASSWORD)],
			FORM_ERRORS.PASSWORD_DIFFERENT,
		),
})
