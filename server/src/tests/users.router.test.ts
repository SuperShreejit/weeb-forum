import ROUTES from '../constants/routes'
import chaiHttp from 'chai-http'
import chai from 'chai'
import ERRORS from '../constants/errors'
import { StatusCodes } from 'http-status-codes'
import { UserDocument } from '../models/User'
import { createToken, deleteToken } from '../services/token.services'
import generateOTP from '../helpers/generateOTP'
import { TOKENS } from '../constants/misc'
import { createUser, deleteUser } from '../services/user.services'
import {
	userBody,
	body,
	TEST_ROUTE,
	fakeId,
	userBody2,
	updatedPassword,
	updatedUsername,
	wrongPassword,
	updatedAvatarFile,
	wrongEmail,
} from '../constants/userRouterTest'
import {
	describe,
	test,
	suite,
	before,
	after,
	beforeEach,
	afterEach,
} from 'mocha'
import {
	assert,
	ResponseType,
	chaiPost,
	chaiGet,
	chaiPatch,
	chaiGetWithAuth,
	chaiDeleteWithBody,
	chaiPatchWithAuth,
	chaiPatchWithAvatar,
	chaiPatchWithAvatarAndAuth,
	chaiDeleteWithBodyAndAuth,
	chaiPostWithAuth,
} from '../services/chai.services'

chai.use(chaiHttp)
const ROUTE = ROUTES.SERVER_URL_BASE + ROUTES.USERS_BASE
const LOGIN_ROUTE =
	ROUTES.SERVER_URL_BASE + ROUTES.AUTH_BASE + ROUTES.AUTH_LOGIN_LOCAL
const LOGOUT_ROUTE =
	ROUTES.SERVER_URL_BASE + ROUTES.AUTH_BASE + ROUTES.AUTH_LOGOUT

