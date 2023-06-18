import express from 'express'
import { validateRequestBody } from '../../../middlewares/validate-request-body'
import {
  createDeveloperProgrammingLanguagesSchema,
  createDeveloperSchema,
  updateDeveloperSchema
} from '../../../schemas/developer'
import { authenticator } from '../../../middlewares/authenticator'
import { developersController } from '../controllers/developers'
import { developerProgrammingLanguagesController } from '../controllers/developerProgrammingLanguages'

const developersRouter = express.Router()

developersRouter
  .route('/developers')
  .post(
    authenticator.authenticate('jwt', { session: false }),
    validateRequestBody(createDeveloperSchema),
    developersController.create
  )
  .get(authenticator.authenticate('jwt', { session: false }), developersController.all)

developersRouter
  .route('/developers/:id')
  .put(
    authenticator.authenticate('jwt', { session: false }),
    validateRequestBody(updateDeveloperSchema),
    developersController.update
  )

developersRouter
  .route('/developers/:id/programming-languages')
  .post(
    authenticator.authenticate('jwt', { session: false }),
    validateRequestBody(createDeveloperProgrammingLanguagesSchema),
    developerProgrammingLanguagesController.create
  )

export { developersRouter }
