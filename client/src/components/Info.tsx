import { CONTAINER_CLASS } from '../constants/component'
import { LINKS, LINK_VARIANT } from '../constants/links'
import { PARAGRAPH_VARIANT, PARAGRAPHS } from '../constants/paragraph'
import { CLIENT_ROUTES } from '../constants/routes'
import NavLink from './NavLink'
import Paragraph from './Paragraph'

const Info = () => {
  return (
    <div className={CONTAINER_CLASS.FLEX_VERITICAL}>
      <Paragraph variant={PARAGRAPH_VARIANT.REGULAR} text={PARAGRAPHS.COPYRIGHT} />
      <Paragraph variant={PARAGRAPH_VARIANT.REGULAR} text={PARAGRAPHS.CREATOR} />
      <NavLink label={LINKS.PRIVACY_POLICY} variant={LINK_VARIANT.REGULAR_SECONDARY} to={CLIENT_ROUTES.PRIVACY_POLICY} />
      <NavLink label={LINKS.TERMS_CONDITIONS} variant={LINK_VARIANT.REGULAR_SECONDARY} to={CLIENT_ROUTES.TERMS_CONDITIONS} />
    </div>
  )
}

export default Info