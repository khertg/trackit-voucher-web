export interface IVoucherFilter {
  code?: string;
  sold_to?: string;
  is_sold: string;
  sortBy: string;
}

export interface ISelectedVoucher {
  id: string;
  code: string;
}
