import z from 'zod'
const auth = z.object({
  email: z.string({ required_error: 'Email is required!' }).email({ message: 'Invalid email provided' }),
  password: z.string({ required_error: 'Password is required!' })
})

export { auth }
