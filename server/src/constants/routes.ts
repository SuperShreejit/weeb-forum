enum ROUTES {
	//server base
	FULL_SERVER_URL = 'http://localhost:8080/api/v1',
	SERVER_URL_BASE = '/api/v1',

	//client
	FULL_CLIENT_URL = 'http://localhost:8080',
	CLIENT_LOGIN_PAGE = 'http://localhost:8080/login',

	//auth
	AUTH_BASE = '/auth',
	AUTH_REGISTER_LOCAL = '/register',
	AUTH_LOGIN_LOCAL = '/login',
	AUTH_LOGIN_GOOGLE = '/google',
	AUTH_GOOGLE_REDIRECT = '/google/redirect',
	AUTH_LOGOUT = '/logout',

	//user
	USERS_BASE = '/users',
	VERIFY_EMAIL = '/verify-email',
	FORGOT_PASSWORD = '/forgot-password',
	CHANGE_PASSWORD = '/change-password/:userId',
	CHANGE_AVATAR = '/change-avatar/:userId',
	CHANGE_USERNAME = '/change-username/:userId',
	DEACTIVATE_USER = '/deactivate/:userId',
	GET_USERS = '/',
	GET_USER = '/:userId',

	//post
	POSTS_BASE = '/posts',
	CREATE_POST = '/create-post/:userId',
	CREATE_COMMENT = '/create-comment/:userId/:postId',
	UPDATE_POST = '/update-post/:postId',
	UPDATE_COMMENT = '/update-comment/:commentId',
	DELETE_POST = '/delete-post/:postId',
	DELETE_COMMENT = '/delete-comment/:commentId',
	GET_POST = '/:postId',
	GET_POSTS = '/',
	GET_USER_POSTS = '/user/:userId',
	LIKE_POST = '/like-post/:userId/:postId',
	DISLIKE_POST = '/dislike-post/:userId/:postId',
	LIKE_COMMENT = '/like-comment/:userId/:commentId',
	DISLIKE_COMMENT = '/dislike-comment/:userId/:commentId',

	//misc
	TEST_BASE = '/test',
	NOT_FOUND = '/*',
	HELLO_WORLD = '/welcome',
	TEST_EMAIL_VERIFY = '/email-verify',
	TEST_RESET_PASSWORD = '/reset-password',
	TEST_DEACTIVATE = '/deactivate',
	TEST_ERROR1 = '/error1',
	TEST_ERROR2 = '/error2',
	TEST_ERROR3 = '/error3',

	//add as you build
}
export default ROUTES
