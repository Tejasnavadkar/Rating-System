import z from 'zod'


// enum Role {
//     USER,
//     ADMIN,
//     OWNER
// }
// interface signupType {
//   name : String,
//   email : String, 
//   password : String,
//   address : String,
//   role : Role,
//   stores : Store[]
//   ratings : Rating[]
// }


export const signupSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
  address: z.string().optional(),
  role: z.enum(['USER', 'ADMIN', 'OWNER']).optional(),
})

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

export type signupInputType = z.output<typeof signupSchema>