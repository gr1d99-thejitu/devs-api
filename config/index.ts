import './env-config'

import { Env } from '../src/types'
import * as packageJSON from '../package.json'
import { AppDataSource } from './db'

type EnvConfig = {
  dbConfig: typeof AppDataSource
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

const corsOptions = {
  origin: '*'
}

const test: EnvConfig = {
  version: packageJSON.version,
  corsOptions,
  dbConfig: AppDataSource
}

const development: EnvConfig = {
  version: packageJSON.version,
  corsOptions,
  dbConfig: AppDataSource
}

const production: EnvConfig = {
  version: packageJSON.version,
  corsOptions,
  dbConfig: AppDataSource
}

const configs: TConfig = { development, production, test }

const config = configs[APP_ENV as Env]

export { config }
