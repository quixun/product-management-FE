import * as z from "zod";

export const addStaffSchema = z.object({
  userName: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username cannot exceed 50 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z
    .string()
    .regex(/^[0-9\s]+$/, "Phone number should only contain numbers and spaces")
    .min(8, "Phone number is too short"),
});

export type AddStaffFormValues = z.infer<typeof addStaffSchema>;
