import mongoose from 'mongoose'

class DbConnection {
	async connect() {
		try {
			await mongoose.connect('mongodb://localhost:27017/bookapi'
			)
			console.log('Connected to MongoDB')
		} catch (error) {
			console.log('Error connecting to MongoDB')
		}
	}
}

export { DbConnection }
