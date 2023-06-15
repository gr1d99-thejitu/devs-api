import app from './src/app'
import { config } from './config'

const port = process.env.PORT || 8080

config.dbConfig
  .initialize()
  .then(() => {
    console.group()
    console.info('App datasource initialized!starting application server!')
    console.info('Starting application server!')
    console.groupEnd()

    app.listen(port, () => {
      console.log(`App running on port ${port}`)
    })
  })
  .catch((error: any) => {
    console.log(error)
    console.group()
    console.error('Datasource initialization error', error.message ?? JSON.stringify(error))
    console.groupEnd()
  })
