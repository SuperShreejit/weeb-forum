import { object, string, array } from 'yup'
import ERRORS from '../constants/errors'
import REGEX from '../constants/regex'

const postId = string().matches(REGEX.OBJECT_ID, ERRORS.INVALID_POST_ID)
const commentId = string().matches(REGEX.OBJECT_ID, ERRORS.INVALID_COMMENT_ID)
const userId = string().matches(REGEX.OBJECT_ID, ERRORS.INVALID_USER_ID)
const text = string().trim().required(ERRORS.MISSING_FIELDS)
const keys = array().of(string())
const comment = object({ comment: text })
const post = object({
	title: text,
	post: text,
	keys: keys,
})

export const createPostSchema = object({
	body: post,
	params: object({ userId }),
})

export const createCommentSchema = object({
	body: comment,
	params: object({ userId, postId }),
})

export const updatePostSchema = object({
	body: post,
	params: object({ postId }),
})

export const updateCommentSchema = object({
	body: comment,
	params: object({ commentId }),
})

export const postLikeSchema = object({
	params: object({ postId, userId }),
})

export const postDislikeSchema = object({
	params: object({ postId, userId }),
})

export const commentLikeSchema = object({
	params: object({ commentId, userId }),
})

export const commentDislikeSchema = object({
	params: object({ commentId, userId }),
})

export const deletePostSchema = object({
	params: object({ postId }),
})

export const deleteCommentSchema = object({
	params: object({ commentId }),
})

export const getPostSchema = object({
	params: object({ postId }),
})

export const getUserPostsSchema = object({
	params: object({ userId }),
})
