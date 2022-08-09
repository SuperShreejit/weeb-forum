import { ref } from 'yup'
import { string, object } from 'yup'
import {
	FIELD_NAMES,
	FORM_ERRORS,
	INPUT_LENGTH,
	REGEX,
} from '../constants/forms'

export type registerValuesType = {
	name: string
	username: string
	email: string
	password: string
	confirmPassword: string
}

export const registerInitialValues = {
	name: '',
	username: '',
	email: '',
	password: '',
	confirmPassword: '',
}

export const registerValidationSchema = object({
	name: string().trim().required(FORM_ERRORS.MISSING_NAME),
	username: string()
		.trim()
		.required(FORM_ERRORS.MISSING_USERNAME)
		.min(INPUT_LENGTH.USERNAME_MIN, FORM_ERRORS.INVALID_USERNAME_LENGTH)
		.max(INPUT_LENGTH.USERNAME_MAX, FORM_ERRORS.INVALID_USERNAME_LENGTH)
		.matches(REGEX.USERNAME, FORM_ERRORS.INVALID_USERNAME)
		.notOneOf(
			[ref(FIELD_NAMES.EMAIL), ref(FIELD_NAMES.PASSWORD)],
			FORM_ERRORS.USERNAME_OTHERS_SAME,
		),
	email: string()
		.trim()
		.required(FORM_ERRORS.MISSING_EMAIL)
		.email(FORM_ERRORS.INVALID_EMAIL),
	password: string()
		.trim()
		.required(FORM_ERRORS.MISSING_PASSWORD)
		.min(INPUT_LENGTH.PASSWORD_MIN, FORM_ERRORS.INVALID_PASSWORD_LENGTH)
		.max(INPUT_LENGTH.PASSWORD_MAX, FORM_ERRORS.INVALID_PASSWORD_LENGTH)
		.matches(REGEX.PASSWORD, FORM_ERRORS.INVALID_PASSWORD)
		.notOneOf(
			[ref(FIELD_NAMES.USERNAME), ref(FIELD_NAMES.EMAIL), ref(FIELD_NAMES.NAME)],
			FORM_ERRORS.PASSWORD_OTHERS_SAME,
		),
	confirmPassword: string()
		.trim()
		.oneOf([ref(FIELD_NAMES.PASSWORD)], FORM_ERRORS.PASSWORD_DIFFERENT)
		.required(FORM_ERRORS.MISSING_PASSWORD),
})
