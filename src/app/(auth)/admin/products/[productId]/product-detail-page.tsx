"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit, Trash, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatPriceWithDots } from "@/lib/utils";
import { Product, ProductStatus, ProductType } from "@/types/auth-type";
import {
  useAllProducts,
  useDeleteProductById,
  useUpdateProductById,
} from "@/lib/products/fetch-all-products";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/provider/auth-provider";
import { getUserFromToken } from "@/lib/auth/get-user-from-token";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
type ProductDetailPageProps = {
  productId: string;
};

export default function ProductDetailPage({
  productId,
}: ProductDetailPageProps) {
  const router = useRouter();
  const { data: products, isLoading, error } = useAllProducts();
  const { mutate: updateProduct } = useUpdateProductById(productId);
  const { mutate: deleteProduct } = useDeleteProductById();
  const [editMode, setEditMode] = useState(false);
  const [formState, setFormState] = useState<Partial<Product>>({});
  const queryClient = useQueryClient();
  const { setUser } = useAuth();

  if (isLoading)
    return <div className="container mx-auto py-10">Loading...</div>;
  if (error || !products)
    return <div className="container mx-auto py-10">Error loading product</div>;

  const product = products.find((p: Product) => p.id === productId);
  if (!product) return <p>Product not found</p>;

  const handleChange = <K extends keyof Product>(
    field: K,
    value: Product[K]
  ) => {
    if (field === "price" || field === "stock") {
      const numValue = Number(value);
      if (numValue < 0) {
        toast.error(`${field} cannot be negative`);
        return;
      }
    }
    setFormState({ ...formState, [field]: value });
  };

  const handleSave = async () => {
    try {
      updateProduct(formState as Product, {
        onSuccess: async () => {
          setEditMode(false);
          toast.success("Product updated successfully");
          queryClient.invalidateQueries({ queryKey: ["all-products"] });
          const updatedUser = await getUserFromToken();
          setUser(updatedUser);
        },
        onError: (e) => {
          toast.error(`Failed to update product ${e}`);
        },
      });
    } catch (e) {
      toast.error(`Failed to update product ${e}`);
    }
  };

  const handleDelete = async () => {
    try {
      deleteProduct(productId, {
        onSuccess: async () => {
          toast.success("Product deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["all-products"] });
          const updatedUser = await getUserFromToken();
          setUser(updatedUser);
          router.push("/admin");
        },
        onError: (e) => {
          toast.error(`Failed to delete product ${e}`);
        },
      });
    } catch (e) {
      toast.error(`Failed to delete product ${e}`);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <Image
                src={product.imageUrl || "/placeholder.png"}
                alt={product.name}
                width={600}
                height={600}
                className="object-cover w-full h-auto rounded-lg"
                priority
                quality={100}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              {editMode ? (
                <input
                  className="text-2xl font-semibold border rounded px-2 py-1"
                  value={formState.name ?? product.name}
                  onChange={(e) =>
                    handleChange("name", e.target.value as Product["name"])
                  }
                />
              ) : (
                <CardTitle className="text-2xl">{product.name}</CardTitle>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Type</h3>
                  {editMode ? (
                    <select
                      className="mt-1 border rounded px-2 py-1 w-full"
                      value={formState.type ?? product.type}
                      onChange={(e) =>
                        handleChange("type", e.target.value as Product["type"])
                      }
                    >
                      {Object.values(ProductType).map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="mt-1 text-lg capitalize">{product.type}</p>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Price</h3>
                  {editMode ? (
                    <input
                      type="number"
                      value={formState.price ?? product.price}
                      className="mt-1 border rounded px-2 py-1 w-full"
                      onChange={(e) =>
                        handleChange(
                          "price",
                          parseInt(e.target.value) as Product["price"]
                        )
                      }
                    />
                  ) : (
                    <p className="mt-1 text-lg font-semibold">
                      {formatPriceWithDots(product.price)}
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  {editMode ? (
                    <select
                      className="mt-1 border rounded px-2 py-1 w-full"
                      value={formState.status ?? product.status}
                      onChange={(e) =>
                        handleChange(
                          "status",
                          e.target.value as Product["status"]
                        )
                      }
                    >
                      {Object.values(ProductStatus).map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded-sm text-sm font-medium ${
                        product.status === "available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Stock</h3>
                  {editMode ? (
                    <input
                      type="number"
                      value={formState.stock ?? product.stock}
                      className="mt-1 border rounded px-2 py-1 w-full"
                      onChange={(e) =>
                        handleChange(
                          "stock",
                          parseInt(e.target.value) as Product["stock"]
                        )
                      }
                    />
                  ) : (
                    <p className="mt-1 text-lg">{product.stock} units</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Created At
                </h3>
                <p className="mt-1">
                  {new Date(product.createdAt).toLocaleString()}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Last Updated
                </h3>
                <p className="mt-1">
                  {new Date(product.updatedAt).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            {editMode ? (
              <>
                <Button
                  variant="default"
                  className="flex-1 cursor-pointer transition-all duration-300"
                  onClick={handleSave}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 cursor-pointer transition-all duration-300"
                  onClick={() => {
                    setFormState({});
                    setEditMode(false);
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="flex-1 cursor-pointer hover:bg-gray-100 transition-all duration-300"
                  onClick={() => setEditMode(true)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Product
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="flex-1 cursor-pointer hover:bg-red-500 transition-all duration-300"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Product
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete this product.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>
                        Confirm Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
