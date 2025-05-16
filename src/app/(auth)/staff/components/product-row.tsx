import { Button } from "@/components/ui/button";
import { formatPriceWithDots } from "@/lib/utils";
import { Product } from "@/types/auth-type";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";

export default function ProductRow({ product }: { product: Product }) {
  return (
    <tr className="border-b hover:bg-gray-50">
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
      <td className="p-4">{product.stock} in stock</td>
      <td className="p-4">{formatPriceWithDots(product.price)}</td>
      <td className="p-4">
        {/* <input
          type="number"
          defaultValue={product.quantity}
          className="w-16 px-2 py-1 border rounded"
        /> */}
      </td>
      <td className="p-4 flex gap-2">
        <Button size="icon" variant="outline">
          <Pencil className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="destructive">
          <Trash className="w-4 h-4" />
        </Button>
      </td>
    </tr>
  );
}
