import { ProductType } from "./auth-type";

export type SaleItem = {
  id: string;
  soldAt: Date;
  soldBy: string;
  productType: ProductType;
  productName: string;
  quantity: number;
  pricePerItem: number;
  totalPrice: number;
};
