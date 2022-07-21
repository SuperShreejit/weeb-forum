import { NAVBAR_CLASS } from '../constants/component'
import { LINKS, LINK_VARIANT } from '../constants/links'
import { CLIENT_ROUTES } from '../constants/routes'
import NavLink from './NavLink'

const Navbar = () => {
	return (
		<nav className={NAVBAR_CLASS}>
			<NavLink
				label={LINKS.HOME}
				variant={LINK_VARIANT.NAV_LINK_HOME}
				to={`${CLIENT_ROUTES.AUTH_BASE}/${CLIENT_ROUTES.TIMELINE}`}
			/>
			<NavLink
				label={LINKS.PROFILE}
				variant={LINK_VARIANT.NAV_LINK_PROFILE}
				to={`${CLIENT_ROUTES.AUTH_BASE}/${CLIENT_ROUTES.PROFILE}`}
			/>
			<NavLink
				label={LINKS.SEARCH}
				variant={LINK_VARIANT.NAV_LINK_SEARCH}
				to={`${CLIENT_ROUTES.AUTH_BASE}/${CLIENT_ROUTES.SEARCH}`}
			/>
			<NavLink
				label={LINKS.COMPOSE}
				variant={LINK_VARIANT.NAV_LINK_COMPOSE}
				to={`${CLIENT_ROUTES.AUTH_BASE}/${CLIENT_ROUTES.CREATE_POST}`}
			/>
			<NavLink
				label={LINKS.ALERTS}
				variant={LINK_VARIANT.NAV_LINK_ALERTS}
				to={`${CLIENT_ROUTES.AUTH_BASE}/${CLIENT_ROUTES.NOTIFICATIONS}`}
			/>
			<NavLink
				label={LINKS.SETTINGS}
				variant={LINK_VARIANT.NAV_LINK_SETTINGS}
				to={`${CLIENT_ROUTES.AUTH_BASE}/${CLIENT_ROUTES.SETTINGS}`}
			/>
		</nav>
	)
}

export default Navbar
