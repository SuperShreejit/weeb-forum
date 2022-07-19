import { describe, test, suite, before, after } from 'mocha'
import { assert } from '../services/chai.services'
import { UserDocument } from '../models/User'
import { createUser, deleteUser } from '../services/user.services'
import { PostDocument } from '../models/Post'
import { postCreate } from '../services/post.services'
import { CommentDocument } from '../models/Comment'
import { Types } from 'mongoose'
import chai from 'chai'
import chaiHttp from 'chai-http'
import {
	userBody,
	commentBody,
	postBody,
} from '../constants/PostCommentServiceTest'
import {
	commentCreate,
	editComment,
	findCommentById,
	findSingleComment,
	removeComment,
	CommentBody,
	dislikeCommentService,
	likeCommentService,
} from '../services/comment.services'

chai.use(chaiHttp)

describe('Comment services', () => {
	suite('Create Comment', () => {
		let user: UserDocument
		let post: PostDocument
		before(async () => {
			user = await createUser(userBody)
			post = await postCreate({ ...postBody, authorId: user.id })
		})

		test('should create a comment', async () => {
			const request = {
				authorId: user.id,
				postId: post.id,
				comment: commentBody,
			}
			const comment = await commentCreate(request)
			validateComment(comment, request)
		})

		after(async () => {
			await deleteUser(user.id)
		})
	})

	suite('Update Comment', () => {
		let user: UserDocument
		let post: PostDocument
		let comment: CommentDocument
		let body: CommentBody
		before(async () => {
			user = await createUser(userBody)
			post = await postCreate({ ...postBody, authorId: user.id })
			body = { authorId: user.id, postId: post.id, comment: commentBody }
			comment = await commentCreate(body)
		})

		test('should be able to update a comment', async () => {
			const request = { ...body, comment: 'updatedComment' }
			const updated_comment = await editComment(comment.id, request)
			validateComment(updated_comment, request)
		})

		after(async () => {
			await deleteUser(user.id)
		})
	})

	suite('Find Comment', () => {
		let user: UserDocument
		let post: PostDocument
		let comment: CommentDocument
		let body: CommentBody
		before(async () => {
			user = await createUser(userBody)
			post = await postCreate({ ...postBody, authorId: user.id })
			body = { authorId: user.id, postId: post.id, comment: commentBody }
			comment = await commentCreate(body)
		})

		test('should be able to find a comment by Id', async () => {
			const comment_found = await findCommentById(comment.id)
			validateComment(comment_found, body)
		})

		test('should be able to find a comment by query', async () => {
			const comment_found = await findSingleComment({ postId: post.id })
			validateComment(comment_found, body)
		})

		after(async () => {
			await deleteUser(user.id)
		})
	})

	suite('Delete Comment', () => {
		let user: UserDocument
		let post: PostDocument
		let comment: CommentDocument
		let body: CommentBody
		before(async () => {
			user = await createUser(userBody)
			post = await postCreate({ ...postBody, authorId: user.id })
			body = { authorId: user.id, postId: post.id, comment: commentBody }
			comment = await commentCreate(body)
		})

		test('should be able to delete comment', async () => {
			await removeComment(comment.id)
			const comment_found = await findCommentById(comment.id)
			assert.isNull(comment_found, 'Comment should be null after deletion')
		})

		after(async () => {
			await deleteUser(user.id)
		})
	})

	suite('Like Comment', () => {
		let user: UserDocument
		let post: PostDocument
		let comment: CommentDocument
		let body: CommentBody
		before(async () => {
      user = await createUser(userBody)
			post = await postCreate({ ...postBody, authorId: user.id })
			body = { authorId: user.id, postId: post.id, comment: commentBody }
			comment = await commentCreate(body)
		})
    
		test('should be able to register a user as a liker', async () => {
      const likedComment = await likeCommentService(comment.id, user.id)
			validateLikedComment(likedComment, user.id)
		})
    
    test('should be able to de-register the same user as a liker on double liking', async () => {
      const likedComment = await likeCommentService(comment.id, user.id)
			validateNeutralComment(likedComment, user.id)
		})
    
		test('should be able to register the same user as a disliker and then re-register as a liker', async () => {
      await dislikeCommentService(comment.id, user.id)
			const likedComment = await likeCommentService(comment.id, user.id)
			validateLikedComment(likedComment, user.id)
		})

		after(async () => {
			await deleteUser(user.id)
		})
	})

	suite('Dislike Comment', () => {
		let user: UserDocument
		let post: PostDocument
		let comment: CommentDocument
		let body: CommentBody
		before(async () => {
			user = await createUser(userBody)
			post = await postCreate({ ...postBody, authorId: user.id })
			body = { authorId: user.id, postId: post.id, comment: commentBody }
			comment = await commentCreate(body)
    })
    
		test('should be able to register a user as a disliker', async () => {
			const dislikedComment = await dislikeCommentService(comment.id, user.id)
			validateDislikedComment(dislikedComment, user.id)
		})

		test('should be able to de-register the same user as a disliker on double disliking', async () => {
			const dislikedComment = await dislikeCommentService(comment.id, user.id)
			validateNeutralComment(dislikedComment, user.id)
		})

		test('should be able to register the same user as a liker and then re-register as a disliker', async () => {
			await likeCommentService(comment.id, user.id)
      const dislikedComment = await dislikeCommentService(comment.id, user.id)
			validateDislikedComment(dislikedComment, user.id)
		})

		after(async () => {
			await deleteUser(user.id)
		})
	})

	const validateComment = (
		Comment: CommentDocument | null,
		body: CommentBody
	) => {
		if (!Comment) return assert.fail('Missing comment')
		assert.isObject(Comment, 'Comment must be an object')
		assert.property(Comment, '_id', 'comment must have an id property')
		assert.property(
			Comment,
			'authorId',
			'comment must have an authorId property'
		)
		assert.property(Comment, 'postId', 'comment must have a postId property')
		assert.property(Comment, 'comment', 'comment must have a comment property')
		assert.property(Comment, 'likes', 'comment must have a likes property')
		assert.property(Comment, 'likers', 'comment must have a likers property')
		assert.property(
			Comment,
			'dislikes',
			'comment must have a dislikes property'
		)
		assert.property(
			Comment,
			'dislikers',
			'comment must have a dislikers property'
		)
		const { authorId, postId, comment, likes, dislikes, likers, dislikers } =
			Comment
		assert.equal(authorId, body.authorId, 'authorIds must match')
		assert.equal(postId, body.postId, 'postIds must match')
		assert.equal(comment, body.comment, 'comments must match')
		assert.equal(likes, 0, 'likes must be zero')
		assert.equal(dislikes, 0, 'dislikes must be zero')
		assert.isEmpty(dislikers, 'dislikers must be empty')
		assert.isEmpty(likers, 'likers must be empty')
	}

	type CommentType = Awaited<
		ReturnType<typeof likeCommentService | typeof dislikeCommentService>
	>
	const validateLikedComment = (
		Comment: CommentType,
		userId: Types.ObjectId
	) => {
		if (!Comment) return assert.fail('There is no comment')
		assert.equal(Comment.likes, 1, 'likes must be incremented by one')
		assert.equal(Comment.dislikes, 0, 'dislikes must be zero')
		assert.include(
			Comment.likers,
			userId,
			'userid must be inside the likers array'
		)
		assert.isEmpty(Comment.dislikers, 'dislikers must be empty')
	}

	const validateDislikedComment = (
		Comment: CommentType,
		userId: Types.ObjectId
	) => {
		if (!Comment) return assert.fail('There is no comment')
		assert.equal(Comment.dislikes, 1, 'dislikes must be incremented by one')
		assert.equal(Comment.likes, 0, 'likes must be zero')
		assert.include(
			Comment.dislikers,
			userId,
			'userid must be inside the disikers array'
		)
		assert.isEmpty(Comment.likers, 'likers must be empty')
	}

	const validateNeutralComment = (
		Comment: CommentType,
		userId: Types.ObjectId
	) => {
		if (!Comment) return assert.fail('There is no comment')
		assert.equal(Comment.dislikes, 0, 'dislikes must be zero')
		assert.equal(Comment.likes, 0, 'likes must be zero')
		assert.isEmpty(Comment.dislikers, 'dislikers must be empty')
		assert.isEmpty(Comment.likers, 'likers must be empty')
	}
})
