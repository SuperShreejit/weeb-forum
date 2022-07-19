import { describe, test, suite, after, before } from 'mocha'
import { assert } from '../services/chai.services'
import { AVATAR_MIME_TYPES } from '../constants/misc'
import DEFAULT_AVATAR from '../constants/avatar'
import REGEX from '../constants/regex'
import { UserDocument } from '../models/User'
import { AvatarDocument } from '../models/Avatar'
import { _LeanDocument, ObjectId } from 'mongoose'
import {
	body,
	bodies,
	body_google,
	body_verified,
} from '../constants/userServicesTest'
import chaiHttp from 'chai-http'
import chai from 'chai'
import ERRORS from '../constants/errors'
import {
	createUser,
	deleteUser,
	findSingleAvatar,
	updateAvatar,
	updateUser,
	findSingleUser,
	findUserById,
	findUserWithAvatar,
	findUsers,
	validateUser,
} from '../services/user.services'

chai.use(chaiHttp)

describe('User services', () => {
	suite('Create user', () => {
		let user: UserDocument
		test('should create an user', async () => {
			user = await createUser(body)
			ValidateUser(user)
			assert.equal(user.name, body.name, `Name must equal to ${body.name}`)
			assert.equal(
				user.username,
				body.username,
				`Username must equal to ${body.username}`
			)
		})

		after(async () => {
			await deleteUser(user.id)
		})
	})

	suite('Edit User & Avatar', () => {
		let user: UserDocument
		let avatar: _LeanDocument<AvatarDocument & { _id: ObjectId }> | null
		before(async () => {
			user = await createUser(body)
			avatar = await findSingleAvatar({ userId: user.id })
		})

		test('should edit avatar', async () => {
			const update = { filename: 'updated_filename.png' }
			const editedAvatar = await updateAvatar({ _id: avatar?._id }, update)
			validateAvatar(editedAvatar)
			if (editedAvatar)
				assert.equal(
					editedAvatar.filename,
					update.filename,
					`filename must be upadate to ${update.filename}`
				)
		})

		test('should edit user', async () => {
			const update = { username: 'updated_username', name: 'updated_name' }
			const editedUser = await updateUser(user.id, update)
			if (editedUser) {
				ValidateUser(editedUser)
				assert.equal(
					editedUser.username,
					update.username,
					`username must be updated to ${update.username}`
				)
				assert.equal(
					editedUser.name,
					update.name,
					`username must be updated to ${update.name}`
				)
			}
		})

		after(async () => {
			await deleteUser(user.id)
		})
	})

	suite('Delete User & avatar', () => {
		let user: UserDocument
		before(async () => {
			user = await createUser(body)
		})

		test('Deleting User and avatar', async () => {
			await deleteUser(user.id)
			const user_found = await findUserById(user.id)
			const avatar = await findSingleAvatar({ userId: user.id })
			assert.isNull(user_found, 'user must be null after deletion')
			assert.isNull(avatar, 'avatar must be null after deletion')
		})
	})

	suite('Find Individual Users & avatars', () => {
		let user: UserDocument
		let avatar: _LeanDocument<AvatarDocument & { _id: ObjectId }> | null
		before(async () => {
			user = await createUser(body)
			avatar = await findSingleAvatar({ userId: user.id })
		})

		test('should find a single user by a query', async () => {
			const query = { email: body.email }
			const user_found = await findSingleUser(query)
			if (user_found) {
				ValidateUser(user_found)
				assert.equal(user_found.email, user.email, 'both emails must match')
			}
		})

		test('should find a single user by Id', async () => {
			const user_found = await findUserById(user.id)
			ValidateUser(user_found)
		})

		test('should find a single avatar by query', async () => {
			const avatar_found = await findSingleAvatar({ userId: user.id })
			validateAvatar(avatar_found)
		})

		test('should find a single user including its avatar', async () => {
			const userWithAvatar = await findUserWithAvatar(user.id)
			validateUserWithAvatar(userWithAvatar)
		})

		after(async () => {
			await deleteUser(user.id)
		})
	})

	suite('Find many users', () => {
		let users: UserDocument[] = []
		let userIds: ObjectId[] = []
		before(async () => {
			for (const x of bodies) {
				const user = await createUser(x)
				users = [...users, user]
				userIds = [...userIds, user.id]
			}
		})

		test('should be able to find 10 users', async () => {
			const users_found = await findUsers({})
			assert.isArray(users_found, 'users must be an array')
			assert.equal(users_found.length, 10, 'There must be 10 users found')
			for (const user of users_found) {
				assert.include(
					userIds,
					user._id.toString(),
					'must be the users last created'
				)
				assert.isObject(user.avatarId, 'avatars must be populated')
				const isBuffer = Buffer.isBuffer(Buffer.from(user.avatarId.avatar))
				assert.isTrue(isBuffer, 'each avatar must have an avatar buffer')
			}
		})

		after(async () => {
			for (const x of users) await deleteUser(x.id)
		})
	})

	suite('Validate User', () => {
		let user_google: UserDocument
		let user_local: UserDocument
		let user_verified: UserDocument
		before(async () => {
			user_google = await createUser(body_google)
			user_local = await createUser(body)
			user_verified = await createUser(body_verified)
		})

		test('should fail due to user not found', async () => {
			const result = await validateUser('wrong-username', body.password)
			validateValidationResult(result, ERRORS.USER_NOT_FOUND)
		})

		test('should fail due to user not verified', async () => {
			const result = await validateUser(body.username, body.password)
			validateValidationResult(result, ERRORS.NOT_VERIFIED)
		})

		test('should fail due to authType not local', async () => {
			const result = await validateUser(
				body_google.username,
				body_google.password
			)
			validateValidationResult(result, ERRORS.INVALID_LOGIN)
		})

		test('should fail due to incorrect password', async () => {
			const result = await validateUser(
				body_verified.username,
				'wrong-password'
			)
			validateValidationResult(result, ERRORS.INCORRECT_PASSWORD)
		})

		test('should successfully validate user', async () => {
			const result = await validateUser(
				body_verified.username,
				body_verified.password
			)
			validateValidationResult(result)
		})

		after(async () => {
			await deleteUser(user_google._id)
			await deleteUser(user_local._id)
			await deleteUser(user_verified._id)
		})
	})

	type UserDocumentType =
		| (UserDocument & { _id: ObjectId })
		| UserDocument
		| null
	const ValidateUser = (user: UserDocumentType) => {
		if (!user) return assert.fail('User not found')

		assert.isObject(user, 'user must be an object')
		assert.property(user, '_id', 'Every user must have an id property')
		assert.property(user, 'name', 'Every user must have a name property')
		assert.property(
			user,
			'username',
			'Every user must have an username property'
		)
		assert.property(
			user,
			'username_changed',
			'Every user must have an username_changed property'
		)
		assert.property(user, 'email', 'Every user must have an email property')
		assert.property(user, 'authId', 'Every user must have an authId property')
		assert.property(
			user,
			'authType',
			'Every user must have an authType property'
		)
		assert.property(
			user,
			'verified',
			'Every user must have a verified property'
		)
		assert.property(
			user,
			'password',
			'Every user must have a password property'
		)
		assert.property(
			user,
			'avatarId',
			'Every user must have an avatarId property'
		)
		const {
			id,
			name,
			username,
			username_changed,
			email,
			authId,
			authType,
			verified,
			password,
			avatarId,
		} = user
		assert.match(
			id.toString(),
			REGEX.OBJECT_ID,
			'Ids must be valid mongoose ids'
		)
		assert.isString(name, 'name must be a string')
		assert.isString(username, 'username must be a string')
		assert.equal(email, body.email, `Email must be equal to ${body.email}`)
		assert.equal(
			authType,
			body.authType,
			`AuthType must be equal to ${body.authType}`
		)
		assert.equal(authId, body.authId, `AuthId must be equal to ${body.authId}`)
		assert.notEqual(
			password,
			body.password,
			`password must not be equal to ${body.password}`
		)
		assert.isFalse(username_changed, 'Username_changed must be false')
		assert.isFalse(verified, 'Verified must be false')
		assert.match(
			avatarId.toString(),
			REGEX.OBJECT_ID,
			'avatarId must be a valid mongoose Id'
		)
	}

	type AvatarDocumentType =
		| (AvatarDocument & { _id: ObjectId })
		| AvatarDocument
		| null
	const validateAvatar = (Avatar: AvatarDocumentType) => {
		if (!Avatar) return assert.fail('Avatar not found')

		assert.isObject(Avatar, 'Avatar must be an object')
		assert.property(Avatar, '_id', 'Avatars must have an Id property')
		assert.property(Avatar, 'filename', 'Avatars must have a filename property')
		assert.property(Avatar, 'avatar', 'Avatars must have an avatar property')
		assert.property(Avatar, 'mimeType', 'Avatars must have a mimeType property')
		const { _id, filename, avatar, mimeType } = Avatar
		assert.match(
			_id.toString(),
			REGEX.OBJECT_ID,
			'Ids must be a valid Mongoose ObjectId'
		)
		assert.isString(filename, 'filename must be a string')
		assert.include(
			AVATAR_MIME_TYPES,
			mimeType,
			'The mimeType must be from AVATAR_MIMETYPES'
		)
		const isBuffer = Buffer.isBuffer(avatar)
		assert.isTrue(isBuffer, 'avatar must be a buffer')
	}

	type UserWithAvatarDocumentType = _LeanDocument<
		Omit<
			UserDocument & {
				_id: ObjectId
			},
			'avatarId'
		> & {
			avatarId: AvatarDocument
		}
	> | null
	const validateUserWithAvatar = (user: UserWithAvatarDocumentType) => {
		if (!user) return assert.fail('User not found')

		assert.isObject(user, 'User must be an object')
		assert.property(user, '_id', 'Every user must have an id property')
		assert.property(user, 'name', 'Every user must have a name property')
		assert.property(
			user,
			'username',
			'Every user must have an username property'
		)
		assert.property(user, 'email', 'Every user must have an email property')
		assert.property(
			user,
			'authType',
			'Every user must have an authType property'
		)
		assert.property(
			user,
			'avatarId',
			'Every user must have an avatarId property'
		)

		const { _id, name, username, email, authType, avatarId } = user
		assert.match(
			_id.toString(),
			REGEX.OBJECT_ID,
			'Ids must be valid mongoose ids'
		)
		assert.isString(name, 'name must be a string')
		assert.isString(username, 'username must be a string')
		assert.equal(email, body.email, `Email must be equal to ${body.email}`)
		assert.equal(
			authType,
			body.authType,
			`AuthType must be equal to ${body.authType}`
		)
		assert.isObject(avatarId, 'avatarId must be the populated avatar object')
		assert.property(avatarId, '_id', 'every avatar must have an id property')
		assert.property(
			avatarId,
			'filename',
			'every avatar must have an filename property'
		)
		assert.property(
			avatarId,
			'avatar',
			'every avatar must have an avatar property'
		)
		assert.property(
			avatarId,
			'mimeType',
			'every avatar must have an mimeType property'
		)
		const { filename, mimeType, avatar } = avatarId
		assert.match(
			avatarId._id.toString(),
			REGEX.OBJECT_ID,
			'Ids must be valid mongoose ids'
		)
		assert.equal(
			filename,
			DEFAULT_AVATAR.FILENAME,
			`filename must be ${DEFAULT_AVATAR.FILENAME}`
		)
		assert.equal(
			mimeType,
			DEFAULT_AVATAR.MIME_TYPE,
			`mimetype must be ${DEFAULT_AVATAR.MIME_TYPE}`
		)
		const isBuffer = Buffer.isBuffer(Buffer.from(avatar))
		assert.isTrue(isBuffer, 'avatar must be a buffer')
	}

	type ValidationResultType = Awaited<ReturnType<typeof validateUser>>
	const validateValidationResult = (
		result: ValidationResultType,
		message?: ERRORS
	) => {
		assert.isObject(result, 'result must be an object')
		assert.property(result, 'valid', 'result must have a valid property')
		if (!message) {
			assert.property(result, 'user', 'result must have an user property')
			assert.isTrue(result.valid, 'valid must be true')
			if (result.user) {
				assert.isObject(result.user, 'must be an object')
				assert.equal(
					result.user.email,
					body_verified.email,
					`must match the user email ${body_verified.email}`
				)
			}
		} else {
			assert.property(result, 'message', 'result must have a message property')
			assert.isFalse(result.valid, 'valid must be false')
			assert.equal(result.message, message, `message must be ${message}`)
		}
	}
})
