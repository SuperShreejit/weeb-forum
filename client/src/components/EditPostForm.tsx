import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
	FIELD_CONTROL_VARIANT,
	FIELD_NAMES,
	FORM_CLASS,
	LABELS,
	PLACEHOLDERS,
	SUCCESS_MESSAGE,
} from '../constants/forms'
import FormControl from './FormControl'
import getError from './../helpers/getError'
import FormAlert from './FormAlert'
import Button from './Button'
import {
	BUTTON_LABELS,
	BUTTON_TYPES,
	BUTTON_VARIANT,
} from '../constants/button'
import { useFormik } from 'formik'
import {
	EditPostDataType,
	editPostValidationSchema,
} from '../validations/editPost'
import useViewPost from '../hooks/useViewPost'
import useEditPost from '../hooks/useEditPost'
import useNavigation from '../hooks/useNavigations'


type EditPostParamsType = {
	postId: string
}

const EditPostForm = () => {
	const { navigateToPost } = useNavigation()
	const { postId } = useParams<EditPostParamsType>()

	const {
		data: getPostData,
		isSuccess: getPostIsSuccess,
	} = useViewPost(postId as string)

	const {
		data: editPostData,
		error: editPostError,
		isError: editPostIsError,
		isLoading: editPostIsLoading,
		isSuccess: editPostIsSuccess,
		mutate,
	} = useEditPost(postId as string)

	const onSubmit = useCallback(
		(values: EditPostDataType) => {
			const keysArray = values.keys.split(' ')
			const newValues = { ...values, keys: keysArray }
			mutate(newValues)
		},
		[mutate],
	)

	const { handleSubmit, dirty, isValid, errors, touched, getFieldProps } =
		useFormik({
			initialValues:
				getPostIsSuccess &&
				typeof getPostData !== 'string' &&
				getPostData?.data.success === true
					? {
							title: getPostData.data.post.title,
							post: getPostData.data.post.post,
							keys: getPostData.data.post.keys.join(' '),
					  }
					: { title: '', post: '', keys: '' },
			onSubmit,
			validationSchema: editPostValidationSchema,
		})

  	useEffect(() => {
			let timeout: NodeJS.Timeout
			if (editPostIsSuccess && typeof editPostData !== 'string' && editPostData.data.success === true) {
				const postId = editPostData.data.post.id
				timeout = setTimeout(() => navigateToPost(postId), 2000)
			}

			return () => clearInterval(timeout)
		}, [editPostIsSuccess, editPostData, navigateToPost])
  
	return (
		<form className={FORM_CLASS} onSubmit={handleSubmit}>
			<FormControl
				error={errors.title}
				label={LABELS.TITLE}
				placeholder={PLACEHOLDERS.TITLE}
				touched={touched.title}
				variant={FIELD_CONTROL_VARIANT.TEXT}
				{...getFieldProps(FIELD_NAMES.TITLE)}
				name={FIELD_NAMES.TITLE}
			/>

			<FormControl
				error={errors.post}
				label={LABELS.POST}
				placeholder={PLACEHOLDERS.POST}
				touched={touched.post}
				variant={FIELD_CONTROL_VARIANT.TEXT}
				{...getFieldProps(FIELD_NAMES.POST)}
				name={FIELD_NAMES.POST}
			/>

			<FormControl
				error={errors.keys}
				label={LABELS.KEYS}
				placeholder={PLACEHOLDERS.KEYS}
				touched={touched.keys}
				variant={FIELD_CONTROL_VARIANT.TEXT}
				{...getFieldProps(FIELD_NAMES.KEYS)}
				name={FIELD_NAMES.KEYS}
			/>

			{editPostIsError && (
				<FormAlert errorMsg={getError(editPostError) as string} />
			)}
			{editPostIsSuccess &&
				typeof editPostData !== 'string' &&
				!editPostData.data.success && (
					<FormAlert errorMsg={editPostData.data.msg} />
				)}
			{editPostIsSuccess &&
				typeof editPostData !== 'string' &&
				editPostData.data.success && (
					<FormAlert successMsg={SUCCESS_MESSAGE.EDIT_POST} />
				)}

			<Button
				type={BUTTON_TYPES.SUBMIT}
				label={BUTTON_LABELS.REGISTER}
				variant={BUTTON_VARIANT.PRIMARY_ELEVATED_ROUNDED}
				disabled={
					!(isValid && dirty) ||
					editPostIsLoading ||
					(typeof editPostData !== 'string' &&
						editPostIsSuccess &&
						editPostData.data.success)
				}
			/>
		</form>
	)
}

export default EditPostForm
