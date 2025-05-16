"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../schema/add-product-schema";

interface ImageUploadFormProps {
  form: UseFormReturn<FormValues>;
  imagePreview: string | null;
  uploading: boolean;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ImageUploadForm({
  form,
  imagePreview,
  uploading,
  onImageUpload,
}: ImageUploadFormProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="imageUrl">Product Image</Label>
      <div className="space-y-4">
        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 h-64 relative">
          {imagePreview ? (
            <div className="relative w-full h-full">
              <Image
                src={imagePreview}
                alt="Product preview"
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                Click or drag to upload an image
              </p>
            </div>
          )}
          <Input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={onImageUpload}
            disabled={uploading}
          />
          <input
            type="hidden"
            id="imageUrl"
            {...form.register("imageUrl")}
          />
        </div>
        <div className="flex items-center gap-2 flex-col">
          <span>or paste a cloudinary URL</span>
          <Input
            id="imageUrl"
            type="text"
            placeholder="Enter cloudinary URL"
            {...form.register("imageUrl")}
          />
        </div>
        {uploading && (
          <p className="text-sm text-blue-500">
            Uploading image...
          </p>
        )}
      </div>
    </div>
  );
} 