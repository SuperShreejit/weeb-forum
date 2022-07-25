import { Outlet } from 'react-router'
import { DARK_CLASS } from '../constants/pages'
import useTheme from '../hooks/useTheme'
import AppHeader from './AppHeader'
import Sidebar from './Sidebar'

const divClass = (isDark: boolean) => (isDark ? DARK_CLASS : '')

const Authentication = () => {
	const { isDark } = useTheme()
	return (
		<div className={divClass(isDark)}>
			<AppHeader />
			<Sidebar />
			Authentication
			<Outlet />
		</div>
	)
}

export default Authentication
