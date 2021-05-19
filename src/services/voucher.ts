import axios from 'axios';
import { IVoucher } from '../models/voucher';

const url = `${process.env.REACT_APP_API_URL}/api/v1/voucher`;

export async function getList(queryString?: string) {
  return await axios
    .get<{ result: IVoucher[] }>(url + (queryString ? queryString : ''))
    .then((response) => {
      return response.data.result;
    });
}

export async function create(
  code: string,
  sold_to?: string,
  is_sold?: boolean
) {
  const data = {
    code,
    sold_to,
    is_sold,
  };
  return await axios.post<{ result: IVoucher }>(url, data).then((response) => {
    return response.data.result;
  });
}

export async function edit(
  id: string,
  code: string,
  sold_to?: string,
  is_sold?: boolean
) {
  const data = {
    code,
    sold_to,
    is_sold,
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
