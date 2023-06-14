import app from './src/app'
import { AppDataSource } from './src/data-source'

const port = process.env.PORT || 8080

AppDataSource.initialize()
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
    console.group()
    console.error('Datasource initialization error', error.message ?? JSON.stringify(error))
    console.groupEnd()
  })
