import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { CLIENT_ROUTES } from '../constants/routes'

const useNavigation = () => {
	const navigate = useNavigate()

	const navigateToSignUp = useCallback(
		() => navigate(CLIENT_ROUTES.REGISTER),
		[navigate],
	)

	const navigateToSignIn = useCallback(() => navigate(CLIENT_ROUTES.LOGIN), [navigate])

	const goBack = useCallback(() => navigate(-1), [navigate])

	const navigateToEmailVerify = useCallback(() => navigate(CLIENT_ROUTES.VERIFY_EMAIL), [navigate])

	return { navigateToSignUp, navigateToSignIn, goBack, navigateToEmailVerify }
}

export default useNavigation
