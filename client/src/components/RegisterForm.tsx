import { useFormik } from 'formik'
import { BUTTON_LABELS } from '../constants/button'
import {
	FIELD_CONTROL_VARIANT,
	FIELD_HINTS,
	FIELD_NAMES,
	HINT_ID,
	LABELS,
	PLACEHOLDERS,
	FORM_CLASS,
} from '../constants/forms'
import { registerValidationSchema, registerValuesType, registerInitialValues } from '../validations/register'
import FormButtons from './FormButtons'
import FormControl from './FormControl'
import '../sass/components/_form.scss'

const onSubmit = (values: registerValuesType) => {}

const RegisterForm = () => {
	const {
		handleSubmit,
		dirty,
		isSubmitting,
		isValid,
		errors,
		touched,
		getFieldProps,
	} = useFormik({
		initialValues: registerInitialValues,
		onSubmit,
		validationSchema: registerValidationSchema,
	})
  return (
    <form className={FORM_CLASS} onSubmit={handleSubmit}>
      <FormControl
        error={errors.name}
        label={LABELS.NAME}
        placeholder={PLACEHOLDERS.NAME}
        touched={touched.name}
        variant={FIELD_CONTROL_VARIANT.TEXT}
        {...getFieldProps(FIELD_NAMES.NAME)}
        name={FIELD_NAMES.NAME}
      />
			<FormControl
				error={errors.username}
				label={LABELS.USERNAME}
				placeholder={PLACEHOLDERS.USERNAME}
				touched={touched.username}
				variant={FIELD_CONTROL_VARIANT.TEXT}
				{...getFieldProps(FIELD_NAMES.USERNAME)}
        name={FIELD_NAMES.USERNAME}
        hint={FIELD_HINTS.USERNAME}
        hintId={HINT_ID.USERNAME}
			/>
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
				error={errors.password}
				label={LABELS.PASSWORD}
				placeholder={PLACEHOLDERS.PASSWORD}
				touched={touched.password}
				variant={FIELD_CONTROL_VARIANT.PASSWORD}
				{...getFieldProps(FIELD_NAMES.PASSWORD)}
        name={FIELD_NAMES.PASSWORD}
        hint={FIELD_HINTS.PASSWORD}
        hintId={HINT_ID.PASSWORD}
			/>
			<FormControl
				error={errors.confirmPassword}
				label={LABELS.CONFIRM_PASSWORD}
				placeholder={PLACEHOLDERS.CONFIRM_PASSWORD}
				touched={touched.confirmPassword}
				variant={FIELD_CONTROL_VARIANT.PASSWORD}
				{...getFieldProps(FIELD_NAMES.CONFIRM_PASSWORD)}
        name={FIELD_NAMES.CONFIRM_PASSWORD}
			/>
			<FormButtons
				label={BUTTON_LABELS.REGISTER}
				dirty={dirty}
				isSubmitting={isSubmitting}
				isValid={isValid}
			/>
		</form>
	)
}

export default RegisterForm