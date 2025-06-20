/**
 *
 * @param value - number
 * @returns balance
 *
 */

export const formatCurrency = (val?: number) =>
  new Intl.NumberFormat().format(val || 0);
