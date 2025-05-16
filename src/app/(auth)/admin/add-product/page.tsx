"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, ProductStatus, ProductType } from "@/types/auth-type";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { FormValues, formSchema } from "./schema/add-product-schema";
import { FormHeader } from "./components/FormHeader";
import { ProductDetailsForm } from "./components/ProductDetailsForm";
import { ImageUploadForm } from "./components/ImageUploadForm";
import { useAddProduct } from "@/lib/products/fetch-all-products";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { getUserFromToken } from "@/lib/auth/get-user-from-token";
import { useAuth } from "@/provider/auth-provider";
export default function AddProductPage() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { mutate: addProduct } = useAddProduct();
  const queryClient = useQueryClient();
  const { setUser } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: ProductType.DRINK,
      price: 0,
      stock: 0,
      status: ProductStatus.AVAILABLE,
      imageUrl: "",
    },
  });

  const imageUrl = form.watch("imageUrl");

  useEffect(() => {
    if (imageUrl && !uploading) {
      setImagePreview(imageUrl);
    }
  }, [imageUrl, uploading]);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setImagePreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!
    );
    formData.append("folder", "Product");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        form.setValue("imageUrl", data.secure_url);
        setImagePreview(data.secure_url);
      } else {
        console.error("Upload failed", data);
      }
    } catch (err) {
      console.error("Cloudinary error", err);
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(values: FormValues) {
    try {
      addProduct(values as Product, {
        onSuccess: async () => {
          queryClient.invalidateQueries({ queryKey: ["all-products"] });

          const updatedUser = await getUserFromToken();
          setUser(updatedUser);
          toast.success("Product created successfully");
          router.push("/admin");
        },
        onError: (error) => {
          toast.error(`Failed to create product ${error}`);
        },
      });
    } catch (error) {
      toast.error(`Failed to create product ${error}`);
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card>
        <FormHeader />
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProductDetailsForm form={form} />
              <ImageUploadForm
                form={form}
                imagePreview={imagePreview}
                uploading={uploading}
                onImageUpload={handleImageUpload}
              />
            </div>

            <Button type="submit" disabled={uploading}>
              Create Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
