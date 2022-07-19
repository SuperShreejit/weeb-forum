import { ref } from 'yup'
import { object, string } from 'yup'
import ERRORS from '../constants/errors'
import REGEX from '../constants/regex'

const email = string()
	.trim()
	.required(ERRORS.MISSING_FIELDS)
	.email(ERRORS.INVALID_EMAIL)

const username = string()
	.trim()
	.required(ERRORS.MISSING_FIELDS)
	.min(6, ERRORS.INVALID_LENGTH)
	.max(20, ERRORS.INVALID_LENGTH)
	.matches(REGEX.USERNAME, ERRORS.INVALID_USERNAME)
	.not([ref('password'), ref('email')], ERRORS.USERNAME_OTHER_MATCH)

const name = string().trim().required(ERRORS.MISSING_FIELDS)

const registerPassword = string()
	.trim()
	.required(ERRORS.MISSING_FIELDS)
	.min(6, ERRORS.INVALID_LENGTH)
	.max(20, ERRORS.INVALID_LENGTH)
	.matches(REGEX.PASSWORD, ERRORS.INVALID_PASSWORD)
	.not([ref('username'), ref('email'), ref('name')], ERRORS.PASSWORD_OTHER_MATCH)

const loginPassword = string().trim().required(ERRORS.MISSING_FIELDS)

const confirmPassword = string()
	.trim()
	.required(ERRORS.MISSING_FIELDS)
	.oneOf([ref('password')], ERRORS.PASSWORDS_DIFFERENCE)

export const registerValidator = object({
	body: object({
		name,
		email,
		username,
		password: registerPassword,
		confirmPassword,
	}),
})

export const loginValidator = object({
	body: object({
		username: name,
		password: loginPassword,
	}),
})
