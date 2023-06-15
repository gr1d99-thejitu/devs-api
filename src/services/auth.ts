import { User } from '../models/User'
import { UserRepository } from '../repositories/user'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'

type AuthCredentials = {
  email: string
  password: string
}

class AuthService {
  static async isPasswordMatch(hashed: string, raw: string): Promise<boolean> {
    return bcrypt.compare(raw, hashed)
  }
  static async create(credentials: AuthCredentials): Promise<string | null> {
    const instance = new UserRepository()
    const userRepository = await instance.user()
    const user = await userRepository.findOne({
      where: {
        email: credentials.email
      },
      select: ['id', 'password', 'email']
    })

    if (user === null) {
      return null
    }

    const isPasswordMatch = await this.isPasswordMatch(user.password, credentials.password)

    if (!isPasswordMatch) {
      return null
    }

    return this.generateJwt(user)
  }

  static async generateJwt(user: User): Promise<string> {
    const secret = process.env.APP_SECRET_KEY
    const exp = Math.floor(Date.now() / 1000) + 60 * 60 // 1Hour
    const iat = Math.floor(Date.now() / 1000) - 1 // Backdate 1s
    return jsonwebtoken.sign({ identity: user.email, exp, iat }, secret as string, {
      algorithm: 'HS512'
    })
  }
}

export { AuthService }
