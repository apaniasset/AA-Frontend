/**
 * Compact INR for listings: ₹28,000 → ₹28k
 */
export function formatRupeeCompact(
  amount: number | string | null | undefined,
): string {
  if (amount == null || amount === '') {
    return '—';
  }
  const num =
    typeof amount === 'string'
      ? parseFloat(String(amount).replace(/,/g, ''))
      : amount;
  if (!Number.isFinite(num) || num <= 0) {
    return '—';
  }
  const abs = Math.round(num);
  if (abs < 1000) {
    return `₹${abs.toLocaleString('en-IN')}`;
  }
  const k = abs / 1000;
  const s =
    Math.abs(k - Math.round(k)) < 0.001
      ? String(Math.round(k))
      : k.toFixed(1).replace(/\.0$/, '');
  return `₹${s}k`;
}

/**
 * Rent: compact ₹ + optional `/mo`.
 * @param appendMonthlySuffix - when false, rent omits `/mo` (e.g. my listings append " / Month" separately)
 */
export function formatListingPrice(
  rent?: number | string | null,
  sale?: number | string | null,
  appendMonthlySuffix = true,
): string {
  const r = rent != null && rent !== '' ? Number(rent) : NaN;
  if (Number.isFinite(r) && r > 0) {
    return appendMonthlySuffix
      ? `${formatRupeeCompact(r)}/mo`
      : formatRupeeCompact(r);
  }
  const s = sale != null && sale !== '' ? Number(sale) : NaN;
  if (Number.isFinite(s) && s > 0) {
    return formatRupeeCompact(s);
  }
  return '—';
}
