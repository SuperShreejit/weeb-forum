export enum FIELD_CONTROL_VARIANT {
	TEXT = 'text',
	NUMBER = 'number',
	EMAIL = 'email',
	PASSWORD = 'password',
	DATE = 'date',
}

export enum FIELD_CLASSES {
	TEXT = 'text',
	SELECT = 'select',
	RADIO = 'radio',
	CHECKBOX = 'checkbox',
	ERROR = 'field-error',
	SUCCESS = 'field-success',
}

export enum FIELD_NAMES {
	NAME = 'name',
	USERNAME = 'username',
	EMAIL = 'email',
	OLD_PASSWORD = 'oldPassword',
	NEW_PASSWORD = 'newPassword',
	PASSWORD = 'password',
	CONFIRM_PASSWORD = 'confirmPassword',
	CONFIRM_NEW_PASSWORD = 'confirmPassword',
	AVATAR = 'avatar',
	TITLE = 'title',
	POST = 'post',
	COMMENT = 'comment',
	KEYS = 'keys',
	SEARCH = 'search',
	OTP = 'otp',
}

export enum LABELS {
	NAME = 'name',
	USERNAME = 'username',
	EMAIL = 'email',
	OLD_PASSWORD = 'old password',
	NEW_PASSWORD = 'new password',
	PASSWORD = 'password',
	CONFIRM_PASSWORD = 'repeat password',
	CONFIRM_NEW_PASSWORD = 'repeat new password',
	AVATAR = 'avatar',
	TITLE = 'title',
	POST = 'post',
	COMMENT = 'comment',
	KEYS = 'keys',
	SEARCH = 'search',
	OTP = 'otp',
}

export enum PLACEHOLDERS {
	NAME = 'Please enter your name',
	USERNAME = 'Please enter a suitable username',
	EMAIL = ' Please enter your email',
	PASSWORD = 'Please enter a suitable password',
	OLD_PASSWORD = 'Please enter your old password',
	NEW_PASSWORD = 'Please enter a new password',
	CONFIRM_PASSWORD = 'Please re-enter password',
	CONFIRM_NEW_PASSWORD = 'Please re-enter new password',
	TITLE = 'Please enter a post title',
	POST = 'Please type your post content',
	COMMENT = 'Please type your post comment',
	KEYS = 'Please enter suitable post hashtags or keywords',
	SEARCH = 'Please enter a search Keyword',
	OTP = 'Please enter the OTP',
}

export const FIELD_HINTS = {
	USERNAME: [
		'- 4 to 24 characters.',
		'- Must begin with a letter.',
		'- Letters, numbers, underscores, hypens allowed.',
	],
	PASSWORD: [
		'- 8-24 characters in length.',
		'- password must contain atleast one UPPERCASE letter.',
		'- password must contain atleast one LOWERCASE letter.',
		'- password must contain atleast one NUMBER.',
		'- password must contain atleast one of the allowed special characters.',
		'- allowed special characters: [!@#$%,.- _]',
	],
}
Object.freeze(FIELD_HINTS)
Object.freeze(FIELD_HINTS.PASSWORD)
Object.freeze(FIELD_HINTS.USERNAME)


export enum HINT_ID {
	USERNAME = 'username-note',
	PASSWORD = 'password-note',
}

export enum SUCCESS_MESSAGE {
	REGISTER = 'Successfully Registered!',
	LOGIN = 'Successfully Logged-In!',
	EMAIL_VERIFY = 'Successfully Verified!',
	RESET_PASSWORD = 'Successfully Changed Password!',
	CHANGE_USERNAME = 'Successfully Changed Username!',
	CHANGE_AVATAR = 'Successfully Changed Avatar!',
	DEACTIVATE = 'Successfully Deactivated Account!',
	CREATE_POST = 'Successfully Posted!',
	CREATE_COMMENT = 'Successfully Commented!',
	EDIT_POST = 'Successfully Updated Post!',
	EDIT_COMMENT = 'Successfully Updated Comment!',
}

export enum FORM_ERRORS {
	MISSING_USERNAME = 'Username cannot be empty',
	MISSING_PASSWORD = 'Password cannot be empty',
	MISSING_EMAIL = 'Email cannot be empty',
	MISSING_NAME = 'Name cannot be empty',
	MISSING_OTP = 'OTP cannot be empty',
	INVALID_USERNAME = 'Must be a valid password',
	INVALID_PASSWORD = 'Must be a valid password',
	INVALID_OTP = 'Must be a valid OTP',
	INVALID_EMAIL = 'Must be a valid email',
	INVALID_USERNAME_LENGTH = 'Username must be of length 6-20',
	INVALID_PASSWORD_LENGTH = 'Username must be of length 6-20',
	INVALID_OTP_LENGTH = 'Username must be of length 6-20',
	PASSWORD_OTHERS_SAME = 'Password must not match name, username or email',
	USERNAME_OTHERS_SAME = 'Username must not match password or email',
	PASSWORD_DIFFERENT = 'Passwords must match',
}

export const REGEX = {
	PASSWORD:
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*\s)(?=.*[!@#$%,_-]).{6,20}$/,
	USERNAME: /^(?!.*\s)[a-zA-Z][a-zA-Z0-9-_@]{6,20}$/,
	OTP: /^\d{4}$/,
}
Object.freeze(REGEX)

export enum INPUT_LENGTH {
	USERNAME_MIN = 6,
	USERNAME_MAX = 20,
	PASSWORD_MIN = 6,
	PASSWORD_MAX = 20,
	OTP = 4,
}

export const LABEL_CLASS = 'label'
export const FORM_CONTROL_CLASS = 'form-control'
export const FIELD_HINT_CLASS = 'field-hint'
export const ERROR_MESSAGE_CLASS = 'error-msg'
export const SUCCESS_MESSAGE_CLASS = 'success-msg'
export const FORM_CLASS = 'form'
export const ARIA_LIVE = 'assertive'
export const TEXTAREA_COLS = 10
export const TEXTAREA_ROWS = 5
