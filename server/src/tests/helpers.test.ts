import { describe, test } from 'mocha'
import ERRORS from '../constants/errors'
import { StatusCodes } from 'http-status-codes'
import { assert } from '../services/chai.services'
import { CustomError } from '../helpers/CustomError'
import generateOTP from '../helpers/generateOTP'
import REGEX from '../constants/regex'
import generateSalt from '../helpers/generateSalt'
import getError from '../helpers/getError'
import { default_avatar_path } from '../constants/avatar'
import imageBuffer from '../helpers/imageBuffer'
import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

describe('Helper tests', () => {
	test('Custom error check', () => {
		const error = new CustomError(ERRORS.INVALID_EMAIL, StatusCodes.BAD_REQUEST)
		assert.instanceOf(error, Error, 'Must be an instance of Error')
		assert.property(error,'message','Custom error must have a property of message')
		assert.property(error,'statusCode','Custom error must have a property of statusCode')
    assert.equal(error.message,ERRORS.INVALID_EMAIL, `The error message must be equal to ${ERRORS.INVALID_EMAIL}`)
    assert.equal(error.statusCode,StatusCodes.BAD_REQUEST, `The status must be a bad request`)
  })
  
	test('Generate OTP test', () => { 
		const otps: string[] = []
		for (let i = 10; i < 10; i++) {
			const otp = generateOTP()
			assert.isString(otp, "Each otp must be a string")
			assert.match(otp, REGEX.OTP, "otp must be valid")
			assert.notInclude(otps, otp, "The OTPs must not be repeated")
			otps.push(otp)
		}
	})
	
	test("Generate salt test", async () => {
		const salts: string[] = []
		for (let i = 10; i < 10; i++) {
			const salt = await generateSalt()
			assert.isString(salt, 'Each salt must be a string')
			assert.match(salt, REGEX.SALT, 'otp must be valid')
			assert.notInclude(salts, salt, 'The OTPs must not be repeated')
			salts.push(salt)
		}
	})

	test("Get Error test", () => {
		const error = new Error(ERRORS.INTERNAL_ERROR)
		const message = getError(error)
		assert.isString(message, "message must be string")
		assert.equal(message, ERRORS.INTERNAL_ERROR, `The message must be equal to ${ERRORS.INTERNAL_ERROR}`)
	})

	test('Image buffer test', () => { 
		const buffer = imageBuffer(default_avatar_path)
		const isBuffer = Buffer.isBuffer(buffer)
		assert.isTrue(isBuffer, "isBuffer must be true")
	})
 
})
