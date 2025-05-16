"use client";

import { useAuth } from "@/provider/auth-provider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useAllProducts } from "@/lib/products/fetch-all-products";
import { Product } from "@/types/auth-type";
import { Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProductRow from "./components/product-row";
import { useState } from "react";

export default function AdminPage() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useAllProducts();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authRefreshToken");
    queryClient.clear();
    setUser(null);
    router.push("/");
  };

  if (!data) return [];

  const filteredProducts = data.filter((product: Product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="w-full bg-gray-200 py-2 px-1">
      <header className="flex justify-between items-center px-6 py-4 border-b w-full">
        <h1 className="text-3xl font-semibold">Welcome {user?.userName}</h1>
        <Button
          className="px-4 py-4 bg-red-500 cursor-pointer text-white"
          variant="link"
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
      </header>
      <main className="mt-6 mx-6 bg-white">
        <div className="flex flex-col items-center w-full h-screen pt-5">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Input
                type="search"
                placeholder="Search product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Button onClick={() => {}}>Search</Button>
            </div>
          </div>
          <div className="overflow-auto rounded-lg shadow border mt-20">
            <table className="bg-white w-full">
              <thead className="bg-gray-100 text-gray-600 text-sm">
                <tr>
                  <th className="pl-8 text-left">Product</th>
                  <th className="p-4 text-left">Gama Code</th>
                  <th className="p-4 text-left">Inventory</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-left">Quantity</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product: Product) => (
                  <ProductRow key={product.id} product={product} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
