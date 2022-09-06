import { object, string } from 'yup'
import { FORM_ERRORS } from '../constants/forms'

export type EditPostDataType = {
	title: string
	post: string
	keys: string
}

export const editPostValidationSchema = object({
	title: string().trim().required(FORM_ERRORS.MISSING_TITLE),
	post: string().trim().required(FORM_ERRORS.MISSING_POST),
	keys: string().trim().optional(),
})
