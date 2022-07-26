import { useCallback } from 'react'
import { ForgotPasswordType } from '../validations/forgotPassword'
import { VerifyEmailValuesType } from '../validations/verifyEmail'

type GetOTPType = (values: VerifyEmailValuesType | ForgotPasswordType) => void

const useGetOTP = () => {
	const getOTP: GetOTPType = useCallback(values => {}, [])

	return getOTP
}

export default useGetOTP
