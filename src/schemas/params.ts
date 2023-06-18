import z from 'zod'

const paramsSchema = <T extends string[]>(params: T) => {
  const baseSchema = z.object({})
  return params.reduce((acc, param) => {
    return baseSchema.extend({
      [param]: z.string({ required_error: `${param} is required` }).uuid({ message: `${param} must be a uuid` })
    })
  }, baseSchema)
}

const s = paramsSchema(['1', '2'])
console.log(s)
export { paramsSchema }
