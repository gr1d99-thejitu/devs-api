import express from 'express'
import { authenticator } from '../../../middlewares/authenticator'
import { programmingLanguagesController } from '../controllers/programmingLanguages'
import { validateRequestBody } from '../../../middlewares/validate-request-body'
import { programmingLanguageSchema } from '../../../schemas/programmingLanguage'

const programmingLanguagesRouter = express.Router()

programmingLanguagesRouter
  .use(authenticator.authenticate('jwt', { session: false }))
  .route('/programming-languages')
  .post(validateRequestBody(programmingLanguageSchema), programmingLanguagesController.create)

export { programmingLanguagesRouter }
