import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPriceWithDots(price: number | string): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
}