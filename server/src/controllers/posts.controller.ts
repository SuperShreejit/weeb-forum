import { Response, Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import ERRORS from '../constants/errors'
import { CustomError } from '../helpers/CustomError'
import errorHandler from '../helpers/ErrorHandler'
import { findUserById } from '../services/user.services'
import {
	commentCreate,
	editComment,
	findCommentById,
	likeCommentService,
	dislikeCommentService,
	removeComment,
} from '../services/comment.services'
import {
	dislikePostService,
	editPost,
	findPostById,
	findPostsByUser,
	likePostService,
	postCreate,
	removePost,
	findPostWithComments,
	findRecentPosts,
} from '../services/post.services'

export const createPost = async (req: Request, res: Response) => {
	const { userId } = req.params
	const { title, post, keys } = req.body
	try {
		const user = await findUserById(userId)
		if (!user)
			throw new CustomError(ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)

		const newPost = {
			authorId: user.id,
			title,
			post,
			keys,
		}
		const createdPost = await postCreate(newPost)

		res.json({ success: true, post: createdPost })
	} catch (error) {
		errorHandler(error, res)
	}
}
export const createComment = async (req: Request, res: Response) => {
	const { userId, postId } = req.params
	const { comment } = req.body
	try {
		const user = await findUserById(userId)
		if (!user)
			throw new CustomError(ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)

		const post = await findPostById(postId)
		if (!post)
			throw new CustomError(ERRORS.POST_NOT_FOUND, StatusCodes.NOT_FOUND)

		const newComment = {
			authorId: user.id,
			postId: post.id,
			comment,
		}
		await commentCreate(newComment)

		res.json({ success: true })
	} catch (error) {
		errorHandler(error, res)
	}
}
export const updatePost = async (req: Request, res: Response) => {
	const { postId } = req.params
	const { title, post, keys } = req.body
	try {
		const post_saved = await findPostById(postId)
		if (!post_saved)
			throw new CustomError(ERRORS.POST_NOT_FOUND, StatusCodes.NOT_FOUND)

		const update = { title, post, keys }
		const updatedPost = await editPost(post_saved.id, update)

		res.json({ success: true, post: updatedPost })
	} catch (error) {
		errorHandler(error, res)
	}
}
export const updateComment = async (req: Request, res: Response) => {
	const { commentId } = req.params
	const { comment } = req.body
	try {
		const comment_saved = await findCommentById(commentId)
		if (!comment_saved)
			throw new CustomError(ERRORS.COMMENT_NOT_FOUND, StatusCodes.NOT_FOUND)

		const update = { comment }
		const updatedComment = await editComment(comment_saved.id, update)

		res.json({ success: true, comment: updatedComment })
	} catch (error) {
		errorHandler(error, res)
	}
}
export const deletePost = async (req: Request, res: Response) => {
	const postId = req.params.postId
	try {
		const post = await findPostById(postId)
		if (!post)
			throw new CustomError(ERRORS.POST_NOT_FOUND, StatusCodes.NOT_FOUND)

		await removePost(post.id)

		res.json({ success: true })
	} catch (error) {
		errorHandler(error, res)
	}
}
export const deleteComment = async (req: Request, res: Response) => {
	const commentId = req.params.commentId
	try {
		const comment = await findCommentById(commentId)
		if (!comment)
			throw new CustomError(ERRORS.COMMENT_NOT_FOUND, StatusCodes.NOT_FOUND)

		await removeComment(comment.id)

		res.json({ success: true })
	} catch (error) {
		errorHandler(error, res)
	}
}
export const getPost = async (req: Request, res: Response) => {
	const postId = req.params.postId
	try {
		const post_saved = await findPostById(postId)
		if (!post_saved)
			throw new CustomError(ERRORS.POST_NOT_FOUND, StatusCodes.NOT_FOUND)

		const post = await findPostWithComments(post_saved.id)

		res.json({ success: true, post })
	} catch (error) {
		errorHandler(error, res)
	}
}
export const getPosts = async (req: Request, res: Response) => {
	try {
		const posts = await findRecentPosts()
		res.json({
			success: true,
			posts: posts.length > 0 ? posts : [],
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
export const getUserPosts = async (req: Request, res: Response) => {
	const userId = req.params.userId
	try {
		const user = await findUserById(userId)
		if (!user)
			throw new CustomError(ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)

		const posts = await findPostsByUser(user.id)
		res.json({
			success: true,
			posts: posts.length > 0 ? posts : [],
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
export const likePost = async (req: Request, res: Response) => {
	const { userId, postId } = req.params
	try {
		const user = await findUserById(userId)
		if (!user)
			throw new CustomError(ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)

		const post = await findPostById(postId)
		if (!post)
			throw new CustomError(ERRORS.POST_NOT_FOUND, StatusCodes.NOT_FOUND)

		await likePostService(post.id, user.id)

		res.json({ success: true })
	} catch (error) {
		errorHandler(error, res)
	}
}
export const dislikePost = async (req: Request, res: Response) => {
	const { userId, postId } = req.params
	try {
		const user = await findUserById(userId)
		if (!user)
			throw new CustomError(ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)

		const post = await findPostById(postId)
		if (!post)
			throw new CustomError(ERRORS.POST_NOT_FOUND, StatusCodes.NOT_FOUND)

		await dislikePostService(post.id, user.id)

		res.json({ success: true })
	} catch (error) {
		errorHandler(error, res)
	}
}
export const likeComment = async (req: Request, res: Response) => {
	const { userId, commentId } = req.params
	try {
		const user = await findUserById(userId)
		if (!user)
			throw new CustomError(ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)

		const comment = await findCommentById(commentId)
		if (!comment)
			throw new CustomError(ERRORS.COMMENT_NOT_FOUND, StatusCodes.NOT_FOUND)

		await likeCommentService(comment.id, user.id)

		res.json({ success: true })
	} catch (error) {
		errorHandler(error, res)
	}
}
export const dislikeComment = async (req: Request, res: Response) => {
	const { userId, commentId } = req.params
	try {
		const user = await findUserById(userId)
		if (!user)
			throw new CustomError(ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)

		const comment = await findCommentById(commentId)
		if (!comment)
			throw new CustomError(ERRORS.COMMENT_NOT_FOUND, StatusCodes.NOT_FOUND)

		await dislikeCommentService(comment.id, user.id)

		res.json({ success: true })
	} catch (error) {
		errorHandler(error, res)
	}
}
