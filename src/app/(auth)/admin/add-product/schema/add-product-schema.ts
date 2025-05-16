import { z } from "zod";
import { ProductStatus, ProductType } from "@/types/auth-type";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  type: z.nativeEnum(ProductType),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  stock: z.coerce.number().int().nonnegative({
    message: "Stock must be a non-negative integer.",
  }),
  description: z.string().optional(),
  status: z.nativeEnum(ProductStatus),
  imageUrl: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;
