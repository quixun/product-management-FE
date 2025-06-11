"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductStatus, ProductType } from "@/types/auth-type";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../schema/add-product-schema";

interface ProductDetailsFormProps {
  form: UseFormReturn<FormValues>;
}

export function ProductDetailsForm({ form }: ProductDetailsFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          placeholder="Enter product name"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className="text-sm text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Product Type</Label>
        <select
          id="type"
          className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1"
          {...form.register("type")}
        >
          <option value={ProductType.DRINK}>Drink</option>
          <option value={ProductType.FOOD}>Food</option>
          <option value={ProductType.BADMINTON}>Badminton</option>
        </select>
        {form.watch("type") === ProductType.BADMINTON && (
          <div className="space-y-2">
            <Label htmlFor="subtype">Badminton Subtype</Label>
            <select
              id="subtype"
              className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1"
              {...form.register("subtype")}
            >
              <option value="">Select subtype</option>
              <option value="vot">Vợt</option>
              <option value="balo">Balo</option>
              <option value="quan_can">Quấn cán</option>
              <option value="shoes">Shoes</option>
              <option value="cau">Cầu</option>
              <option value="quan_ao">Quần áo</option>
              <option value="khan_lau">Khăn lau</option>
            </select>
            {form.formState.errors.subtype && (
              <p className="text-sm text-red-500">
                {form.formState.errors.subtype.message}
              </p>
            )}
          </div>
        )}

        {form.formState.errors.type && (
          <p className="text-sm text-red-500">
            {form.formState.errors.type.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price (VND)</Label>
          <Input id="price" type="number" {...form.register("price")} />
          {form.formState.errors.price && (
            <p className="text-sm text-red-500">
              {form.formState.errors.price.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input id="stock" type="number" {...form.register("stock")} />
          {form.formState.errors.stock && (
            <p className="text-sm text-red-500">
              {form.formState.errors.stock.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1"
          {...form.register("status")}
        >
          <option value={ProductStatus.AVAILABLE}>Available</option>
        </select>
        {form.formState.errors.status && (
          <p className="text-sm text-red-500">
            {form.formState.errors.status.message}
          </p>
        )}
      </div>
    </div>
  );
}
