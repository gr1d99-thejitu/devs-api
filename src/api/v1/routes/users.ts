import express from 'express'
import UsersController from '../controllers/users'

const usersRouter = express.Router()

usersRouter.post('/users', UsersController.create)

export { usersRouter }
