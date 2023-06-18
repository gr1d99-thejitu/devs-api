import express from 'express'
import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from 'http-status'
import { QueryFailedError } from 'typeorm'
import { developerRepository } from '../../../repositories/developer'

class DevelopersController {
  async create(req: express.Request, res: express.Response) {
    try {
      const draftDeveloper = developerRepository.create(req.body)
      const developer = await developerRepository.save(draftDeveloper)
      res.status(CREATED).send(developer)
    } catch (e: any) {
      if (e instanceof QueryFailedError) {
        res.status(BAD_REQUEST).send({ errors: e.driverError ?? JSON.stringify(e) })
        return
      }

      res.status(BAD_REQUEST).send({ errors: e.message ?? JSON.stringify(e) })
    }
  }

  async update(req: express.Request, res: express.Response) {
    try {
      const developer = await developerRepository.findOne({
        where: { id: req.params['id'] }
      })
      if (developer === null) {
        res.status(NOT_FOUND).send({ errors: { message: 'Record not found!' } })
        return
      }

      await developerRepository.save({ ...developer, ...req.body })
      await developer.reload()

      res.status(OK).send(developer)
    } catch (e: any) {
      if (e instanceof QueryFailedError) {
        res.status(BAD_REQUEST).send({ errors: e.driverError ?? JSON.stringify(e) })
        return
      }

      res.status(BAD_REQUEST).send({ errors: e.message ?? JSON.stringify(e) })
    }
  }

  async all(req: express.Request, res: express.Response) {
    try {
      const developers = await developerRepository.findAndCount({
        relations: {
          user: true,
          programming_languages: true
        }
      })
      res.status(OK).send(developers)
    } catch (e: any) {
      res.status(BAD_REQUEST).send({ errors: e.message ?? JSON.stringify(e) })
    }
  }
}

export const developersController = new DevelopersController()
