"use client";

import { useAuth } from "@/provider/auth-provider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useAllProducts } from "@/lib/products/fetch-all-products";
import { Product, ProductType } from "@/types/auth-type";
import ProductRow from "./components/product-row";
import { useState, useMemo } from "react";
import { CartItem } from "@/types/cart";
import Cart from "./components/cart";
import { Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSaleProduct } from "@/lib/sale/use-sale-product";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function StaffPage() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);

  const { data = [], refetch } = useAllProducts();

  const productTypes: ProductType[] = useMemo(
    () => Array.from(new Set(data.map((p: Product) => p.type))),
    [data]
  );

  const filteredProducts = useMemo(() => {
    return data.filter((product: Product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === "all" || product.type === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [data, searchTerm, activeTab]);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ];
    });
  };

  const handleRemoveFromCart = (id: string, removeAll = false) => {
    setCart(
      (prev) =>
        prev
          .map((item) => {
            if (item.id === id) {
              if (removeAll || item.quantity === 1) return null;
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          })
          .filter(Boolean) as CartItem[]
    );
  };

  const handleClearCart = () => setCart([]);

  const saleProductMutation = useSaleProduct();

  const handleCheckout = async () => {
    try {
      if (!user) return;
      for (const item of cart) {
        await saleProductMutation.mutateAsync({
          productId: item.id,
          soldById: user.id,
          pricePerItem: Number(item.price),
          quantity: item.quantity,
        });
      }
      toast.success("Sale created successfully!");
      handleClearCart();
      await refetch();
    } catch (err) {
      toast.error(`Failed to create sale. ${err}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authRefreshToken");
    queryClient.clear();
    setUser(null);
    router.push("/");
  };

  return (
    <div className="w-full bg-gray-200 py-2 px-1 min-h-screen">
      <header className="flex justify-between items-center px-6 py-4 border-b w-full">
        <h1 className="text-3xl font-semibold">
          Welcome {user?.userName ?? "Staff"}
        </h1>
        <Button
          className="px-4 py-4 bg-red-500 text-white"
          variant="link"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </header>

      <main className="mt-6 mx-6 bg-white flex gap-6">
        {/* Cart Panel */}
        <Cart
          cartItems={cart}
          onRemoveOne={(id) => handleRemoveFromCart(id, false)}
          onRemoveAll={(id) => handleRemoveFromCart(id, true)}
          onClear={handleClearCart}
          onPay={handleCheckout}
        />

        <div className="flex-1 mt-10 w-full overflow-hidden mr-4">
          {/* Tabs Wrapper */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            {/* Tabs List */}
            <TabsList className="bg-gray-100 flex-wrap mb-4 w-full">
              <TabsTrigger className="cursor-pointer" value="all">
                All
              </TabsTrigger>
              {productTypes.map((type) => (
                <TabsTrigger className="cursor-pointer" key={type} value={type}>
                  {type}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab Content */}
            {["all", ...productTypes].map((type) => (
              <TabsContent key={type} value={type}>
                {/* Search Bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" disabled>
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Input
                      type="search"
                      placeholder="Search product..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full md:w-64"
                    />
                    <Button onClick={() => setSearchTerm("")}>Clear</Button>
                  </div>
                </div>

                {/* Product Table */}
                <div className="overflow-auto rounded-lg shadow border bg-white">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-gray-700 font-medium">
                      <tr>
                        <th className="pl-6 py-3 text-left">Product</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Stock</th>
                        <th className="px-4 py-3 text-left">Price</th>
                        <th className="px-4 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts
                        .filter((product: Product) =>
                          type === "all" ? true : product.type === type
                        )
                        .map((product: Product) => (
                          <ProductRow
                            key={product.id}
                            product={product}
                            onAddToCart={handleAddToCart}
                          />
                        ))}
                    </tbody>
                  </table>

                  {filteredProducts.filter((product: Product) =>
                    type === "all" ? true : product.type === type
                  ).length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                      No products found.
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}
