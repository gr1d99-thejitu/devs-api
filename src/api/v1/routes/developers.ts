import express from 'express'
import { validateRequestBody } from '../../../middlewares/validate-request-body'
import { developerSchema } from '../../../schemas/developer'
import { authenticator } from '../../../middlewares/authenticator'
import DevelopersController from '../controllers/developers'

const developersRouter = express.Router()

developersRouter
  .route('/developers')
  .post(
    authenticator.authenticate('jwt', { session: false }),
    validateRequestBody(developerSchema),
    DevelopersController.create
  )
  .get(authenticator.authenticate('jwt', { session: false }), DevelopersController.all)

export { developersRouter }
