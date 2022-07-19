import { describe, test, suite, before, after } from 'mocha'
import chaiHttp from 'chai-http'
import chai from 'chai'
import { StatusCodes } from 'http-status-codes'
import ERRORS from '../constants/errors'
import ROUTES from '../constants/routes'
import { assert, chaiPost, ResponseType } from '../services/chai.services'
import { UserDocument } from '../models/User'
import { createUser, deleteUser } from '../services/user.services'
import {
	body,
	body_register,
	invalid_passwords,
	invalid_passwords_length,
	invalid_username,
	invalid_username_length,
	invalid_email,
} from '../constants/authRouterTest'

chai.use(chaiHttp)

const ROUTE = ROUTES.SERVER_URL_BASE + ROUTES.AUTH_BASE

describe('Auth Validator Tests', () => {
	suite('Register auth', () => {
		test('should fail due to missing fields', async () => {
			const res = await chaiPost(ROUTE + ROUTES.AUTH_REGISTER_LOCAL, {})
			validateAuthValidation(res, ERRORS.MISSING_FIELDS)
		})

		test('should fail due to missing name', async () => {
			const request = {
				username: body_register.username,
				email: body_register.email,
				password: body_register.password,
				confirmPassword: body_register.password,
			}
			const res = await chaiPost(ROUTE + ROUTES.AUTH_REGISTER_LOCAL, request)
			validateAuthValidation(res, ERRORS.MISSING_FIELDS)
		})

		test('should fail due to missing username', async () => {
			const request = {
				name: body_register.name,
				email: body_register.email,
				password: body_register.password,
				confirmPassword: body_register.password,
			}
			const res = await chaiPost(ROUTE + ROUTES.AUTH_REGISTER_LOCAL, request)
			validateAuthValidation(res, ERRORS.MISSING_FIELDS)
		})

		test('should fail due to invalid username', async () => {
			for (const username of invalid_username) {
				const request = {
					name: body_register.name,
					username,
					email: body_register.email,
					password: body_register.password,
					confirmPassword: body_register.password,
				}
				const res = await chaiPost(ROUTE + ROUTES.AUTH_REGISTER_LOCAL, request)
				validateAuthValidation(res, ERRORS.INVALID_USERNAME)
			}
		})

		test('should fail due to invalid username length', async () => {
			for (const username of invalid_username_length) {
				const request = {
					name: body_register.name,
					username,
					email: body_register.email,
					password: body_register.password,
					confirmPassword: body_register.password,
				}
				const res = await chaiPost(ROUTE + ROUTES.AUTH_REGISTER_LOCAL, request)
				validateAuthValidation(res, ERRORS.INVALID_LENGTH)
			}
		})

		test('should fail due to username is password', async () => {
			const request = {
				name: body_register.name,
				username: body_register.password,
				email: body_register.email,
				password: body_register.password,
				confirmPassword: body_register.password,
			}
			const res = await chaiPost(ROUTE + ROUTES.AUTH_REGISTER_LOCAL, request)
			validateAuthValidation(res, ERRORS.PASSWORD_OTHER_MATCH)
		})

		test('should fail due to missing email', async () => {
			const request = {
				name: body_register.name,
				username: body_register.username,
				password: body_register.password,
				confirmPassword: body_register.password,
			}
			const res = await chaiPost(ROUTE + ROUTES.AUTH_REGISTER_LOCAL, request)
			validateAuthValidation(res, ERRORS.MISSING_FIELDS)
		})

		test('should fail due to invalid email', async () => {
			for (const email of invalid_email) {
				const request = {
					name: body_register.name,
					username: body_register.username,
					email,
					password: body_register.password,
					confirmPassword: body_register.password,
				}
				const res = await chaiPost(ROUTE + ROUTES.AUTH_REGISTER_LOCAL, request)
				validateAuthValidation(res, ERRORS.INVALID_EMAIL)
			}
		})

		test('should fail due to missing password', async () => {
			const request = {
				name: body_register.name,
				username: body_register.username,
				email: body_register.email,
			}
			const res = await chaiPost(ROUTE + ROUTES.AUTH_REGISTER_LOCAL, request)
			validateAuthValidation(res, ERRORS.MISSING_FIELDS)
		})

		test('should fail due to invalid password', async () => {
			for (const password of invalid_passwords) {
				const request = {
					name: body_register.name,
					username: body_register.username,
					email: body_register.email,
					password,
					confirmPassword: password,
				}
				const res = await chaiPost(ROUTE + ROUTES.AUTH_REGISTER_LOCAL, request)
				validateAuthValidation(res, ERRORS.INVALID_PASSWORD)
			}
		})

		test('should fail due to invalid password length', async () => {
			for (const password of invalid_passwords_length) {
				const request = {
					name: body_register.name,
					username: body_register.username,
					email: body_register.email,
					password,
					confirmPassword: password,
				}
				const res = await chaiPost(ROUTE + ROUTES.AUTH_REGISTER_LOCAL, request)
				validateAuthValidation(res, ERRORS.INVALID_LENGTH)
			}
		})

		test('should fail due to password is username', async () => {
			const request = {
				name: body_register.name,
				username: body_register.username,
				email: body_register.email,
				password: body_register.username,
				confirmPassword: body_register.username,
			}
			const res = await chaiPost(ROUTE + ROUTES.AUTH_REGISTER_LOCAL, request)
			validateAuthValidation(res, ERRORS.PASSWORD_OTHER_MATCH)
		})

		test('should fail due to missing confirm password', async () => {
			const request = {
				name: body_register.name,
				username: body_register.username,
				email: body_register.email,
				password: body_register.password,
			}
			const res = await chaiPost(ROUTE + ROUTES.AUTH_REGISTER_LOCAL, request)
			validateAuthValidation(res, ERRORS.MISSING_FIELDS)
		})

		test('should fail due to invalid confirm password', async () => {
			const request = {
				name: body_register.name,
				username: body_register.username,
				email: body_register.email,
				password: body_register.password,
				confirmPassword: body_register.invalidConfirmPassword,
			}
			const res = await chaiPost(ROUTE + ROUTES.AUTH_REGISTER_LOCAL, request)
			validateAuthValidation(res, ERRORS.PASSWORDS_DIFFERENCE)
		})
	})

	suite('Login Local auth', () => {
		let user: UserDocument
		before(async () => {
			user = await createUser(body)
		})

		test('should fail due to missing fields', async () => {
			const res = await chaiPost(ROUTE + ROUTES.AUTH_LOGIN_LOCAL, {})
			validateAuthValidation(res, ERRORS.MISSING_FIELDS)
		})

		test('should fail due to missing username', async () => {
			const request = { password: body.password }
			const res = await chaiPost(ROUTE + ROUTES.AUTH_LOGIN_LOCAL, request)
			validateAuthValidation(res, ERRORS.MISSING_FIELDS)
		})

		test('should fail due to missing password', async () => {
			const request = { username: body.username }
			const res = await chaiPost(ROUTE + ROUTES.AUTH_LOGIN_LOCAL, request)
			validateAuthValidation(res, ERRORS.MISSING_FIELDS)
		})

		after(async () => {
			await deleteUser(user.id)
		})
	})

	const validateAuthValidation = (res: ResponseType, message: ERRORS) => {
		assert.equal(
			res.status,
			StatusCodes.BAD_REQUEST,
			'Response status must be a 400'
		)
		assert.equal(res.type, 'application/json', 'response type must be json')
		assert.property(res.body, 'success', 'response must a success property')
		assert.property(res.body, 'msg', 'response must have a msg property')
		const { success, msg } = res.body
		assert.isFalse(success, 'successs must be false due to fail case')
		assert.equal(msg, message, `msg must be ${message}`)
	}
})
