import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { data: payments, error } = await supabase
    .from("pagos_cursos")
    .select("importe, estado")
    .eq("estado", "COMPLETED");

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

  const totalRevenue = payments?.reduce((acc, p) => acc + Number(p.importe), 0) ?? 0;
  const successfulPayments = payments?.length ?? 0;

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-heading font-bold tracking-tight">
          Dashboard de Pagos
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
      </div>
    </div>
  );
}
