import {
  FIELD_CONTROL_VARIANT,
	FIELD_NAMES,
	FORM_CLASS,
	LABELS,
	PLACEHOLDERS,
} from '../constants/forms'
import {
	loginValuesType,
	loginInitialValues,
	loginValidationSchema,
} from '../validations/login'
import { useFormik } from 'formik'
import { BUTTON_LABELS } from '../constants/button'
import FormButtons from './FormButtons'
import FormControl from './FormControl'
import '../sass/components/_form.scss'

const onSubmit = (values: loginValuesType) => {}

const LoginForm = () => {
	const {
		handleSubmit,
		dirty,
		isSubmitting,
		isValid,
		errors,
		touched,
		getFieldProps,
	} = useFormik({
		initialValues: loginInitialValues,
		onSubmit,
		validationSchema: loginValidationSchema,
	})

	return (
		<form className={FORM_CLASS} onSubmit={handleSubmit}>
			<FormControl
				error={errors.username}
				label={LABELS.USERNAME}
				placeholder={PLACEHOLDERS.USERNAME}
				touched={touched.username}
				variant={FIELD_CONTROL_VARIANT.TEXT}
				{...getFieldProps(FIELD_NAMES.USERNAME)}
				name={FIELD_NAMES.USERNAME}
			/>
			<FormControl
				error={errors.password}
				label={LABELS.PASSWORD}
				placeholder={PLACEHOLDERS.PASSWORD}
				touched={touched.password}
				variant={FIELD_CONTROL_VARIANT.PASSWORD}
				{...getFieldProps(FIELD_NAMES.PASSWORD)}
				name={FIELD_NAMES.PASSWORD}
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

export default LoginForm
