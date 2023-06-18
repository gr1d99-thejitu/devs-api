import { AppDataSource } from '../../config'
import { Developer } from '../models/developer'

const developerRepository = AppDataSource.getRepository(Developer)

export { developerRepository }
