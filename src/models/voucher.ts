export interface IVoucher {
  id: string;
  voucher_code: string;
  sold: boolean;
  buyer?: string;
  created_at: string;
  updated_at: string;
}

export interface IPagedVoucher {
  data: IVoucher[];
  totalItems: number;
  totalPages: number;
}

export interface IVoucherFilter {
  voucher_code?: string;
  buyer?: string;
  sold?: string;
  sort_by?: string;
  page?: number;
  limit?: number;
}

export interface ISelectedVoucher {
  id: string;
  voucher_code: string;
}
