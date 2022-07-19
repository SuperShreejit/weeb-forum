import { STRATEGY } from './misc'

export const userBody = {
	name: 'test_name',
	username: 'test@username',
	email: 'test_email@email.com',
	authType: STRATEGY.LOCAL,
	authId: 'test_auth',
	password: 'Abcd@1234',
	verified: true
}
Object.freeze(userBody)

export enum POST_ROUTE {
	CREATE_POST = '/create-post/',
	CREATE_COMMENT = '/create-comment/',
	UPDATE_POST = '/update-post/',
	UPDATE_COMMENT = '/update-comment/',
	DELETE_POST = '/delete-post/',
	DELETE_COMMENT = '/delete-comment/',
	GET_POST = '/',
	GET_POSTS = '/',
	GET_USER_POSTS = '/user/',
	LIKE_POST = '/like-post/',
	DISLIKE_POST = '/dislike-post/',
	LIKE_COMMENT = '/like-comment/',
	DISLIKE_COMMENT = '/dislike-comment/',
}

export const postBody = {
	title: 'test title',
	post: 'This is a test post',
	keys: ['#test', '#first-post'],
}
Object.freeze(postBody)

export const updatedPostBody = {
	title: 'updated title',
	post: 'This is an updated Post',
	keys: ['#test', '#updatedPost']
}
Object.freeze(updatedPostBody)

export const commentBody = 'This is a test comment'

export const updatedCommentBody = 'This is an updated test Comment'

export const fakeId = '1234567890abcdef12345678'