import images from '../assets/images'
import BGImage from '../components/BGImage'
import EditPostForm from '../components/EditPostForm'
import Header from '../components/Header'
import { CONTAINER_CLASS } from '../constants/component'
import { HEADERS, HEADER_VARIANT } from '../constants/header'
import { IMAGE } from '../constants/Image'
import { DARK_CLASS, PAGE_CONTAINER_CLASS } from '../constants/pages'
import useTheme from '../hooks/useTheme'

const EditPost = () => {
	const { isDark } = useTheme()

	return (
		<main
			className={
				isDark
					? `${PAGE_CONTAINER_CLASS.EDIT_POST} ${DARK_CLASS}`
					: PAGE_CONTAINER_CLASS.EDIT_POST
			}
		>
			<div className={CONTAINER_CLASS.FLEX_VERITICAL}>
				<Header
					text={HEADERS.EDIT_POST}
					variant={HEADER_VARIANT.PRIMARY_H2}
				/>
				<EditPostForm />
			</div>
			<BGImage name={IMAGE.CREATE} source={images.CreateImg} />
		</main>
	)
}

export default EditPost
