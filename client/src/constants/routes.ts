export enum CLIENT_ROUTES {
	//client
	FULL_CLIENT = 'http://localhost:3000',

	//misc
	LANDING = '/',
	FORBIDDEN = '/forbidden',
	FORBIDDEN_AUTH = 'forbidden',
	PAGE_NOT_FOUND = '*',
	PRIVACY_POLICY = 'privacy-policy',
	TERMS_CONDITIONS = 'terms-conditions',

	//auth
	REGISTER = '/register',
	LOGIN = '/login',
	VERIFY_EMAIL = '/verify-email',
	FORGOT_PASSWORD = '/forgot-password',
	AUTH_BASE = '/users',

	//posts
	CREATE_POST = 'posts/create',
	VIEW_POST = 'posts',
	EDIT_POST = 'posts/edit',

	//users
	TIMELINE = 'timeline',
	SEARCH = 'search',
	PROFILE = 'profile',
	SETTINGS = 'settings',
	NOTIFICATIONS = 'notifications',
	VIEW_USER = 'user',
}

export enum SERVER_ROUTES {
	//base
	SERVER_BASE = 'http://localhost:5000',
	SERVER_URL_BASE = '/api/v1',

	//auth
	AUTH_BASE = '/auth',
	AUTH_REGISTER_LOCAL = '/register',
	AUTH_LOGIN_LOCAL = '/login',
	AUTH_LOGIN_GOOGLE = '/google',
	AUTH_GOOGLE_REDIRECT = '/google/redirect',
	AUTH_CURRENT_USER = '/current-user',
	AUTH_LOGOUT = '/logout',

	//user
	USERS_BASE = '/users',
	VERIFY_EMAIL = '/verify-email',
	FORGOT_PASSWORD = '/forgot-password',
	CHANGE_PASSWORD = '/change-password/',
	CHANGE_AVATAR = '/change-avatar/',
	CHANGE_USERNAME = '/change-username/',
	DEACTIVATE_USER = '/deactivate/',
	GET_USERS = '/',
	GET_USER = '/',

	//post
	POSTS_BASE = '/posts',
	CREATE_POST = '/create-post/',
	CREATE_COMMENT = '/create-comment/:userId/:postId',
	UPDATE_POST = '/update-post/',
	UPDATE_COMMENT = '/update-comment/:commentId',
	DELETE_POST = '/delete-post/',
	DELETE_COMMENT = '/delete-comment/:commentId',
	GET_POST = '/',
	GET_POSTS = '/',
	GET_USER_POSTS = '/user/',
	LIKE_POST = '/like-post/:userId/:postId',
	DISLIKE_POST = '/dislike-post/:userId/:postId',
	LIKE_COMMENT = '/like-comment/:userId/:commentId',
	DISLIKE_COMMENT = '/dislike-comment/:userId/:commentId',
}
