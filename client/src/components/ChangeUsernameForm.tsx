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
import { HEADERS, HEADER_VARIANT } from '../constants/header'
import getError from '../helpers/getError'
import useAuth from '../hooks/useAuth'
import useChangeUsername from '../hooks/useChangeUsername'
import {
	ChangeUsernameType,
	ChangeUsernameValidationSchema,
	initialChangeUsernameValues,
} from '../validations/changeUsername'
import Button from './Button'
import FormAlert from './FormAlert'
import FormControl from './FormControl'
import Header from './Header'

const ChangeUsernameForm = () => {
	const { userId } = useAuth()

	const { data, error, isError, isSuccess, mutate,isLoading } = useChangeUsername(userId)

	const onSubmit = useCallback(
		(values: ChangeUsernameType) => mutate(values),
		[mutate],
	)

	const { handleSubmit, dirty, isValid, errors, touched, getFieldProps } =
		useFormik({
			initialValues: initialChangeUsernameValues,
			onSubmit,
			validationSchema: ChangeUsernameValidationSchema,
		})

	return (
		<form className={FORM_CLASS} onSubmit={handleSubmit}>
			<Header text={HEADERS.CHANGE_USERNAME} variant={HEADER_VARIANT.SECONDARY_H3} />
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
				<FormAlert successMsg={SUCCESS_MESSAGE.CHANGE_USERNAME} />
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

export default ChangeUsernameForm
