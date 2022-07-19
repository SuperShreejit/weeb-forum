import { describe, test } from 'mocha'
import ROUTES from '../constants/routes'
import { INTERNAL_ERROR } from '../constants/misc'
import { StatusCodes } from 'http-status-codes'
import { assert, chaiGet, ResponseType } from '../services/chai.services'
import chaiHttp from 'chai-http'
import chai from 'chai'

chai.use(chaiHttp)

const ROUTE = ROUTES.SERVER_URL_BASE + ROUTES.TEST_BASE

describe('Error handler tests', () => {
	test('App Logic Error Handler test', async () => {
		const response = await chaiGet(ROUTE + ROUTES.TEST_ERROR1)
		assertErrorResponse(response)
	})

	test('App Internal Error Handler test', async () => {
		const response = await chaiGet(ROUTE + ROUTES.TEST_ERROR2)
		assertErrorResponse(response)
	})

	test('Service Error handler test', async () => {
		const response = await chaiGet(ROUTE + ROUTES.TEST_ERROR3)
		assertErrorResponse(response)
	})

	const assertErrorResponse = (response: ResponseType) => {
		assert.equal(
			response.status,
			StatusCodes.INTERNAL_SERVER_ERROR,
			'must be a status of 500'
		)
		assert.equal(
			response.type,
			'application/json',
			'response must be of type application/json'
		)
		assert.property(
			response.body,
			'success',
			'response must have a success property'
		)
		assert.property(response.body, 'msg', 'response must have a msg property')
		const { success, msg } = response.body
		assert.isFalse(success, 'success must be false')
		assert.equal(msg, INTERNAL_ERROR, `msg must be ${INTERNAL_ERROR}`)
	}
})
