import express, { Application, NextFunction, Request, Response } from 'express'
import { UserRoutes } from './routes/user.routes'
import { BookRoutes } from './routes/book.routes'
import { DbConnection } from './database'

const app: Application = express()
const userRoutes = new UserRoutes().getRoutes()
const booksRoutes = new BookRoutes().getRoutes()
const dabase = new DbConnection()

dabase.connect()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', userRoutes)
app.use('/books', booksRoutes)

app.use(
	(err: Error, request: Request, response: Response, next: NextFunction) => {
		if (err instanceof Error) {
			return response.status(400).json({ message: err.message })
		}

		return response
			.status(500)
			.json({ status: 500, message: 'internal server error' })
	}
)

app.listen(3333, () => console.log('server online 🚀'))

//adm
//hfKohUQghsaJasPi
// mongodb+srv://adm:hfKohUQghsaJasPi@cluster0.ltu5lls.mongodb.net/bookapi
