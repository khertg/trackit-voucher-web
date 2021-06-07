export interface ILoad {
    id: number;
    buyer: string;
    amount: number;
    phone_number: string;
    status: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface IPagedLoad {
    data: ILoad[];
    currentPage: number;
    totalItems: number;
    totalPages: number;
    itemsPerPage: number;
  }

  export interface ILoadFilter {
    buyer?: string;
    phone_number?: string;
    status?: string;
    sort_by?: string;
    page?: number;
    limit?: number;
  }
  
  export interface ISelectedLoad {
    id: number;
    phone_number: string;
  }
  