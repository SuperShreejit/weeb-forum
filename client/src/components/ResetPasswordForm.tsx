import { useFormik } from "formik"
import { BUTTON_LABELS } from "../constants/button"
import { FIELD_CONTROL_VARIANT, FIELD_HINTS, FIELD_NAMES, FORM_CLASS, HINT_ID, LABELS, PLACEHOLDERS } from "../constants/forms"
import { resetPasswordInitialValues, resetPasswordValidationSchema, ResetPasswordValuesType } from "../validations/resetPassword"
import FormButtons from "./FormButtons"
import FormControl from "./FormControl"
import '../sass/components/_form.scss'

const onSubmit = (values: ResetPasswordValuesType) => { }

const ResetPassword = () => {  
	const {
		handleSubmit,
		dirty,
		isSubmitting,
		isValid,
		errors,
		touched,
		getFieldProps,
	} = useFormik({
		initialValues: resetPasswordInitialValues,
		onSubmit,
		validationSchema: resetPasswordValidationSchema,
	})
  return (
		<form className={FORM_CLASS} onSubmit={handleSubmit}>
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
			<FormButtons
				label={BUTTON_LABELS.CHANGE}
				dirty={dirty}
				isSubmitting={isSubmitting}
				isValid={isValid}
			/>
		</form>
	)
}

export default ResetPassword