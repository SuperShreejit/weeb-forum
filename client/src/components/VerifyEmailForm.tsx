import { useFormik } from 'formik'
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
	PLACEHOLDERS
} from '../constants/forms'
import useGetOTP from '../hooks/useGetOTP'
import {
	verifyEmailInitialValues,
	verifyEmailValidationSchema,
	VerifyEmailValuesType,
} from '../validations/verifyEmail'
import Button from './Button'
import FormButtons from './FormButtons'
import FormControl from './FormControl'
import '../sass/components/_form.scss'

const onSubmit = (values: VerifyEmailValuesType) => { }

const VerifyEmailForm = () => {
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
		initialValues: verifyEmailInitialValues,
		onSubmit,
		validationSchema: verifyEmailValidationSchema,
  })
  const getOTP = useGetOTP()

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
				<Button
					label={BUTTON_LABELS.SEND_OTP}
					variant={BUTTON_VARIANT.PRIMARY_ELEVATED_ROUNDED}
					type={BUTTON_TYPES.BUTTON}
					onClick={() => getOTP(values)}
					disabled={isValid}
				/>
				<Button
					label={BUTTON_LABELS.RESEND_OTP}
					variant={BUTTON_VARIANT.SECONDARY_TRANSPARENT}
					onClick={() => getOTP(values)}
					type={BUTTON_TYPES.BUTTON}
				/>
			</div>

			<FormControl
				error={errors.otp}
				label={LABELS.OTP}
				placeholder={PLACEHOLDERS.OTP}
				touched={touched.otp}
				variant={FIELD_CONTROL_VARIANT.TEXT}
				{...getFieldProps(FIELD_NAMES.OTP)}
				name={FIELD_NAMES.OTP}
			/>

			<FormButtons
				label={BUTTON_LABELS.LOGIN}
				dirty={dirty}
				isSubmitting={isSubmitting}
				isValid={isValid}
			/>
		</form>
	)
}

export default VerifyEmailForm
