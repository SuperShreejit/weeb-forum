import '../sass/components/_navlink.scss'
import {
	LINKS,
	LINK_CLASS,
	LINK_LABEL_CLASS,
	LINK_VARIANT,
} from '../constants/links'
import { Link, LinkProps } from 'react-router-dom'
import { MdHomeFilled, MdNotifications, MdSettings, MdSearch } from 'react-icons/md'
import { FaFeatherAlt, FaUserCircle } from 'react-icons/fa'
import { NAVLINK_ICON_SIZE } from '../constants/component'

type NavLinkProp = LinkProps & {
	variant: LINK_VARIANT
	label: LINKS | string
}

const NavLink = ({ variant, label, to, ...rest }: NavLinkProp) => {
	switch (variant) {
		case LINK_VARIANT.NAV_LINK_HOME:
			return (
				<Link
					className={`${LINK_CLASS.NAV_LINK} ${LINK_CLASS.NAV_LINK_ACTIVE}`}
					to={to}
					{...rest}
				>
					<MdHomeFilled size={NAVLINK_ICON_SIZE} />
					<span className={LINK_LABEL_CLASS}>{label}</span>
				</Link>
			)
		case LINK_VARIANT.NAV_LINK_ALERTS:
			return (
				<Link className={LINK_CLASS.NAV_LINK} to={to} {...rest}>
					<MdNotifications size={NAVLINK_ICON_SIZE} />
					<span className={LINK_LABEL_CLASS}>{label}</span>
				</Link>
			)
		case LINK_VARIANT.NAV_LINK_COMPOSE:
			return (
				<Link className={LINK_CLASS.NAV_LINK} to={to} {...rest}>
					<FaFeatherAlt size={NAVLINK_ICON_SIZE} />
					<span className={LINK_LABEL_CLASS}>{label}</span>
				</Link>
			)
		case LINK_VARIANT.NAV_LINK_SEARCH:
			return (
				<Link className={LINK_CLASS.NAV_LINK} to={to} {...rest}>
					<MdSearch size={NAVLINK_ICON_SIZE} />
					<span className={LINK_LABEL_CLASS}>{label}</span>
				</Link>
			)
		case LINK_VARIANT.NAV_LINK_PROFILE:
			return (
				<Link className={LINK_CLASS.NAV_LINK} to={to} {...rest}>
					<FaUserCircle size={NAVLINK_ICON_SIZE} />
					<span className={LINK_LABEL_CLASS}>{label}</span>
				</Link>
			)
		case LINK_VARIANT.NAV_LINK_SETTINGS:
			return (
				<Link className={LINK_CLASS.NAV_LINK} to={to} {...rest}>
					<MdSettings size={NAVLINK_ICON_SIZE} />
					<span className={LINK_LABEL_CLASS}>{label}</span>
				</Link>
			)
		case LINK_VARIANT.REGULAR_PRIMARY:
			return (
				<Link
					className={`${LINK_CLASS.REGULAR} ${LINK_CLASS.PRIMARY}`}
					to={to}
					{...rest}
				>
					{label}
				</Link>
			)
		case LINK_VARIANT.REGULAR_SECONDARY:
			return (
				<Link
					className={`${LINK_CLASS.REGULAR} ${LINK_CLASS.SECONDARY}`}
					to={to}
					{...rest}
				>
					{label}
				</Link>
			)
		case LINK_VARIANT.CAPTION_LINK:
			return (
				<Link
					className={`${LINK_CLASS.CAPTION}`}
					to={to}
					{...rest}
				>
					{label}
				</Link>
			)
		default:
			return null
	}
}

export default NavLink
