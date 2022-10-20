import { useFormik } from 'formik'
import { useCallback } from 'react'
import {
	BUTTON_LABELS,
	BUTTON_TYPES,
	BUTTON_VARIANT,
} from '../constants/button'
import {
	FIELD_CONTROL_VARIANT,
	FIELD_HINTS,
	FIELD_NAMES,
	FORM_CLASS,
	HINT_ID,
	LABELS,
	PLACEHOLDERS,
	SUCCESS_MESSAGE,
} from '../constants/forms'
import getError from '../helpers/getError'
import useAuth from '../hooks/useAuth'
import useChangePassword from '../hooks/useChangePassword'
import {
	ChangePasswordType,
	ChangePasswordValidationSchema,
	initialChangePasswordValues,
} from '../validations/changePassword'
import Button from './Button'
import FormAlert from './FormAlert'
import FormControl from './FormControl'

const ChangePasswordForm = () => {
	const { userId } = useAuth()

	const { data, error, isError, isLoading, isSuccess, mutate } =
		useChangePassword(userId)

	const onSubmit = useCallback(
		(values: ChangePasswordType) => mutate(values),
		[mutate],
	)

	const { handleSubmit, dirty, isValid, errors, touched, getFieldProps } =
		useFormik({
			initialValues: initialChangePasswordValues,
			onSubmit,
			validationSchema: ChangePasswordValidationSchema,
		})

	return (
		<form className={FORM_CLASS} onSubmit={handleSubmit}>
			<FormControl
				error={errors.oldPassword}
				label={LABELS.OLD_PASSWORD}
				placeholder={PLACEHOLDERS.OLD_PASSWORD}
				touched={touched.oldPassword}
				variant={FIELD_CONTROL_VARIANT.PASSWORD}
				{...getFieldProps(FIELD_NAMES.OLD_PASSWORD)}
				name={FIELD_NAMES.OLD_PASSWORD}
			/>

			<FormControl
				error={errors.newPassword}
				label={LABELS.NEW_PASSWORD}
				placeholder={PLACEHOLDERS.NEW_PASSWORD}
				touched={touched.newPassword}
				variant={FIELD_CONTROL_VARIANT.PASSWORD}
				{...getFieldProps(FIELD_NAMES.NEW_PASSWORD)}
				name={FIELD_NAMES.NEW_PASSWORD}
				hint={FIELD_HINTS.PASSWORD}
				hintId={HINT_ID.PASSWORD}
			/>

			<FormControl
				error={errors.confirmPassword}
				label={LABELS.CONFIRM_NEW_PASSWORD}
				placeholder={PLACEHOLDERS.CONFIRM_NEW_PASSWORD}
				touched={touched.confirmPassword}
				variant={FIELD_CONTROL_VARIANT.PASSWORD}
				{...getFieldProps(FIELD_NAMES.CONFIRM_NEW_PASSWORD)}
				name={FIELD_NAMES.CONFIRM_NEW_PASSWORD}
			/>

			{isError && <FormAlert errorMsg={getError(error) as string} />}
			{isSuccess && typeof data !== 'string' && !data.data.success && (
				<FormAlert errorMsg={data.data.msg} />
			)}
			{isSuccess && typeof data !== 'string' && data.data.success && (
				<FormAlert successMsg={SUCCESS_MESSAGE.RESET_PASSWORD} />
			)}

			<Button
				type={BUTTON_TYPES.SUBMIT}
				label={BUTTON_LABELS.RESET_PASSWORD}
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

export default ChangePasswordForm
