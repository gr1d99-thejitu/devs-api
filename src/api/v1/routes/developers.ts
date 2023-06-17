import express from 'express'
import { validateRequestBody } from '../../../middlewares/validate-request-body'
import { developerSchema } from '../../../schemas/developer'
import { authenticator } from '../../../middlewares/authenticator'
import DevelopersController from '../controllers/developers'

const developersRouter = express.Router()

developersRouter.post(
  '/developers',
  authenticator.authenticate('jwt', { session: false }),
  validateRequestBody(developerSchema),
  DevelopersController.create
)

export { developersRouter }
