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
import { useCallback, useEffect } from 'react'
import '../sass/components/_form.scss'
import useRegister from '../hooks/useRegister'
import FormAlert from './FormAlert'
import getError from '../helpers/getError'
import Button from './Button'
import useNavigation from '../hooks/useNavigations'

const RegisterForm = () => {
	const { mutate, isError, error, isLoading, isSuccess, data } = useRegister()

	const { navigateToEmailVerify } = useNavigation()

	const onSubmit = useCallback(
		(values: registerValuesType) => {
			mutate(values)
		},
		[mutate],
	)

	const { handleSubmit, dirty, isValid, errors, touched, getFieldProps } =
		useFormik({
			initialValues: registerInitialValues,
			onSubmit,
			validationSchema: registerValidationSchema,
		})

	useEffect(() => {
		if (isSuccess && typeof data !== 'string' && data.data.success)
			setTimeout(() => navigateToEmailVerify(), 2000)
	}, [isSuccess, data, navigateToEmailVerify])

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
			{isSuccess && typeof data !== 'string' && !data.data.success && (
				<FormAlert errorMsg={data.data.msg} />
			)}
			{isSuccess && typeof data !== 'string' && data.data.success && (
				<FormAlert successMsg={SUCCESS_MESSAGE.REGISTER} />
			)}
			<Button
				type={BUTTON_TYPES.SUBMIT}
				label={BUTTON_LABELS.REGISTER}
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

export default RegisterForm
