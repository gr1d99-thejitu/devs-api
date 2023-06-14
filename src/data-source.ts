import dotenv from 'dotenv'
import { config } from './config'

dotenv.config({ path: config.envFile })

import 'reflect-metadata'
import { DataSource } from 'typeorm'
import * as process from 'process'
import { User } from './entities/User'
import { Developer } from './entities/Developer'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ['./src/entities/*.ts'],
  migrations: ['./src/migrations/*.ts'],
  subscribers: ['./src/subscribers/*.ts']
})
