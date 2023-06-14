import { config } from '../config'

import express from 'express'
import cors from 'cors'

import appRouter from './api/v1/routes'

const app = express()

app.use(express.json())
app.use(cors(config.corsOptions))
app.use(express.urlencoded({ extended: true }))

app.use(appRouter)

export default app
