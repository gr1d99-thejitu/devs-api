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

developersRouter.post(
  '/',
  authenticator.authenticate('jwt', { session: false }),
  validateRequestBody(createDeveloperSchema),
  developersController.create
)
developersRouter.get('/', authenticator.authenticate('jwt', { session: false }), developersController.all)
developersRouter.put(
  '/:id',
  authenticator.authenticate('jwt', { session: false }),
  validateRequestBody(updateDeveloperSchema),
  developersController.update
)
developersRouter.post(
  '/:id/programming-languages',
  authenticator.authenticate('jwt', { session: false }),
  validateRequestBody(createDeveloperProgrammingLanguagesSchema),
  developerProgrammingLanguagesController.create
)
developersRouter.delete(
  '/:id/programming-languages/:programmingLanguageId',
  authenticator.authenticate('jwt', { session: false }),
  validateRequestParams<[id: string, programmingLanguageId: string]>(['id', 'programmingLanguageId']),
  developerProgrammingLanguagesController.delete
)

export { developersRouter }
