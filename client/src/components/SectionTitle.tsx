import {
	SECTION_TITLE,
	SECTION_TITLE_CLASS,
	SECTION_TITLE_LINE,
} from '../constants/component'
import { HEADER_VARIANT } from '../constants/header'
import Header from './Header'
import '../sass/components/_section-title.scss'

type SectionTitleProps = {
	title: SECTION_TITLE
}

const SectionTitle = ({ title }: SectionTitleProps) => {
	return (
		<div className={SECTION_TITLE_CLASS}>
			<div className={SECTION_TITLE_LINE}></div>
			<Header variant={HEADER_VARIANT.SECONDARY_H3} text={title} />
			<div className={SECTION_TITLE_LINE}></div>
		</div>
	)
}

export default SectionTitle
