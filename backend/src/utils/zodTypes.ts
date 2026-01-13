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
  name: z.string().min(20).max(60),
  email: z.email(),
  password: z.string().min(8).max(16).refine(val => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine(val => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: "Password must contain at least one special character",
    }), // at least one uppercase letter and one special character.
  address: z.string().optional(),
  role: z.enum(['USER', 'ADMIN', 'OWNER']).optional(),
})

export const storeSchema = z.object({
  StoreName: z.string().min(5).max(60),
  StoreEmail: z.email(),
  StoreAddress: z.string().min(5).max(400),
  // StorePassword: z.string().min(8).max(16)
  //   .refine(val => /[A-Z]/.test(val), {
  //     message: "Password must contain at least one uppercase letter",
  //   })
  //   .refine(val => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
  //     message: "Password must contain at least one special character",
  //   }),
  OwnerName: z.string().min(5).max(60),
  OwnerEmail: z.email(),
  OwnerPassword: z.string().min(8).max(16)
    .refine(val => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine(val => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: "Password must contain at least one special character",
    }),
  OwnerAddress: z.string().min(5).max(400)
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

export type signupInputType = z.output<typeof signupSchema>
export type storeInputType = z.output<typeof storeSchema>