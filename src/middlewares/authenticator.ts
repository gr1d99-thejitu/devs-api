import passport from 'passport'
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'
import { UserRepository } from '../repositories/user'
import { config } from '../../config'

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.appSecretKey
}

const authenticator = passport.use(
  new Strategy(options, async (payload, done) => {
    const repository = await new UserRepository().user()
    const user = await repository.findOneBy({
      id: payload.identity
    })

    if (user === null) {
      return done(false, false)
    }

    if (user) {
      return done(null, user)
    }
  })
)

export { authenticator }
