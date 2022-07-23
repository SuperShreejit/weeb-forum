import '../sass/components/_bg-img.scss'
import {
	BG_IMAGE_CLASS,
	BG_IMAGE_CONTAINER_CLASS,
	BG_IMAGE_ALT,
	IMAGE,
} from '../constants/Image'

type BGImageProps = { source: string; name: IMAGE }

const BGImage = ({ source, name }: BGImageProps) => {
	return (
		<div className={`${BG_IMAGE_CONTAINER_CLASS} ${name}`} aria-hidden={true}>
			<img
				className={`${BG_IMAGE_CLASS} ${name}`}
				src={source}
				alt={BG_IMAGE_ALT}
				aria-hidden={true}
			/>
		</div>
	)
}

export default BGImage
