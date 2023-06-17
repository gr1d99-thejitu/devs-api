import z from 'zod'
const developerSchema = z.object({
  title: z.string({ required_error: 'Title Name is required!' }),
  user_id: z.string({ required_error: 'User Id is required!' })
})

export { developerSchema }
