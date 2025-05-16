import { z } from "zod";

export const restoreStaffSchema = z.object({
  userName: z
    .string()
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username must be at most 20 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters")
    .regex(
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      "Password too weak"
    ),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(8, "Phone number is too short"),
});

export type RestoreStaffFormData = z.infer<typeof restoreStaffSchema>;
