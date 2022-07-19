import convertImage from "../helpers/imageBuffer"
import path from 'path'

export const default_avatar_path = path.join(__dirname, "../Resources/avatar.png")

const DEFAULT_AVATAR = {
  FILENAME: "default_avatar.png",
  MIME_TYPE: "image/png",
  BUFFER: convertImage(default_avatar_path)
}

export default DEFAULT_AVATAR