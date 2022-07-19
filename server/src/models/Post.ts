import mongoose from 'mongoose'

export interface PostDocument extends mongoose.Document {
	authorId: mongoose.Types.ObjectId
	title: string
	post: string
	likes?: number
	likers?: mongoose.Types.ObjectId[]
	dislikes?: number
	dislikers?: mongoose.Types.ObjectId[]
	commentCount?: number
	comments?: mongoose.Types.ObjectId[]
	keys?: string[]
}

const postSchema = new mongoose.Schema(
	{
		authorId: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		post: {
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
		commentCount: {
			type: Number,
			default: 0,
		},
		comments: {
			type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
			default: [],
		},
		keys: {
			type: [String],
			default: [],
		},
	},
	{ timestamps: true }
)

export default mongoose.model<PostDocument>('Post', postSchema)
