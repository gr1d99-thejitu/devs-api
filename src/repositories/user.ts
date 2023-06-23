import { AppDataSource } from '../../config'
import { User } from '../models/user'
import { Repository } from 'typeorm'
import { UserService } from '../services/users'

class UserRepository {
  private repository: Repository<User>
  private usersService: UserService

  constructor() {
    this.repository = AppDataSource.getRepository(User)
  }
  async user() {
    return this.repository
  }

  async emailExists(email: string): Promise<boolean> {
    return !!(await this.repository.findOneBy({ email }))
  }
  async isPasswordMatch(password: string, confirmPassword: string): Promise<boolean> {
    return await UserService.isPasswordMatch(password, confirmPassword)
  }
}

export { UserRepository }
