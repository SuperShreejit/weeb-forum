import { describe, test, before, after, suite } from 'mocha'
import { TOKENS } from '../constants/misc'
import { UserDocument } from '../models/User'
import { createUser, deleteUser } from '../services/user.services'
import { userBody } from '../constants/userServicesTest'
import generateOTP from '../helpers/generateOTP'
import { assert } from '../services/chai.services'
import { Types } from 'mongoose'
import chaiHttp from 'chai-http'
import chai from 'chai'
import {
	createToken,
	deleteToken,
	findSingleToken,
	generateToken,
	updateToken,
	validateToken as ValidateToken,
} from '../services/token.services'

chai.use(chaiHttp)

describe('Token services', () => {
	suite('Create single Token', () => {
		let user: UserDocument
		before(async () => {
			user = await createUser(userBody)
		})

		test('should create a email verify token', async () => {
			const body = { userId: user.id, token: generateOTP() }
			const token = await createToken(body, TOKENS.EMAIL)
			validateToken(token, body)
		})
		test('should create a password reset token', async () => {
			const body = { userId: user.id, token: generateOTP() }
			const token = await createToken(body, TOKENS.PASSWORD)
			validateToken(token, body)
		})
		test('should create a deactivate token', async () => {
			const body = { userId: user.id, token: generateOTP() }
			const token = await createToken(body, TOKENS.DEACTIVATE)
			validateToken(token, body)
		})

		after(async () => {
			await deleteToken({ userId: user.id }, TOKENS.EMAIL)
			await deleteToken({ userId: user.id }, TOKENS.PASSWORD)
			await deleteToken({ userId: user.id }, TOKENS.DEACTIVATE)
			await deleteUser(user.id)
		})
	})

	suite('Update Single Token', () => {
		let user: UserDocument
		before(async () => {
			user = await createUser(userBody)
			const body = { userId: user.id, token: generateOTP() }
			await createToken(body, TOKENS.EMAIL)
			await createToken(body, TOKENS.PASSWORD)
			await createToken(body, TOKENS.DEACTIVATE)
		})

		test('should update an email Token', async () => {
			const update = { token: generateOTP() }
			const filter = { userId: user.id }
			const token = await updateToken(filter, update, TOKENS.EMAIL)
			validateToken(token, { ...filter, ...update })
		})

		test('should update a password Token', async () => {
			const update = { token: generateOTP() }
			const filter = { userId: user.id }
			const token = await updateToken(filter, update, TOKENS.PASSWORD)
			validateToken(token, { ...filter, ...update })
		})

		test('should update a deactivate Token', async () => {
			const update = { token: generateOTP() }
			const filter = { userId: user.id }
			const token = await updateToken(filter, update, TOKENS.DEACTIVATE)
			validateToken(token, { ...filter, ...update })
		})

		after(async () => {
			await deleteToken({ userId: user.id }, TOKENS.EMAIL)
			await deleteToken({ userId: user.id }, TOKENS.PASSWORD)
			await deleteToken({ userId: user.id }, TOKENS.DEACTIVATE)
			await deleteUser(user.id)
		})
	})

	suite('Find Single Token', () => {
		let user: UserDocument
		let body: TokenBodyType
		before(async () => {
			user = await createUser(userBody)
			body = { userId: user.id, token: generateOTP() }
			await createToken(body, TOKENS.EMAIL)
			await createToken(body, TOKENS.PASSWORD)
			await createToken(body, TOKENS.DEACTIVATE)
		})

		test('should find an email Token', async () => {
			const filter = { userId: user.id }
			const token = await findSingleToken(filter, TOKENS.EMAIL)
			validateToken(token, body)
		})

		test('should find a password Token', async () => {
			const filter = { userId: user.id }
			const token = await findSingleToken(filter, TOKENS.PASSWORD)
			validateToken(token, body)
		})

		test('should find a deactivate Token', async () => {
			const filter = { userId: user.id }
			const token = await findSingleToken(filter, TOKENS.DEACTIVATE)
			validateToken(token, body)
		})

		after(async () => {
			await deleteToken({ userId: user.id }, TOKENS.EMAIL)
			await deleteToken({ userId: user.id }, TOKENS.PASSWORD)
			await deleteToken({ userId: user.id }, TOKENS.DEACTIVATE)
			await deleteUser(user.id)
		})
	})

	suite('Delete Token', () => {
		let user: UserDocument
		before(async () => {
			user = await createUser(userBody)
			const body = { userId: user.id, token: generateOTP() }
			await createToken(body, TOKENS.EMAIL)
			await createToken(body, TOKENS.PASSWORD)
			await createToken(body, TOKENS.DEACTIVATE)
		})

		test('should delete an email Token', async () => {
			const filter = { userId: user.id }
			await deleteToken(filter, TOKENS.EMAIL)
			validateDeletedToken(user.id, TOKENS.EMAIL)
		})

		test('should delete a password Token', async () => {
			const filter = { userId: user.id }
			await deleteToken(filter, TOKENS.PASSWORD)
			validateDeletedToken(user.id, TOKENS.PASSWORD)
		})

		test('should delete a deactivate Token', async () => {
			const filter = { userId: user.id }
			await deleteToken(filter, TOKENS.DEACTIVATE)
			validateDeletedToken(user.id, TOKENS.DEACTIVATE)
		})

		after(async () => {
			await deleteUser(user.id)
		})
	})

	suite('validate Token', () => {
		let user: UserDocument
		let user2: UserDocument
		let body: TokenBodyType
		const token = generateOTP()
		before(async () => {
			user = await createUser(userBody)
			user2 = await createUser(userBody)
			body = { userId: user.id, token }
			await createToken(body, TOKENS.EMAIL)
			await createToken(body, TOKENS.PASSWORD)
			await createToken(body, TOKENS.DEACTIVATE)
		})

		test('should fail due to email token not found', async () => {
			const result = await ValidateToken(token, user2.id, TOKENS.EMAIL)
			assert.isFalse(result, 'result must be false')
		})

		test('should fail due to invalid email Token', async () => {
			const result = await ValidateToken(generateOTP(), user.id, TOKENS.EMAIL)
			assert.isFalse(result, 'result must be false')
		})

		test('should pass due to valid email Token', async () => {
			const result = await ValidateToken(token, user.id, TOKENS.EMAIL)
			assert.isTrue(result, 'result must be true')
		})

		test('should fail due to password token not found', async () => {
			const result = await ValidateToken(token, user2.id, TOKENS.PASSWORD)
			assert.isFalse(result, 'result must be false')
		})

		test('should fail due to invalid password Token', async () => {
			const result = await ValidateToken(
				generateOTP(),
				user.id,
				TOKENS.PASSWORD
			)
			assert.isFalse(result, 'result must be false')
		})

		test('should pass due to valid password Token', async () => {
			const result = await ValidateToken(token, user.id, TOKENS.PASSWORD)
			assert.isTrue(result, 'result must be true')
		})

		test('should fail due to deactivate token not found', async () => {
			const result = await ValidateToken(token, user2.id, TOKENS.DEACTIVATE)
			assert.isFalse(result, 'result must be false')
		})

		test('should fail due to invalid deactivate Token', async () => {
			const result = await ValidateToken(
				generateOTP(),
				user.id,
				TOKENS.DEACTIVATE
			)
			assert.isFalse(result, 'result must be false')
		})

		test('should pass due to valid deactivate Token', async () => {
			const result = await ValidateToken(token, user.id, TOKENS.DEACTIVATE)
			assert.isTrue(result, 'result must be true')
		})

		after(async () => {
			await deleteToken({ userId: user.id }, TOKENS.EMAIL)
			await deleteToken({ userId: user.id }, TOKENS.PASSWORD)
			await deleteToken({ userId: user.id }, TOKENS.DEACTIVATE)
			await deleteUser(user.id)
			await deleteUser(user2.id)
		})
	})

	suite('generate Token', () => {
		let user: UserDocument
		let user2: UserDocument
		let body: TokenBodyType
		before(async () => {
			user = await createUser(userBody)
			user2 = await createUser(userBody)
			body = { userId: user.id, token: generateOTP() }
			await createToken(body, TOKENS.EMAIL)
			await createToken(body, TOKENS.PASSWORD)
			await createToken(body, TOKENS.DEACTIVATE)
		})

		test('should update email Token for user 1', async () => {
			const otp = generateOTP()
			const filter = { userId: user.id }
			await generateToken(user.id, otp, TOKENS.EMAIL)
			const token = await findSingleToken(filter, TOKENS.EMAIL)
			validateToken(token, { ...filter, token: otp })
		})

		test('should create email Token for user 2', async () => {
			const otp = generateOTP()
			const filter = { userId: user.id }
			await generateToken(user.id, otp, TOKENS.EMAIL)
			const token = await findSingleToken(filter, TOKENS.EMAIL)
			validateToken(token, { ...filter, token: otp })
		})

		test('should update password Token for user 1', async () => {
			const otp = generateOTP()
			const filter = { userId: user.id }
			await generateToken(user.id, otp, TOKENS.PASSWORD)
			const token = await findSingleToken(filter, TOKENS.PASSWORD)
			validateToken(token, { ...filter, token: otp })
		})

		test('should create password Token for user 2', async () => {
			const otp = generateOTP()
			const filter = { userId: user.id }
			await generateToken(user.id, otp, TOKENS.PASSWORD)
			const token = await findSingleToken(filter, TOKENS.PASSWORD)
			validateToken(token, { ...filter, token: otp })
		})

		test('should update deactivate Token for user 1', async () => {
			const otp = generateOTP()
			const filter = { userId: user.id }
			await generateToken(user.id, otp, TOKENS.DEACTIVATE)
			const token = await findSingleToken(filter, TOKENS.DEACTIVATE)
			validateToken(token, { ...filter, token: otp })
		})

		test('should create deactivate Token for user 2', async () => {
			const otp = generateOTP()
			const filter = { userId: user.id }
			await generateToken(user.id, otp, TOKENS.DEACTIVATE)
			const token = await findSingleToken(filter, TOKENS.DEACTIVATE)
			validateToken(token, { ...filter, token: otp })
		})

		after(async () => {
			await deleteToken({ userId: user.id }, TOKENS.EMAIL)
			await deleteToken({ userId: user.id }, TOKENS.PASSWORD)
			await deleteToken({ userId: user.id }, TOKENS.DEACTIVATE)
			await deleteUser(user.id)
			await deleteUser(user2.id)
		})
	})

	type TokenType = Awaited<
		ReturnType<typeof createToken | typeof updateToken | typeof findSingleToken>
	>
	type TokenBodyType = { userId: Types.ObjectId; token: string }
	const validateToken = async (Token: TokenType, body: TokenBodyType) => {
		if (!Token) return assert.fail('Token is null')
		assert.isObject(Token, 'Token must be an object')
		assert.property(Token, '_id', 'Token must have an id property')
		assert.property(Token, 'userId', 'Token must have an userId property')
		assert.property(Token, 'token', 'Token must have a token property')
		assert.property(Token, 'createdAt', 'Token must have a createdAt property')
		const { token, userId, createdAt } = Token
		assert.equal(userId, body.userId, 'The userIds must be same')
		assert.isString(token, 'token must be a hash hex encoded string')
		const isValid = Token.compareToken(body.token)
		assert.isTrue(isValid, 'Tokens must be same')
		assert.instanceOf(createdAt, Date, 'created At must be a date')
	}

	const validateDeletedToken = async (userId: Types.ObjectId, type: TOKENS) => {
		const token = await findSingleToken({ userId }, type)
		assert.isNull(token, 'Token must be null due to it being deleted')
	}
})
