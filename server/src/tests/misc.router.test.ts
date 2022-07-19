import { describe, test, suite } from 'mocha'
import ROUTES from '../constants/routes'
import ERRORS from '../constants/errors'
import { StatusCodes } from 'http-status-codes'
import { chaiGet, assert, ResponseType } from '../services/chai.services'
import { welcome } from '../constants/misc'
import chaiHttp from 'chai-http'
import chai from 'chai'

chai.use(chaiHttp)

const ROUTE = ROUTES.SERVER_URL_BASE + ROUTES.TEST_BASE

describe('Test Routes', () => {
	suite('General Routes', () => {
		test('Hello world', async () => {
			const res = await chaiGet(ROUTE + ROUTES.HELLO_WORLD)

			assert.equal(res.status, StatusCodes.OK, 'Must be a successfull request')
			assert.equal(res.text, welcome, 'Must get a hello world response')
		})

		test('Page not found', async () => {
			const res = await chaiGet(ROUTE + 'not-found')
			assert.equal(res.status, StatusCodes.NOT_FOUND, 'status must be a 404')
			assert.equal(
				res.text,
				ERRORS.PAGE_NOT_FOUND,
				`text must be ${ERRORS.PAGE_NOT_FOUND}`
			)
		})
	})

	suite('Error test routes', () => {
		test('test Error1', async () => {
			const res = await chaiGet(ROUTE + ROUTES.TEST_ERROR1)
			testErrorResponse(res)
		})

		test('test Error2', async () => {
			const res = await chaiGet(ROUTE + ROUTES.TEST_ERROR2)
			testErrorResponse(res)
		})

		test('test Error3', async () => {
			const res = await chaiGet(ROUTE + ROUTES.TEST_ERROR3)
			testErrorResponse(res)
		})

		const testErrorResponse = (res: ResponseType) => {
			assert.equal(
				res.status,
				StatusCodes.INTERNAL_SERVER_ERROR,
				'status must be a 500'
			)
			assert.equal(
				res.type,
				'application/json',
				'response must be application json'
			)
		}
	})

	suite('Email template test routes', () => {
		test('Email verify template', async () => {
			const res = await chaiGet(ROUTE + ROUTES.TEST_EMAIL_VERIFY)
			checkTemplates(res)
		})

		test('Reset password template', async () => {
			const res = await chaiGet(ROUTE + ROUTES.TEST_RESET_PASSWORD)
			checkTemplates(res)
		})

		test('Deactivation template', async () => {
			const res = await chaiGet(ROUTE + ROUTES.TEST_DEACTIVATE)
			checkTemplates(res)
		})

		const checkTemplates = (res: ResponseType) => {
			assert.equal(res.status, StatusCodes.OK, 'must be a successfull request')
			assert.equal(res.type, 'text/html', 'response type must be text/html')
		}
	})
})
