import { describe, test, suite, before, after } from 'mocha'
import { assert } from '../services/chai.services'
import { UserDocument } from '../models/User'
import { createUser, deleteUser } from '../services/user.services'
import { PostDocument } from '../models/Post'
import { commentCreate } from '../services/comment.services'
import { Types } from 'mongoose'
import chai from 'chai'
import chaiHttp from 'chai-http'
import {
	userBody,
	commentBody,
	postBody,
	post_bodies,
} from '../constants/PostCommentServiceTest'
import {
	PostBodyType,
	dislikePostService,
	editPost,
	findPostById,
	findPostWithComments,
	findPostsByUser,
	findRecentPosts,
	findSinglePost,
	likePostService,
	postCreate,
	removePost,
} from '../services/post.services'

chai.use(chaiHttp)

describe('Post services', () => {
	suite('Create Post', () => {
		let user: UserDocument
		before(async () => {
			user = await createUser(userBody)
		})

		test('should create a post', async () => {
			const request = { ...postBody, authorId: user.id }
			const post = await postCreate(request)
			validatePost(post, request)
		})

		after(async () => await deleteUser(user.id))
	})

	suite('Edit Post', () => {
		let user: UserDocument
		let post: PostDocument
		let body: PostBodyType
		before(async () => {
			user = await createUser(userBody)
			body = { ...postBody, authorId: user.id }
			post = await postCreate(body)
		})

		test('should update a post', async () => {
			const update = { ...postBody, authorId: user.id, post: 'update_post' }
			const updated_post = await editPost(post.id, update)
			validatePost(updated_post, update)
		})

		after(async () => await deleteUser(user.id))
	})

	suite('Find Single Post', () => {
		let user: UserDocument
		let post: PostDocument
		let body: PostBodyType
		before(async () => {
			user = await createUser(userBody)
			body = { ...postBody, authorId: user.id }
			post = await postCreate(body)
		})

		test('should find a post by id', async () => {
			const post_found = await findPostById(post.id)
			validatePost(post_found, body)
		})

		test('should find a post by query', async () => {
			const post_found = await findSinglePost({ authorId: user.id })
			validatePost(post_found, body)
		})

		test('should find post with comments', async () => {
			const CommentBody = {
				authorId: user.id,
				postId: post.id,
				comment: commentBody,
			}
			await commentCreate(CommentBody)
			const post_found = await findPostWithComments(post.id)
			validatePostWithComments(post_found, body)
		})

		after(async () => await deleteUser(user.id))
	})

	suite('Delete Post', () => {
		let user: UserDocument
		let post: PostDocument
		let body: PostBodyType
		before(async () => {
			user = await createUser(userBody)
			body = { ...postBody, authorId: user.id }
			post = await postCreate(body)
		})

		test('should delete a post', async () => {
			await removePost(post.id)
			const post_found = await findPostById(post.id)
			assert.isNull(post_found, 'post must be null after deletion')
		})

		after(async () => await deleteUser(user.id))
	})

	suite('Find multiple Posts', () => {
		let user1: UserDocument
		let user2: UserDocument
		let body: PostBodyType
		before(async () => {
			user1 = await createUser(userBody)
			user2 = await createUser(userBody)
			for (const postBody of post_bodies) {
				body = { ...postBody, authorId: user1.id }
				const post = await postCreate(body)
				const CommentBody = {
					postId: post.id,
					authorId: user1.id,
					comment: commentBody,
				}
				await commentCreate(CommentBody)
			}
			for (const postBody of post_bodies) {
				body = { ...postBody, authorId: user2.id }
				const post = await postCreate(body)
				const CommentBody = {
					postId: post.id,
					authorId: user2.id,
					comment: commentBody,
				}
				await commentCreate(CommentBody)
			}
		})

		test('should get posts with comments for a single user', async () => {
			const posts_found = await findPostsByUser(user1.id)
			assert.equal(posts_found.length, 3, 'number of post must be 3')
			posts_found.forEach(post => {
				assert.equal(post.authorId, user1.id, 'userIds must match')
				assert.equal(
					post.commentCount,
					post.comments.length,
					'each post must have one comment'
				)
				assert.equal(post.commentCount, 1, 'each post must have one comment')
			})
		})

		test('should get posts with comments for both users', async () => {
			const posts_found = await findRecentPosts()
			assert.isAtLeast(posts_found.length, 6, 'number of post must be at least 6')
			posts_found.forEach(post => {
				assert.equal(
					post.commentCount,
					post.comments.length,
					'each post must have one comment'
				)
			})
		})

		after(async () => {
			await deleteUser(user1.id)
			await deleteUser(user2.id)
		})
	})

	suite('Like Post', () => {
		let user: UserDocument
		let post: PostDocument
		let body: PostBodyType
		before(async () => {
			user = await createUser(userBody)
			body = { ...postBody, authorId: user.id }
			post = await postCreate(body)
		})

		test('should be able to register user as a liker', async () => {
			const likedPost = await likePostService(post.id, user.id)
			validateLikedPost(likedPost, user.id)
		})

		test('should be able to de-register user as a liker for double liking', async () => {
			const likedPost = await likePostService(post.id, user.id)
			validateNeutralPost(likedPost)
		})

		test('should be able to register user as a liker after being registered as a disliker', async () => {
			await dislikePostService(post.id, user.id)
			const likedPost = await likePostService(post.id, user.id)
			validateLikedPost(likedPost, user.id)
		})

		after(async () => await deleteUser(user.id))
	})

	suite('Dislike Post', () => {
		let user: UserDocument
		let post: PostDocument
		let body: PostBodyType
		before(async () => {
			user = await createUser(userBody)
			body = { ...postBody, authorId: user.id }
			post = await postCreate(body)
		})

		test('should be able to register user as a disliker', async () => {
			const dislikedPost = await dislikePostService(post.id, user.id)
			validateDislikedPost(dislikedPost, user.id)
		})

		test('should be able to de-register user as a disliker for double disliking', async () => {
			const dislikedPost = await dislikePostService(post.id, user.id)
			validateNeutralPost(dislikedPost)
		})

		test('should be able to register user as a disliker after being registered as a liker', async () => {
			await likePostService(post.id, user.id)
			const dislikedPost = await dislikePostService(post.id, user.id)
			validateDislikedPost(dislikedPost, user.id)
		})

		after(async () => await deleteUser(user.id))
	})

	type PostType = Awaited<
		ReturnType<
			| typeof postCreate
			| typeof editPost
			| typeof findPostById
			| typeof findSinglePost
		>
	>
	const validatePost = (Post: PostType, body: PostBodyType) => {
		if (!Post) return assert.fail('no post was found!')

		assert.isObject(Post, 'must be a object')
		assert.property(Post, '_id', 'posts must have an id property')
		assert.property(Post, 'authorId', 'posts must have an authorId property')
		assert.property(Post, 'title', 'posts must have a title property')
		assert.property(Post, 'post', 'posts must have a post property')
		assert.property(Post, 'keys', 'posts must have a keys property')
		assert.property(Post, 'likes', 'posts must have a likes property')
		assert.property(Post, 'dislikes', 'posts must have a dislikes property')
		assert.property(Post, 'likers', 'posts must have a likers property')
		assert.property(Post, 'dislikers', 'posts must have a dislikers property')
		assert.property(Post, 'comments', 'posts must have a comments property')
		assert.property(
			Post,
			'commentCount',
			'posts must have a commentCount property'
		)
		const {
			authorId,
			post,
			title,
			keys,
			likes,
			likers,
			dislikes,
			dislikers,
			comments,
			commentCount,
		} = Post
		assert.equal(authorId, body.authorId, 'authorIds must match')
		assert.equal(title, body.title, 'titles must match')
		assert.equal(post, body.post, 'posts must match')
		assert.deepEqual(keys, body.keys, 'keys must match')
		assert.equal(likes, 0, 'likes must be zero')
		assert.equal(dislikes, 0, 'dislikes must be zero')
		assert.equal(commentCount, 0, 'commentCount must be zero')
		assert.isEmpty(likers, 'likers must be empty')
		assert.isEmpty(dislikers, 'dislikers must be empty')
		assert.isEmpty(comments, 'comments must be empty')
	}

	type PostWithCommentsType = Awaited<ReturnType<typeof findPostWithComments>>
	const validatePostWithComments = (
		Post: PostWithCommentsType,
		body: PostBodyType
	) => {
		if (!Post) return assert.fail('no post was found!')

		assert.isObject(Post, 'must be a object')
		assert.property(Post, '_id', 'posts must have an id property')
		assert.property(Post, 'authorId', 'posts must have an authorId property')
		assert.property(Post, 'title', 'posts must have a title property')
		assert.property(Post, 'post', 'posts must have a post property')
		assert.property(Post, 'keys', 'posts must have a keys property')
		assert.property(Post, 'likes', 'posts must have a likes property')
		assert.property(Post, 'dislikes', 'posts must have a dislikes property')
		assert.property(Post, 'likers', 'posts must have a likers property')
		assert.property(Post, 'dislikers', 'posts must have a dislikers property')
		assert.property(Post, 'comments', 'posts must have a comments property')
		assert.property(
			Post,
			'commentCount',
			'posts must have a commentCount property'
		)
		const {
			authorId,
			post,
			title,
			keys,
			likes,
			likers,
			dislikes,
			dislikers,
			comments,
			commentCount,
		} = Post
		assert.equal(authorId, body.authorId, 'authorIds must match')
		assert.equal(title, body.title, 'titles must match')
		assert.equal(post, body.post, 'posts must match')
		assert.deepEqual(keys, body.keys, 'keys must match')
		assert.equal(likes, 0, 'likes must be zero')
		assert.equal(dislikes, 0, 'dislikes must be zero')
		assert.isEmpty(likers, 'likers must be empty')
		assert.isEmpty(dislikers, 'dislikers must be empty')
		assert.isArray(comments, 'comments must be an array')
		assert.equal(
			commentCount,
			comments.length,
			'commentCount must be equal to comments length'
		)
		if (comments.length > 0) {
			const comment = comments[0]
			assert.equal(
				comment.postId,
				Post.id,
				'postId of comment must be this post id'
			)
		}
	}

	const validateLikedPost = (Post: PostType, userId: Types.ObjectId) => {
		if (!Post || !Post.likers) return assert.fail('post is null')

		assert.equal(Post.likes, 1, 'likes must be incremented by one')
		assert.equal(Post.dislikes, 0, 'dislikes must be zero')
		assert.isEmpty(Post.dislikers, 'dislikers must be empty')
		assert.include(
			Post.likers,
			userId,
			'userid must be inside the disikers array'
		)
	}
	const validateDislikedPost = (Post: PostType, userId: Types.ObjectId) => {
		if (!Post || !Post.dislikers) return assert.fail('post is null')

		assert.equal(Post.dislikes, 1, 'dislikes must be incremented by one')
		assert.equal(Post.likes, 0, 'likes must be zero')
		assert.isEmpty(Post.likers, 'likers must be empty')
		assert.include(
			Post.dislikers,
			userId,
			'userid must be inside the disikers array'
		)
	}
	const validateNeutralPost = (Post: PostType) => {
		if (!Post) return assert.fail('post is null')

		assert.equal(Post.likes, 0, 'likes must be zero')
		assert.equal(Post.dislikes, 0, 'dislikes must be zero')
		assert.isEmpty(Post.likers, 'likers must be empty')
		assert.isEmpty(Post.dislikers, 'dislikers must be empty')
	}
})
