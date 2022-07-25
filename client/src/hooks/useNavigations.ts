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

	return { navigateToSignUp, navigateToSignIn }
}

export default useNavigation
