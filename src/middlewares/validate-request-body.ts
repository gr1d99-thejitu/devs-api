import express from 'express'
import { BAD_REQUEST } from 'http-status'
import { user } from '../schemas/user'

const validateRequestBody = <T extends typeof user>(schema: T) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body)
      req.body['signed'] = 1
      next()
    } catch (e: any) {
      return res.status(BAD_REQUEST).send({ errors: e.errors })
    }
  }
}

export { validateRequestBody }
