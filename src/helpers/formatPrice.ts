export const formatPrice = (value: number, hasCurrency = true, hasDigits = true) => {
  const proprieties: Intl.NumberFormatOptions = {
    maximumFractionDigits: hasDigits ? 2 : 0,
  };

  if (hasCurrency) {
    proprieties.style = 'currency';
    proprieties.currency = 'BRL';
  }

  const formCurrency = new Intl.NumberFormat('pt-BR', proprieties);

  return formCurrency.format(value);
};
