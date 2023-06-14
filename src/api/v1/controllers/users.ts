import express from 'express'
import { CREATED } from 'http-status'

class UsersController {
  public async create(req: express.Request, res: express.Response) {
    res.status(CREATED).send({ message: 'created' })
  }
}
export default new UsersController() as UsersController
