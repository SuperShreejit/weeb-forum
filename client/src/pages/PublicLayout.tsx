import AppTitlebar from '../components/AppTitlebar'
import { Outlet } from 'react-router'

const PublicLayout = () => {
	return (
		<>
			<AppTitlebar />
			<Outlet />
		</>
	)
}

export default PublicLayout
