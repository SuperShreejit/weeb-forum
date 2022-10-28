import React, { useCallback } from 'react'
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
import Button from './Button'
import FormAlert from './FormAlert'
import useChangeAvatar from './../hooks/useChangeAvatar'
import { useFormik } from 'formik'
import {
	ChangeAvatarType,
	initialChangeAvatarValues,
} from '../validations/changeAvatart'
import FormControl from './FormControl'

const ChangeAvatarForm = () => {
	const { userId } = useAuth()

	const { data, error, isError, isSuccess, isLoading, mutate } =
		useChangeAvatar(userId)

	const onSubmit = useCallback(
		(values: ChangeAvatarType) => mutate(values),
		[mutate],
	)

	const { handleSubmit, dirty, isValid, errors, touched, getFieldProps } =
		useFormik({
			initialValues: initialChangeAvatarValues,
			onSubmit,
		})

	return (
		<form
			className={FORM_CLASS}
			onSubmit={handleSubmit}
			encType='multipart/form-data'
		>
			<FormControl
				error={errors.avatar}
				label={LABELS.AVATAR}
				touched={touched.avatar}
				variant={FIELD_CONTROL_VARIANT.PASSWORD}
				placeholder={PLACEHOLDERS.AVATAR}
				{...getFieldProps(FIELD_NAMES.AVATAR)}
				name={FIELD_NAMES.AVATAR}
			/>

			{isError && <FormAlert errorMsg={getError(error) as string} />}
			{isSuccess && typeof data !== 'string' && !data.data.success && (
				<FormAlert errorMsg={data.data.msg} />
			)}
			{isSuccess && typeof data !== 'string' && data.data.success && (
				<FormAlert successMsg={SUCCESS_MESSAGE.CHANGE_AVATAR} />
			)}

			<Button
				type={BUTTON_TYPES.SUBMIT}
				label={BUTTON_LABELS.CHANGE}
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

export default ChangeAvatarForm
