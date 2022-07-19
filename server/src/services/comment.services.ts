import Comment, { CommentDocument } from '../models/Comment'
import { FilterQuery, UpdateQuery, Types } from 'mongoose'
import { CustomError } from '../helpers/CustomError'
import ERRORS from '../constants/errors'
import getError from '../helpers/getError'
import { StatusCodes } from 'http-status-codes'
import { editPost, findPostById } from './post.services'

type CommentFilterType = FilterQuery<CommentDocument>
type CommentUpdateType = UpdateQuery<CommentDocument>

export const findSingleComment = async (query: CommentFilterType) =>
	await Comment.findOne(query).exec()

export const findCommentById = async (commentId: string | Types.ObjectId) =>
	await Comment.findById(commentId)

export interface CommentBody {
	postId: Types.ObjectId
	authorId: Types.ObjectId
	comment: string
}

export const commentCreate = async (body: CommentBody) => {
	const newComment = new Comment(body)
	const post = await findPostById(body.postId)
	const update =
		post && post.comments && post.commentCount
			? {
					comments: [...post.comments, newComment._id],
					commentCount: post.commentCount + 1,
			  }
			: { comments: [newComment._id], commentCount: 1 }
	await editPost(body.postId, update)
	return await newComment.save()
}

export const editComment = async (
	commentId: Types.ObjectId,
	update: CommentUpdateType
) =>
	await Comment.findByIdAndUpdate(commentId, update, {
		new: true,
		runValidators: true,
	})

const idFinder = (id: Types.ObjectId, arr: Types.ObjectId[]) =>
	arr.some((unit: Types.ObjectId) => unit.equals(id))

export const likeCommentService = async (
	commentId: Types.ObjectId,
	userId: Types.ObjectId
) => {
	try {
		const comment = await findCommentById(commentId)
		if (
			!comment ||
			comment.likers === undefined ||
			comment.dislikers === undefined ||
			comment.dislikes === undefined ||
			comment.likes === undefined
		)
			throw new Error(ERRORS.INVALID_COMMENT_ID)

		if (idFinder(userId, comment.likers)) {
			const likers = comment.likers.filter(
				(user: Types.ObjectId) => !user.equals(userId)
			)
			const likes = comment.likes - 1
			const update = { likes, likers }
			return await editComment(comment.id, update)
		}

		if (idFinder(userId, comment.dislikers)) {
			const dislikers = comment.dislikers.filter(
				(user: Types.ObjectId) => !user.equals(userId)
			)
			const likers = [...comment.likers, userId]
			const dislikes = comment.dislikes - 1
			const likes = comment.likes + 1
			const update = { likes, likers, dislikes, dislikers }
			return await editComment(comment.id, update)
		} else {
			const likers = [...comment.likers, userId]
			const likes = comment.likes + 1
			const update = { likes, likers }
			return await editComment(comment.id, update)
		}
	} catch (error) {
		throw new CustomError(getError(error), StatusCodes.INTERNAL_SERVER_ERROR)
	}
}

export const dislikeCommentService = async (
	commentId: Types.ObjectId,
	userId: Types.ObjectId
) => {
	try {
		const comment = await findCommentById(commentId)
		if (
			!comment ||
			comment.likers === undefined ||
			comment.dislikers === undefined ||
			comment.dislikes === undefined ||
			comment.likes === undefined
		)
			throw new Error(ERRORS.INVALID_COMMENT_ID)

		if (idFinder(userId, comment.dislikers)) {
			const dislikers = comment.dislikers.filter(
				(user: Types.ObjectId) => !user.equals(userId)
			)
			const dislikes = comment.dislikes - 1
			const update = { dislikes, dislikers }
			return await editComment(comment.id, update)
		}

		if (idFinder(userId, comment.likers)) {
			const likers = comment.likers.filter(
				(user: Types.ObjectId) => !user.equals(userId)
			)
			const dislikers = [...comment.dislikers, userId]
			const likes = comment.likes - 1
			const dislikes = comment.dislikes + 1
			const update = { likes, likers, dislikes, dislikers }
			return await editComment(comment.id, update)
		} else {
			const dislikers = [...comment.dislikers, userId]
			const dislikes = comment.dislikes + 1
			const update = { dislikes, dislikers }
			return await editComment(comment.id, update)
		}
	} catch (error) {
		throw new CustomError(getError(error), StatusCodes.INTERNAL_SERVER_ERROR)
	}
}

export const removeComment = async (commentId: Types.ObjectId) =>
	await Comment.findByIdAndDelete(commentId)
