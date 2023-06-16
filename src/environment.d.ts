import { Env } from './types'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: Env
      PORT: number
      PWD: string
      DB_USER: string
      DB_PASS: string
      DB_NAME: string
      DB_HOST: string
      APP_SECRET_KEY: string
      ACCESS_TOKEN_DURATION: string
      REFRESH_TOKEN_DURATION: string
    }
  }
}
