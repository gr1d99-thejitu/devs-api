import express from 'express'
import { BAD_REQUEST, CREATED, NO_CONTENT, NOT_FOUND } from 'http-status'
import { QueryFailedError } from 'typeorm'

import { developerRepository } from '../../../repositories/developer'
import { programmingLanguageRepository } from '../../../repositories/programmingLanguage'
import { developersProgrammingLanguagesRepository } from '../../../repositories/developersProgrammingLanguages'

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

  async delete(req: express.Request, res: express.Response) {
    try {
      const { id, programmingLanguageId } = req.params
      const developerProgrammingLanguage = await developersProgrammingLanguagesRepository.findOne({
        where: {
          developer_id: id,
          programming_language_id: programmingLanguageId
        }
      })

      if (developerProgrammingLanguage === null) {
        res.status(NOT_FOUND).send({ errors: { message: 'Developer record not found!' } })

        return
      }

      if (developerProgrammingLanguage) {
        await developersProgrammingLanguagesRepository.remove(developerProgrammingLanguage)
      }

      res.status(NO_CONTENT).send(null)
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
}

export const developerProgrammingLanguagesController = new DeveloperProgrammingLanguages()
