import express from 'express'
import { BAD_REQUEST, CREATED } from 'http-status'
import { QueryFailedError } from 'typeorm'
import { DeveloperRepository } from '../../../repositories/developer'

class DevelopersController {
  async create(req: express.Request, res: express.Response) {
    const repository = new DeveloperRepository()
    try {
      const developer = await repository.create(req.body)
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

export default new DevelopersController()
