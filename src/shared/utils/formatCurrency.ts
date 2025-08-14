/**
 * Formats a number as a currency string for Indonesian Rupiah (IDR).
 *
 * @param {number} amount - The number to format.
 * @returns {string} The formatted currency string (e.g., "Rp10.000.000,00" or "Rp1.000.000").
 */
export const formatIDRCurrency = (amount: number): string => {
  // Validate input
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new TypeError('Amount must be a valid number.')
  }

  // Intl.NumberFormat provides powerful locale-aware formatting.
  // 'id-ID' for Indonesian locale, 'currency' style, and 'IDR' currency code.
  // We explicitly set minimumFractionDigits to 0 and maximumFractionDigits to 2
  // to handle cases where there are no decimals (e.g., 1.000.000 instead of 1.000.000,00).
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0, // Ensure no ".00" if the number is an integer
    maximumFractionDigits: 2, // Allow up to 2 decimal places if needed
  })

  return formatter.format(amount)
}
