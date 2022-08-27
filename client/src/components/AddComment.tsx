import { useFormik } from 'formik'
import { useCallback } from 'react'
import {
	BUTTON_LABELS,
	BUTTON_TYPES,
	BUTTON_VARIANT,
} from '../constants/button'
import {
	FIELD_CONTROL_VARIANT,
	FIELD_NAMES,
	LABELS,
	PLACEHOLDERS,
	SUCCESS_MESSAGE,
} from '../constants/forms'
import { POST_CLASSES } from '../constants/post'
import getError from '../helpers/getError'
import useAddComment, { AddCommentValuesType } from '../hooks/useAddComment'
import {
	addCommentInitialValues,
	addCommentValidationSchema,
} from '../validations/comment'
import Button from './Button'
import FormAlert from './FormAlert'
import FormControl from './FormControl'

const AddComment = ({ postId, userId }: { postId: string; userId: string }) => {
	const { data, error, isError, isLoading, isSuccess, mutate } = useAddComment()

	const onSubmit = useCallback(
		(values: AddCommentValuesType) => mutate(values),
		[mutate],
	)

	const { handleSubmit, dirty, isValid, errors, touched, getFieldProps } =
		useFormik({
			initialValues: { ...addCommentInitialValues, postId, userId },
			onSubmit,
			validationSchema: addCommentValidationSchema,
		})

	return (
		<form onSubmit={handleSubmit} className={POST_CLASSES.ADD_COMMENT_FORM}>
			<FormControl
				error={errors.comment}
				label={LABELS.COMMENT}
				placeholder={PLACEHOLDERS.COMMENT}
				touched={touched.comment}
				variant={FIELD_CONTROL_VARIANT.TEXT}
				{...getFieldProps(FIELD_NAMES.COMMENT)}
				name={FIELD_NAMES.COMMENT}
			/>

			{isError && <FormAlert errorMsg={getError(error) as string} />}
			{isSuccess && typeof data !== 'string' && !data.data.success && (
				<FormAlert errorMsg={data.data.msg} />
			)}
			{isSuccess && typeof data !== 'string' && data.data.success && (
				<FormAlert successMsg={SUCCESS_MESSAGE.CREATE_COMMENT} />
			)}

			<Button
				label={BUTTON_LABELS.COMMENT}
				variant={BUTTON_VARIANT.PRIMARY_BORDER_ROUNDED}
				type={BUTTON_TYPES.SUBMIT}
				disabled={!(dirty || isValid) || isLoading}
			/>
		</form>
	)
}

export default AddComment
