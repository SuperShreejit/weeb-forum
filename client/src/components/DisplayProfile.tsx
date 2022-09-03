import { PROFILE_CLASSES } from '../constants/profile'
import '../sass/components/_display-profile.scss'

type DisplayProfileProps = {
	username: string
	image: string
}

const DisplayProfile = ({ image, username }: DisplayProfileProps) => {
	return (
		<div className={PROFILE_CLASSES.PROFILE_IMAGE_CONATAINER}>
			<img
				className={PROFILE_CLASSES.PROFILE_IMAGE}
				src={image}
				alt={username}
			/>
		</div>
	)
}

export default DisplayProfile