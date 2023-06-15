import express from 'express'
import { BAD_REQUEST } from 'http-status'
import z from 'zod'

const validateRequestBody = (schema: z.infer<any>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body)
      next()
    } catch (e: any) {
      return res.status(BAD_REQUEST).send({ errors: e.errors })
    }
  }
}

export { validateRequestBody }
