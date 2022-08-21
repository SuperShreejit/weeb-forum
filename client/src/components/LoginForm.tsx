import {
	FIELD_CONTROL_VARIANT,
	FIELD_NAMES,
	FORM_CLASS,
	LABELS,
	PLACEHOLDERS,
	SUCCESS_MESSAGE,
} from '../constants/forms'
import {
	loginValuesType,
	loginInitialValues,
	loginValidationSchema,
} from '../validations/login'
import { useFormik } from 'formik'
import { BUTTON_LABELS, BUTTON_TYPES, BUTTON_VARIANT } from '../constants/button'
import FormControl from './FormControl'
import '../sass/components/_form.scss'
import { useCallback, useEffect } from 'react'
import useLogin from '../hooks/useLogin'
import useNavigation from '../hooks/useNavigations'
import FormAlert from './FormAlert'
import getError from '../helpers/getError'
import Button from './Button'

const LoginForm = () => {
	const { mutate, isError, error, isLoading, isSuccess, data } = useLogin()

	const onSubmit = useCallback((values: loginValuesType) => mutate(values), [mutate])

	const { navigateToTimeline } = useNavigation()

	const {
		handleSubmit,
		dirty,
		isValid,
		errors,
		touched,
		getFieldProps,
	} = useFormik({
		initialValues: loginInitialValues,
		onSubmit,
		validationSchema: loginValidationSchema,
	})

	useEffect(() => {
		let timeout: NodeJS.Timeout
		if (isSuccess && typeof data !== 'string' && data.data.success)
			timeout = setTimeout(() => navigateToTimeline(), 2000)

		return () => clearInterval(timeout)
	}, [isSuccess, data, navigateToTimeline])

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

			{isError && <FormAlert errorMsg={getError(error) as string} />}
			{isSuccess && typeof data !== 'string' && !data.data.success && (
				<FormAlert errorMsg={data.data.msg} />
			)}
			{isSuccess && typeof data !== 'string' && data.data.success && (
				<FormAlert successMsg={SUCCESS_MESSAGE.LOGIN} />
			)}

			<Button
				type={BUTTON_TYPES.SUBMIT}
				label={BUTTON_LABELS.LOGIN}
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

export default LoginForm
