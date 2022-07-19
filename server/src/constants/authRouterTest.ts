import { STRATEGY } from './misc'

export const body_register = {
	name: 'test_name',
	username: 'Test_username123',
	email: 'test@email.com',
	password: 'Abc_123',
	invalidConfirmPassword: 'not_password',
}
Object.freeze(body_register)

export const body = {
	name: 'test_name',
	username: 'test_name',
	email: 'test@email.com',
	authType: STRATEGY.LOCAL,
	authId: 'testauth',
	password: 'password',
}
Object.freeze(body)

export const invalid_passwords = [
	'1231234',
	'ab12345!@',
	'asdvqwe',
	'!@#$%,_-.',
	'ABCDEFGH',
	'abc 123 !@# ABC',
]
Object.freeze(invalid_passwords)

export const invalid_passwords_length = [
	'12345',
	'asdfg',
	'!@#$%',
	'12345678901234567890123',
]
Object.freeze(invalid_passwords_length)

export const invalid_username_length = ['abcde', 'abc12345678901234567890']
Object.freeze(invalid_username_length)

export const invalid_username = ['abc$123', 'abc123#', 'abc 123']
Object.freeze(invalid_username)

export const invalid_email = ['abc@123', 'abc123#', 'abc 123', 'ab..12.com']
Object.freeze(invalid_email)


export const register_body_success = {
	name: 'test_name2',
	username: 'test_username2',
	email: 'test2@email.com',
	password: 'Test@1234',
	confirmPassword: 'Test@1234',
}
Object.freeze(register_body_success)

export const register_body_fail = {
	name: 'test_name',
	username: 'login_username',
	email: 'test_email@email.com',
	password: 'Test@1234',
	confirmPassword: 'Test@1234',
}
Object.freeze(register_body_fail)

export const userBody = {
	name: 'test_name',
	username: 'login_username',
	email: 'test_email@email.com',
	authType: STRATEGY.LOCAL,
	authId: 'testauth',
	password: 'Test@1234',
	verified: true,
}
Object.freeze(userBody)