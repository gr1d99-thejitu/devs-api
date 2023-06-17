import express from 'express'
import AuthController from '../controllers/auth'
import { validateRequestBody } from '../../../middlewares/validate-request-body'
import { authSchema } from '../../../schemas/auth'

const authRouter = express.Router()

authRouter.post('/auth/login', validateRequestBody(authSchema), AuthController.create)

export { authRouter }
