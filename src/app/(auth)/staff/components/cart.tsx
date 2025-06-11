import { formatPriceWithDots } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/cart";
import { Minus, Trash2 } from "lucide-react";

export default function Cart({
  cartItems,
  onRemoveOne,
  onRemoveAll,
  onClear,
  onPay,
}: {
  cartItems: CartItem[];
  onRemoveOne: (id: string) => void;
  onRemoveAll: (id: string, removeAll: boolean) => void;
  onClear: () => void;
  onPay: () => void;
}) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="w-80 bg-white p-4 border rounded h-full mt-10 ml-4 shadow">
      <h2 className="text-xl font-semibold mb-4">🛒 Cart</h2>
      {cartItems.length === 0 && (
        <p className="text-gray-500 text-sm">No items in cart</p>
      )}
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center py-2 border-b"
        >
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-gray-500">
              {item.quantity} × {formatPriceWithDots(item.price)}
            </p>
          </div>
          <p>{formatPriceWithDots(item.quantity * item.price)}</p>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => onRemoveOne(item.id)}
            >
              <Minus className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="destructive"
              onClick={() => onRemoveAll(item.id, true)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      <div className="mt-4 font-semibold text-lg">
        Total: {formatPriceWithDots(total)}
      </div>

      <div className="mt-4 flex gap-2">
        <Button
          onClick={onPay}
          disabled={cartItems.length === 0}
          className="flex-1"
        >
          Pay
        </Button>
        <Button
          onClick={onClear}
          variant="outline"
          className="flex-1"
          disabled={cartItems.length === 0}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}
