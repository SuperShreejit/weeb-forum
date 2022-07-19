import { Router } from 'express'
import ROUTES from '../constants/routes'
import validateRequest from '../middlewares/validator'
import isAuthenticated from '../middlewares/authenticator'
import {
	createCommentSchema,
	createPostSchema,
	updateCommentSchema,
	updatePostSchema,
	postLikeSchema,
	postDislikeSchema,
	commentLikeSchema,
	commentDislikeSchema,
	deletePostSchema,
	deleteCommentSchema,
	getPostSchema,
	getUserPostsSchema,
} from '../validators/posts.validator'
import {
	createComment,
	createPost,
	deleteComment,
	deletePost,
	dislikeComment,
	dislikePost,
	getPost,
	getPosts,
	getUserPosts,
	likeComment,
	likePost,
	updateComment,
	updatePost,
} from '../controllers/posts.controller'

const router = Router()

router
	.route(ROUTES.CREATE_POST)
	.post(validateRequest(createPostSchema), isAuthenticated, createPost)

router
	.route(ROUTES.CREATE_COMMENT)
	.post(validateRequest(createCommentSchema), isAuthenticated, createComment)

router
	.route(ROUTES.UPDATE_POST)
	.patch(validateRequest(updatePostSchema), isAuthenticated, updatePost)

router
	.route(ROUTES.UPDATE_COMMENT)
	.patch(validateRequest(updateCommentSchema), isAuthenticated, updateComment)

router
	.route(ROUTES.LIKE_POST)
	.patch(validateRequest(postLikeSchema), isAuthenticated, likePost)

router
	.route(ROUTES.DISLIKE_POST)
	.patch(validateRequest(postDislikeSchema), isAuthenticated, dislikePost)

router
	.route(ROUTES.LIKE_COMMENT)
	.patch(validateRequest(commentLikeSchema), isAuthenticated, likeComment)

router
	.route(ROUTES.DISLIKE_COMMENT)
	.patch(validateRequest(commentDislikeSchema), isAuthenticated, dislikeComment)

router
	.route(ROUTES.DELETE_POST)
	.delete(validateRequest(deletePostSchema), isAuthenticated, deletePost)

router
	.route(ROUTES.DELETE_COMMENT)
	.delete(validateRequest(deleteCommentSchema), isAuthenticated, deleteComment)

router.route(ROUTES.GET_POSTS).get(getPosts)
	
router.route(ROUTES.GET_POST).get(validateRequest(getPostSchema), getPost)

router
	.route(ROUTES.GET_USER_POSTS)
	.get(validateRequest(getUserPostsSchema), getUserPosts)

export default router
