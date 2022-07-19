import mongoose from 'mongoose'

export interface CommentDocument extends mongoose.Document {
	postId: mongoose.Types.ObjectId
	authorId: mongoose.Types.ObjectId
	comment: string
	likes: number
	likers: mongoose.Types.ObjectId[]
	dislikes: number
	dislikers: mongoose.Types.ObjectId[]
}

const commentSchema = new mongoose.Schema(
	{
		postId: {
			type: mongoose.Types.ObjectId,
			ref: 'Post',
			required: true,
		},
		authorId: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		comment: {
			type: String,
			required: true,
		},
		likes: {
			type: Number,
			default: 0,
		},
		likers: {
			type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
			default: [],
		},
		dislikes: {
			type: Number,
			default: 0,
		},
		dislikers: {
			type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
			default: [],
		},
	},
	{ timestamps: true }
)

export default mongoose.model<CommentDocument>('Comment', commentSchema)
