import express from 'express'
import { BAD_REQUEST } from 'http-status'

import { paramsSchema } from '../schemas/params'

const validateRequestParams = <T extends any[]>(params: T) => {
  const schema = paramsSchema(params)
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      req.params = await schema.parseAsync(req.params)
      next()
    } catch (e: any) {
      return res.status(BAD_REQUEST).send({ errors: e.errors })
    }
  }
}

export { validateRequestParams }
