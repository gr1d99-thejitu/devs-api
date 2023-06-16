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
  static async create(credentials: AuthCredentials): Promise<{ access_token: string; refresh_token: string } | null> {
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

    return {
      access_token: await this.generateJwt(user),
      refresh_token: await this.generateRefresh(user)
    }
  }

  static async generateJwt(user: User): Promise<string> {
    const secret = process.env.APP_SECRET_KEY
    const exp = 60 // Seconds
    const iat = Math.floor(Date.now() / 1000) - 1 // Backdate 1s
    return jsonwebtoken.sign({ identity: user.id, iat, kind: 'access' }, secret as string, {
      algorithm: 'HS512',
      expiresIn: exp
    })
  }

  static async generateRefresh(user: User): Promise<string> {
    const secret = process.env.APP_SECRET_KEY
    const exp = 60 * 2 // Seconds = 120 = 2 minutes
    const iat = Math.floor(Date.now() / 1000) - 1 // Backdate 1s
    return jsonwebtoken.sign({ identity: user.id, iat, kind: 'refresh' }, secret as string, {
      algorithm: 'HS512',
      expiresIn: exp
    })
  }
}

export { AuthService }
