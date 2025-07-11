const intl = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

function formatCurrency(price) {
  return intl.format(price);
}

export { formatCurrency };
