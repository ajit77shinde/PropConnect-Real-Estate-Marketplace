export function formatPrice(amount: number, transaction?: string): string {
  if (transaction === 'rent') {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L/mo`;
    return `₹${amount.toLocaleString('en-IN')}/mo`;
  }
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(0)} Lakh`;
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatArea(sqft?: number): string {
  if (!sqft) return '—';
  return `${sqft.toLocaleString('en-IN')} sq.ft.`;
}

export function listingTypeLabel(type: string): string {
  const map: Record<string, string> = {
    apartment: 'Apartment',
    villa: 'Villa',
    house: 'Independent House',
    plot: 'Plot',
    shop: 'Shop',
    office: 'Office',
    warehouse: 'Warehouse',
    commercial: 'Commercial',
    agricultural: 'Agricultural Land',
    other: 'Other',
  };
  return map[type] ?? type;
}

export function statusColor(
  status: string,
): 'default' | 'success' | 'warning' | 'error' | 'info' {
  switch (status) {
    case 'active':
    case 'contacted':
      return 'success';
    case 'pending':
    case 'new':
    case 'draft':
      return 'warning';
    case 'rejected':
    case 'lost':
    case 'inactive':
      return 'error';
    case 'site_visit_scheduled':
    case 'sold':
    case 'rented':
      return 'info';
    default:
      return 'default';
  }
}

export function statusLabel(status: string): string {
  return status
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
