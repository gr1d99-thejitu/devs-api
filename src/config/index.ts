import path from 'path'

import { Env } from '../types'
import * as packageJSON from '../../package.json'

type EnvConfig = {
  envFile: string
  version: string
  corsOptions: {
    origin: string
  }
}

type TConfig = {
  [key in Env]: EnvConfig
}

// default values
// you can change the API_URL values to the ones defined in your .env.development file

const APP_ENV = process.env.NODE_ENV || 'development'
const envFile = path.join(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`)

const corsOptions = {
  origin: '*'
}

const test: EnvConfig = {
  version: packageJSON.version,
  corsOptions,
  envFile
}

const development: EnvConfig = {
  version: packageJSON.version,
  corsOptions,
  envFile
}

const production: EnvConfig = {
  version: packageJSON.version,
  corsOptions,
  envFile
}

const configs: TConfig = { development, production, test }

const config = configs[APP_ENV as Env]

export { config }
