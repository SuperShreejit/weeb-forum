import {
	BG_IMAGE_CLASS,
	BG_IMAGE_CONTAINER_CLASS,
	BG_IMAGE_ALT,
} from '../constants/Image'

type BGImageProps = { source: string }

const BGImage = ({ source }: BGImageProps) => {
	return (
		<div className={BG_IMAGE_CONTAINER_CLASS} aria-hidden={true}>
			<img
				className={BG_IMAGE_CLASS}
				src={source}
				alt={BG_IMAGE_ALT}
				aria-hidden={true}
			/>
		</div>
	)
}

export default BGImage
