import { getQuantityPerProduct } from "@/lib/utils";
import { SaleItem } from "@/types/sales";
import { ChartData } from "chart.js";

export function QuantityPerProductChartData(
  sales: SaleItem[]
): ChartData<"doughnut"> {
  const quantityMap = getQuantityPerProduct(sales);
  const labels = Object.keys(quantityMap);
  const data = Object.values(quantityMap);

  const backgroundColor = [
    "rgba(255, 159, 64, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(255, 205, 86, 0.6)",
    "rgba(201, 203, 207, 0.6)",
  ];

  const borderColor = backgroundColor.map((c) => c.replace("0.6", "1"));

  return {
    labels,
    datasets: [
      {
        label: "Quantity Sold per Product",
        data,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };
}
