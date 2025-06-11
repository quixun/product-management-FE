import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/types/auth-type";
import { Bar, Chart, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useAllProductsSales } from "@/lib/sale/use-sale-product";
import { BarChartData } from "@/components/common/bar-chart-data";
import { generatePieChartData } from "@/components/common/pie-chart-data";
import { getRevenuePerProduct, getRevenuePerStaff } from "@/lib/utils";
import {
  combinedChartOptions,
  CombinedBarLineChartData,
} from "@/components/common/combined-sales-chart-data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface StatsTabProps {
  user: User | null;
  staffCount?: number;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Legend,
  Tooltip,
  Title
);

export default function StatsTab({ user, staffCount = 0 }: StatsTabProps) {
  const { data: sales, isLoading } = useAllProductsSales();

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Activity Trends",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Actions",
        },
      },
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
    },
  };

  if (isLoading || !sales) return <p>Loading chart...</p>;

  const chartData = BarChartData(sales);

  const revenueByProduct = getRevenuePerProduct(sales);
  const revenueByStaff = getRevenuePerStaff(sales);

  const productRevenueChart = generatePieChartData(
    Object.keys(revenueByProduct),
    Object.values(revenueByProduct),
    "Revenue per Product"
  );

  const staffRevenueChart = generatePieChartData(
    Object.keys(revenueByStaff),
    Object.values(revenueByStaff),
    "Revenue per Staff"
  );

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: "Product Category Distribution",
      },
    },
  };

  const chartData2 = CombinedBarLineChartData(sales);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sold Product
            </CardTitle>
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
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user?.products?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">+6% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Daily Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              Based on last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Sales & Quantity</CardTitle>
            <CardDescription>Comparison of revenue vs quantity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex justify-center items-center">
              <Chart
                type="bar"
                data={chartData2}
                options={combinedChartOptions}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue per Product</CardTitle>
            <CardDescription>
              Visualized total revenue per product
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex justify-center items-center">
              <Pie data={productRevenueChart} options={pieChartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue per Staff</CardTitle>
            <CardDescription>
              Which staff generated the most revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex justify-center items-center">
              <Pie data={staffRevenueChart} options={pieChartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Category Distribution</CardTitle>
            <CardDescription>Breakdown of products by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex justify-center items-center">
              <Bar data={chartData} options={barChartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
