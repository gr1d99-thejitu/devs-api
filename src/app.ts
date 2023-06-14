import { config } from '../config'

import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors(config.corsOptions))
app.use(express.urlencoded({ extended: true }))

export default app
