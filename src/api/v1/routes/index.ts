import express from 'express'
import { OK } from 'http-status'
import { usersRouter } from './users'
import { authRouter } from './auth'
import { developersRouter } from './developers'
import { programmingLanguagesRouter } from './programmingLanguages'

const router = express.Router()

const pingApp = router.get('/ping', (req, res) => {
  res.status(OK).send('pong')
})

router.use('/api/v1', pingApp).use(usersRouter).use(authRouter).use(developersRouter).use(programmingLanguagesRouter)

export default router
