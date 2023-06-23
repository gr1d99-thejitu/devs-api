import express from 'express'
import { authenticator } from '../../../middlewares/authenticator'
import { programmingLanguagesController } from '../controllers/programmingLanguages'
import { validateRequestBody } from '../../../middlewares/validate-request-body'
import { programmingLanguageSchema } from '../../../schemas/programmingLanguage'

const programmingLanguagesRouter = express.Router()

programmingLanguagesRouter.get('/', programmingLanguagesController.all)
programmingLanguagesRouter.post(
  '/',
  authenticator.authenticate('jwt', { session: false }),
  validateRequestBody(programmingLanguageSchema),
  programmingLanguagesController.create
)

export { programmingLanguagesRouter }
