import images from '../assets/images'
import BGImage from '../components/BGImage'
import Header from '../components/Header'
import VerifyEmailForm from '../components/VerifyEmailForm'
import { HEADERS, HEADER_VARIANT } from '../constants/header'
import { IMAGE } from '../constants/Image'
import { PAGE_CONTAINER_CLASS } from '../constants/pages'

const VerifyEmail = () => {
  return (
		<main className={PAGE_CONTAINER_CLASS.VERIFY_EMAIL}>
			<Header text={HEADERS.VERIFY_EMAIL} variant={HEADER_VARIANT.PRIMARY_H2} />
			<VerifyEmailForm />
			<BGImage name={IMAGE.VERIFY} source={images.VerifyImg} />
		</main>
	)
}

export default VerifyEmail