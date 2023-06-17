import './env-config'

import { Env } from '../src/types'
import * as packageJSON from '../package.json'
import './db'
import { AppDataSource } from './db'
import process from 'process'

type EnvConfig = {
  dbConfig: typeof AppDataSource
  version: string
  corsOptions: {
    origin: string
  }
  appSecretKey: string | undefined
}

type TConfig = {
  [key in Env]: EnvConfig
}

// default values
// you can change the API_URL values to the ones defined in your .env.development file

const APP_ENV = process.env.NODE_ENV || 'development'
const APP_SECRET_KEY = process.env.APP_SECRET_KEY

const corsOptions = {
  origin: '*'
}

const defaultConfig = {
  version: packageJSON.version,
  corsOptions,
  dbConfig: AppDataSource,
  appSecretKey: APP_SECRET_KEY
}

const test: EnvConfig = {
  ...defaultConfig
}

const development: EnvConfig = {
  ...defaultConfig,
  corsOptions
}

const production: EnvConfig = {
  ...defaultConfig,
  corsOptions,
  dbConfig: AppDataSource
}

const configs: TConfig = { development, production, test }

const config = configs[APP_ENV as Env]

export { config, AppDataSource }
