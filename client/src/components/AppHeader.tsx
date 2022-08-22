import '../sass/components/_app-header.scss'
import { BUTTON_LABELS, BUTTON_VARIANT } from '../constants/button'
import { APP_HEADER_CLASS } from '../constants/header'
import Button from './Button'
import Title from './Title'
import useAuth from '../hooks/useAuth'
import { CONTAINER_CLASS } from '../constants/component'
import ProfileImage from './ProfileImage'
import NavLink from './NavLink'
import { LINK_VARIANT } from '../constants/links'
import { CLIENT_ROUTES } from '../constants/routes'
import Loading from './Loading'
import Paragraph from './Paragraph'
import { PARAGRAPH_VARIANT } from '../constants/paragraph'
import { DARK_CLASS } from '../constants/pages'
import useTheme from '../hooks/useTheme'
import getError from '../helpers/getError'
import { QUERY_ERRORS } from '../constants/queries'
import IconButton from './IconButton'
import { ICON_BUTTON_VARIANT } from '../constants/iconButton'

const header_class = (isDark: boolean) =>
	`${APP_HEADER_CLASS} ${isDark ? DARK_CLASS : ''}`

const AppHeader = () => {
	const { logout, user, image, res } = useAuth()
	const { isDark } = useTheme()

	if (res.isLoading)
		return (
			<header className={header_class(isDark)}>
				<Title path={`${CLIENT_ROUTES.AUTH_BASE}/${CLIENT_ROUTES.TIMELINE}`} />
				<Loading />
			</header>
		)

	if (res.isError || !user || !image?.mimeType || !image?.buffer)
		return (
			<header className={header_class(isDark)}>
				<Title path={`${CLIENT_ROUTES.AUTH_BASE}/${CLIENT_ROUTES.TIMELINE}`} />
				<Paragraph
					variant={PARAGRAPH_VARIANT.REGULAR}
					text={`${QUERY_ERRORS.FETCH_USER_FAILED}: ${getError(res.error)}`}
				/>
			</header>
		)

	return (
		<header className={header_class(isDark)}>
			<Title path={`${CLIENT_ROUTES.AUTH_BASE}/${CLIENT_ROUTES.TIMELINE}`} />
			<div className={CONTAINER_CLASS.FLEX}>
				<div className={CONTAINER_CLASS.FLEX}>
					<ProfileImage
						image={image}
						to={`${CLIENT_ROUTES.AUTH_BASE}/${CLIENT_ROUTES.PROFILE}`}
						username={user?.name}
					/>
					<NavLink
						label={user?.name}
						variant={LINK_VARIANT.CAPTION_LINK}
						to={`${CLIENT_ROUTES.AUTH_BASE}/${CLIENT_ROUTES.PROFILE}`}
					/>
				</div>
				<Button
					label={BUTTON_LABELS.LOGOUT}
					variant={BUTTON_VARIANT.SECONDARY_BORDER_ROUNDED}
					onClick={logout}
				/>
				<IconButton variant={ICON_BUTTON_VARIANT.LOGOUT}  />
			</div>
		</header>
	)
}

export default AppHeader
