export interface ILoad {
    _id: string;
    buyer: string;
    amount: number;
    number: string;
    is_paid: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface IPagedLoad {
    docs: ILoad[];
    totalDocs: number;
    totalPages: number;
  }

  export interface ILoadFilter {
    buyer?: string;
    number?: string;
    is_paid?: string;
    sortBy?: string;
    page?: number;
    limit?: number;
  }
  
  export interface ISelectedLoad {
    id: string;
    number: string;
  }
  