import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { data: payments, error } = await supabase
    .from("pagos_cursos")
    .select("importe, estado")
    .eq("estado", "COMPLETED");

  if (error) {
    return <p className="text-red-500">Error al cargar datos: {error.message}</p>;
  }

  const totalRevenue = payments?.reduce((acc, p) => acc + Number(p.importe), 0) ?? 0;
  const successfulPayments = payments?.length ?? 0;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard de Pagos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border p-6 bg-white shadow-sm">
          <p className="text-sm text-gray-500">Ingresos Totales</p>
          <p className="text-3xl font-bold mt-1">
            ${totalRevenue.toLocaleString("es-AR")}
          </p>
        </div>
        <div className="rounded-xl border p-6 bg-white shadow-sm">
          <p className="text-sm text-gray-500">Pagos Exitosos</p>
          <p className="text-3xl font-bold mt-1">{successfulPayments}</p>
        </div>
      </div>
    </div>
  );
}
