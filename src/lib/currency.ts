import { getLocales } from "locale-currency";

export const formatCurrency = (currency: string, number: number) => {
  return new Intl.NumberFormat(getLocales(currency), {
    currency: currency,
    style: "currency",
  }).format(number);
};
