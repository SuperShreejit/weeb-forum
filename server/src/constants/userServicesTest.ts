import { STRATEGY } from './misc'

export const body = {
	name: 'test_name',
	username: 'test_name',
	email: 'test@email.com',
	authType: STRATEGY.LOCAL,
	authId: 'testauth',
	password: 'password',
}
Object.freeze(body)

export const userBody = {
	name: 'test_name',
	username: 'test_username',
	email: 'test@email.com',
	password: 'password',
	authType: STRATEGY.LOCAL,
}
Object.freeze(userBody)

export const body_verified = {
	name: 'test_name_verified',
	username: 'test_name_verified',
	email: 'test_verified@email.com',
	authType: STRATEGY.LOCAL,
	authId: 'testauth_verified',
	password: 'password_verified',
	verified: true,
}
Object.freeze(body_verified)

export const body_google = {
	name: 'test_name_google',
	username: 'test_name_google',
	email: 'test_google@email.com',
	authType: STRATEGY.GOOGLE,
	authId: 'testauth_google',
	password: 'password_google',
	verified: true,
}
Object.freeze(body_google)

export const bodies = [
	{
		name: 'test_name1',
		username: 'test_name1',
		email: 'test1@email.com',
		authType: STRATEGY.LOCAL,
		authId: 'testauth1',
		password: 'password1',
	},
	{
		name: 'test_name2',
		username: 'test_name2',
		email: 'test2@email.com',
		authType: STRATEGY.LOCAL,
		authId: 'testauth2',
		password: 'password2',
	},
	{
		name: 'test_name3',
		username: 'test_name3',
		email: 'test3@email.com',
		authType: STRATEGY.LOCAL,
		authId: 'testauth3',
		password: 'password3',
	},
	{
		name: 'test_name4',
		username: 'test_name4',
		email: 'test4@email.com',
		authType: STRATEGY.LOCAL,
		authId: 'testauth4',
		password: 'password4',
	},
	{
		name: 'test_name5',
		username: 'test_name5',
		email: 'test5@email.com',
		authType: STRATEGY.LOCAL,
		authId: 'testauth5',
		password: 'password5',
	},
	{
		name: 'test_name6',
		username: 'test_name6',
		email: 'test6@email.com',
		authType: STRATEGY.LOCAL,
		authId: 'testauth6',
		password: 'password6',
	},
	{
		name: 'test_name7',
		username: 'test_name7',
		email: 'test7@email.com',
		authType: STRATEGY.LOCAL,
		authId: 'testauth7',
		password: 'password7',
	},
	{
		name: 'test_name8',
		username: 'test_name8',
		email: 'test8@email.com',
		authType: STRATEGY.LOCAL,
		authId: 'testauth8',
		password: 'password8',
	},
	{
		name: 'test_name9',
		username: 'test_name9',
		email: 'test9@email.com',
		authType: STRATEGY.LOCAL,
		authId: 'testauth9',
		password: 'password9',
	},
	{
		name: 'test_name10',
		username: 'test_name10',
		email: 'test10@email.com',
		authType: STRATEGY.LOCAL,
		authId: 'testauth10',
		password: 'password10',
	},
]
Object.freeze(bodies)
for (const x of bodies) 
	Object.freeze(x)