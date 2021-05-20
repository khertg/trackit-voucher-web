export interface IVoucherFilter {
  code?: string;
  sold_to?: string;
  is_sold?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}


export interface ISelectedVoucher {
  id: string;
  code: string;
}

export interface ISelectedPage {
  selected: number;
}
