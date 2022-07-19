import { STRATEGY } from './misc'
import generateOTP from '../helpers/generateOTP'
import convertImage from '../helpers/imageBuffer'
import path from 'path'

export enum TEST_ROUTE {
	VERIFY_EMAIL = '/verify-email',
	FORGOT_PASSWORD = '/forgot-password',
	CHANGE_PASSWORD = '/change-password/',
	CHANGE_AVATAR = '/change-avatar/',
	CHANGE_USERNAME = '/change-username/',
	DEACTIVATE_USER = '/deactivate/',
	GET_USER = '/',
	GET_USERS = '/',
}

export const body = {
	name: 'test_name',
	username: 'test_name',
	email: 'test@email.com',
	authType: STRATEGY.LOCAL,
	authId: 'testauth',
	password: 'password',
}
Object.freeze(body)

export const wrong_otps = ['12345', '123', 'asc', '123zx']
Object.freeze(wrong_otps)

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

export const forgotPasswordBody = {
	otp: generateOTP(),
	newPassword: 'Abcd@1234',
	wrongConfirmPassword: 'wrong_password',
}
Object.freeze(forgotPasswordBody)


export const invalid_email = ['abc@123', 'abc123#', 'abc 123', 'ab..12.com']
Object.freeze(invalid_email)

export const invalid_username_length = ['abcde', 'abc12345678901234567890']
Object.freeze(invalid_username_length)

export const invalid_username = ['abc$123', 'abc123#', 'abc 123']
Object.freeze(invalid_username)

export const userBody = {
	name: 'test_name1',
	username: 'test_username1',
	email: 'test_email1@email.com',
	authType: STRATEGY.LOCAL,
	authId: 'test_auth1',
	password: 'Abcd@1234',
	verified: true,
}
Object.freeze(userBody)

export const userBody2 = {
	name: 'test_name2',
	username: 'test_username2',
	username_changed: true,
	email: 'test_email2@email.com',
	authType: STRATEGY.LOCAL,
	authId: 'test_auth2',
	password: 'Abcd@1234',
	verified: true,
}
Object.freeze(userBody2)

export const fakeId = '1234567890abcdef12345678'

export const wrongEmail = 'wrong_email@email.com'

export const updatedUsername = 'updated_username'

export const updatedPassword = 'Abcd@12345'

export const wrongPassword = 'Abc#123'

export const updatedAvatarFile = {
	filename: 'default_avatar2.png',
	mimeType: 'image/png',
	buffer: convertImage(path.join(__dirname, '../Resources/avatar2.png')),
}