import Post, { PostDocument } from '../models/Post'
import { FilterQuery, UpdateQuery, Types, DocumentDefinition } from 'mongoose'
import { CustomError } from '../helpers/CustomError'
import getError from '../helpers/getError'
import ERRORS from '../constants/errors'
import { StatusCodes } from 'http-status-codes'
import Comment, { CommentDocument } from '../models/Comment'
import { UserDocument } from 'models/User'

type PostFilterQueryType = FilterQuery<PostDocument>
type PostUpdateQueryType = UpdateQuery<PostDocument>

export const findSinglePost = async (query: PostFilterQueryType) =>
	await Post.findOne(query).exec()

export const findPostById = async (postId: string | Types.ObjectId) =>
	await Post.findById(postId)

export const findPostWithComments = async (postId: Types.ObjectId) =>
	await Post.findById(postId)
		.populate<{ comments: CommentDocument[] }>({
			path: 'comments',
			options: { sort: '-createdAt' },
			populate: {
				path: 'authorId',
				select: 'id name avatarId',
				populate: {
					path: 'avatarId',
					select: 'avatar mimeType filename',
				},
			},
		})
		.populate<{ authorId: UserDocument }>({
			path: 'authorId',
			select: 'id name avatarId',
			populate: {
				path: 'avatarId',
				select: 'avatar mimeType filename',
			},
		})
		.exec()

export const findRecentPosts = async () =>
	await Post.find({})
		.sort('-createdAt')
		.limit(50)
		.populate<{ comments: CommentDocument[] }>({
			path: 'comments',
			options: { sort: '-createdAt' },
			populate: {
				path: 'authorId',
				select: 'id name avatarId',
				populate: {
					path: 'avatarId',
					select: 'avatar mimeType filename',
				},
			},
		})
		.populate<{ authorId: UserDocument }>({
			path: 'authorId',
			select: 'id name avatarId',
			populate: {
				path: 'avatarId',
				select: 'avatar mimeType filename',
			},
		})
		.exec()

export const findPostsByUser = async (authorId: Types.ObjectId) =>
	await Post.find({ authorId })
		.sort('-createdAt')
		.limit(50)
		.populate<{ comments: CommentDocument[] }>({
			path: 'comments',
			options: { sort: '-createdAt' },
			populate: {
				path: 'authorId',
				select: 'id name avatarId',
				populate: {
					path: 'avatarId',
					select: 'avatar mimeType filename',
				},
			},
		})
		.populate<{ authorId: UserDocument }>({
			path: 'authorId',
			select: 'id name avatarId',
			populate: {
				path: 'avatarId',
				select: 'avatar mimeType filename',
			},
		})
		.exec()

export interface PostBodyType {
	authorId: Types.ObjectId
	title: string
	post: string
	keys: string[] | []
}

export const postCreate = async (body: PostBodyType) => {
	const newPost = new Post(body)
	return await newPost.save()
}

export const editPost = async (
	postId: Types.ObjectId,
	update: PostUpdateQueryType
) =>
	await Post.findByIdAndUpdate(postId, update, {
		new: true,
		runValidators: true,
	})

const idFinder = (id: Types.ObjectId, arr: Types.ObjectId[]) =>
	arr.some((unit: Types.ObjectId) => unit.equals(id))

export const likePostService = async (
	postId: Types.ObjectId,
	userId: Types.ObjectId
) => {
	try {
		const post = await findPostById(postId)
		if (
			!post ||
			post.likers === undefined ||
			post.dislikers === undefined ||
			post.dislikes === undefined ||
			post.likes === undefined
		)
			throw new Error(ERRORS.INVALID_POST_ID)

		if (idFinder(userId, post.likers)) {
			const likes = post.likes - 1
			const likers = post.likers.filter(
				(user: Types.ObjectId) => !user.equals(userId)
			)
			const update = { likes, likers }
			return await editPost(post.id, update)
		}

		if (idFinder(userId, post.dislikers)) {
			const dislikers = post.dislikers.filter(
				(user: Types.ObjectId) => !user.equals(userId)
			)
			const likers = [...post.likers, userId]
			const dislikes = post.dislikes - 1
			const likes = post.likes + 1
			const update = { likes, likers, dislikes, dislikers }
			return await editPost(post.id, update)
		} else {
			const likers = [...post.likers, userId]
			const likes = post.likes + 1
			const update = { likes, likers }
			return await editPost(post.id, update)
		}
	} catch (error) {
		throw new CustomError(getError(error), StatusCodes.INTERNAL_SERVER_ERROR)
	}
}

export const dislikePostService = async (
	postId: Types.ObjectId,
	userId: Types.ObjectId
) => {
	try {
		const post = await findPostById(postId)
		if (
			!post ||
			post.likers === undefined ||
			post.dislikers === undefined ||
			post.dislikes === undefined ||
			post.likes === undefined
		)
			throw new Error(ERRORS.INVALID_POST_ID)

		if (idFinder(userId, post.dislikers)) {
			const dislikes = post.dislikes - 1
			const dislikers = post.dislikers.filter(
				(user: Types.ObjectId) => !user.equals(userId)
			)
			const update = { dislikes, dislikers }
			return await editPost(post.id, update)
		}

		if (idFinder(userId, post.likers)) {
			const likers = post.likers.filter(
				(user: Types.ObjectId) => !user.equals(userId)
			)
			const dislikers = [...post.dislikers, userId]
			const likes = post.likes - 1
			const dislikes = post.dislikes + 1
			const update = { likes, likers, dislikes, dislikers }
			return await editPost(post.id, update)
		} else {
			const dislikers = [...post.dislikers, userId]
			const dislikes = post.dislikes + 1
			const update = { dislikes, dislikers }
			return await editPost(post.id, update)
		}
	} catch (error) {
		throw new CustomError(getError(error), StatusCodes.INTERNAL_SERVER_ERROR)
	}
}

export const removePost = async (postId: Types.ObjectId) => {
	await Comment.deleteMany({ postId })
	await Post.findByIdAndDelete(postId)
}
