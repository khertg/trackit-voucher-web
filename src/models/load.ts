export interface ILoad {
    id: string;
    buyer: string;
    amount: number;
    phone_number: string;
    paid: boolean;
    created_at: string;
    updated_at: string;
  }
  
  export interface IPagedLoad {
    data: ILoad[];
    totalItems: number;
    totalPages: number;
  }

  export interface ILoadFilter {
    buyer?: string;
    phone_number?: string;
    paid?: string;
    sort_by?: string;
    page?: number;
    limit?: number;
  }
  
  export interface ISelectedLoad {
    id: string;
    phone_number: string;
  }
  