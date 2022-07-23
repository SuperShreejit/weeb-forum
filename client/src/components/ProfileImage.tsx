import '../sass/components/_profile-img.scss'
import generateImageSource, { ImageType } from '../helpers/generateImageSource'
import {
	PROFILE_IMAGE_CONTAINER_CLASS,
	PROFILE_IMAGE_CLASS,
} from '../constants/Image'
import { Link, LinkProps } from 'react-router-dom'
import { CLIENT_ROUTES } from '../constants/routes'

type ProfileImageProps = LinkProps & {
	image: ImageType
	username: string
}

const ProfileImage = ({ image, username, ...rest }: ProfileImageProps) => {
	return (
		<Link
			className={PROFILE_IMAGE_CONTAINER_CLASS}
			{...rest}
			to={`${CLIENT_ROUTES.AUTH_BASE}\\${CLIENT_ROUTES.PROFILE}`}
		>
			<img
				className={PROFILE_IMAGE_CLASS}
				src={generateImageSource(image)}
				alt={username}
			/>
		</Link>
	)
}

export default ProfileImage
