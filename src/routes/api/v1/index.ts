import express from 'express'
import { OK } from 'http-status'

const router = express.Router()

const pingApp = router.get('/ping', (req, res) => {
  res.status(OK).send('pong')
})

router.use('/api/v1', pingApp)

export default router
