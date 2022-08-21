import { CONTAINER_CLASS } from '../constants/component'
import { HEADERS, HEADER_VARIANT } from '../constants/header'
import { LINKS, LINK_VARIANT } from '../constants/links'
import { PARAGRAPHS, PARAGRAPH_VARIANT } from '../constants/paragraph'
import { CLIENT_ROUTES } from '../constants/routes'
import Header from './Header'
import NavLink from './NavLink'
import Paragraph from './Paragraph'
import useGoogleAuth from '../hooks/useGoogleAuth'
import FormAlert from './FormAlert'
import GoogleButton from './GoogleButton'

const LoginAlternate = () => {
	const { googleLoginFail } = useGoogleAuth()
	return (
		<div className={CONTAINER_CLASS.FLEX_VERITICAL}>
			<div className={CONTAINER_CLASS.FLEX}>
				<Paragraph
					text={PARAGRAPHS.FORGOT_PASSWORD}
					variant={PARAGRAPH_VARIANT.REGULAR}
				/>
				<NavLink
					label={LINKS.FORGOT_PASSWORD}
					variant={LINK_VARIANT.REGULAR_SECONDARY}
					to={CLIENT_ROUTES.FORGOT_PASSWORD}
				/>
			</div>
			<div className={CONTAINER_CLASS.FLEX}>
				<Paragraph
					text={PARAGRAPHS.REGISTER}
					variant={PARAGRAPH_VARIANT.REGULAR}
				/>
				<NavLink
					label={LINKS.SIGN_UP}
					variant={LINK_VARIANT.REGULAR_SECONDARY}
					to={CLIENT_ROUTES.REGISTER}
				/>
			</div>

			<Header text={HEADERS.SOCIAL_LOGIN} variant={HEADER_VARIANT.PRIMARY_H2} />

			{googleLoginFail && <FormAlert errorMsg={PARAGRAPHS.GOOGLE_LOGIN_FAIL} />}
			<GoogleButton />
		</div>
	)
}

export default LoginAlternate
