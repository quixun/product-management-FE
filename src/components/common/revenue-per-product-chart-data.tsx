import { getRevenuePerProduct } from "@/lib/utils";
import { SaleItem } from "@/types/sales";
import { ChartData } from "chart.js";

export function RevenuePerProductChartData(
  sales: SaleItem[]
): ChartData<"pie"> {
  const revenueMap = getRevenuePerProduct(sales);
  const labels = Object.keys(revenueMap);
  const data = Object.values(revenueMap);

  const backgroundColor = [
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(199, 199, 199, 0.6)",
  ];

  const borderColor = backgroundColor.map((c) => c.replace("0.6", "1"));

  return {
    labels,
    datasets: [
      {
        label: "Revenue per Product",
        data,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };
}
