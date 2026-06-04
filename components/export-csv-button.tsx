"use client";

import type { Payment } from "@/app/dashboard/page";

export function ExportCsvButton({ data }: { data: Payment[] }) {
  const handleExport = () => {
    const headers = ["ID Pago", "Nombre", "Email", "Curso", "Importe", "Moneda", "Estado", "Fecha"];
    const rows = data.map((p) => [
      p.id_pago,
      p.nombre ?? "",
      p.email ?? "",
      p.curso,
      p.importe,
      p.moneda,
      p.estado,
      p.fecha ? new Date(p.fecha).toLocaleDateString("es-CO") : "",
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pagos.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
    >
      Exportar CSV
    </button>
  );
}
