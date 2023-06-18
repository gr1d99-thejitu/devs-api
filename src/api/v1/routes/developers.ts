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
import { validateRequestParams } from '../../../middlewares/validate-request-params'

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

developersRouter
  .route('/developers/:id/programming-languages/:programmingLanguageId')
  .delete(
    authenticator.authenticate('jwt', { session: false }),
    validateRequestParams<[id: string, programmingLanguageId: string]>(['id', 'programmingLanguageId']),
    developerProgrammingLanguagesController.delete
  )

export { developersRouter }
