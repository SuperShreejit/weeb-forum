import { CONTAINER_CLASS } from '../constants/component'
import { HEADERS, HEADER_VARIANT } from '../constants/header'
import { LINKS, LINK_VARIANT } from '../constants/links'
import { PARAGRAPHS, PARAGRAPH_VARIANT } from '../constants/paragraph'
import { CLIENT_ROUTES } from '../constants/routes'
import GoogleButton from './GoogleButton'
import Header from './Header'
import NavLink from './NavLink'
import Paragraph from './Paragraph'

const LoginAlternate = () => {
  return (
    <div className={CONTAINER_CLASS.FLEX_VERITICAL}>
      <div className={CONTAINER_CLASS.FLEX}>
        <Paragraph text={PARAGRAPHS.FORGOT_PASSWORD} variant={PARAGRAPH_VARIANT.REGULAR} />
        <NavLink label={LINKS.FORGOT_PASSWORD} variant={LINK_VARIANT.REGULAR_SECONDARY} to={CLIENT_ROUTES.FORGOT_PASSWORD} />
      </div>
      <Header text={HEADERS.SOCIAL_LOGIN} variant={HEADER_VARIANT.PRIMARY_H2} />
      <GoogleButton />
    </div>
  )
}

export default LoginAlternate