import { useFormik } from 'formik'
import { BUTTON_LABELS, BUTTON_TYPES, BUTTON_VARIANT } from '../constants/button'
import {
	FIELD_CONTROL_VARIANT,
	FIELD_HINTS,
	FIELD_NAMES,
	HINT_ID,
	LABELS,
	PLACEHOLDERS,
	FORM_CLASS,
	SUCCESS_MESSAGE,
} from '../constants/forms'
import {
	registerValidationSchema,
	registerValuesType,
	registerInitialValues,
} from '../validations/register'
import FormControl from './FormControl'
import { useCallback } from 'react'
import '../sass/components/_form.scss'
import useRegister from '../hooks/useRegister'
import FormAlert from './FormAlert'
import getError from '../helpers/getError'
import Button from './Button'

const RegisterForm = () => {
	const {mutate, isError, error, isLoading, isSuccess, data} = useRegister()
	const onSubmit = useCallback((values: registerValuesType) => mutate(values), [mutate])
	
	const {
		handleSubmit,
		dirty,
		isSubmitting,
		isValid,
		errors,
		touched,
		getFieldProps,
		values,
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
			{isError && <FormAlert errorMsg={getError(error) as string} />}
			{isSuccess && !data.data.success && (
				<FormAlert errorMsg={getError(error) as string} />
			)}
			{isSuccess && data.data.success && (
				<FormAlert successMsg={SUCCESS_MESSAGE.REGISTER} />
			)}
			<Button
				type={BUTTON_TYPES.SUBMIT}
				label={BUTTON_LABELS.REGISTER}
				variant={BUTTON_VARIANT.PRIMARY_ELEVATED_ROUNDED}
				disabled={!(isValid && dirty) || isSubmitting || isLoading}
			/>
		</form>
	)
}

export default RegisterForm
