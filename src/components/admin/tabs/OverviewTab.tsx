import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Users,
  Package,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { User } from "@/types/auth-type";

interface OverviewTabProps {
  user: User | null;
  staffCount?: number;
}

export default function OverviewTab({ user, staffCount = 0 }: OverviewTabProps) {
  const router = useRouter();

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Active Staff
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staffCount}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user?.products?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              +6% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Activity
            </CardTitle>
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              actions in the last 24 hours
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button
              onClick={() => router.push("/admin/add-staff")}
              className="cursor-pointer"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Staff
            </Button>
            <Button
              onClick={() => router.push("/admin/add-product")}
              className="cursor-pointer"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
            <Button variant="outline" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              System Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
} 