import { Button } from "@/components/ui/button";
import { formatPriceWithDots } from "@/lib/utils";
import { Product } from "@/types/auth-type";
import Image from "next/image";

export default function ProductRow({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (product: Product) => void;
}) {
  return (
    <tr className="border-b hover:bg-gray-50 h-full">
      <td className="p-4 flex items-center gap-4">
        <Image
          src={product.imageUrl}
          alt={product.name}
          className="w-12 h-12 object-contain rounded"
          width={48}
          height={48}
          priority
        />
        <div>
          <p className="font-semibold">{product.name}</p>
          <p className="text-xs text-gray-500">{product.type}</p>
        </div>
      </td>
      <td className="p-4">{product.status}</td>
      <td className="p-4">{product.stock}</td>
      <td className="p-4">{formatPriceWithDots(product.price)}</td>
      <td className="p-4">
        <div className="flex gap-2 items-center">
          <Button
            size="icon"
            variant="default"
            onClick={() => onAddToCart(product)}
            className="cursor-pointer"
          >
            +
          </Button>
        </div>
      </td>
    </tr>
  );
}
