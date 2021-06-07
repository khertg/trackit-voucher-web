export interface IVoucher {
  id: number;
  voucher_code: string;
  status: number;
  active: number;
  buyer?: string;
  created_at: string;
  updated_at: string;
}

export type IVoucherForm = Partial<
  Omit<IVoucher, 'status' | 'active'> & { status: string; active: string }
>;

export interface IPagedVoucher {
  data: IVoucher[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
}

export interface IVoucherFilter {
  voucher_code?: string;
  buyer?: string;
  status?: string;
  sort_by?: string;
  page?: number;
  limit?: number;
}

export interface ISelectedVoucher {
  id: number;
  voucher_code: string;
}
