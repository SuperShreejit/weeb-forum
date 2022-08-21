import { useFormik } from 'formik'
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
import {
	resetPasswordInitialValues,
	resetPasswordValidationSchema,
	ResetPasswordValuesType,
} from '../validations/resetPassword'
import FormControl from './FormControl'
import '../sass/components/_form.scss'
import { useCallback, useEffect } from 'react'
import Button from './Button'
import useResetPassword from '../hooks/useResetPassword'
import FormAlert from './FormAlert'
import getError from '../helpers/getError'
import useNavigation from '../hooks/useNavigations'

const ResetPassword = () => {
	const { data, error, isError, isSuccess, isLoading, mutate } =
		useResetPassword()

	const onSubmit = useCallback(
		(values: ResetPasswordValuesType) => mutate(values),
		[mutate],
	)

	const { navigateToSignIn } = useNavigation()

	const { handleSubmit, dirty, isValid, errors, touched, getFieldProps } =
		useFormik({
			initialValues: resetPasswordInitialValues,
			onSubmit,
			validationSchema: resetPasswordValidationSchema,
		})

	useEffect(() => {
		let timeout: NodeJS.Timeout
		if (isSuccess && typeof data !== 'string' && data.data.success)
			timeout = setTimeout(() => navigateToSignIn(), 2000)

		return () => clearInterval(timeout)
	}, [isSuccess, data, navigateToSignIn])

	return (
		<form className={FORM_CLASS} onSubmit={handleSubmit}>
			<FormControl
				error={errors.email}
				label={LABELS.EMAIL}
				placeholder={PLACEHOLDERS.EMAIL}
				touched={touched.email}
				variant={FIELD_CONTROL_VARIANT.EMAIL}
				{...getFieldProps(FIELD_NAMES.EMAIL)}
				name={FIELD_NAMES.EMAIL}
			/>

			<FormControl
				error={errors.otp}
				label={LABELS.OTP}
				placeholder={PLACEHOLDERS.OTP}
				touched={touched.otp}
				variant={FIELD_CONTROL_VARIANT.TEXT}
				{...getFieldProps(FIELD_NAMES.OTP)}
				name={FIELD_NAMES.OTP}
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
				error={errors.otp}
				label={LABELS.CONFIRM_NEW_PASSWORD}
				placeholder={PLACEHOLDERS.CONFIRM_NEW_PASSWORD}
				touched={touched.otp}
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

export default ResetPassword
