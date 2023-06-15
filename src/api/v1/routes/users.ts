import express from 'express'
import UsersController from '../controllers/users'
import { validateRequestBody } from '../../../middlewares/validate-request-body'
import { user } from '../../../schemas/user'

const usersRouter = express.Router()

usersRouter.post('/users', validateRequestBody(user), UsersController.create)

export { usersRouter }
