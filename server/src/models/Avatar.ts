import mongoose from 'mongoose'

export interface AvatarDocument extends mongoose.Document {
	userId: mongoose.Types.ObjectId
	filename: string
	avatar: Buffer
	mimeType: string
}

const avatarSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		filename: {
			type: String,
			required: true
		},
		avatar: {
			type: Buffer,
			required: true,
		},
		mimeType: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

export default mongoose.model<AvatarDocument>('Avatar', avatarSchema)