import User, { UserDocument } from '../models/User'
import { FilterQuery, QueryOptions, Types, UpdateQuery } from 'mongoose'
import ERRORS from '../constants/errors'
import { STRATEGY } from '../constants/misc'
import Avatar, { AvatarDocument } from '../models/Avatar'
import DEFAULT_AVATAR from '../constants/avatar'
import Comment from '../models/Comment'
import Post from '../models/Post'

type UserFilterQueryType = FilterQuery<UserDocument | AvatarDocument>
type UserUpdateQueryType = UpdateQuery<UserDocument | AvatarDocument>
type UserQueryOptionsType = QueryOptions<UserDocument | AvatarDocument>
const updateOptions: UserQueryOptionsType = { new: true, runValidators: true }

export const findSingleUser = async (query: UserFilterQueryType) =>
	await User.findOne(query).exec()

export const findUserById = async (id: string | Types.ObjectId) =>
	await User.findById(id)

export const findSingleAvatar = async (query: UserFilterQueryType) =>
	await Avatar.findOne(query).exec()

export const findUserWithAvatar = async (id: string | Types.ObjectId) =>
	await User.findById(id)
		.select(['name', 'username', 'email', 'authType', 'createdAt'])
		.populate<{ avatarId: AvatarDocument }>({
			path: 'avatarId',
			select: 'avatar mimeType filename',
		})
		.lean()
		.exec()

export const findUsers = async (query: UserFilterQueryType = {}) =>
	await User.find(query)
		.sort('-createdAt')
		.limit(10)
		.select(['name', 'username', 'email', 'authType'])
		.populate<{ avatarId: AvatarDocument }>({
			path: 'avatarId',
			select: 'avatar mimeType filename',
		})
		.lean()
		.exec()

export type UserType = {
	name: string
	username: string
	username_changed?: boolean
	email: string
	authType: STRATEGY
	authId?: string
	password?: string
	verified?: boolean
}

export const createUser = async (user: UserType) => {
	const newAvatar = new Avatar({
		filename: DEFAULT_AVATAR.FILENAME,
		avatar: DEFAULT_AVATAR.BUFFER,
		mimeType: DEFAULT_AVATAR.MIME_TYPE,
	})
	const newUser = new User(user)
	newAvatar.userId = newUser._id
	newUser.avatarId = newAvatar._id
	await newAvatar.save()
	return await newUser.save()
}

export const updateUser = async (
	userId: Types.ObjectId,
	update: UserUpdateQueryType
) => await User.findByIdAndUpdate(userId, update, updateOptions)

export const updateAvatar = async (
	filter: UserFilterQueryType,
	update: UserUpdateQueryType
) => await Avatar.findOneAndUpdate(filter, update, updateOptions)

export const deleteUser = async (userId: Types.ObjectId) => {
	await Comment.deleteMany({ authorId: userId })
	await Post.deleteMany({ authorId: userId })
	await Avatar.findOneAndRemove({ userId })
	return await User.findByIdAndDelete(userId)
}

export const validateUser = async (username: string, password: string) => {
	const user = await findSingleUser({ username })
	if (!user) return { valid: false, message: ERRORS.USER_NOT_FOUND }

	if (user.verified === false)
		return { valid: false, message: ERRORS.NOT_VERIFIED }

	if (user.authType !== STRATEGY.LOCAL)
		return { valid: false, message: ERRORS.INVALID_LOGIN }

	const isValid = await user.comparePassword(password)
	if (!isValid) return { valid: false, message: ERRORS.INCORRECT_PASSWORD }

	const user_found = await findUserWithAvatar(user.id)
	return { valid: true, user: user_found }
}
