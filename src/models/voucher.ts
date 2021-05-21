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