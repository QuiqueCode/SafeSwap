
export function formatNumber(n: number) {
  return Math.floor(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function truncateAddress(address: string) {
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function getInitials(address: string) {
  const clean = address.replace(/^0x/i, "");
  return clean.slice(0, 2).toUpperCase();
}