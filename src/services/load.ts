import axios from 'axios';
import { IPagedLoad, ILoad } from '../models/load';

const url = `${process.env.REACT_APP_API_URL}/api/v1/load`;

export async function getList(queryString?: string) {
  return await axios
    .get<{ result: IPagedLoad }>(url + (queryString ? queryString : ''))
    .then((response) => {
      return response.data.result;
    });
}

export async function create(
  buyer: string,
  number: string,
  amount: number,
  is_paid?: boolean
) {
  const data = {
    buyer,
    number,
    amount,
    is_paid,
  };
  return await axios.post<{ result: ILoad }>(url, data).then((response) => {
    return response.data.result;
  });
}

export async function edit(
  id: string,
  buyer: string,
  number: string,
  amount: number,
  is_paid?: boolean
) {
  const data = {
    buyer,
    number,
    amount,
    is_paid,
  };
  return await axios
    .patch<{ result: ILoad }>(`${url}/${id}`, data)
    .then((response) => {
      return response.data.result;
    });
}

export async function get(id: string) {
  return await axios.get<{ result: ILoad }>(`${url}/${id}`).then((response) => {
    return response.data.result;
  });
}

export async function deleteById(id: string) {
  return await axios
    .delete<{ result: ILoad }>(`${url}/${id}`)
    .then((response) => {
      return response.data.result;
    });
}
