import '../sass/components/_title.scss'
import { TITLE, TITLE_CLASS, TITLE_LINK_CLASS } from '../constants/header'
import { Link } from 'react-router-dom'

const Title = ({ path }) => (
	<h1 className={TITLE_CLASS}>
		<Link className={TITLE_LINK_CLASS} to={path}>{TITLE}</Link>
	</h1>
)

export default Title
