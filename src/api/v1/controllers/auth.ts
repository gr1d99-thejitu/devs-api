import express from 'express'
import { BAD_REQUEST, OK, UNAUTHORIZED } from 'http-status'
import { AuthService } from '../../../services/auth'

class AuthController {
  async create(req: express.Request, res: express.Response) {
    try {
      const token = await AuthService.create(req.body)

      if (token === null) {
        res.status(UNAUTHORIZED).send({
          errors: {
            message: 'Incorrect email or password'
          }
        })
        return
      }

      res.status(OK).send({ jwt_token: token })
    } catch (e: any) {
      res.status(BAD_REQUEST).send({
        errors: e.message ?? JSON.stringify(e)
      })
    }
  }
}

export default new AuthController() as AuthController
