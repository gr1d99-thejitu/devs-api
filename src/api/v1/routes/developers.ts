import express from 'express'
import { validateRequestBody } from '../../../middlewares/validate-request-body'
import { developerSchema } from '../../../schemas/developer'
import { authenticator } from '../../../middlewares/authenticator'
import DevelopersController from '../controllers/developers'

const developersRouter = express.Router()

developersRouter
  .use(authenticator.authenticate('jwt', { session: false }))
  .route('/developers')
  .post(validateRequestBody(developerSchema), DevelopersController.create)
  .get(DevelopersController.all)

export { developersRouter }
