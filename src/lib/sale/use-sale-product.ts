import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchWithAuth } from "../auth/fetch-with-auth";
import { itemSale } from "@/types/cart";
import { SaleItem } from "@/types/sales";

export const useSaleProduct = () => {
  return useMutation({
    mutationFn: async (newSale: itemSale) => {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sales`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(newSale),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create invoice");
      }

      return response.json();
    },
  });
};

export const useAllProductsSales = (): UseQueryResult<SaleItem[]> => {
  return useQuery({
    queryKey: ["all-sales"],
    queryFn: async () => {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sales`,
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
