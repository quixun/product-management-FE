import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Edit, Trash, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/auth-type";
import Image from "next/image";
import { formatPriceWithDots } from "@/lib/utils";

type ProductsTabProps = {
  products?: Product[];
};

export default function ProductsTab({ products = [] }: ProductsTabProps) {
  const router = useRouter();

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Product Management</CardTitle>
          <CardDescription>Manage your products and inventory</CardDescription>
        </div>
        <Button
          onClick={() => router.push("/admin/add-product")}
          className="cursor-pointer"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted-foreground">No products found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Kind</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Inventory</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="relative h-12 w-12 overflow-hidden rounded-md">
                      <Image
                        src={product.imageUrl || "/placeholder.png"}
                        alt={product.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                        priority
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.type}</TableCell>
                  <TableCell>{formatPriceWithDots(product.price)}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-xs text-sm font-medium ${
                        product.status.toLowerCase() === "available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    {new Date(product.updatedAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                        onClick={() =>
                          router.push(`/admin/products/${product.id}`)
                        }
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                        onClick={() =>
                          router.push(`/admin/products/${product.id}`)
                        }
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                        onClick={() =>
                          router.push(`/admin/products/${product.id}`)
                        }
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
