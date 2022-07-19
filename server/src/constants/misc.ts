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

export const whitelist = ['http://localhost:*']
Object.freeze(whitelist)