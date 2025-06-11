import { Product } from "@/types/auth-type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "../auth/fetch-with-auth";

export const useAllProducts = () => {
  return useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_BASE_URL}/products`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      return response.json();
    },
  });
};

export const useAddProduct = () => {
  return useMutation({
    mutationFn: async (newProduct: Product) => {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_BASE_URL}/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(newProduct),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      return response.json();
    },
  });
};

export const useUpdateProductById = (productId: string) => {
  return useMutation({
    mutationFn: async (updatedProduct: Product) => {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_BASE_URL}/products/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      return response.json();
    },
  });
};

export const useDeleteProductById = () => {
  return useMutation({
    mutationFn: async (productId: string) => {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_BASE_URL}/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      if (response.status === 204) {
        return;
      }

    },
  });
};
