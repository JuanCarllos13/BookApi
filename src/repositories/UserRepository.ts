import { User } from '../models'

interface ICreate {
	email: string
	password: string
	name: string
}

interface IPagination {
	size: number
	page: number
}

class UserRepository {
	async findByEmail(email: string) {
		const result = await User.findOne({ email })

		return result
	}

	async findById(id: string) {
		const result = await User.findById(id)

		return result
	}

	async createUser({ email, name, password }: ICreate) {
		const createUser = await User.create({ email, password, name })
		return createUser
	}

	async findAll({ page, size }: IPagination) {
		const result = await User.find()
			.skip((page - 1) * size)
			.limit(size)
			.exec()
		return result
	}

	async UpdatePassword(id: string, password: string) {
		const result = await User.findById(id).updateOne({ password })

		return result
	}

	async UpdateName(id: string, name: string) {
		const result = await User.findById(id).updateOne({ name })

		return result
	}

	async delete(id: string) {
		const result = await User.findByIdAndRemove(id)

		return result
	}
}

export { UserRepository }
