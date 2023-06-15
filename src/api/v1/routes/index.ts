import express from 'express'
import { OK } from 'http-status'
import { usersRouter } from './users'
import { authRouter } from './auth'

const router = express.Router()

const pingApp = router.get('/ping', (req, res) => {
  res.status(OK).send('pong')
})

router.use('/api/v1', pingApp)
router.use(usersRouter)
router.use(authRouter)

export default router
