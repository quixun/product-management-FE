import { getDailyRevenueData } from "@/lib/utils";
import { SaleItem } from "@/types/sales";
import { ChartData, ChartOptions } from "chart.js";

export function BarChartData(sales: SaleItem[]): ChartData<"bar"> {
  const { labels, data } = getDailyRevenueData(sales);

  return {
    labels,
    datasets: [
      {
        label: "Revenue",
        data,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
}

export const barChartOptions: ChartOptions<"bar"> = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Daily Revenue" },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: "Revenue (VND)" },
    },
    x: {
      title: { display: true, text: "Date" },
    },
  },
};
