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


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,16}$/;

export const createStoreSchema = z.object({
  StoreName: z
    .string()
    .min(3, "Store name should be between 3 and 60 characters")
    .max(60, "Store name should be between 3 and 60 characters"),

  StoreEmail: z
    .string()
    .regex(emailRegex, "Enter valid store email"),

  StoreAddress: z
    .string()
    .max(400, "Store address must not exceed 400 characters"),

  OwnerName: z
    .string()
    .min(3, "Owner name should be between 3 and 60 characters")
    .max(60, "Owner name should be between 3 and 60 characters"),

  OwnerEmail: z
    .string()
    .regex(emailRegex, "Enter valid owner email"),

  OwnerPassword: z
    .string()
    .regex(
      passwordRegex,
      `Password must have:
• 8–16 characters
• At least one uppercase letter
• At least one special character`
    ),

  OwnerAddress: z
    .string()
    .max(400, "Owner address must not exceed 400 characters"),
});

