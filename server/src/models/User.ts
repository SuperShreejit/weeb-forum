import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import generateSalt from '../helpers/generateSalt'
import { STRATEGY } from '../constants/misc'

export interface UserDocument extends mongoose.Document {
	name: string
	username: string
	username_changed?: boolean
	email: string
	authType: STRATEGY
	verified?: boolean
	authId?: string
	password?: string
	avatarId: mongoose.Types.ObjectId
	comparePassword(inputPassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true
		},
		username_changed: {
			type: Boolean,
			default: false
		},
		authType: {
			type: String,
			required: true,
		},
		authId: {
			type: String,
			default: '',
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			default: '',
		},
		verified: {
			type: Boolean,
			default: false,
		},
		avatarId: {
			type: mongoose.Types.ObjectId,
			ref: 'Avatar',
			default: ''
		}
	},
	{ timestamps: true }
)

userSchema.pre('save', async function (next) {
	try {
		if (this.isModified('password') && this.password) {
			const salt = await generateSalt()
			const hash = await bcrypt.hash(this.password, salt)
			this.password = hash
		}
		next()
	} catch (error) {
		next(error as Error)
	}
})

userSchema.methods.comparePassword = async function (password: string) {
	return await bcrypt.compare(password, this.password)
}

export default mongoose.model<UserDocument>('User', userSchema)
