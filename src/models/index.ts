import mongoose from 'mongoose'
import { v4 } from 'uuid'

const userSchema = new mongoose.Schema({
	_id: {
		type: String,
		// default: v4(),
	},
	name: String,
	email: String,
	password: String,
})

const User = mongoose.model('user', userSchema)

const booksSchema = new mongoose.Schema({
	_id: {
		type: String,
		// default: v4(),
	},
	name: String,
	author: String,
	company: String,
	read: Boolean,
	dateRead: Date,
	description: String,
	rate: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
})

const Books = mongoose.model('book', booksSchema)

export { User, Books }
