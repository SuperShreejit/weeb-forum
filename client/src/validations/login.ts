import { object, string } from 'yup'
import { FORM_ERRORS } from '../constants/forms';

export type loginValuesType = { username: string; password: string }

export const loginInitialValues = {
	username: '',
	password: '',
}

export const loginValidationSchema = object({
	username: string().trim().required(FORM_ERRORS.MISSING_USERNAME),
	password: string().trim().required(FORM_ERRORS.MISSING_PASSWORD),
})
