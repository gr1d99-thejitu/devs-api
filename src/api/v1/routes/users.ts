import express from 'express'
import UsersController from '../controllers/users'
import { validateRequestBody } from '../../../middlewares/validate-request-body'
import { userSchema } from '../../../schemas/user'
import { authenticator } from '../../../middlewares/authenticator'

const usersRouter = express.Router()

usersRouter.post('/users', validateRequestBody(userSchema), UsersController.create)
usersRouter.get('/users', authenticator.authenticate('jwt', { session: false }))

export { usersRouter }
