import { NextFunction, Request, Response, request } from 'express'
import { compare, hash } from 'bcrypt'
import { UserRepository } from '../repositories/UserRepository'

interface IUpdateData {
	name: string
	password: string
}

class UserController {
	private userRepository: UserRepository
	constructor() {
		this.userRepository = new UserRepository()
	}

	async index(request: Request, response: Response, next: NextFunction) {
		// buscar todas as informações
		const { page, size } = request.query

		const DEFAULT_PAGE = 1
		const DEFAULT_SIZE = 10

		const pageNumber = page ? parseInt(page as string, 10) : DEFAULT_PAGE
		const pageSize = size ? parseInt(size as string, 10) : DEFAULT_SIZE

		try {
			const result = await this.userRepository.findAll({
				page: pageNumber,
				size: pageSize,
			})
			return response.json(result)
		} catch (error) {
			next(error)
		}
	}
	async show(request: Request, response: Response, next: NextFunction) {
		//Buscar apenas um
		const { id } = request.params
		try {
			const result = await this.userRepository.findById(id)

			return response.json(result)
		} catch (error) {
			next(error)
		}
	}

	async store(request: Request, response: Response, next: NextFunction) {
		//criar
		const { name, password, email } = request.body
		try {
			const findUser = await this.userRepository.findByEmail(email)

			if (findUser) {
				throw new Error('User already exists')
			}

			const hasPassword = await hash(password, 8)

			const createUser = await this.userRepository.createUser({
				email,
				password: hasPassword,
				name,
			})

			return response.json(createUser)
		} catch (error) {
			next(error)
		}
	}

	async update(request: Request, response: Response, next: NextFunction) {
		//criar
		const { id } = request.params
		const { name, password, oldPassword } = request.body

		try {
			const findUser = await this.userRepository.findById(id)

			if (!findUser) {
				throw new Error('User not found')
			}

			const data = {} as IUpdateData

			if (password && oldPassword && findUser.password) {
				const hasPassword = await compare(oldPassword, findUser.password)
				if (!hasPassword) {
					throw new Error('Old password is incorrect')
				}
				const NewPassword = await hash(password, 8)

				data.password = NewPassword
				await this.userRepository.UpdatePassword(NewPassword, id)
			}

			if (name) {
				data.name = name
				await this.userRepository.UpdateName(name, id)
			}

			return response.json({ message: 'Successfully updated' })
		} catch (e) {
			next(e)
		}
	}

	async delete(request: Request, response: Response, next: NextFunction) {
		const { id } = request.params

		try {
			const findUser = await this.userRepository.findById(id)

			if (!findUser) {
				throw new Error('User not found')
			}
			const result = await this.userRepository.delete(id)

			return response.json(result)
		} catch (error) {
			next(error)
		}
	}
}
export { UserController }
