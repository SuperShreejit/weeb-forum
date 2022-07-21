import '../sass/pages/_landing.scss'
import images from '../assets/images'
import BGImage from '../components/BGImage'
import Button from '../components/Button'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import { BUTTON_LABELS, BUTTON_VARIANT } from '../constants/button'
import { CONTAINER_CLASS } from '../constants/component'
import { HEADERS, HEADER_VARIANT } from '../constants/header'
import { DARK_CLASS, LANDING_CONTAINER_CLASS } from '../constants/pages'
import { PARAGRAPHS, PARAGRAPH_VARIANT } from '../constants/paragraph'

const Landing = () => {
	return (
		<main className={`${LANDING_CONTAINER_CLASS} ${DARK_CLASS}`}>
			<div className={CONTAINER_CLASS.FLEX_VERITICAL}>
				<Header variant={HEADER_VARIANT.PRIMARY_H2} text={HEADERS.LANDING} />
				<Paragraph
					text={PARAGRAPHS.LANDING}
					variant={PARAGRAPH_VARIANT.REGULAR}
				/>
				<div className={CONTAINER_CLASS.FLEX}>
					<Button
						label={BUTTON_LABELS.SIGN_UP}
						variant={BUTTON_VARIANT.ACCENT_HIGHLIGHTED_ROUNDED}
					/>
					<Button
						label={BUTTON_LABELS.SIGN_IN}
						variant={BUTTON_VARIANT.SECONDARY_BORDER_ROUNDED}
					/>
				</div>
			</div>
			<BGImage source={images.landing1Img} />
			<BGImage source={images.landing2Img} />
		</main>
	)
}

export default Landing
