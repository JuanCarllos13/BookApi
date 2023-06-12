import { NextFunction, Request, Response } from 'express'
import { User } from '../models'

class UserController {
	index(request: Request, response: Response, next: NextFunction) {
		// buscar todas as informações
	}
	show(request: Request, response: Response, next: NextFunction) {
		//Buscar apenas um
	}

	async store(request: Request, response: Response, next: NextFunction) {
		//criar
		const { name, password, email } = request.body
		try {
			const findUser = await User.findOne({ email })

			if (findUser) {
				throw new Error('User already exists')
			}

			const createUser = await User.create({ name, password, email })

			return response.json(createUser)
		} catch (error) {
			next(error)
		}
	}

	updade(request: Request, response: Response, next: NextFunction) {
		//criar
	}
}
export { UserController }
