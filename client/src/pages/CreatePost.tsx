import Header from '../components/Header'
import { CONTAINER_CLASS } from '../constants/component'
import { DARK_CLASS, PAGE_CONTAINER_CLASS } from '../constants/pages'
import { HEADERS, HEADER_VARIANT } from '../constants/header'
import CreatePostForm from '../components/CreatePostForm'
import BGImage from '../components/BGImage'
import { IMAGE } from '../constants/Image'
import images from '../assets/images'
import useTheme from '../hooks/useTheme'
import '../sass/pages/_create-post.scss'

const CreatePost = () => {
	const { isDark } = useTheme()

	return (
		<main
			className={
				isDark
					? `${PAGE_CONTAINER_CLASS.CREATE_POST} ${DARK_CLASS}`
					: PAGE_CONTAINER_CLASS.CREATE_POST
			}
		>
			<div className={CONTAINER_CLASS.FLEX_VERITICAL}>
				<Header
					text={HEADERS.CREATE_POST}
					variant={HEADER_VARIANT.PRIMARY_H2}
				/>
				<CreatePostForm />
			</div>
			<BGImage name={IMAGE.CREATE} source={images.CreateImg} />
		</main>
	)
}

export default CreatePost
