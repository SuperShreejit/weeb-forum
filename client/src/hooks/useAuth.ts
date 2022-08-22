import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../lib/redux/store'
import { AuthState, login, logoutUser } from '../lib/redux/features/auth.slice'
import { useCallback, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { QUERIES } from '../constants/queries'
import { SERVER_ROUTES } from '../constants/routes'
import axiosServer from '../lib/axios'
import useNavigation from './useNavigations'
import { AxiosResponse } from 'axios'

type UserType = {
	user: {
		id: string
		name: string
		username: string
		email: string
		authType: string
		avatarId: {
			id: string
			avatar: string
			mimeType: string
			filename: string
		}
	}
}

const useAuth = () => {
	const auth = useSelector<RootState, AuthState>(store => store.auth)
	const dispatch = useDispatch<AppDispatch>()
	const { navigateToSignIn } = useNavigation()

	const res = useQuery<AxiosResponse<UserType, any>>(
		[QUERIES.USER_PROFILE],
		() =>
			axiosServer
				.get<UserType>(
					SERVER_ROUTES.AUTH_BASE + SERVER_ROUTES.AUTH_CURRENT_USER,
				)
				.then((res: AxiosResponse<UserType, any>) => {
					dispatch(login(res.data.user.id))
					return res
				}),
	)

	const image = useMemo(() => {
		if (res.isLoading || res.isError) return {}

		if (res.isSuccess)
			return {
				mimeType: res.data?.data?.user?.avatarId.mimeType,
				buffer: res.data?.data?.user?.avatarId.avatar,
			}
	}, [res])

	const logout = useCallback(() => {
		dispatch(logoutUser())
		axiosServer.get(SERVER_ROUTES.AUTH_BASE + SERVER_ROUTES.AUTH_LOGOUT)
		navigateToSignIn()
	}, [dispatch, navigateToSignIn])

	return { ...auth, logout, user: res?.data?.data?.user, image, res }
}

export default useAuth
