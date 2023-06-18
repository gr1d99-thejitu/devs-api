import { AppDataSource } from '../../config'
import { DevelopersProgrammingLanguages } from '../models/developersProgrammingLanguages'

export const developersProgrammingLanguagesRepository = AppDataSource.getRepository(DevelopersProgrammingLanguages)
