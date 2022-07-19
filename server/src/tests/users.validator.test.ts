import { describe, test, suite, before, after } from 'mocha'
import {
	assert,
	chaiGet,
	chaiPost,
	chaiPatch,
	chaiDeleteWithBody,
	ResponseType,
} from '../services/chai.services'
import chaiHttp from 'chai-http'
import chai from 'chai'
import ERRORS from '../constants/errors'
import ROUTES from '../constants/routes'
import {
	TEST_ROUTE,
	body,
	wrong_otps,
	forgotPasswordBody,
	invalid_passwords,
	invalid_passwords_length,
	invalid_username,
	invalid_username_length,
	invalid_email,
} from '../constants/userRouterTest'
import { UserDocument } from '../models/User'
import { createUser, deleteUser } from '../services/user.services'
import { StatusCodes } from 'http-status-codes'
import generateOTP from '../helpers/generateOTP'

chai.use(chaiHttp)

const ROUTE = ROUTES.SERVER_URL_BASE + ROUTES.USERS_BASE

describe('Users routes validation error tests', () => {
	suite('Get Email verify', () => {
		test('should fail due to missing email', async () => {
			const res = await chaiPost(ROUTE + TEST_ROUTE.VERIFY_EMAIL, {})
			validateValidationResponse(res, ERRORS.MISSING_FIELDS)
		})

		test('should fail due to invalid email', async () => {
			for (const email of invalid_email) {
				const request = { email }
				const res = await chaiPost(ROUTE + TEST_ROUTE.VERIFY_EMAIL, request)
				validateValidationResponse(res, ERRORS.INVALID_EMAIL)
			}
		})
	})

	suite('Forgot password', () => {
		test('should fail due to missing email', async () => {
			const res = await chaiPost(ROUTE + TEST_ROUTE.FORGOT_PASSWORD, {})
			validateValidationResponse(res, ERRORS.MISSING_FIELDS)
		})

		test('should fail due to invalid email', async () => {
			for (const email of invalid_email) {
				const request = { email }
				const res = await chaiPost(ROUTE + TEST_ROUTE.FORGOT_PASSWORD, request)
				validateValidationResponse(res, ERRORS.INVALID_EMAIL)
			}
		})
	})

	suite('Deactivation', () => {
		test('should fail due to invalid userId', async () => {
			const res = await chaiGet(ROUTE + TEST_ROUTE.DEACTIVATE_USER + 'wrong-id')
			validateValidationResponse(res, ERRORS.INVALID_USER_ID)
		})
	})

	suite('Change Avatar', () => {
		let user: UserDocument
		before(async () => {
			user = await createUser(body)
		})

		test('should fail due to invalid userId', async () => {
			const res = await chaiPatch(
				ROUTE + TEST_ROUTE.CHANGE_AVATAR + 'wrong-id',
				{}
			)
			validateValidationResponse(res, ERRORS.INVALID_USER_ID)
		})

		after(async () => {
			await deleteUser(user.id)
		})
	})

	suite('Get user', () => {
		test('should fail due to invalid userId', async () => {
			const res = await chaiGet(ROUTE + TEST_ROUTE.GET_USER + 'wrong-id')
			validateValidationResponse(res, ERRORS.INVALID_USER_ID)
		})
	})

	suite('Verify Email', () => {
		let user: UserDocument
		before(async () => {
			user = await createUser(body)
		})

		test('should fail due to invalid email', async () => {
			for (const email of invalid_email) {
				const request = { email }
				const res = await chaiPatch(ROUTE + TEST_ROUTE.VERIFY_EMAIL, request)
				validateValidationResponse(res, ERRORS.INVALID_EMAIL)
			}
		})

		test('should fail due to missing fields', async () => {
			const res = await chaiPatch(ROUTE + TEST_ROUTE.VERIFY_EMAIL, {})
			validateValidationResponse(res, ERRORS.MISSING_FIELDS)
		})

		test('should fail due to missing OTP', async () => {
			const request = { email: body.email }
			const res = await chaiPatch(ROUTE + TEST_ROUTE.VERIFY_EMAIL, request)
			validateValidationResponse(res, ERRORS.MISSING_FIELDS)
		})

		test('should fail due to missing email', async () => {
			const request = { otp: generateOTP() }
			const res = await chaiPatch(ROUTE + TEST_ROUTE.VERIFY_EMAIL, request)
			validateValidationResponse(res, ERRORS.MISSING_FIELDS)
		})

		test('should fail due to invalid OTP', async () => {
			for (const otp of wrong_otps) {
				const res = await chaiPatch(ROUTE + TEST_ROUTE.VERIFY_EMAIL, {
					otp,
					email: body.email,
				})
				validateValidationResponse(res, ERRORS.INVALID_OTP)
			}
		})

		after(async () => {
			await deleteUser(user.id)
		})
	})

	suite('Reset Password', () => {
		let user: UserDocument
		before(async () => {
			user = await createUser(body)
		})

		test('should fail due to invalid email', async () => {
			for (const email of invalid_email) {
				const request = {
					email,
					otp: forgotPasswordBody.otp,
					newPassword: forgotPasswordBody.newPassword,
					confirmPassword: forgotPasswordBody.newPassword,
				}
				const res = await chaiPatch(ROUTE + TEST_ROUTE.FORGOT_PASSWORD, request)
				validateValidationResponse(res, ERRORS.INVALID_EMAIL)
			}
		})

		test('should fail due to missing fields', async () => {
			const res = await chaiPatch(ROUTE + TEST_ROUTE.FORGOT_PASSWORD, {})
			validateValidationResponse(res, ERRORS.MISSING_FIELDS)
		})

		test('should fail due to invalid OTP', async () => {
			for (const otp of wrong_otps) {
				const res = await chaiPatch(ROUTE + TEST_ROUTE.FORGOT_PASSWORD, {
					otp,
					email: body.email,
					newPassword: forgotPasswordBody.newPassword,
					confirmPassword: forgotPasswordBody.newPassword,
				})
				validateValidationResponse(res, ERRORS.INVALID_OTP)
			}
		})

		test('should fail due to invalid new password', async () => {
			for (const newPassword of invalid_passwords) {
				const res = await chaiPatch(ROUTE + TEST_ROUTE.FORGOT_PASSWORD, {
					otp: forgotPasswordBody.otp,
					email: body.email,
					newPassword,
					confirmPassword: newPassword,
				})
				validateValidationResponse(res, ERRORS.INVALID_PASSWORD)
			}
		})

		test('should fail due to invalid new password length', async () => {
			for (const newPassword of invalid_passwords_length) {
				const res = await chaiPatch(ROUTE + TEST_ROUTE.FORGOT_PASSWORD, {
					otp: forgotPasswordBody.otp,
					email: body.email,
					newPassword,
					confirmPassword: newPassword,
				})
				validateValidationResponse(res, ERRORS.INVALID_LENGTH)
			}
		})

		test('should fail due to invalid confirm password', async () => {
			const res = await chaiPatch(ROUTE + TEST_ROUTE.FORGOT_PASSWORD, {
				otp: forgotPasswordBody.otp,
				email: body.email,
				newPassword: forgotPasswordBody.newPassword,
				confirmPassword: forgotPasswordBody.wrongConfirmPassword,
			})
			validateValidationResponse(res, ERRORS.PASSWORDS_DIFFERENCE)
		})

		after(async () => {
			await deleteUser(user.id)
		})
	})

	suite('Change Password', () => {
		let user: UserDocument
		before(async () => {
			user = await createUser(body)
		})

		test('should fail due to invalid userId', async () => {
			const res = await chaiPatch(
				ROUTE + TEST_ROUTE.CHANGE_PASSWORD + 'wrong-id',
				{}
			)
			validateValidationResponse(res, ERRORS.INVALID_USER_ID)
		})

		test('should fail due to missing fields', async () => {
			const res = await chaiPatch(
				ROUTE + TEST_ROUTE.CHANGE_PASSWORD + user.id,
				{}
			)
			validateValidationResponse(res, ERRORS.MISSING_FIELDS)
		})

		test('should fail due to missing old password', async () => {
			const res = await chaiPatch(
				ROUTE + TEST_ROUTE.CHANGE_PASSWORD + user.id,
				{
					newPassword: forgotPasswordBody.newPassword,
					confirmPassword: forgotPasswordBody.newPassword,
				}
			)
			validateValidationResponse(res, ERRORS.MISSING_FIELDS)
		})

		test('should fail due to invalid new password', async () => {
			for (const newPassword of invalid_passwords) {
				const res = await chaiPatch(
					ROUTE + TEST_ROUTE.CHANGE_PASSWORD + user.id,
					{
						oldPassword: body.password,
						newPassword,
						confirmPassword: newPassword,
					}
				)
				validateValidationResponse(res, ERRORS.INVALID_PASSWORD)
			}
		})

		test('should fail due to invalid new password length', async () => {
			for (const newPassword of invalid_passwords_length) {
				const res = await chaiPatch(
					ROUTE + TEST_ROUTE.CHANGE_PASSWORD + user.id,
					{
						oldPassword: body.password,
						newPassword,
						confirmPassword: newPassword,
					}
				)
				validateValidationResponse(res, ERRORS.INVALID_LENGTH)
			}
		})

		test('should fail due to invalid confirm password', async () => {
			const res = await chaiPatch(
				ROUTE + TEST_ROUTE.CHANGE_PASSWORD + user.id,
				{
					oldPassword: body.password,
					newPassword: forgotPasswordBody.newPassword,
					confirmPassword: forgotPasswordBody.wrongConfirmPassword,
				}
			)
			validateValidationResponse(res, ERRORS.PASSWORDS_DIFFERENCE)
		})

		after(async () => {
			await deleteUser(user.id)
		})
	})

	suite('Change Username', () => {
		let user: UserDocument
		before(async () => {
			user = await createUser(body)
		})

		test('should fail due to invalid userId', async () => {
			const res = await chaiPatch(
				ROUTE + TEST_ROUTE.CHANGE_USERNAME + 'wrong-id',
				{}
			)
			validateValidationResponse(res, ERRORS.INVALID_USER_ID)
		})

		test('should fail due to missing fields', async () => {
			const res = await chaiPatch(
				ROUTE + TEST_ROUTE.CHANGE_USERNAME + user.id,
				{}
			)
			validateValidationResponse(res, ERRORS.MISSING_FIELDS)
		})

		test('should fail due to missing password', async () => {
			const res = await chaiPatch(
				ROUTE + TEST_ROUTE.CHANGE_USERNAME + user.id,
				{ username: 'changed_username' }
			)
			validateValidationResponse(res, ERRORS.MISSING_FIELDS)
		})

		test('should fail due to invalid new username', async () => {
			for (const username of invalid_username) {
				const res = await chaiPatch(
					ROUTE + TEST_ROUTE.CHANGE_USERNAME + user.id,
					{
						password: body.password,
						username,
					}
				)
				validateValidationResponse(res, ERRORS.INVALID_USERNAME)
			}
		})

		test('should fail due to invalid new username', async () => {
			for (const username of invalid_username_length) {
				const res = await chaiPatch(
					ROUTE + TEST_ROUTE.CHANGE_USERNAME + user.id,
					{
						password: body.password,
						username,
					}
				)
				validateValidationResponse(res, ERRORS.INVALID_LENGTH)
			}
		})

		test('should fail due to new username matches password', async () => {
			const res = await chaiPatch(
				ROUTE + TEST_ROUTE.CHANGE_USERNAME + user.id,
				{
					password: body.password,
					username: body.password,
				}
			)
			validateValidationResponse(res, ERRORS.USERNAME_OTHER_MATCH)
		})

		after(async () => {
			await deleteUser(user.id)
		})
	})

	suite('Deactivate User', () => {
		let user: UserDocument
		before(async () => {
			user = await createUser(body)
		})

		test('should fail due to invalid userId', async () => {
			const res = await chaiDeleteWithBody(
				ROUTE + TEST_ROUTE.DEACTIVATE_USER + 'wrong-id',
				{}
			)
			validateValidationResponse(res, ERRORS.INVALID_USER_ID)
		})

		test('should fail due to missing fields', async () => {
			const res = await chaiDeleteWithBody(
				ROUTE + TEST_ROUTE.DEACTIVATE_USER + user.id,
				{}
			)
			validateValidationResponse(res, ERRORS.MISSING_FIELDS)
		})

		test('should fail due to missing password', async () => {
			const otp = generateOTP()
			const res = await chaiDeleteWithBody(
				ROUTE + TEST_ROUTE.DEACTIVATE_USER + user.id,
				{ otp }
			)
			validateValidationResponse(res, ERRORS.MISSING_FIELDS)
		})

		test('should fail due to missing otp', async () => {
			const res = await chaiDeleteWithBody(
				ROUTE + TEST_ROUTE.DEACTIVATE_USER + user.id,
				{ password: body.password }
			)
			validateValidationResponse(res, ERRORS.MISSING_FIELDS)
		})

		test('should fail due to invalid OTP', async () => {
			for (const otp of wrong_otps) {
				const res = await chaiDeleteWithBody(
					ROUTE + TEST_ROUTE.DEACTIVATE_USER + user.id,
					{
						otp,
						password: body.password,
					}
				)
				validateValidationResponse(res, ERRORS.INVALID_OTP)
			}
		})

		after(async () => {
			await deleteUser(user.id)
		})
	})

	const validateValidationResponse = (res: ResponseType, message: ERRORS) => {
		assert.equal(
			res.status,
			StatusCodes.BAD_REQUEST,
			'the status must be bad request'
		)
		assert.equal(res.type, 'application/json', 'response must be json')
		assert.isObject(res.body, 'response body must be an object')
		assert.property(
			res.body,
			'success',
			'response body must have a success property'
		)
		assert.property(res.body, 'msg', 'response body must have a msg property')
		const { success, msg } = res.body
		assert.isFalse(success, 'success must be false')
		assert.equal(msg, message, `msg must be ${message}`)
	}
})
