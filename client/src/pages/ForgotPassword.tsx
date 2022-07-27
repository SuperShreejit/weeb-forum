import ForgotPasswordForm from '../components/ForgotPasswordForm'
import ResetPasswordForm from '../components/ResetPasswordForm'
import Header from '../components/Header'
import { HEADERS, HEADER_VARIANT } from '../constants/header'
import { PAGE_CONTAINER_CLASS } from '../constants/pages'
import { IMAGE } from '../constants/Image'
import BGImage from '../components/BGImage'
import images from '../assets/images'
import '../sass/pages/_forgot-password.scss'
import { CONTAINER_CLASS } from '../constants/component'
import '../sass/pages/_forgot-password.scss'

const ForgotPassword = () => {
	return (
		<main className={PAGE_CONTAINER_CLASS.FORGOT_PASSWORD}>
			<div className={CONTAINER_CLASS.FLEX_VERITICAL}>
				<Header
					text={HEADERS.FORGOT_PASSWORD}
					variant={HEADER_VARIANT.PRIMARY_H2}
				/>
				<ForgotPasswordForm />

				<Header
					text={HEADERS.RESET_PASSWORD}
					variant={HEADER_VARIANT.PRIMARY_H2}
				/>
				<ResetPasswordForm />
			</div>
			<BGImage name={IMAGE.VERIFY} source={images.VerifyImg} />
		</main>
	)
}

export default ForgotPassword
