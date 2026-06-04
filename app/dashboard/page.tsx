import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MonthlyRevenueChart,
  StatusDistributionChart,
} from "@/components/charts";

type Payment = {
  id_pago: string;
  importe: number;
  estado: string;
  nombre: string | null;
  email: string | null;
  curso: string;
  moneda: string;
  fecha: string;
  created_at: string;
};


export default async function DashboardPage() {
  const { data: allPayments, error } = await supabase
    .from("pagos_cursos")
    .select("*")
    .returns<Payment[]>();

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-96">
          <CardContent className="pt-6 text-center text-destructive">
            Error al cargar datos: {error.message}
          </CardContent>
        </Card>
      </div>
    );
  }

  const completed = allPayments?.filter((p) => p.estado?.toUpperCase() === "COMPLETED") ?? [];
  const refundedCount = allPayments?.filter((p) => p.estado?.toUpperCase() === "REFUNDED").length ?? 0;
  const totalRevenue = completed.reduce((acc, p) => acc + p.importe, 0);
  const successfulPayments = completed.length;
  const averageTicket =
    successfulPayments > 0 ? Math.round(totalRevenue / successfulPayments) : 0;

  const monthlyMap = new Map<string, number>();
  for (const p of completed) {
    const month = p.fecha.slice(0, 7);
    monthlyMap.set(month, (monthlyMap.get(month) ?? 0) + p.importe);
  }
  const monthlyData = [...monthlyMap.entries()]
    .map(([month, ingresos]) => ({ month, ingresos }))
    .sort((a, b) => a.month.localeCompare(b.month));

  const statusMap = new Map<string, number>();
  for (const p of allPayments ?? []) {
    statusMap.set(p.estado?.toUpperCase(), (statusMap.get(p.estado?.toUpperCase()) ?? 0) + 1);
  }
  const statusData = [...statusMap.entries()].map(([estado, cantidad]) => ({
    estado,
    cantidad,
  }));

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-heading font-bold tracking-tight">
          Dashboard de Pagos
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground font-medium">
                Ingresos Totales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold tracking-tight">
                ${totalRevenue.toLocaleString("es-AR")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground font-medium">
                Pagos Exitosos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold tracking-tight">
                {successfulPayments}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground font-medium">
                Ticket Promedio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold tracking-tight">
                ${averageTicket.toLocaleString("es-AR")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground font-medium">
                Reembolsos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold tracking-tight">
                {refundedCount ?? 0}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <MonthlyRevenueChart data={monthlyData} />
          <StatusDistributionChart data={statusData} />
        </div>

        <h2 className="mb-4 text-xl font-heading font-semibold tracking-tight">
          Todos los Pagos
        </h2>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Pago</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead>Importe</TableHead>
                <TableHead>Moneda</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allPayments?.map((p) => (
                <TableRow key={p.id_pago}>
                  <TableCell className="font-mono text-xs">{p.id_pago}</TableCell>
                  <TableCell>{p.nombre ?? "—"}</TableCell>
                  <TableCell>{p.email ?? "—"}</TableCell>
                  <TableCell>{p.curso}</TableCell>
                  <TableCell>${Number(p.importe).toLocaleString("es-AR")}</TableCell>
                  <TableCell>{p.moneda}</TableCell>
                  <TableCell>
                    <span
                      className={
                        p.estado?.toUpperCase() === "COMPLETED"
                          ? "text-green-400"
                          : p.estado?.toUpperCase() === "REFUNDED"
                            ? "text-yellow-400"
                            : "text-muted-foreground"
                      }
                    >
                      {p.estado}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {p.fecha ? new Date(p.fecha).toLocaleDateString("es-AR") : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