describe('Users Routes Tests', () => {
	suite('Get User', () => {
		let user: UserDocument
		let user2: UserDocument
		before(async () => {
			user = await createUser(userBody)
			user2 = await createUser(body)
		})

		test('should fail to get a user due to invalid user id', async () => {
			const res = await chaiGet(ROUTE + TEST_ROUTE.GET_USER + fakeId)
			validateUserResponse(res, ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)
		})

		test('should successfully get a user', async () => {
			const res = await chaiGet(ROUTE + TEST_ROUTE.GET_USER + user.id)
			validateUserResponse(res)
		})

		test('should successfully get all users', async () => {
			const res = await chaiGet(ROUTE + TEST_ROUTE.GET_USERS)
			validateUserResponse(res)
		})

		after(async () => {
			await deleteUser(user.id)
			await deleteUser(user2.id)
		})
	})

	suite('Change Username', () => {
		let user: UserDocument
		let user2: UserDocument
		before(async () => {
			user = await createUser(userBody)
			user2 = await createUser(userBody2)
		})

		let cookie: string
		beforeEach(async () => {
			const request = {
				username: userBody.username,
				password: userBody.password,
			}
			const res = await chaiPost(LOGIN_ROUTE, request)
			assert.equal(res.status, StatusCodes.OK, 'must be a success response')
			cookie = res.header['set-cookie']
		})

		afterEach(async () => {
			await chaiGetWithAuth(LOGOUT_ROUTE, cookie)
		})

		test('should fail due to user not logged in', async () => {
			const request = {
				username: updatedUsername,
				password: userBody.password,
			}
			const res = await chaiPatch(
				ROUTE + TEST_ROUTE.CHANGE_USERNAME + user.id,
				request
			)
			validateUnauthorisedResponses(res)
		})

		test('should fail due to user not found', async () => {
			const request = {
				username: updatedUsername,
				password: userBody.password,
			}
			const res = await chaiPatchWithAuth(
				ROUTE + TEST_ROUTE.CHANGE_USERNAME + fakeId,
				request,
				cookie
			)
			validateUserResponse(res, ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)
		})

		test('should fail due to username was changed before', async () => {
			const loginRequest = {
				username: userBody2.username,
				password: userBody2.password,
			}
			const loginRes = await chaiPost(LOGIN_ROUTE, loginRequest)
			assert.equal(
				loginRes.status,
				StatusCodes.OK,
				'must be a successfull request'
			)
			const cookie = loginRes.header['set-cookie']

			const request = {
				username: updatedUsername,
				password: userBody2.password,
			}
			const res = await chaiPatchWithAuth(
				ROUTE + TEST_ROUTE.CHANGE_USERNAME + user2.id,
				request,
				cookie
			)
			validateUserResponse(res, ERRORS.USERNAME_CHANGED, StatusCodes.CONFLICT)
			await chaiGetWithAuth(LOGOUT_ROUTE, cookie)
		})

		test('should fail due to incorrect password', async () => {
			const request = {
				username: updatedUsername,
				password: updatedPassword,
			}
			const res = await chaiPatchWithAuth(
				ROUTE + TEST_ROUTE.CHANGE_USERNAME + user.id,
				request,
				cookie
			)
			validateUserResponse(
				res,
				ERRORS.INCORRECT_PASSWORD,
				StatusCodes.UNAUTHORIZED
			)
		})

		test('should fail due to username already exists', async () => {
			const request = {
				username: userBody2.username,
				password: userBody.password,
			}
			const res = await chaiPatchWithAuth(
				ROUTE + TEST_ROUTE.CHANGE_USERNAME + user.id,
				request,
				cookie
			)
			validateUserResponse(res, ERRORS.USERNAME_EXISTS, StatusCodes.CONFLICT)
		})

		test('should successfully change the username', async () => {
			const request = {
				username: updatedUsername,
				password: userBody.password,
			}
			const res = await chaiPatchWithAuth(
				ROUTE + TEST_ROUTE.CHANGE_USERNAME + user.id,
				request,
				cookie
			)
			validateUserResponse(res)
		})

		after(async () => {
			await deleteUser(user.id)
			await deleteUser(user2.id)
		})
	})

	suite('Change Password', () => {
		let user: UserDocument
		before(async () => {
			user = await createUser(userBody)
		})

		let cookie: string
		beforeEach(async () => {
			const request = {
				username: userBody.username,
				password: userBody.password,
			}
			const res = await chaiPost(LOGIN_ROUTE, request)
			assert.equal(res.status, StatusCodes.OK, 'must be a success response')
			cookie = res.header['set-cookie']
		})

		afterEach(async () => {
			await chaiGetWithAuth(LOGOUT_ROUTE, cookie)
		})

		test('should fail due to user not logged in', async () => {
			const request = {
				oldPassword: userBody.password,
				newPassword: updatedPassword,
				confirmPassword: updatedPassword,
			}
			const res = await chaiPatch(
				ROUTE + TEST_ROUTE.CHANGE_PASSWORD + user.id,
				request
			)
			validateUnauthorisedResponses(res)
		})

		test('should fail due to user not found', async () => {
			const request = {
				oldPassword: userBody.password,
				newPassword: updatedPassword,
				confirmPassword: updatedPassword,
			}
			const res = await chaiPatchWithAuth(
				ROUTE + TEST_ROUTE.CHANGE_PASSWORD + fakeId,
				request,
				cookie
			)
			validateUserResponse(res, ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)
		})

		test('should fail due to incorrect old password', async () => {
			const request = {
				oldPassword: wrongPassword,
				newPassword: updatedPassword,
				confirmPassword: updatedPassword,
			}
			const res = await chaiPatchWithAuth(
				ROUTE + TEST_ROUTE.CHANGE_PASSWORD + user.id,
				request,
				cookie
			)
			validateUserResponse(
				res,
				ERRORS.INCORRECT_PASSWORD,
				StatusCodes.UNAUTHORIZED
			)
		})

		test('should successsfully update password', async () => {
			const request = {
				oldPassword: userBody.password,
				newPassword: updatedPassword,
				confirmPassword: updatedPassword,
			}
			const res = await chaiPatchWithAuth(
				ROUTE + TEST_ROUTE.CHANGE_PASSWORD + user.id,
				request,
				cookie
			)
			validateUserResponse(res)
		})

		after(async () => {
			await deleteUser(user.id)
		})
	})

	suite('Change Avatar', () => {
		let user: UserDocument
		before(async () => {
			user = await createUser(userBody)
		})

		let cookie: string
		beforeEach(async () => {
			const request = {
				username: userBody.username,
				password: userBody.password,
			}
			const res = await chaiPost(LOGIN_ROUTE, request)
			assert.equal(res.status, StatusCodes.OK, 'must be a success response')
			cookie = res.header['set-cookie']
		})

		afterEach(async () => {
			await chaiGetWithAuth(LOGOUT_ROUTE, cookie)
		})

		test('should fail due to user not logged in', async () => {
			const options = {
				filename: updatedAvatarFile.filename,
				contentType: updatedAvatarFile.mimeType,
			}
			const res = await chaiPatchWithAvatar(
				ROUTE + TEST_ROUTE.CHANGE_AVATAR + user.id,
				updatedAvatarFile.buffer,
				options
			)
			validateUnauthorisedResponses(res)
		})

		test('should fail due to user not found', async () => {
			const options = {
				filename: updatedAvatarFile.filename,
				contentType: updatedAvatarFile.mimeType,
			}
			const res = await chaiPatchWithAvatarAndAuth(
				ROUTE + TEST_ROUTE.CHANGE_AVATAR + fakeId,
				cookie,
				updatedAvatarFile.buffer,
				options
			)
			validateUserResponse(res, ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)
		})

		test('should fail due to file not uploaded', async () => {
			const res = await chaiPatchWithAuth(
				ROUTE + TEST_ROUTE.CHANGE_AVATAR + user.id,
				{},
				cookie
			)
			validateUserResponse(res, ERRORS.MISSING_FILE, StatusCodes.BAD_REQUEST)
		})

		test('should successsfully change the avatar', async () => {
			const options = {
				filename: updatedAvatarFile.filename,
				contentType: updatedAvatarFile.mimeType,
			}
			const res = await chaiPatchWithAvatarAndAuth(
				ROUTE + TEST_ROUTE.CHANGE_AVATAR + user.id,
				cookie,
				updatedAvatarFile.buffer,
				options
			)
			validateUserResponse(res)
		})

		after(async () => {
			await deleteUser(user.id)
		})
	})

	suite('Send Verify Email', () => {
		let user: UserDocument
		before(async () => {
			user = await createUser(userBody)
		})

		test('should fail due to user not found', async () => {
			const request = { email: wrongEmail }
			const res = await chaiPost(ROUTE + TEST_ROUTE.VERIFY_EMAIL, request)
			validateUserResponse(res, ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)
		})

		test('should succssfully send email verify mail', async () => {
			const request = { email: userBody.email }
			const res = await chaiPost(ROUTE + TEST_ROUTE.VERIFY_EMAIL, request)
			validateUserResponse(res)
		})

		after(async () => {
			await deleteUser(user.id)
		})
	})

	suite('Verify Email', () => {
		let user: UserDocument
		const otp = generateOTP()
		before(async () => {
			user = await createUser(userBody)
			const tokenRequest = { userId: user.id, token: otp }
			await createToken(tokenRequest, TOKENS.EMAIL)
		})

		test('should fail due to user not found', async () => {
			const request = { otp, email: wrongEmail }
			const res = await chaiPatch(ROUTE + TEST_ROUTE.VERIFY_EMAIL, request)
			validateUserResponse(res, ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)
		})

		test('should fail due to invalid token', async () => {
			const request = { otp: generateOTP(), email: userBody.email }
			const res = await chaiPatch(ROUTE + TEST_ROUTE.VERIFY_EMAIL, request)
			validateUserResponse(res, ERRORS.INVALID_OTP, StatusCodes.CONFLICT)
		})

		test('should successfully validate the email', async () => {
			const request = { otp, email: userBody.email }
			const res = await chaiPatch(ROUTE + TEST_ROUTE.VERIFY_EMAIL, request)
			validateUserResponse(res)
		})

		after(async () => {
			await deleteToken({ userId: user.id }, TOKENS.EMAIL)
			await deleteUser(user.id)
		})
	})

	suite('Send Forgot Password', () => {
		let user: UserDocument
		before(async () => {
			user = await createUser(userBody)
		})

		test('should fail due to user not found', async () => {
			const request = { email: wrongEmail }
			const res = await chaiPost(ROUTE + TEST_ROUTE.FORGOT_PASSWORD, request)
			validateUserResponse(res, ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)
		})

		test('should succssfully send forgot password mail', async () => {
			const request = { email: userBody.email }
			const res = await chaiPost(ROUTE + TEST_ROUTE.FORGOT_PASSWORD, request)
			validateUserResponse(res)
		})

		after(async () => {
			await deleteUser(user.id)
		})
	})

	suite('Reset Password', () => {
		let user: UserDocument
		const otp = generateOTP()
		before(async () => {
			user = await createUser(userBody)
			const tokenRequest = { userId: user.id, token: otp }
			await createToken(tokenRequest, TOKENS.PASSWORD)
		})

		test('should fail due to user not found', async () => {
			const request = {
				otp,
				email: wrongEmail,
				newPassword: updatedPassword,
				confirmPassword: updatedPassword,
			}
			const res = await chaiPatch(ROUTE + TEST_ROUTE.FORGOT_PASSWORD, request)
			validateUserResponse(res, ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)
		})

		test('should fail due to invalid token', async () => {
			const request = {
				otp: generateOTP(),
				email: userBody.email,
				newPassword: updatedPassword,
				confirmPassword: updatedPassword,
			}
			const res = await chaiPatch(ROUTE + TEST_ROUTE.FORGOT_PASSWORD, request)
			validateUserResponse(res, ERRORS.INVALID_OTP, StatusCodes.CONFLICT)
		})

		test('should successfully validate the email', async () => {
			const request = {
				otp,
				email: userBody.email,
				newPassword: updatedPassword,
				confirmPassword: updatedPassword,
			}
			const res = await chaiPatch(ROUTE + TEST_ROUTE.FORGOT_PASSWORD, request)
			validateUserResponse(res)
		})

		after(async () => {
			await deleteToken({ userId: user.id }, TOKENS.PASSWORD)
			await deleteUser(user.id)
		})
	})

	suite('Send Deactivate User', () => {
		let user: UserDocument
		before(async () => {
			user = await createUser(userBody)
		})

		let cookie: string
		beforeEach(async () => {
			const request = {
				username: userBody.username,
				password: userBody.password,
			}
			const res = await chaiPost(LOGIN_ROUTE, request)
			assert.equal(res.status, StatusCodes.OK, 'must be a success response')
			cookie = res.header['set-cookie']
		})

		afterEach(async () => {
			await chaiGetWithAuth(LOGOUT_ROUTE, cookie)
		})

		test('should fail due to user not logged in', async () => {
			const res = await chaiGet(ROUTE + TEST_ROUTE.DEACTIVATE_USER + user.id)
			validateUnauthorisedResponses(res)
		})

		test('should fail due to user not found', async () => {
			const res = await chaiGetWithAuth(
				ROUTE + TEST_ROUTE.DEACTIVATE_USER + fakeId,
				cookie
			)
			validateUserResponse(res, ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)
		})

		test('should succssfully send deactivate user mail', async () => {
			const res = await chaiGetWithAuth(
				ROUTE + TEST_ROUTE.DEACTIVATE_USER + user.id,
				cookie
			)
			validateUserResponse(res)
		})

		after(async () => {
			await deleteUser(user.id)
		})
	})

	suite('Deactivate User', () => {
		let user: UserDocument
		const otp = generateOTP()
		before(async () => {
			user = await createUser(userBody)
			const tokenRequest = { userId: user.id, token: otp }
			await createToken(tokenRequest, TOKENS.DEACTIVATE)
		})

		let cookie: string
		beforeEach(async () => {
			const request = {
				username: userBody.username,
				password: userBody.password,
			}
			const res = await chaiPost(LOGIN_ROUTE, request)
			assert.equal(res.status, StatusCodes.OK, 'must be a success response')
			cookie = res.header['set-cookie']
		})

		afterEach(async () => {
			await chaiGetWithAuth(LOGOUT_ROUTE, cookie)
		})

		test('should fail due to user not logged in', async () => {
			const request = {
				otp,
				password: userBody.password,
			}
			const res = await chaiPost(
				ROUTE + TEST_ROUTE.DEACTIVATE_USER + user.id,
				request
			)
			validateUnauthorisedResponses(res)
		})

		test('should fail due to user not found', async () => {
			const request = {
				otp,
				password: userBody.password,
			}
			const res = await chaiPostWithAuth(
				ROUTE + TEST_ROUTE.DEACTIVATE_USER + fakeId,
				request,
				cookie
			)
			validateUserResponse(res, ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)
		})

		test('should fail due to invalid token', async () => {
			const request = {
				otp: generateOTP(),
				password: userBody.password,
			}
			const res = await chaiPostWithAuth(
				ROUTE + TEST_ROUTE.DEACTIVATE_USER + user.id,
				request,
				cookie
			)
			validateUserResponse(res, ERRORS.INVALID_OTP, StatusCodes.CONFLICT)
		})

		test('should fail due to incorrect password', async () => {
			const request = {
				otp,
				password: updatedPassword,
			}
			const res = await chaiPostWithAuth(
				ROUTE + TEST_ROUTE.DEACTIVATE_USER + user.id,
				request,
				cookie
			)
			validateUserResponse(
				res,
				ERRORS.INCORRECT_PASSWORD,
				StatusCodes.UNAUTHORIZED
			)
		})

		test('should successfully validate the email', async () => {
			const request = {
				otp,
				password: userBody.password,
			}
			const res = await chaiPostWithAuth(
				ROUTE + TEST_ROUTE.DEACTIVATE_USER + user.id,
				request,
				cookie
			)
			validateUserResponse(res)
		})

		after(async () => {
			await deleteToken({ userId: user.id }, TOKENS.DEACTIVATE)
			await deleteUser(user.id)
		})
	})

	const validateUserResponse = (
		res: ResponseType,
		message?: ERRORS,
		status?: StatusCodes
	) => {
		if (message && status) {
			assert.equal(res.status, status, `response status must be ${status}`)
			assert.equal(res.type, 'application/json', 'response type must be json')
			assert.isObject(res.body, 'response body must be an object')
			assert.property(
				res.body,
				'success',
				'response body must have a success property'
			)
			assert.property(res.body, 'msg', 'response body must have a msg property')
			assert.isFalse(res.body.success, 'success must be false')
			assert.equal(res.body.msg, message, `msg must be ${message}`)
		} else {
			assert.equal(
				res.status,
				StatusCodes.OK,
				`response status must be ${StatusCodes.OK}`
			)
			assert.equal(res.type, 'application/json', 'response type must be json')
			assert.isObject(res.body, 'response body must be an object')
			assert.property(
				res.body,
				'success',
				'response body must have a success property'
			)
			assert.isTrue(res.body.success, 'success must be true')
			if (res.body.user) validateUser(res.body.user as UserDocument)
			else if (res.body.users) {
				assert.isArray(res.body.users, 'users must be an array')
				validateUser(res.body.users[0] as UserDocument)
			}
		}
	}

	const validateUser = (user: UserDocument) => {
		if (!user || !user.avatarId) return assert.fail('user or avatar is missing')

		assert.isObject(user, 'user must be an object')
		assert.property(user, '_id', 'user must have an _id property')
		assert.property(user, 'name', 'user must have a name property')
		assert.property(user, 'username', 'user must have a username property')
		assert.property(user, 'email', 'user must have an email property')
		assert.property(user, 'authType', 'user must have an authType property')
		assert.property(user, 'avatarId', 'user must have an avatarId property')
		assert.isObject(user.avatarId, 'avatarId must be the avatar object')
		assert.property(user.avatarId, '_id', 'avatarId must have an _id property')
		assert.property(
			user.avatarId,
			'mimeType',
			'avatarId must have a mimeType property'
		)
		assert.property(
			user.avatarId,
			'filename',
			'avatarId must have a filename property'
		)
		assert.property(
			user.avatarId,
			'avatar',
			'avatarId must have an avatar property'
		)
	}

	const validateUnauthorisedResponses = (res: ResponseType) => {
		assert.equal(
			res.status,
			StatusCodes.UNAUTHORIZED,
			'response status must be 401'
		)
		assert.equal(res.type, 'application/json', 'response type must be json')
		assert.isObject(res.body, 'response body must be an object')
		assert.property(
			res.body,
			'success',
			'response body must have a success property'
		)
		assert.property(res.body, 'msg', 'response body must have a msg property')
		assert.isFalse(res.body.success, 'success must be false')
		assert.equal(
			res.body.msg,
			ERRORS.UNAUTHORIZED,
			`msg must be ${ERRORS.UNAUTHORIZED}`
		)
	}
})
