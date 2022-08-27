import { object, string } from 'yup'
import { FORM_ERRORS, REGEX } from '../constants/forms'

export const addCommentInitialValues = {
	comment: '',
	userId: '',
	postId: '',
}

export const addCommentValidationSchema = object({
	comment: string().trim().required(),
	userId: string().trim().required().matches(REGEX.IDS, FORM_ERRORS.INVALID_USERID),
	postId: string().trim().required().matches(REGEX.IDS, FORM_ERRORS.INVALID_POSTID),
})
