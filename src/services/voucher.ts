import axios from './custom-axios';
import { IPagedVoucher, IVoucher } from '../models/voucher';
import { getAuthHeader } from '../helpers/auth-common';

const url = `${process.env.REACT_APP_API_URL}/api/v1/voucher`;

export async function getList(queryString?: string) {
  const config = {
    headers: {
      ...getAuthHeader(),
    },
  };

  return await axios
    .get<{ result: IPagedVoucher }>(
      url + (queryString ? queryString : ''),
      config
    )
    .then((response) => {
      return response.data.result;
    });
}

export async function create(data: any) {
  const config = {
    headers: {
      ...getAuthHeader(),
    },
  };
  return await axios
    .post<{ result: IVoucher }>(url, data, config)
    .then((response) => {
      return response.data.result;
    });
}

export async function edit(id: number, data: any) {
  const config = {
    headers: {
      ...getAuthHeader(),
    },
  };

  return await axios
    .patch<{ result: IVoucher }>(`${url}/${id}`, data, config)
    .then((response) => {
      return response.data.result;
    });
}

export async function get(id: number) {
  const config = {
    headers: {
      ...getAuthHeader(),
    },
  };
  return await axios
    .get<{ result: IVoucher }>(`${url}/${id}`, config)
    .then((response) => {
      return response.data.result;
    });
}

export async function deleteById(id: number) {
  const config = {
    headers: {
      ...getAuthHeader(),
    },
  };
  return await axios
    .delete<{ result: IVoucher }>(`${url}/${id}`, config)
    .then((response) => {
      return response.data.result;
    });
}

export async function deleteAll(data: number[]) {
  const config = {
    headers: {
      ...getAuthHeader(),
    },
  };
  return await axios
    .post<{ result: IVoucher }>(`${url}/deleteAll`, { ids: data }, config)
    .then((response) => {
      return response.data.result;
    });
}

export async function importCSV(data: FormData) {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...getAuthHeader(),
    },
  };
  return await axios
    .post<{ result: IVoucher }>(`${url}/import-csv`, data, config)
    .then((response) => {
      return response.data.result;
    });
}

export async function enableVoucher(id: number) {
  const config = {
    headers: {
      ...getAuthHeader(),
    },
  };
  return await axios
    .post<any>(`${url}/enable-voucher`, { id }, config)
    .then((response) => {
      return response.data.result;
    });
}

export async function disableVoucher(id: number) {
  const config = {
    headers: {
      ...getAuthHeader(),
    },
  };
  return await axios
    .post<any>(`${url}/disable-voucher`, { id }, config)
    .then((response) => {
      return response.data.result;
    });
}
