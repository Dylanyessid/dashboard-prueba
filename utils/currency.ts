export const formatCurrency = (value: number, currencyCode: string) => {
  return new Intl.NumberFormat('es-CO', { 
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0, 
  }).format(value);
};