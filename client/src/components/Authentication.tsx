import { Outlet } from 'react-router'
import { DARK_CLASS } from '../constants/pages'
import useAuth from '../hooks/useAuth'
import useNavigation from '../hooks/useNavigations'
import useTheme from '../hooks/useTheme'
import AppHeader from './AppHeader'
import Sidebar from './Sidebar'

const Authentication = () => {
	const { isDark } = useTheme()
	const { isAuth } = useAuth()
	const { navigateToSignIn } = useNavigation()

	if (!isAuth) navigateToSignIn()

	return (
		<div className={isDark ? DARK_CLASS : ''}>
			<AppHeader />
			<Sidebar />
			<Outlet />
		</div>
	)
}

export default Authentication
