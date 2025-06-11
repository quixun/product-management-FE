const COLORS = [
  "rgba(255, 99, 132, 0.6)",
  "rgba(54, 162, 235, 0.6)",
  "rgba(255, 206, 86, 0.6)",
  "rgba(75, 192, 192, 0.6)",
  "rgba(153, 102, 255, 0.6)",
  "rgba(255, 159, 64, 0.6)",
  "rgba(201, 203, 207, 0.6)",
];

const BORDER_COLORS = COLORS.map((c) => c.replace("0.6", "1"));

export function generatePieChartData(
  labels: string[],
  values: number[],
  label: string
) {
  return {
    labels,
    datasets: [
      {
        label,
        data: values,
        backgroundColor: COLORS.slice(0, labels.length),
        borderColor: BORDER_COLORS.slice(0, labels.length),
        borderWidth: 1,
      },
    ],
  };
}
