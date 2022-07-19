import multer from 'multer'
import { AVATAR_MIME_TYPES } from '../constants/misc'
import ERRORS from '../constants/errors'

const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 1024 * 1024,
		files: 1,
	},
	fileFilter: (req, file, done) =>
		AVATAR_MIME_TYPES.includes(file.mimetype)
			? done(null, true)
			: done(new Error(ERRORS.INVALID_FILE_TYPE)),
})

export default upload
