import axios from './custom-axios';
import { IPagedLoad, ILoad } from '../models/load';

const url = `${process.env.REACT_APP_API_URL}/api/v1/load`;

export async function getList(queryString?: string) {
  return await axios
    .get<{ result: IPagedLoad }>(url + (queryString ? queryString : ''))
    .then((response) => {
      return response.data.result;
    });
}

export async function create(data: any) {
  return await axios.post<{ result: ILoad }>(url, data).then((response) => {
    return response.data.result;
  });
}

export async function edit(id: number, data: any) {
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

export async function deleteById(id: number) {
  return await axios
    .delete<{ result: ILoad }>(`${url}/${id}`)
    .then((response) => {
      return response.data.result;
    });
}
