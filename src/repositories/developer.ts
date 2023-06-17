import { AppDataSource } from '../../config'
import { Developer } from '../models/developer'

interface DeveloperAttributes {
  title: string
  user_id: string
}

class DeveloperRepository {
  developers() {
    return AppDataSource.getRepository(Developer)
  }

  async create(attributes: DeveloperAttributes) {
    const repository = this.developers()
    const draftUser = repository.create(attributes)
    return await repository.save(draftUser)
  }
}

export { DeveloperRepository }
