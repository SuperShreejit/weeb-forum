enum ERRORS {
	//404s
	USER_NOT_FOUND = "The requested user doesn't exists",
	POST_NOT_FOUND = "The requested post doesn't exists",
	POSTS_NOT_FOUND = "There are no posts, please create a new post",
	COMMENT_NOT_FOUND = "The requested comment doesn't exists",
	PAGE_NOT_FOUND = "The requested page doesn't exist",
	MISSING_FIELDS = 'Please provide all the required form field inputs',
	//400s
	INVALID_EMAIL = 'Please provide a valid email',
	INVALID_PASSWORD = 'Password can only have alphabets, numbers and these symbols[!@#$%,_-]',
	INVALID_USERNAME = 'Username can only have alphabets, numbers and these symbols[!@#$%,_-]',
	INVALID_LENGTH = 'It must be 6-20 characters long',
	INVALID_TOKEN = 'Invalid Token',
	INVALID_USER_ID = 'Invalid user ID',
	INVALID_POST_ID = 'Invalid post ID',
	INVALID_COMMENT_ID = 'Invalid comment ID',
	INVALID_KEYS = 'Invalid Keywords format',
	INVALID_FILE_TYPE = 'You can only upload jpegs and png images',
	PASSWORDS_DIFFERENCE = 'Passwords must match',
	PASSWORD_OTHER_MATCH = 'Password must not be same to username, name or email',
	USERNAME_OTHER_MATCH = 'Username must not be same to password or email',
	MISSING_FILE = 'Image not uploaded',
	//409s
	EMAIL_EXISTS = 'This email is registered for someone else.',
	USERNAME_EXISTS = 'This username is already registered for someone else.',
	INVALID_LOGIN = "You've signed up using a social logins, please login via those",
	INVALID_GOOGLE_LOGIN = "This email is already registered using local sign user register, please login in using another gmail account",
	USERNAME_CHANGED = 'Username can be changed only once for users who have logged in via social logins. Not allowed for local users.',
	//401s
	INVALID_OTP = 'Incorrect OTP',
	INCORRECT_PASSWORD = 'Incorrect password',
	NOT_VERIFIED = "User isn't verified",
	UNAUTHORIZED = 'Unauthorized access, user is not logged in',
	CORS = 'Unauthorized access, Not allowed by CORS Policy',
	//500s
	INTERNAL_ERROR = 'Something went wrong internally, please try again later',

	//keep adding up the rest
}
export default ERRORS
