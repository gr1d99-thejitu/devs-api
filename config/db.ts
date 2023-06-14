import './env-config'

import 'reflect-metadata'
import { DataSource } from 'typeorm'
import * as process from 'process'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ['./src/models/*.ts'],
  migrations: ['./db/migrations/*.ts'],
  subscribers: ['./src/subscribers/*.ts']
})
