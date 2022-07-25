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

export enum FIELD_HINTS {
	USERNAME = `- 4 to 24 characters. <br />
              - Must begin with a letter. <br />
              - Letters, numbers, underscores, hypens allowed.`,
	PASSWORD = `- 8-24 characters in length. <br />
              - password must contain atleast one UPPERCASE letter. <br />
              - password must contain atleast one LOWERCASE letter. <br />
              - password must contain atleast one NUMBER. <br />
              - password must contain atleast one of the allowed special characters. <br />
              - allowed special characters: [
                <span aria-label="excalmation mark">!</span>
                <span aria-label="at symbol">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percent symbol">%</span>
                <span aria-label="comma symbol">,</span>
                <span aria-label="period symbol">.</span>
                <span aria-label="hypen">-</span>
                <span aria-label="underscore">_</span>
                ]`,
}

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

export const LABEL_CLASS = 'label'
export const FORM_CONTROL_CLASS = 'form-control'
export const FIELD_HINT_CLASS = 'field-hint'

export enum FORM_ERRORS {
  //validations

}

export const ERROR_MESSAGE_CLASS = 'error-msg'
export const SUCCESS_MESSAGE_CLASS = 'success-msg'
export const ARIA_LIVE = 'assertive'
export const TEXTAREA_COLS = 10
export const TEXTAREA_ROWS = 5