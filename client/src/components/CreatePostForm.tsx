import { useFormik } from 'formik'
import { useCallback, useEffect } from 'react'
import {
	BUTTON_LABELS,
	BUTTON_TYPES,
	BUTTON_VARIANT,
} from '../constants/button'
import {
	FIELD_CONTROL_VARIANT,
	FIELD_NAMES,
	FORM_CLASS,
	LABELS,
	PLACEHOLDERS,
	SUCCESS_MESSAGE,
} from '../constants/forms'
import getError from '../helpers/getError'
import useAuth from '../hooks/useAuth'
import useCreatePost from '../hooks/useCreatePost'
import useNavigation from '../hooks/useNavigations'
import {
	CreatePostDataType,
	createPostInitialValues,
	createPostValidationSchema,
} from '../validations/createPost'
import Button from './Button'
import FormAlert from './FormAlert'
import FormControl from './FormControl'

const CreatePostForm = () => {
	const { userId } = useAuth()
	const { navigateToPost } = useNavigation()
	const { mutate, isError, error, isLoading, isSuccess, data } =
		useCreatePost(userId)

	const onSubmit = useCallback(
		(values: CreatePostDataType) => {
			const keysArray = values.keys.split(' ')
			const newValues = { ...values, keys: keysArray }
			mutate(newValues)
		},
		[mutate],
	)

	const { handleSubmit, dirty, isValid, errors, touched, getFieldProps } =
		useFormik({
			initialValues: createPostInitialValues,
			onSubmit,
			validationSchema: createPostValidationSchema,
		})

	useEffect(() => {
		let timeout: NodeJS.Timeout
		if (isSuccess && typeof data !== 'string' && data.data.success === true) {
			const postId = data.data.post.id
			timeout = setTimeout(() => navigateToPost(postId), 2000)
		}

		return () => clearInterval(timeout)
	}, [isSuccess, data, navigateToPost])

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

			{isError && <FormAlert errorMsg={getError(error) as string} />}
			{isSuccess && typeof data !== 'string' && !data.data.success && (
				<FormAlert errorMsg={data.data.msg} />
			)}
			{isSuccess && typeof data !== 'string' && data.data.success && (
				<FormAlert successMsg={SUCCESS_MESSAGE.CREATE_POST} />
			)}

			<Button
				type={BUTTON_TYPES.SUBMIT}
				label={BUTTON_LABELS.REGISTER}
				variant={BUTTON_VARIANT.PRIMARY_ELEVATED_ROUNDED}
				disabled={
					!(isValid && dirty) ||
					isLoading ||
					(typeof data !== 'string' && isSuccess && data.data.success)
				}
			/>
		</form>
	)
}

export default CreatePostForm
