import { SaleItem } from "@/types/sales";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPriceWithDots(price: number | string): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
}

export function getDailyRevenueData(sales: SaleItem[]) {
  const dailyRevenue: Record<string, number> = {};

  sales.forEach((sale) => {
    const date = new Date(sale.soldAt).toISOString().split("T")[0]; // "YYYY-MM-DD"
    const revenue = sale.totalPrice;

    dailyRevenue[date] = (dailyRevenue[date] || 0) + revenue;
  });

  const sortedDates = Object.keys(dailyRevenue).sort(); // ascending by date

  return {
    labels: sortedDates,
    data: sortedDates.map((date) => dailyRevenue[date]),
  };
}

export function getRevenuePerProduct(sales: SaleItem[]) {
  const revenuePerProduct: Record<string, number> = {};

  sales.forEach((sale) => {
    const revenue = sale.quantity * sale.pricePerItem;
    revenuePerProduct[sale.productType] =
      (revenuePerProduct[sale.productType] || 0) + revenue;
  });

  return revenuePerProduct;
}

export function getRevenuePerStaff(sales: SaleItem[]) {
  const revenuePerStaff: Record<string, number> = {};

  sales.forEach((sale) => {
    revenuePerStaff[sale.soldBy] =
      (revenuePerStaff[sale.soldBy] || 0) + sale.totalPrice;
  });

  return revenuePerStaff;
}

export function getQuantityPerProduct(sales: SaleItem[]) {
  const quantityMap: Record<string, number> = {};

  sales.forEach((sale) => {
    quantityMap[sale.productName] =
      (quantityMap[sale.productName] || 0) + sale.quantity;
  });

  return quantityMap;
}
