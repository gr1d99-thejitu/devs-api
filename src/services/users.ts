import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

class UserService {
  static async hashPassword(password: string) {
    return bcrypt.genSalt(SALT_ROUNDS).then((salt) => {
      return bcrypt.hash(password, salt)
    })
  }
  static async isPasswordMatch(password: string, confirmPassword: string) {
    return password === confirmPassword
  }
}

export { UserService }
