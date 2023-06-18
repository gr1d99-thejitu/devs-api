import z from 'zod'
const createDeveloperSchema = z.object({
  title: z.string({ required_error: 'Title Name is required!' }),
  user_id: z.string({ required_error: 'User Id is required!' })
})

const updateDeveloperSchema = createDeveloperSchema.merge(
  z.object({
    title: z.string().optional(),
    user_id: z.string().optional()
  })
)

const createDeveloperProgrammingLanguagesSchema = z.object({
  programming_language_id: z.string()
})

export { createDeveloperSchema, updateDeveloperSchema, createDeveloperProgrammingLanguagesSchema }
