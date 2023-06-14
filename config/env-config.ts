import path from 'path'
import dotenv from 'dotenv'

let envFile = path.join(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`)

if (!envFile && process.env.NODE_ENV === 'production') {
  envFile = path.join(process.cwd(), `.env`)
}

dotenv.config({ path: envFile })
