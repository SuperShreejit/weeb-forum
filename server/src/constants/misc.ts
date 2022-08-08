export enum STRATEGY {
	LOCAL = 'local',
	GOOGLE = 'google',
}

export const AVATAR_MIME_TYPES = ['image/jpeg', 'image/png']
Object.freeze(AVATAR_MIME_TYPES)

export enum TOKENS {
	EMAIL = 'email',
	PASSWORD = 'password',
	DEACTIVATE = 'deactivate',
	SESSION = 'session',
}

export const welcome = 'hello world from weeb forum API'

export const INTERNAL_ERROR = 'Some Other Internal error'

export enum NODE_ENV {
	DEVELOPMENT = 'development',
	STAGING = 'staging',
	PRODUCTION = 'production',
}

export const whitelist = ['http://localhost:3000', 'http://localhost:5000']
Object.freeze(whitelist)

export const CORS_METHODS = ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
Object.freeze(CORS_METHODS)

export const CORS_HEADERS = [
	'Origin',
	'content-type',
	'X-Auth-Token',
	'X-Requested-With',
	'Authorization',
	'Accept',
	'authorization',
]
Object.freeze(CORS_HEADERS)