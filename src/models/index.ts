import mongoose from 'mongoose'
import { v4 } from 'uuid'

const userSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: v4(),
	},
	name: String,
	email: String,
	password: String,
})

const User = mongoose.model('user', userSchema)

export { User }
