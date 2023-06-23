import express from 'express'
import { BAD_REQUEST, CREATED, OK, UNPROCESSABLE_ENTITY } from 'http-status'
import { UserRepository } from '../../../repositories/user'
import { UserService } from '../../../services/users'
import { programmingLanguageRepository } from '../../../repositories/programmingLanguage'

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

  async all(req: express.Request, res: express.Response) {
    try {
      const repository = new UserRepository()
      const usersRepository = await repository.user()
      const users = await usersRepository.findAndCount()

      res.status(OK).send(users)
    } catch (e: any) {
      const error = { message: e.message ?? JSON.stringify(e) }

      res.status(BAD_REQUEST).send({ errors: error })
    }
  }
}
export default new UsersController()
