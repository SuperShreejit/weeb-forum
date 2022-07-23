import AppTitlebar from '../components/AppTitlebar'
import { Outlet } from 'react-router'

const PublicLayout = () => {
	return (
		<div>
			<AppTitlebar />
			<Outlet />
		</div>
	)
}

export default PublicLayout
