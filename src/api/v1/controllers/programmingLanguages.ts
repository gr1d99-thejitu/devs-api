import express from 'express'
import { BAD_REQUEST, CREATED, OK } from 'http-status'
import { QueryFailedError } from 'typeorm'
import { programmingLanguageRepository } from '../../../repositories/programmingLanguage'

export class ProgrammingLanguagesController {
  async create(req: express.Request, res: express.Response) {
    try {
      const draft = programmingLanguageRepository.create(req.body)
      const programmingLanguage = await programmingLanguageRepository.save(draft)

      res.status(CREATED).send(programmingLanguage)
    } catch (e: any) {
      let error
      if (e instanceof QueryFailedError) {
        error = { message: e.driverError.detail }
      } else {
        error = { message: e.message ?? JSON.stringify(e) }
      }

      res.status(BAD_REQUEST).send({ errors: error })
    }
  }

  async all(req: express.Request, res: express.Response) {
    try {
      const developers = await programmingLanguageRepository.findAndCount()

      res.status(OK).send(developers)
    } catch (e: any) {
      const error = { message: e.message ?? JSON.stringify(e) }

      res.status(BAD_REQUEST).send({ errors: error })
    }
  }
}

export const programmingLanguagesController = new ProgrammingLanguagesController()
