import express from 'express'
import { developerRepository } from '../../../repositories/developer'
import { BAD_REQUEST, CREATED, NOT_FOUND } from 'http-status'
import { QueryFailedError } from 'typeorm'
import { developersProgrammingLanguagesRepository } from '../../../repositories/developersProgrammingLanguages'
import { DevelopersProgrammingLanguages } from '../../../models/developersProgrammingLanguages'
import { programmingLanguageRepository } from '../../../repositories/programmingLanguage'

class DeveloperProgrammingLanguages {
  async create(req: express.Request, res: express.Response) {
    try {
      const developer = await developerRepository.findOne({
        where: { id: req.params['id'] },
        relations: {
          programming_languages: true
        }
      })

      if (developer === null) {
        res.status(NOT_FOUND).send({ errors: { message: 'Record not found!' } })

        return
      }

      const programmingLanguage = await programmingLanguageRepository.findOne({
        where: { id: req.body.programming_language_id }
      })

      if (programmingLanguage !== null) {
        developer.programming_languages.push(programmingLanguage)
      }

      await developer.save({ reload: true })

      res.status(CREATED).send(developer)
    } catch (e: any) {
      if (e instanceof QueryFailedError) {
        res.status(BAD_REQUEST).send({ errors: e.driverError ?? JSON.stringify(e) })
        return
      }

      res.status(BAD_REQUEST).send({ errors: e.message ?? JSON.stringify(e) })
    }
  }
}

export const developerProgrammingLanguagesController = new DeveloperProgrammingLanguages()
