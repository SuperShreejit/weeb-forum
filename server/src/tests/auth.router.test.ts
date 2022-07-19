import { describe, test, suite, before, after } from 'mocha'
import chaiHttp from 'chai-http'
import chai from 'chai'
import { StatusCodes } from 'http-status-codes'
import ROUTES from '../constants/routes'
import ERRORS from '../constants/errors'
import {
	chaiGetWithAuth,
	chaiGet,
	assert,
	ResponseType,
	chaiPost,
} from '../services/chai.services'
import { UserDocument } from '../models/User'
import {
	createUser,
	deleteUser,
	findSingleUser,
} from '../services/user.services'
import {
	register_body_success,
	userBody,
	register_body_fail,
} from '../constants/authRouterTest'

chai.use(chaiHttp)

const ROUTE = ROUTES.SERVER_URL_BASE + ROUTES.AUTH_BASE

describe('Authentication routes', () => {
	suite('Register User', () => {
		let user: UserDocument
		before(async () => {
			user = await createUser(userBody)
		})

		test('should fail due to common email', async () => {
			const res = await chaiPost(
				ROUTE + ROUTES.AUTH_REGISTER_LOCAL,
				register_body_fail
			)
			validateRegistration(res, ERRORS.EMAIL_EXISTS)
		})

		test('should fail due to common username', async () => {
			const res = await chaiPost(ROUTE + ROUTES.AUTH_REGISTER_LOCAL, {
				...register_body_fail,
				email: register_body_success.email,
			})
			validateRegistration(res, ERRORS.USERNAME_EXISTS)
		})

		test('should register new user', async () => {
			const res = await chaiPost(
				ROUTE + ROUTES.AUTH_REGISTER_LOCAL,
				register_body_success
			)
			validateRegistration(res)
		})

		after(async () => {
			await deleteUser(user.id)
			const user2 = await findSingleUser({ email: register_body_success.email })
			if (user2) await deleteUser(user2.id)
		})
	})

	suite('Local Login User', () => {
		let user: UserDocument
		let cookie: string
		before(async () => {
			user = await createUser(userBody)
		})

		test('should fail due to invalid username', async () => {
			const request = {
				username: 'not-username',
				password: userBody.password,
			}
			const res = await chaiPost(ROUTE + ROUTES.AUTH_LOGIN_LOCAL, request)
			validateLocalLogin(res, ERRORS.USER_NOT_FOUND)
		})

		test('should fail due to invalid password', async () => {
			const request = {
				username: userBody.username,
				password: 'not-password',
			}
			const res = await chaiPost(ROUTE + ROUTES.AUTH_LOGIN_LOCAL, request)
			validateLocalLogin(res, ERRORS.INCORRECT_PASSWORD)
		})

		test('should login successfully', async () => {
			const request = {
				username: userBody.username,
				password: userBody.password,
			}
			const res = await chaiPost(ROUTE + ROUTES.AUTH_LOGIN_LOCAL, request)
			validateLocalLogin(res)
			cookie = res.header['set-cookie']
		})

		after(async () => {
			await chaiGetWithAuth(ROUTE + ROUTES.AUTH_LOGOUT, cookie)
			await deleteUser(user.id)
		})
	})

	suite('Logout User', () => {
		let user: UserDocument
		before(async () => {
			user = await createUser(userBody)
		})

		test('should fail due to not beign logged in first', async () => {
			const res = await chaiGet(ROUTE + ROUTES.AUTH_LOGOUT)
			validateLogout(res, ERRORS.UNAUTHORIZED)
		})

		test('should be able to logout after local login', async () => {
			const request = {
				username: userBody.username,
				password: userBody.password,
			}
			const loginRes = await chaiPost(ROUTE + ROUTES.AUTH_LOGIN_LOCAL, request)
			validateLocalLogin(loginRes)
			const cookie = loginRes.header['set-cookie']
			const res = await chaiGetWithAuth(ROUTE + ROUTES.AUTH_LOGOUT, cookie)
			validateLogout(res)
		})

		after(async () => {
			await deleteUser(user.id)
		})
	})

	const validateRegistration = (res: ResponseType, message?: ERRORS) => {
		if (message) {
			assert.equal(res.status, StatusCodes.CONFLICT, 'must be a 409 status')
			assert.equal(res.type, 'application/json', 'must be a json request')
			assert.isObject(res.body, 'response must be an object')
			assert.property(
				res.body,
				'success',
				'response must have a success property'
			)
			assert.property(res.body, 'msg', 'response must have a msg property')
			assert.isFalse(res.body.success, 'success must be false')
			assert.equal(res.body.msg, message, `messge must be ${message}`)
		} else {
			assert.equal(res.status, StatusCodes.OK, 'must be a 200 status')
			assert.equal(res.type, 'application/json', 'must be a json request')
			assert.isObject(res.body, 'response must be an object')
			assert.property(
				res.body,
				'success',
				'response must have a success property'
			)
			assert.property(res.body, 'user', 'response must have an user property')
			assert.isTrue(res.body.success, 'success must be true')
			assert.isObject(res.body.user, 'user must be an object')
		}
	}

	const validateLocalLogin = (res: ResponseType, message?: ERRORS) => {
		if (message) {
			assert.equal(res.status, StatusCodes.BAD_REQUEST, 'must be a 400 status')
			assert.equal(res.type, 'application/json', 'must be a json request')
			assert.isObject(res.body, 'response must be an object')
			assert.property(
				res.body,
				'success',
				'response must have a success property'
			)
			assert.property(res.body, 'msg', 'response must have a msg property')
			assert.isFalse(res.body.success, 'success must be false')
			assert.equal(res.body.msg, message, `messge must be ${message}`)
		} else {
			assert.equal(res.status, StatusCodes.OK, 'must be a 200 status')
			assert.equal(res.type, 'application/json', 'must be a json request')
			assert.isObject(res.body, 'response must be an object')
			assert.property(
				res.body,
				'success',
				'response must have a success property'
			)
			assert.property(res.body, 'user', 'response must have an user property')
			assert.isTrue(res.body.success, 'success must be true')
			assert.isObject(res.body.user, 'user must be an object')
		}
	}

	const validateLogout = (res: ResponseType, message?: ERRORS) => {
		if (message) {
			assert.equal(res.status, StatusCodes.UNAUTHORIZED, 'must be a 401 status')
			assert.equal(res.type, 'application/json', 'must be a json request')
			assert.isObject(res.body, 'response must be an object')
			assert.property(
				res.body,
				'success',
				'response must have a success property'
			)
			assert.property(res.body, 'msg', 'response must have a msg property')
			assert.isFalse(res.body.success, 'success must be false')
			assert.equal(res.body.msg, message, `messge must be ${message}`)
		} else {
			assert.equal(res.status, StatusCodes.OK, 'must be a 200 status')
			assert.equal(res.type, 'application/json', 'must be a json request')
			assert.isObject(res.body, 'response must be an object')
			assert.property(
				res.body,
				'success',
				'response must have a success property'
			)
			assert.isTrue(res.body.success, 'success must be true')
		}
	}
})
