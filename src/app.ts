import { config } from '../config'

import apmServer from 'elastic-apm-node'

apmServer.start({
  serviceName: 'devs-api',
  serverUrl: 'http://127.0.0.1:8200'
})

import express from 'express'
import cors from 'cors'

import appRouter from './api/v1/routes'

const app = express()

app.use(express.json())
app.use(cors(config.corsOptions))
app.use(express.urlencoded({ extended: true }))

app.use(`/api/${config.apiVersion.current}`, appRouter)

export default app
