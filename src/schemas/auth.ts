import z from 'zod'
const authSchema = z.object({
  email: z.string({ required_error: 'Email is required!' }).email({ message: 'Invalid email provided' }),
  password: z.string({ required_error: 'Password is required!' })
})

export { authSchema }
