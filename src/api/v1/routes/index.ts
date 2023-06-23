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

router.use('/ping', pingApp)

router.use('/users', usersRouter)
router.use('/auth', authRouter)
router.use('/developers', developersRouter)
router.use('/programming-languages', programmingLanguagesRouter)

export default router
