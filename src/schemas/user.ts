import z from 'zod'
const user = z
  .object({
    full_names: z.string({ required_error: 'Full Name is required!' }),
    email: z.string({ required_error: 'Email is required!' }).email({ message: 'Invalid email provided' }),
    password: z
      .string({ required_error: 'Password is required!' })
      .min(6, 'Password must have a minimum of 6 characters'),
    confirm_password: z.string({ required_error: 'Confirm password is required' })
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password']
  })

export { user }
