import express from 'express'
import { BAD_REQUEST, CREATED, UNPROCESSABLE_ENTITY } from 'http-status'
import { UserRepository } from '../../../repositories/user'
import { UserService } from '../../../services/users'

class UsersController {
  async create(req: express.Request, res: express.Response) {
    const repository = new UserRepository()
    const userRepository = await repository.user()
    try {
      const emailExist = await repository.emailExists(req.body['email'])

      if (emailExist) {
        res.status(UNPROCESSABLE_ENTITY).send({
          errors: {
            message: 'Email exists'
          }
        })

        return
      }

      const isPasswordMatch = await repository.isPasswordMatch(req.body['password'], req.body['confirm_password'])

      if (!isPasswordMatch) {
        res.status(UNPROCESSABLE_ENTITY).send({
          errors: {
            message: "Passwords don't match"
          }
        })

        return
      }

      req.body.password = await UserService.hashPassword(req.body.password)

      const user = userRepository.create(req.body)
      await userRepository.save(user)
      const userRecord = await userRepository.findOneBy({ email: req.body.email })
      res.status(CREATED).send(userRecord)
    } catch (e: any) {
      res.status(BAD_REQUEST).send({ errors: e.driverError ?? JSON.stringify(e) })
    }
  }
}
export default new UsersController()
