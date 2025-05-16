export type User = {
  id: string;
  userName: string;
  email: string;
  role: string;
  avatar: string | null;
  phoneNumber: string;
  products: Product[];
};

export type Product = {
  id: string;
  name: string;
  type: ProductType;
  price: number;
  imageUrl: string;
  status: ProductStatus;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
};

export enum ProductType {
  FOOD = "food",
  DRINK = "drink",
}

export enum ProductStatus {
  AVAILABLE = "available",
  SOLD_OUT = "sold_out",
}
