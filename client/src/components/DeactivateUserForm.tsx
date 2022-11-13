import { useFormik } from 'formik'
import React, { useCallback, useEffect } from 'react'
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
import getError from '../helpers/getError'
import useAuth from '../hooks/useAuth'
import useDeactivateUser from '../hooks/useDeactivateUser'
import useNavigation from '../hooks/useNavigations'
import useSendDeactivateUserOTP from '../hooks/useSendDeactivateUserOTP'
import {
	deactivateUserInitialValues,
	deactivateUserValidationSchema,
	DeactivateUserValuesType,
} from '../validations/deactivateUser'
import Button from './Button'
import FormAlert from './FormAlert'
import FormControl from './FormControl'

const DeactivateUserForm = () => {
	const { userId } = useAuth()

	const {
		data: sendDeactivateData,
		error: sendDeactivateError,
		isError: sendDeactivateIsError,
		isSuccess: sendDeactivateIsSuccess,
		isLoading: sendDeactivateIsLoading,
	} = useSendDeactivateUserOTP(userId)

	const { data, error, isError, isLoading, isSuccess, mutate } =
		useDeactivateUser(userId)

	const onSubmit = useCallback(
		(values: DeactivateUserValuesType) => mutate(values),
		[mutate],
	)

	const { navigateToSignIn } = useNavigation()

	const { handleSubmit, dirty, isValid, errors, touched, getFieldProps } =
		useFormik({
			initialValues: deactivateUserInitialValues,
			onSubmit,
			validationSchema: deactivateUserValidationSchema,
		})

	useEffect(() => {
		let timeout: NodeJS.Timeout
		if (isSuccess && typeof data !== 'string' && data.data.success)
			timeout = setTimeout(() => navigateToSignIn(), 2000)

		return () => clearInterval(timeout)
	}, [isSuccess, data, navigateToSignIn])

	return (
		<form className={FORM_CLASS} onSubmit={handleSubmit}>
			<Button
				type={BUTTON_TYPES.BUTTON}
				label={BUTTON_LABELS.SEND_OTP}
				variant={BUTTON_VARIANT.PRIMARY_ELEVATED_ROUNDED}
			/>
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
				<FormAlert successMsg={SUCCESS_MESSAGE.DEACTIVATE} />
			)}
			{sendDeactivateIsError && (
				<FormAlert errorMsg={getError(sendDeactivateError) as string} />
			)}
			{sendDeactivateIsSuccess &&
				typeof sendDeactivateData !== 'string' &&
				sendDeactivateData?.data.success === false && (
					<FormAlert errorMsg={sendDeactivateData?.data.msg} />
				)}
			{sendDeactivateIsSuccess &&
				typeof sendDeactivateData !== 'string' &&
				sendDeactivateData?.data.success && (
					<FormAlert successMsg={SUCCESS_MESSAGE.DEACTIVATE} />
				)}

			<Button
				type={BUTTON_TYPES.SUBMIT}
				label={BUTTON_LABELS.DEACTIVATE}
				variant={BUTTON_VARIANT.PRIMARY_ELEVATED_ROUNDED}
				disabled={
					!(isValid && dirty) ||
					isLoading ||
					(typeof data !== 'string' && isSuccess && data.data.success) ||
					sendDeactivateIsLoading ||
					(typeof sendDeactivateData !== 'string' &&
						sendDeactivateIsSuccess &&
						sendDeactivateData?.data.success === false)
				}
			/>
		</form>
	)
}

export default DeactivateUserForm
