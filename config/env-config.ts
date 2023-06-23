import * as path from 'path'
import dotenv from 'dotenv'

let envFile = `.env.${process.env.NODE_ENV || 'development'}`

if (process.env.NODE_ENV === 'production') {
  envFile = `.env`
}

dotenv.config({ path: path.resolve(__dirname, `../${envFile}`) })
