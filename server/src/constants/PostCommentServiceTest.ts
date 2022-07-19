import { STRATEGY } from './misc'

export const userBody = {
	name: 'test_name',
	username: 'test_username',
	email: 'test@email.com',
	authType: STRATEGY.LOCAL,
	password: 'password',
}
Object.freeze(userBody)

export const postBody = {
	title: 'test_title',
	post: 'This is a test post common',
	keys: ['#first', '#test'],
}
Object.freeze(postBody)

export const commentBody = 'test_comment'

export const post_bodies = [
	{
		title: 'test_title1',
		post: 'This is a test post1',
		keys: ['#first', '#test'],
	},
	{
		title: 'test_title2',
		post: 'This is a test post2',
		keys: ['#first', '#test'],
	},
	{
		title: 'test_title3',
		post: 'This is a test post3',
		keys: ['#first', '#test'],
	},
]