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
  subtype?: BadmintonSubtype;
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
  BADMINTON = "badminton",
}

export enum ProductStatus {
  AVAILABLE = "available",
  SOLD_OUT = "sold_out",
}

export enum BadmintonSubtype {
  VOT = "vot",
  BALO = "balo",
  QUAN_CAN = "quan_can",
  SHOES = "shoes",
  CAU = "cau",
  QUAN_AO = "quan_ao",
  KHAN_LAU = "khan_lau",
}
