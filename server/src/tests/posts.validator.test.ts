import { describe, test, suite, before, after } from 'mocha'
import chaiHttp from 'chai-http'
import chai from 'chai'
import ERRORS from '../constants/errors'
import ROUTES from '../constants/routes'
import { StatusCodes } from 'http-status-codes'
import { PostDocument } from '../models/Post'
import { CommentDocument } from '../models/Comment'
import { postCreate } from '../services/post.services'
import { commentCreate } from '../services/comment.services'
import { UserDocument } from '../models/User'
import { createUser, deleteUser } from '../services/user.services'
import {
	assert,
	chaiGet,
	chaiPost,
	chaiPatch,
	chaiDelete,
	ResponseType,
} from '../services/chai.services'
import {
	userBody,
	POST_ROUTE,
	postBody,
	updatedPostBody,
	commentBody,
} from '../constants/postRouterTest'

chai.use(chaiHttp)

const ROUTE = ROUTES.SERVER_URL_BASE + ROUTES.POSTS_BASE

describe('Posts Validator tests', () => {
	describe('Posts Routes', () => {
		suite('Create Post', () => {
			let user: UserDocument
			before(async () => {
				user = await createUser(userBody)
			})

			test('should fail due to missing fields', async () => {
				const res = await chaiPost(
					ROUTE + POST_ROUTE.CREATE_POST + `${user.id}`,
					{}
				)
				validatePostValidation(res, ERRORS.MISSING_FIELDS)
			})

			test('should fail due to invalid userId', async () => {
				const res = await chaiPost(
					ROUTE + POST_ROUTE.CREATE_POST + `not-userId`,
					{}
				)
				validatePostValidation(res, ERRORS.INVALID_USER_ID)
			})

			test('should fail due to missing post title', async () => {
				const request = { post: postBody.post, keys: postBody.keys }
				const res = await chaiPost(
					ROUTE + POST_ROUTE.CREATE_POST + `${user.id}`,
					request
				)
				validatePostValidation(res, ERRORS.MISSING_FIELDS)
			})

			test('should fail due to missing post content', async () => {
				const request = { title: postBody.title, keys: postBody.keys }
				const res = await chaiPost(
					ROUTE + POST_ROUTE.CREATE_POST + `${user.id}`,
					request
				)
				validatePostValidation(res, ERRORS.MISSING_FIELDS)
			})

			after(async () => {
				await deleteUser(user.id)
			})
		})

		suite('Update Post', () => {
			let post: PostDocument
			let user: UserDocument
			before(async () => {
				user = await createUser(userBody)
				const postReq = { ...postBody, authorId: user.id }
				post = await postCreate(postReq)
			})

			test('should fail due to invalid postId', async () => {
				const res = await chaiPatch(
					ROUTE + POST_ROUTE.UPDATE_POST + 'invalid-postId',
					{}
				)
				validatePostValidation(res, ERRORS.INVALID_POST_ID)
			})

			test('should fail due to missing fields', async () => {
				const res = await chaiPatch(
					ROUTE + POST_ROUTE.UPDATE_POST + `${post.id}`,
					{}
				)
				validatePostValidation(res, ERRORS.MISSING_FIELDS)
			})

			test('should fail due to missing post title', async () => {
				const request = {
					post: updatedPostBody.post,
					keys: updatedPostBody.keys,
				}
				const res = await chaiPatch(
					ROUTE + POST_ROUTE.UPDATE_POST + `${post.id}`,
					request
				)
				validatePostValidation(res, ERRORS.MISSING_FIELDS)
			})

			test('should fail due to missing post content', async () => {
				const request = {
					title: updatedPostBody.title,
					keys: updatedPostBody.keys,
				}
				const res = await chaiPatch(
					ROUTE + POST_ROUTE.UPDATE_POST + `${post.id}`,
					request
				)
				validatePostValidation(res, ERRORS.MISSING_FIELDS)
			})

			after(async () => {
				await deleteUser(user.id)
			})
		})

		suite('Delete Post', () => {
			test('should fail due to invalid postId', async () => {
				const res = await chaiDelete(
					ROUTE + POST_ROUTE.DELETE_POST + 'invalid-postId'
				)
				validatePostValidation(res, ERRORS.INVALID_POST_ID)
			})
		})

		suite('Get Post', () => {
			test('should fail due to invalid postId', async () => {
				const res = await chaiGet(
					ROUTE + POST_ROUTE.GET_POST + 'invalid-postId'
				)
				validatePostValidation(res, ERRORS.INVALID_POST_ID)
			})
		})

		suite('Get User Posts', () => {
			test('should fail due to invalid userId', async () => {
				const res = await chaiGet(
					ROUTE + POST_ROUTE.GET_USER_POSTS + 'invalid-userId'
				)
				validatePostValidation(res, ERRORS.INVALID_USER_ID)
			})
		})

		suite('Post like', () => {
			let post: PostDocument
			let user: UserDocument
			before(async () => {
				user = await createUser(userBody)
				const postReq = { ...postBody, authorId: user.id }
				post = await postCreate(postReq)
			})

			test('should fail due to invalid userId', async () => {
				const res = await chaiPatch(
					ROUTE + POST_ROUTE.LIKE_POST + `invalid-userId/${post.id}`,
					{}
				)
				validatePostValidation(res, ERRORS.INVALID_USER_ID)
			})

			test('should fail due to invalid postId', async () => {
				const res = await chaiPatch(
					ROUTE + POST_ROUTE.LIKE_POST + `${user.id}/invalid-postId`,
					{}
				)
				validatePostValidation(res, ERRORS.INVALID_POST_ID)
			})

			after(async () => {
				await deleteUser(user.id)
			})
		})

		suite('Post dislike', () => {
			let post: PostDocument
			let user: UserDocument
			before(async () => {
				user = await createUser(userBody)
				const postReq = { ...postBody, authorId: user.id }
				post = await postCreate(postReq)
			})

			test('should fail due to invalid userId', async () => {
				const res = await chaiPatch(
					ROUTE + POST_ROUTE.DISLIKE_POST + `invalid-userId/${post.id}`,
					{}
				)
				validatePostValidation(res, ERRORS.INVALID_USER_ID)
			})

			test('should fail due to invalid postId', async () => {
				const res = await chaiPatch(
					ROUTE + POST_ROUTE.DISLIKE_POST + `${user.id}/invalid-postId`,
					{}
				)
				validatePostValidation(res, ERRORS.INVALID_POST_ID)
			})

			after(async () => {
				await deleteUser(user.id)
			})
		})
	})

	describe('Comments Routes', () => {
		suite('Create Comment', () => {
			let post: PostDocument
			let user: UserDocument
			before(async () => {
				user = await createUser(userBody)
				const postReq = { ...postBody, authorId: user.id }
				post = await postCreate(postReq)
			})

			test('should fail due to invalid userId', async () => {
				const res = await chaiPost(
					ROUTE + POST_ROUTE.CREATE_COMMENT + `not-userId/${post.id}`,
					{}
				)
				validatePostValidation(res, ERRORS.INVALID_USER_ID)
			})

			test('should fail due to invalid postId', async () => {
				const res = await chaiPost(
					ROUTE + POST_ROUTE.CREATE_COMMENT + `${user.id}/not-postId`,
					{}
				)
				validatePostValidation(res, ERRORS.INVALID_POST_ID)
			})

			test('should fail due to missing comment content', async () => {
				const res = await chaiPost(
					ROUTE + POST_ROUTE.CREATE_COMMENT + `${user.id}/${post.id}`,
					{}
				)
				validatePostValidation(res, ERRORS.MISSING_FIELDS)
			})

			after(async () => {
				await deleteUser(user.id)
			})
		})

		suite('Update Comment', () => {
			let post: PostDocument
			let user: UserDocument
			let comment: CommentDocument
			before(async () => {
				user = await createUser(userBody)
				const postReq = { ...postBody, authorId: user.id }
				post = await postCreate(postReq)
				const commentReq = {
					authorId: user.id,
					postId: post.id,
					comment: commentBody,
				}
				comment = await commentCreate(commentReq)
			})

			test('should fail due to invalid commentId', async () => {
				const res = await chaiPatch(
					ROUTE + POST_ROUTE.UPDATE_COMMENT + `not-commentId`,
					{}
				)
				validatePostValidation(res, ERRORS.INVALID_COMMENT_ID)
			})

			test('should fail due to missing comment content', async () => {
				const res = await chaiPatch(
					ROUTE + POST_ROUTE.UPDATE_COMMENT + `${comment.id}`,
					{}
				)
				validatePostValidation(res, ERRORS.MISSING_FIELDS)
			})

			after(async () => {
				await deleteUser(user.id)
			})
		})

		suite('Delete Comment', () => {
			test('should fail due to invalid commentId', async () => {
				const res = await chaiDelete(
					ROUTE + POST_ROUTE.DELETE_COMMENT + 'not-commentId'
				)
				validatePostValidation(res, ERRORS.INVALID_COMMENT_ID)
			})
		})

		suite('Comment like', () => {
			let post: PostDocument
			let user: UserDocument
			let comment: CommentDocument
			before(async () => {
				user = await createUser(userBody)
				const postReq = { ...postBody, authorId: user.id }
				post = await postCreate(postReq)
				const commentReq = {
					authorId: user.id,
					postId: post.id,
					comment: commentBody,
				}
				comment = await commentCreate(commentReq)
			})

			test('should fail due to invalid userId', async () => {
				const res = await chaiPatch(
					ROUTE + POST_ROUTE.LIKE_COMMENT + `invalid-userId/${comment.id}`,
					{}
				)
				validatePostValidation(res, ERRORS.INVALID_USER_ID)
			})

			test('should fail due to invalid commentId', async () => {
				const res = await chaiPatch(
					ROUTE + POST_ROUTE.LIKE_COMMENT + `${user.id}/invalid-commentId`,
					{}
				)
				validatePostValidation(res, ERRORS.INVALID_COMMENT_ID)
			})

			after(async () => {
				await deleteUser(user.id)
			})
		})

		suite('Post dislike', () => {
			let post: PostDocument
			let user: UserDocument
			let comment: CommentDocument
			before(async () => {
				user = await createUser(userBody)
				const postReq = { ...postBody, authorId: user.id }
				post = await postCreate(postReq)
				const commentReq = {
					authorId: user.id,
					postId: post.id,
					comment: commentBody,
				}
				comment = await commentCreate(commentReq)
			})

			test('should fail due to invalid userId', async () => {
				const res = await chaiPatch(
					ROUTE + POST_ROUTE.DISLIKE_COMMENT + `invalid-userId/${comment.id}`,
					{}
				)
				validatePostValidation(res, ERRORS.INVALID_USER_ID)
			})

			test('should fail due to invalid commentId', async () => {
				const res = await chaiPatch(
					ROUTE + POST_ROUTE.DISLIKE_COMMENT + `${user.id}/invalid-commentId`,
					{}
				)
				validatePostValidation(res, ERRORS.INVALID_COMMENT_ID)
			})

			after(async () => {
				await deleteUser(user.id)
			})
		})
	})

	const validatePostValidation = (res: ResponseType, message: ERRORS) => {
		assert.equal(
			res.status,
			StatusCodes.BAD_REQUEST,
			'Response status must be a 400'
		)
		assert.equal(res.type, 'application/json', 'response type must be json')
		assert.property(res.body, 'success', 'response must a success property')
		assert.property(res.body, 'msg', 'response must have a msg property')
		const { success, msg } = res.body
		assert.isFalse(success, 'successs must be false due to fail case')
		assert.equal(msg, message, `msg must be ${message}`)
	}
})
