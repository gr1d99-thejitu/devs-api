import { AppDataSource } from '../../config'
import { ProgrammingLanguage } from '../models/programmingLanguage'

export const programmingLanguageRepository = AppDataSource.getRepository(ProgrammingLanguage)
