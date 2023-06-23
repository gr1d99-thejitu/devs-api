import './env-config'

import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm'

const dbOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: ['./src/models/*.ts'],
  migrations: ['./db/migrations/*.ts'],
  subscribers: ['./src/subscribers/*.ts']
}

export const AppDataSource = new DataSource(dbOptions)
