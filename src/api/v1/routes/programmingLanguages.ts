import express from 'express'
import { authenticator } from '../../../middlewares/authenticator'
import { programmingLanguagesController } from '../controllers/programmingLanguages'
import { validateRequestBody } from '../../../middlewares/validate-request-body'
import { programmingLanguageSchema } from '../../../schemas/programmingLanguage'

const programmingLanguagesRouter = express.Router()

programmingLanguagesRouter
  .route('/programming-languages')
  .post(
    authenticator.authenticate('jwt', { session: false }),
    validateRequestBody(programmingLanguageSchema),
    programmingLanguagesController.create
  )
  .get(programmingLanguagesController.all)

export { programmingLanguagesRouter }
