export const formatCurrency = (valor: number, codigoMoneda: string) => {
  return new Intl.NumberFormat('es-CO', { // 'es-CO' define cómo se ven los puntos/comas
    style: 'currency',
    currency: codigoMoneda, // ◄— ¡Aquí está la magia! Es dinámico (USD, COP, EUR...)
    minimumFractionDigits: 0, // Para que no te ponga centavos feos si no se necesitan
  }).format(valor);
};