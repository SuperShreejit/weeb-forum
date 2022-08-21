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
	PLACEHOLDERS,
	SUCCESS_MESSAGE,
} from '../constants/forms'
import useEmailVerify from '../hooks/useEmailVerify'
import {
	verifyEmailInitialValues,
	verifyEmailValidationSchema,
	VerifyEmailValuesType,
} from '../validations/verifyEmail'
import Button from './Button'
import FormControl from './FormControl'
import '../sass/components/_form.scss'
import { useCallback, useEffect } from 'react'
import FormAlert from './FormAlert'
import getError from '../helpers/getError'
import Paragraph from './Paragraph'
import { PARAGRAPHS, PARAGRAPH_VARIANT } from '../constants/paragraph'
import useNavigation from '../hooks/useNavigations'

const VerifyEmailForm = () => {
	const {
		verifyEmail,
		getOTP,
		OTPIsError,
		OTPData,
		OTPError,
		OTPIsSuccess,
		verifyEmailData,
		verifyEmailError,
		verifyEmailIsError,
		verifyEmailIsLoading,
		verifyEmailIsSuccess,
	} = useEmailVerify()

	const onSubmit = useCallback(
		(values: VerifyEmailValuesType) => verifyEmail(values),
		[verifyEmail],
	)

	const { navigateToSignIn } = useNavigation()

	const {
		handleSubmit,
		values,
		dirty,
		isValid,
		errors,
		touched,
		getFieldProps,
	} = useFormik({
		initialValues: verifyEmailInitialValues,
		onSubmit,
		validationSchema: verifyEmailValidationSchema,
	})

	const handleOTP = useCallback(() => {
		getOTP({ email: values.email })
	}, [getOTP, values])

	useEffect(() => {
		let timeout: NodeJS.Timeout
		if (
			verifyEmailIsSuccess &&
			typeof verifyEmailData !== 'string' &&
			verifyEmailData?.data.success
		)
			timeout = setTimeout(() => navigateToSignIn(), 2000)

		return () => clearTimeout(timeout)
	}, [verifyEmailIsSuccess, verifyEmailData, navigateToSignIn])

	return (
		<form className={FORM_CLASS} onSubmit={handleSubmit}>
			<Paragraph
				variant={PARAGRAPH_VARIANT.REGULAR}
				text={PARAGRAPHS.VERIFY_EMAIL}
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

			<div className={CONTAINER_CLASS.FLEX_VERITICAL}>
				{OTPIsError && <FormAlert errorMsg={getError(OTPError) as string} />}
				{OTPIsSuccess &&
					typeof OTPData !== 'string' &&
					OTPData?.data.success === false && (
						<FormAlert errorMsg={OTPData?.data.msg} />
					)}
				{OTPIsSuccess &&
					typeof OTPData !== 'string' &&
					OTPData?.data.success === true && (
						<FormAlert successMsg={SUCCESS_MESSAGE.SEND_OTP} />
					)}

				<Button
					label={BUTTON_LABELS.SEND_OTP}
					variant={BUTTON_VARIANT.PRIMARY_ELEVATED_ROUNDED}
					type={BUTTON_TYPES.BUTTON}
					onClick={handleOTP}
					disabled={!touched.email || Boolean(errors.email)}
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

			{verifyEmailIsError && (
				<FormAlert errorMsg={getError(verifyEmailError) as string} />
			)}
			{verifyEmailIsSuccess &&
				typeof verifyEmailData !== 'string' &&
				verifyEmailData?.data.success === false && (
					<FormAlert errorMsg={verifyEmailData?.data.msg} />
				)}
			{verifyEmailIsSuccess &&
				typeof verifyEmailData !== 'string' &&
				verifyEmailData?.data.success === true && (
					<FormAlert successMsg={SUCCESS_MESSAGE.EMAIL_VERIFY} />
				)}

			<Button
				type={BUTTON_TYPES.SUBMIT}
				label={BUTTON_LABELS.VERIFY_EMAIL}
				variant={BUTTON_VARIANT.PRIMARY_ELEVATED_ROUNDED}
				disabled={!(isValid && dirty) || verifyEmailIsLoading}
			/>
		</form>
	)
}

export default VerifyEmailForm
