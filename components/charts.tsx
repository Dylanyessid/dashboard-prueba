"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type MonthlyData = {
  month: string;
  ingresos: number;
};

type StatusData = {
  estado: string;
  cantidad: number;
};

const COLORS: Record<string, string> = {
  COMPLETED: "#22c55e",
  REFUNDED: "#eab308",
  PENDING: "#6b7280",
  FAILED: "#ef4444",
};

export function MonthlyRevenueChart({ data }: { data: MonthlyData[] }) {
  const config = {
    ingresos: { label: "Ingresos", color: "#22c55e" },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground font-medium">
          Ingresos por Mes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-auto h-72 w-full">
          <BarChart data={data}>
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideIndicator />}
            />
            <Bar dataKey="ingresos" fill="var(--color-ingresos)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function StatusDistributionChart({ data }: { data: StatusData[] }) {
  const config = Object.fromEntries(
    data.map((d) => [
      d.estado,
      { label: d.estado, color: COLORS[d.estado] ?? "#6b7280" },
    ])
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground font-medium">
          Distribución por Estado
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-auto h-72 w-full">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideIndicator />}
            />
            <Pie
              data={data}
              dataKey="cantidad"
              nameKey="estado"
              innerRadius={60}
              strokeWidth={2}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.estado}
                  fill={COLORS[entry.estado] ?? "#6b7280"}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
