import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { DailyEnergyMix } from "../types/energy";

type Props = {
  data: DailyEnergyMix;
};

const COLORS = [
  "#00C49F",
  "#0088FE",
  "#FFBB28",
  "#FF8042",
  "#A28CFF",
  "#FF6699",
  "#82ca9d",
  "#ffc658",
  "#8dd1e1",
];

export default function EnergyPieChart({ data }: Props) {
  const chartData = Object.entries(data.generationMix).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="chart-card">
      <h2>{data.date}</h2>

      <p className="clean-energy">
        Clean energy: {data.cleanEnergyPercentage.toFixed(2)}%
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            label
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
