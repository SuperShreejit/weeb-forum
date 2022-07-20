export type ImageType = {
	mimeType: string
	buffer: string
}

const generateImageSource = (image: ImageType) =>
	`data:${image.mimeType};base64,${image.buffer}`

export default generateImageSource
