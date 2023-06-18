import z from 'zod'

export const programmingLanguageSchema = z.object({
  name: z.string({ required_error: 'Name is required!' })
})
