import { object, string, ref, mixed } from 'yup'
import ERRORS from '../constants/errors'
import REGEX from '../constants/regex'

const params = {
	params: object({
		userId: string().matches(REGEX.OBJECT_ID, ERRORS.INVALID_USER_ID),
	}),
}

const otp = string()
	.trim()
	.required(ERRORS.MISSING_FIELDS)
	.length(4, ERRORS.INVALID_OTP)
	.matches(REGEX.OTP, ERRORS.INVALID_OTP)

const username = string()
	.trim()
	.required(ERRORS.MISSING_FIELDS)
	.min(6, ERRORS.INVALID_LENGTH)
	.max(20, ERRORS.INVALID_LENGTH)
	.matches(REGEX.USERNAME, ERRORS.INVALID_USERNAME)
	.not([ref('password')], ERRORS.USERNAME_OTHER_MATCH)

const newPassword = string()
	.trim()
	.required(ERRORS.MISSING_FIELDS)
	.min(6, ERRORS.INVALID_LENGTH)
	.max(20, ERRORS.INVALID_LENGTH)
	.matches(REGEX.PASSWORD, ERRORS.INVALID_PASSWORD)

const password = string().trim().required(ERRORS.MISSING_FIELDS)

const confirmPassword = string()
	.trim()
	.required(ERRORS.MISSING_FIELDS)
	.oneOf([ref('newPassword')], ERRORS.PASSWORDS_DIFFERENCE)

	const email = string()
		.trim()
		.required(ERRORS.MISSING_FIELDS)
		.email(ERRORS.INVALID_EMAIL)

export const getEmailVerifySchema = object({
	body: object({ email })
})

export const getForgotPasswordSchema = object({
	body: object({ email }),
})

export const getDeactivateSchema = object({ ...params })

export const verifyEmailSchema = object({
	body: object({ otp, email }),
})

export const resetPasswordSchema = object({
	body: object({ otp, email, newPassword, confirmPassword }),
})

export const deactivateSchema = object({
	body: object({ otp, password }),
	...params,
})

export const changeAvatarSchema = object({
	...params,
})

export const changeUsernameSchema = object({
	body: object({ password, username }),
	...params,
})

export const changePasswordSchema = object({
	body: object({
		oldPassword: password,
		newPassword,
		confirmPassword,
	}),
	...params,
})

export const getUserSchema = object({ ...params })
