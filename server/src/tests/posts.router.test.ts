import ROUTES from '../constants/routes'
import ERRORS from '../constants/errors'
import { StatusCodes } from 'http-status-codes'
import chai from 'chai'
import chaiHttp from 'chai-http'
import { UserDocument } from '../models/User'
import { createUser, deleteUser } from '../services/user.services'
import { PostDocument } from '../models/Post'
import { CommentDocument } from '../models/Comment'
import { postCreate } from '../services/post.services'
import { commentCreate } from '../services/comment.services'
import {
	describe,
	test,
	suite,
	before,
	after,
	beforeEach,
	afterEach,
} from 'mocha'
import {
	postBody,
	commentBody,
	updatedCommentBody,
	updatedPostBody,
	POST_ROUTE,
	userBody,
	fakeId,
} from '../constants/postRouterTest'
import {
	assert,
	ResponseType,
	chaiPost,
	chaiGet,
	chaiDelete,
	chaiPatch,
	chaiGetWithAuth,
	chaiDeleteWithAuth,
	chaiPatchWithAuth,
	chaiPostWithAuth,
} from '../services/chai.services'

chai.use(chaiHttp)
const ROUTE = ROUTES.SERVER_URL_BASE + ROUTES.POSTS_BASE
const LOGIN_ROUTE =
	ROUTES.SERVER_URL_BASE + ROUTES.AUTH_BASE + ROUTES.AUTH_LOGIN_LOCAL
const LOGOUT_ROUTE =
	ROUTES.SERVER_URL_BASE + ROUTES.AUTH_BASE + ROUTES.AUTH_LOGOUT

