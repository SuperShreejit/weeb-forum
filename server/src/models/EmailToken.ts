import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import generateSalt from '../helpers/generateSalt'

export interface EmailTokenType extends mongoose.Document {
	userId: mongoose.Types.ObjectId
	token: string
	createdAt?: Date
	compareToken: (token: string) => boolean
}

const emailTokenSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		expires: 3600,
		default: Date.now(),
	},
})

emailTokenSchema.pre('save', async function (next) {
	try {
		if (this.isModified('token')) {
			const salt = await generateSalt()
			const hash = await bcrypt.hash(this.token, salt)
			this.token = hash
		}
		next()
	} catch (error) {
		next(error as Error)
	}
})

emailTokenSchema.methods.compareToken = async function (token: string) {
	return await bcrypt.compare(token, this.token)
}

export default mongoose.model<EmailTokenType>('EmailToken', emailTokenSchema)
