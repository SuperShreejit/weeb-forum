const REGEX = {
	PASSWORD:
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*\s)(?=.*[!@#$%,_-]).{6,20}$/,
	USERNAME: /^(?!.*\s)[a-zA-Z][a-zA-Z0-9-_@]{6,20}$/,
	OBJECT_ID: /^[a-fA-F0-9]{24}$/,
	OTP: /^\d{4}$/,
	SALT: /^\w+$/,
}

Object.freeze(REGEX)

export default REGEX