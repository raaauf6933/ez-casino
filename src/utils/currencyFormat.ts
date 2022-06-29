export const currencyFormat = (value: number) => {
  const formatter = new Intl.NumberFormat("en-PH", {
    currency: "PHP",
    currencyDisplay: "symbol",
    minimumFractionDigits: 2,
    style: "currency"
  });

  return formatter.format(value);
};
