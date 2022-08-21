import { useCallback } from 'react'
import { useLocation } from 'react-router'
import { SERVER_ROUTES } from '../constants/routes'

const useGoogleAuth = () => {
	const search = useLocation().search
	const googleLoginFail = new URLSearchParams(search).get('googleLoginFail')

	const googleLogin = useCallback(() => {
		window.open(
			SERVER_ROUTES.SERVER_BASE +
				SERVER_ROUTES.SERVER_URL_BASE +
				SERVER_ROUTES.AUTH_BASE +
				SERVER_ROUTES.AUTH_LOGIN_GOOGLE,
			'_self',
		)
	}, [])

	return { googleLoginFail, googleLogin }
}

export default useGoogleAuth