describe('Post Router Tests', () => {
	describe('Posts routes', () => {
		suite('Create Post', () => {
			let user: UserDocument
			before(async () => {
				user = await createUser(userBody)
			})

			let cookie: string
			beforeEach(async () => {
				const request = {
					username: userBody.username,
					password: userBody.password,
				}
				const res = await chaiPost(LOGIN_ROUTE, request)
				assert.equal(
					res.status,
					StatusCodes.OK,
					'must be a successfull request'
				)
				cookie = res.header['set-cookie']
			})

			afterEach(async () => {
				await chaiGetWithAuth(LOGOUT_ROUTE, cookie)
			})

			test('should fail due to user not logged in', async () => {
				const res = await chaiPost(
					ROUTE + POST_ROUTE.CREATE_POST + `${user.id}`,
					postBody
				)
				validateUnauthorisedResponses(res)
			})

			test('should fail due to user not found', async () => {
				const res = await chaiPostWithAuth(
					ROUTE + POST_ROUTE.CREATE_POST + `${fakeId}`,
					postBody,
					cookie
				)
				validatePostResponse(res, ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)
			})

			test('should successfully create a post', async () => {
				const res = await chaiPostWithAuth(
					ROUTE + POST_ROUTE.CREATE_POST + `${user.id}`,
					postBody,
					cookie
				)
				validatePostResponse(res)
			})

			after(async () => {
				await deleteUser(user.id)
			})
		})

		suite('Update Post', () => {
			let user: UserDocument
			let post: PostDocument
			before(async () => {
				user = await createUser(userBody)
				const request = { ...postBody, authorId: user.id }
				post = await postCreate(request)
			})

			let cookie: string
			beforeEach(async () => {
				const request = {
					username: userBody.username,
					password: userBody.password,
				}
				const res = await chaiPost(LOGIN_ROUTE, request)
				assert.equal(
					res.status,
					StatusCodes.OK,
					'must be a successfull request'
				)
				cookie = res.header['set-cookie']
			})

			afterEach(async () => {
				await chaiGetWithAuth(LOGOUT_ROUTE, cookie)
			})

			test('should fail due to user not logged in', async () => {
				const res = await chaiPatch(
					ROUTE + POST_ROUTE.UPDATE_POST + post.id,
					updatedPostBody
				)
				validateUnauthorisedResponses(res)
			})

			test('should fail due to post not found', async () => {
				const res = await chaiPatchWithAuth(
					ROUTE + POST_ROUTE.UPDATE_POST + fakeId,
					updatedPostBody,
					cookie
				)
				validatePostResponse(res, ERRORS.POST_NOT_FOUND, StatusCodes.NOT_FOUND)
			})

			test('should successfully edit the post', async () => {
				const res = await chaiPatchWithAuth(
					ROUTE + POST_ROUTE.UPDATE_POST + post.id,
					updatedPostBody,
					cookie
				)
				validatePostResponse(res)
			})

			after(async () => {
				await deleteUser(user.id)
			})
		})

		suite('Delete Post', () => {
			let user: UserDocument
			let post: PostDocument
			before(async () => {
				user = await createUser(userBody)
				const request = { ...postBody, authorId: user.id }
				post = await postCreate(request)
			})

			let cookie: string
			beforeEach(async () => {
				const request = {
					username: userBody.username,
					password: userBody.password,
				}
				const res = await chaiPost(LOGIN_ROUTE, request)
				assert.equal(
					res.status,
					StatusCodes.OK,
					'must be a successfull request'
				)
				cookie = res.header['set-cookie']
			})

			afterEach(async () => {
				await chaiGetWithAuth(LOGOUT_ROUTE, cookie)
			})

			test('should fail due to user not logged in', async () => {
				const res = await chaiDelete(ROUTE + POST_ROUTE.DELETE_POST + post.id)
				validateUnauthorisedResponses(res)
			})

			test('should fail due to post not found', async () => {
				const res = await chaiDeleteWithAuth(
					ROUTE + POST_ROUTE.DELETE_POST + fakeId,
					cookie
				)
				validatePostResponse(res, ERRORS.POST_NOT_FOUND, StatusCodes.NOT_FOUND)
			})

			test('should successfully create post', async () => {
				const res = await chaiDeleteWithAuth(
					ROUTE + POST_ROUTE.DELETE_POST + post.id,
					cookie
				)
				validatePostResponse(res)
			})

			after(async () => {
				await deleteUser(user.id)
			})
		})

		suite('Like/Dislike post', () => {
			let user: UserDocument
			let post: PostDocument
			before(async () => {
				user = await createUser(userBody)
				const request = { ...postBody, authorId: user.id }
				post = await postCreate(request)
			})

			let cookie: string
			beforeEach(async () => {
				const request = {
					username: userBody.username,
					password: userBody.password,
				}
				const res = await chaiPost(LOGIN_ROUTE, request)
				assert.equal(
					res.status,
					StatusCodes.OK,
					'must be a successfull request'
				)
				cookie = res.header['set-cookie']
			})

			afterEach(async () => {
				await chaiGetWithAuth(LOGOUT_ROUTE, cookie)
			})

			test('liking post should fail due to user not logged in', async () => {
				const res = await chaiPatch(
					ROUTE + POST_ROUTE.LIKE_POST + `${user.id}/${post.id}`,
					{}
				)
				validateUnauthorisedResponses(res)
			})

			test('disliking post should fail due to user not logged in', async () => {
				const res = await chaiPatch(
					ROUTE + POST_ROUTE.DISLIKE_POST + `${user.id}/${post.id}`,
					{}
				)
				validateUnauthorisedResponses(res)
			})

			test('liking should fail due to post not found', async () => {
				const res = await chaiPatchWithAuth(
					ROUTE + POST_ROUTE.LIKE_POST + `${user.id}/${fakeId}`,
					{},
					cookie
				)
				validatePostResponse(res, ERRORS.POST_NOT_FOUND, StatusCodes.NOT_FOUND)
			})

			test('disliking should fail due to post not found', async () => {
				const res = await chaiPatchWithAuth(
					ROUTE + POST_ROUTE.DISLIKE_POST + `${user.id}/${fakeId}`,
					{},
					cookie
				)
				validatePostResponse(res, ERRORS.POST_NOT_FOUND, StatusCodes.NOT_FOUND)
			})

			test('liking should fail due to user not found', async () => {
				const res = await chaiPatchWithAuth(
					ROUTE + POST_ROUTE.LIKE_POST + `${fakeId}/${post.id}`,
					{},
					cookie
				)
				validatePostResponse(res, ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)
			})

			test('disliking should fail due to user not found', async () => {
				const res = await chaiPatchWithAuth(
					ROUTE + POST_ROUTE.DISLIKE_POST + `${fakeId}/${post.id}`,
					{},
					cookie
				)
				validatePostResponse(res, ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)
			})

			test('liking should be successfull', async () => {
				const res = await chaiPatchWithAuth(
					ROUTE + POST_ROUTE.LIKE_POST + `${user.id}/${post.id}`,
					{},
					cookie
				)
				validatePostResponse(res)
			})

			test('disliking should be successfull', async () => {
				const res = await chaiPatchWithAuth(
					ROUTE + POST_ROUTE.DISLIKE_POST + `${user.id}/${post.id}`,
					{},
					cookie
				)
				validatePostResponse(res)
			})

			after(async () => {
				await deleteUser(user.id)
			})
		})

		suite('Get Posts', () => {
			let user: UserDocument
			let post: PostDocument
			before(async () => {
				user = await createUser(userBody)
				const postRequest = { ...postBody, authorId: user.id }
				post = await postCreate(postRequest)
				const commentRequest = {
					authorId: user.id,
					postId: post.id,
					comment: commentBody,
				}
				await commentCreate(commentRequest)
			})

			test('should fail to get a single post due to invalid post id ', async () => {
				const res = await chaiGet(ROUTE + POST_ROUTE.GET_POST + fakeId)
				validatePostResponse(res, ERRORS.POST_NOT_FOUND, StatusCodes.NOT_FOUND)
			})

			test('should successfully get a single post', async () => {
				const res = await chaiGet(ROUTE + POST_ROUTE.GET_POST + post.id)
				validatePostResponse(res)
			})

			test('should fail to get a user posts due to invalid user id ', async () => {
				const res = await chaiGet(ROUTE + POST_ROUTE.GET_USER_POSTS + fakeId)
				validatePostResponse(res, ERRORS.USER_NOT_FOUND, StatusCodes.NOT_FOUND)
			})

			test('should successfully get all the posts made by an user', async () => {
				const res = await chaiGet(ROUTE + POST_ROUTE.GET_USER_POSTS + user.id)
				validatePostResponse(res)
			})

			test('should successfully get recent posts', async () => {
				const res = await chaiGet(ROUTE + POST_ROUTE.GET_POSTS)
				validatePostResponse(res)
			})

			after(async () => {
				await deleteUser(user.id)
			})
		})
	})

	describe('Comments routes', () => {
		suite('Create Comment', () => {
			let user: UserDocument
			let post: PostDocument
			before(async () => {
				user = await createUser(userBody)
				const request = { ...postBody, authorId: user.id }
				post = await postCreate(request)
			})

			let cookie: string
			beforeEach(async () => {
				const request = {
					username: userBody.username,
					password: userBody.password,
				}
				const res = await chaiPost(LOGIN_ROUTE, request)
				assert.equal(
					res.status,
					StatusCodes.OK,
					'must be a successfull request'
				)
				cookie = res.header['set-cookie']
			})

			afterEach(async () => {
				await chaiGetWithAuth(LOGOUT_ROUTE, cookie)
			})

			test('should fail due to user not logged in', async () => {
				const request = { comment: commentBody }
				const res = await chaiPost(
					ROUTE + POST_ROUTE.CREATE_COMMENT + `${user.id}/${post.id}`,
					request
				)
				validateUnauthorisedResponses(res)
			})

			test('should fail due to user not found', async () => {
				const request = { comment: commentBody }
				const res = await chaiPostWithAuth(
					ROUTE + POST_ROUTE.CREATE_COMMENT + `${fakeId}/${post.id}`,
					request,
					cookie
				)
				validateCommentResponse(
					res,
					ERRORS.USER_NOT_FOUND,
					StatusCodes.NOT_FOUND
				)
			})

			test('should fail due to post not found', async () => {
				const request = { comment: commentBody }
				const res = await chaiPostWithAuth(
					ROUTE + POST_ROUTE.CREATE_COMMENT + `${user.id}/${fakeId}`,
					request,
					cookie
				)
				validateCommentResponse(
					res,
					ERRORS.POST_NOT_FOUND,
					StatusCodes.NOT_FOUND
				)
			})

			test('should successfully create a comment', async () => {
				const request = { comment: commentBody }
				const res = await chaiPostWithAuth(
					ROUTE + POST_ROUTE.CREATE_COMMENT + `${user.id}/${post.id}`,
					request,
					cookie
				)
				validateCommentResponse(res)
			})

			after(async () => {
				await deleteUser(user.id)
			})
		})

		suite('Update Comment', () => {
			let user: UserDocument
			let post: PostDocument
			let comment: CommentDocument
			before(async () => {
				user = await createUser(userBody)
				const postRequest = { ...postBody, authorId: user.id }
				post = await postCreate(postRequest)
				const commentRequest = {
					comment: commentBody,
					authorId: user.id,
					postId: post.id,
				}
				comment = await commentCreate(commentRequest)
			})

			let cookie: string
			beforeEach(async () => {
				const request = {
					username: userBody.username,
					password: userBody.password,
				}
				const res = await chaiPost(LOGIN_ROUTE, request)
				assert.equal(
					res.status,
					StatusCodes.OK,
					'must be a successfull request'
				)
				cookie = res.header['set-cookie']
			})

			afterEach(async () => {
				await chaiGetWithAuth(LOGOUT_ROUTE, cookie)
			})

			test('should fail due to user not logged in', async () => {
				const request = { comment: updatedCommentBody }
				const res = await chaiPatch(
					ROUTE + POST_ROUTE.UPDATE_COMMENT + comment.id,
					request
				)
				validateUnauthorisedResponses(res)
			})

			test('should fail due to comment not found', async () => {
				const request = { comment: updatedCommentBody }
				const res = await chaiPatchWithAuth(
					ROUTE + POST_ROUTE.UPDATE_COMMENT + fakeId,
					request,
					cookie
				)
				validateCommentResponse(
					res,
					ERRORS.COMMENT_NOT_FOUND,
					StatusCodes.NOT_FOUND
				)
			})

			test('should successfully update a comment', async () => {
				const request = { comment: updatedCommentBody }
				const res = await chaiPatchWithAuth(
					ROUTE + POST_ROUTE.UPDATE_COMMENT + comment.id,
					request,
					cookie
				)
				validateCommentResponse(res)
			})

			after(async () => {
				await deleteUser(user.id)
			})
		})

		suite('Delete Comment', () => {
			let user: UserDocument
			let post: PostDocument
			let comment: CommentDocument
			before(async () => {
				user = await createUser(userBody)
				const postRequest = { ...postBody, authorId: user.id }
				post = await postCreate(postRequest)
				const commentRequest = {
					comment: commentBody,
					authorId: user.id,
					postId: post.id,
				}
				comment = await commentCreate(commentRequest)
			})

			let cookie: string
			beforeEach(async () => {
				const request = {
					username: userBody.username,
					password: userBody.password,
				}
				const res = await chaiPost(LOGIN_ROUTE, request)
				assert.equal(
					res.status,
					StatusCodes.OK,
					'must be a successfull request'
				)
				cookie = res.header['set-cookie']
			})

			afterEach(async () => {
				await chaiGetWithAuth(LOGOUT_ROUTE, cookie)
			})

			test('should fail due to user not logged in', async () => {
				const res = await chaiDelete(
					ROUTE + POST_ROUTE.DELETE_COMMENT + comment.id
				)
				validateUnauthorisedResponses(res)
			})

			test('should fail due to comment not found', async () => {
				const res = await chaiDeleteWithAuth(
					ROUTE + POST_ROUTE.DELETE_COMMENT + fakeId,
					cookie
				)
				validateCommentResponse(
					res,
					ERRORS.COMMENT_NOT_FOUND,
					StatusCodes.NOT_FOUND
				)
			})

			test('should successfully delete the comment', async () => {
				const res = await chaiDeleteWithAuth(
					ROUTE + POST_ROUTE.DELETE_COMMENT + comment.id,
					cookie
				)
				validateCommentResponse(res)
			})

			after(async () => {
				await deleteUser(user.id)
			})
		})

		suite('Like/Dislike Comment', () => {
			let user: UserDocument
			let post: PostDocument
			let comment: CommentDocument
			before(async () => {
				user = await createUser(userBody)
				const postRequest = { ...postBody, authorId: user.id }
				post = await postCreate(postRequest)
				const commentRequest = {
					postId: post.id,
					authorId: user.id,
					comment: commentBody,
				}
				comment = await commentCreate(commentRequest)
			})

			let cookie: string
			beforeEach(async () => {
				const request = {
					username: userBody.username,
					password: userBody.password,
				}
				const res = await chaiPost(LOGIN_ROUTE, request)
				assert.equal(
					res.status,
					StatusCodes.OK,
					'must be a successfull request'
				)
				cookie = res.header['set-cookie']
			})

			afterEach(async () => {
				await chaiGetWithAuth(LOGOUT_ROUTE, cookie)
			})

			test('liking comment should fail due to user not logged in', async () => {
				const res = await chaiPatch(
					ROUTE + POST_ROUTE.LIKE_COMMENT + `${user.id}/${comment.id}`,
					{}
				)
				validateUnauthorisedResponses(res)
			})

			test('disliking comment should fail due to user not logged in', async () => {
				const res = await chaiPatch(
					ROUTE + POST_ROUTE.DISLIKE_COMMENT + `${user.id}/${comment.id}`,
					{}
				)
				validateUnauthorisedResponses(res)
			})

			test('liking should fail due to comment not found', async () => {
				const res = await chaiPatchWithAuth(
					ROUTE + POST_ROUTE.LIKE_COMMENT + `${user.id}/${fakeId}`,
					{},
					cookie
				)
				validateCommentResponse(
					res,
					ERRORS.COMMENT_NOT_FOUND,
					StatusCodes.NOT_FOUND
				)
			})

			test('disliking should fail due to comment not found', async () => {
				const res = await chaiPatchWithAuth(
					ROUTE + POST_ROUTE.DISLIKE_COMMENT + `${user.id}/${fakeId}`,
					{},
					cookie
				)
				validateCommentResponse(
					res,
					ERRORS.COMMENT_NOT_FOUND,
					StatusCodes.NOT_FOUND
				)
			})

			test('liking should fail due to user not found', async () => {
				const res = await chaiPatchWithAuth(
					ROUTE + POST_ROUTE.LIKE_COMMENT + `${fakeId}/${comment.id}`,
					{},
					cookie
				)
				validateCommentResponse(
					res,
					ERRORS.USER_NOT_FOUND,
					StatusCodes.NOT_FOUND
				)
			})

			test('disliking should fail due to user not found', async () => {
				const res = await chaiPatchWithAuth(
					ROUTE + POST_ROUTE.DISLIKE_COMMENT + `${fakeId}/${comment.id}`,
					{},
					cookie
				)
				validateCommentResponse(
					res,
					ERRORS.USER_NOT_FOUND,
					StatusCodes.NOT_FOUND
				)
			})

			test('liking should be successfull', async () => {
				const res = await chaiPatchWithAuth(
					ROUTE + POST_ROUTE.LIKE_COMMENT + `${user.id}/${comment.id}`,
					{},
					cookie
				)
				validateCommentResponse(res)
			})

			test('disliking should be successfull', async () => {
				const res = await chaiPatchWithAuth(
					ROUTE + POST_ROUTE.DISLIKE_COMMENT + `${user.id}/${comment.id}`,
					{},
					cookie
				)
				validateCommentResponse(res)
			})

			after(async () => {
				await deleteUser(user.id)
			})
		})
	})

	const validatePostResponse = (
		res: ResponseType,
		message?: ERRORS,
		status?: StatusCodes
	) => {
		if (message && status) {
			assert.equal(res.status, status, `response status must be ${status}`)
			assert.equal(res.type, 'application/json', 'response type must be json')
			assert.isObject(res.body, 'response body must be an object')
			assert.property(
				res.body,
				'success',
				'response body must have a success property'
			)
			assert.property(res.body, 'msg', 'response body must have a msg property')
			assert.isFalse(res.body.success, 'success must be false')
			assert.equal(res.body.msg, message, `msg must be ${message}`)
		} else {
			assert.equal(
				res.status,
				StatusCodes.OK,
				`response status must be ${StatusCodes.OK}`
			)
			assert.equal(res.type, 'application/json', 'response type must be json')
			assert.isObject(res.body, 'response body must be an object')
			assert.property(
				res.body,
				'success',
				'response body must have a success property'
			)
			assert.isTrue(res.body.success, 'success must be true')
			if (res.body.post) validatePost(res.body.post as PostDocument)
			else if (res.body.posts) {
				assert.isArray(res.body.posts, 'posts must be an array')
				validatePost(res.body.posts[0] as PostDocument)
			}
		}
	}

	const validateCommentResponse = (
		res: ResponseType,
		message?: ERRORS,
		status?: StatusCodes
	) => {
		if (message && status) {
			assert.equal(res.status, status, `response status must be ${status}`)
			assert.equal(res.type, 'application/json', 'response type must be json')
			assert.isObject(res.body, 'response body must be an object')
			assert.property(
				res.body,
				'success',
				'response body must have a success property'
			)
			assert.property(res.body, 'msg', 'response body must have a msg property')
			assert.isFalse(res.body.success, 'success must be false')
			assert.equal(res.body.msg, message, `msg must be ${message}`)
		} else {
			assert.equal(
				res.status,
				StatusCodes.OK,
				`response status must be ${StatusCodes.OK}`
			)
			assert.equal(res.type, 'application/json', 'response type must be json')
			assert.isObject(res.body, 'response body must be an object')
			assert.property(
				res.body,
				'success',
				'response body must have a success property'
			)
			assert.isTrue(res.body.success, 'success must be true')
		}
	}

	const validatePost = (post: PostDocument) => {
		if (!post || !post.comments || !post.commentCount)
			return assert.fail('missing post or invalid post')

		assert.isObject(post, 'post must be an object')
		assert.property(post, '_id', 'post must have an id property')
		assert.property(post, 'title', 'post must have a title property')
		assert.property(post, 'post', 'post must have a post property')
		assert.property(post, 'keys', 'post must have a keys property')
		assert.property(post, 'authorId', 'post must have an authorId property')
		assert.property(post, 'createdAt', 'post must have a createdAt property')
		assert.property(post, 'updatedAt', 'post must have an updatedAt property')
		assert.property(post, 'likes', 'post must have a likes property')
		assert.property(post, 'dislikes', 'post must have a dislikes property')
		assert.property(post, 'likers', 'post must have a likers property')
		assert.property(post, 'dislikers', 'post must have a dislikers property')
		assert.property(post, 'comments', 'post must have a comments property')
		assert.property(
			post,
			'commentCount',
			'post must have a commentCount property'
		)
		assert.isArray(post.comments, 'comments must be an array')
		assert.equal(
			post.comments.length,
			post.commentCount,
			'comments length must be the same as the comment count'
		)
		const comment = post.comments[0]
		assert.isObject(comment, 'comment must be an object')
		assert.property(comment, '_id', 'comments must have an _id property')
		assert.property(
			comment,
			'authorId',
			'comments must have an authorId property'
		)
		assert.property(comment, 'postId', 'comments must have a postId property')
		assert.property(comment, 'comment', 'comments must have a comment property')
		assert.property(comment, 'likes', 'comments must have a likes property')
		assert.property(
			comment,
			'dislikes',
			'comments must have a dislikes property'
		)
		assert.property(comment, 'likers', 'comments must have a likers property')
		assert.property(
			comment,
			'dislikers',
			'comments must have a dislikers property'
		)
	}

	const validateUnauthorisedResponses = (res: ResponseType) => {
		assert.equal(
			res.status,
			StatusCodes.UNAUTHORIZED,
			'response status must be 401'
		)
		assert.equal(res.type, 'application/json', 'response type must be json')
		assert.isObject(res.body, 'response body must be an object')
		assert.property(
			res.body,
			'success',
			'response body must have a success property'
		)
		assert.property(res.body, 'msg', 'response body must have a msg property')
		assert.isFalse(res.body.success, 'success must be false')
		assert.equal(
			res.body.msg,
			ERRORS.UNAUTHORIZED,
			`msg must be ${ERRORS.UNAUTHORIZED}`
		)
	}
})
