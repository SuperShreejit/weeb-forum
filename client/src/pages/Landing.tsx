import '../sass/pages/_landing.scss'
import images from '../assets/images'
import BGImage from '../components/BGImage'
import Button from '../components/Button'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import { BUTTON_LABELS, BUTTON_VARIANT } from '../constants/button'
import { CONTAINER_CLASS } from '../constants/component'
import { HEADERS, HEADER_VARIANT } from '../constants/header'
import { DARK_CLASS, PAGE_CONTAINER_CLASS } from '../constants/pages'
import { PARAGRAPHS, PARAGRAPH_VARIANT } from '../constants/paragraph'
import useTheme from '../hooks/useTheme'
import { IMAGE } from '../constants/Image'
import useNavigation from '../hooks/useNavigations'

const landingClass = (isDark: boolean) =>
	`${PAGE_CONTAINER_CLASS.LANDING} ${isDark ? DARK_CLASS : ''}`

const Landing = () => {
	const { isDark } = useTheme()
	const { navigateToSignUp, navigateToSignIn } = useNavigation()
	return (
		<main className={landingClass(isDark)}>
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
						onClick={navigateToSignUp}
					/>
					<Button
						label={BUTTON_LABELS.SIGN_IN}
						variant={BUTTON_VARIANT.SECONDARY_BORDER_ROUNDED}
						onClick={navigateToSignIn}
					/>
				</div>
			</div>
			<BGImage source={images.landing1Img} name={IMAGE.LANDING1} />
			<BGImage source={images.landing2Img} name={IMAGE.LANDING2} />
		</main>
	)
}

export default Landing
