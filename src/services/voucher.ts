import axios from 'axios';
import { IPagedVoucher, IVoucher } from '../models/voucher';

const url = `${process.env.REACT_APP_API_URL}/api/v1/voucher`;

export async function getList(queryString?: string) {
  return await axios
    .get<{ result: IPagedVoucher }>(url + (queryString ? queryString : ''))
    .then((response) => {
      return response.data.result;
    });
}

export async function create(
  voucher_code: string,
  buyer?: string,
  sold?: boolean
) {
  const data = {
    voucher_code,
    buyer,
    sold,
  };
  return await axios.post<{ result: IVoucher }>(url, data).then((response) => {
    return response.data.result;
  });
}

export async function edit(
  id: string,
  voucher_code: string,
  buyer?: string,
  sold?: boolean
) {
  const data = {
    voucher_code,
    buyer,
    sold,
  };
  return await axios
    .patch<{ result: IVoucher }>(`${url}/${id}`, data)
    .then((response) => {
      return response.data.result;
    });
}

export async function get(id: string) {
  return await axios
    .get<{ result: IVoucher }>(`${url}/${id}`)
    .then((response) => {
      return response.data.result;
    });
}

export async function deleteById(id: string) {
  return await axios
    .delete<{ result: IVoucher }>(`${url}/${id}`)
    .then((response) => {
      return response.data.result;
    });
}

export async function deleteAll(data: string[]) {
  return await axios
    .post<{ result: IVoucher }>(`${url}/deleteAll`, { ids: data })
    .then((response) => {
      return response.data.result;
    });
}

export async function importCSV(data: FormData) {
  return await axios
    .post<{ result: IVoucher }>(`${url}/import-csv`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      return response.data.result;
    });
}
