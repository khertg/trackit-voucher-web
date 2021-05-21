export interface IVoucher {
  _id: string;
  code: string;
  is_sold: boolean;
  sold_to?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPagedVoucher {
  docs: IVoucher[];
  totalDocs: number;
  totalPages: number;
}

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
