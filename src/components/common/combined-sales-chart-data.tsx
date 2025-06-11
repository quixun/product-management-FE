import { SaleItem } from "@/types/sales";
import { ChartData } from "chart.js";

export const combinedChartOptions = {
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  scales: {
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
      title: {
        display: true,
        text: "Total Sales (VND)",
      },
    },
    y1: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
      title: {
        display: true,
        text: "Quantity",
      },
    },
  },
};

export function CombinedBarLineChartData(
  sales: SaleItem[]
): ChartData<"bar" | "line"> {
  // Example: total quantity sold per product
  const quantityMap: Record<string, number> = {};
  const revenueMap: Record<string, number> = {};

  sales.forEach((item) => {
    const name = item.productName;
    quantityMap[name] = (quantityMap[name] || 0) + item.quantity;
    revenueMap[name] = (revenueMap[name] || 0) + item.totalPrice;
  });

  const labels = Object.keys(quantityMap);
  const quantityData = labels.map((name) => quantityMap[name]);
  const revenueData = labels.map((name) => revenueMap[name]);

  return {
    labels,
    datasets: [
      {
        type: "bar",
        label: "Quantity Sold",
        data: quantityData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        type: "line",
        label: "Total Revenue",
        data: revenueData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
        tension: 0.4,
        yAxisID: "y1", // optional for dual-axis
      },
    ],
  };
}
