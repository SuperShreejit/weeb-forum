import { useFormik } from 'formik'
import { useCallback } from 'react'
import {
	BUTTON_LABELS,
	BUTTON_TYPES,
	BUTTON_VARIANT,
} from '../constants/button'
import { CONTAINER_CLASS } from '../constants/component'
import {
	FIELD_CONTROL_VARIANT,
	FIELD_NAMES,
	FORM_CLASS,
	LABELS,
	PLACEHOLDERS,
} from '../constants/forms'
import useGetOTP from '../hooks/useGetOTP'
import {
	ForgotPasswordType,
	forgotPasswordValidationSchema,
	initialForgotPasswordValues,
} from '../validations/forgotPassword'
import Button from './Button'
import FormButtons from './FormButtons'
import FormControl from './FormControl'
import '../sass/components/_form.scss'

const ForgotPassword = () => {
	const onSubmit = useCallback((values: ForgotPasswordType) => {}, [])
  const getOTP = useGetOTP()

	const {
		handleSubmit,
		values,
		dirty,
		isSubmitting,
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

			<div className={CONTAINER_CLASS.FLEX}>
				<FormButtons
					label={BUTTON_LABELS.SEND_OTP}
					dirty={dirty}
					isSubmitting={isSubmitting}
					isValid={isValid}
				/>
				<Button
					label={BUTTON_LABELS.RESEND_OTP}
					variant={BUTTON_VARIANT.SECONDARY_TRANSPARENT}
					onClick={() => getOTP(values)}
					type={BUTTON_TYPES.BUTTON}
				/>
			</div>
		</form>
	)
}

export default ForgotPassword
