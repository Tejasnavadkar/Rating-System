import z from 'zod'

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