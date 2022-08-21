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
	FORM_CLASS,
	LABELS,
	PLACEHOLDERS,
	SUCCESS_MESSAGE,
} from '../constants/forms'
import {
	ForgotPasswordType,
	forgotPasswordValidationSchema,
	initialForgotPasswordValues,
} from '../validations/forgotPassword'
import Button from './Button'
import FormControl from './FormControl'
import '../sass/components/_form.scss'
import useForgotPassword from '../hooks/useForgotPassword'
import FormAlert from './FormAlert'
import getError from '../helpers/getError'

const ForgotPassword = () => {
	const { data, error, isError, isSuccess, isLoading, mutate } =
		useForgotPassword()
	
	const onSubmit = useCallback((values: ForgotPasswordType) => mutate(values), [mutate])

	const {
		handleSubmit,
		dirty,
		isValid,
		errors,
		touched,
		getFieldProps,
	} = useFormik({
		initialValues: initialForgotPasswordValues,
		onSubmit,
		validationSchema: forgotPasswordValidationSchema,
	})

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

			{isError && <FormAlert errorMsg={getError(error) as string} />}
			{isSuccess && typeof data !== 'string' && !data.data.success && (
				<FormAlert errorMsg={data.data.msg} />
			)}
			{isSuccess && typeof data !== 'string' && data.data.success && (
				<FormAlert successMsg={SUCCESS_MESSAGE.SEND_OTP} />
			)}

			<Button
				type={BUTTON_TYPES.SUBMIT}
				label={BUTTON_LABELS.SEND_OTP}
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

export default ForgotPassword
