import axios from './custom-axios';
import { IPagedLoad, ILoad } from '../models/load';
import { getAuthHeader } from '../helpers/auth-common';

const url = `${process.env.REACT_APP_API_URL}/api/v1/load`;

export async function getList(queryString?: string) {
  const config = {
    headers: {
      ...getAuthHeader(),
    },
  };

  return await axios
    .get<{ result: IPagedLoad }>(url + (queryString ? queryString : ''), config)
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
    .post<{ result: ILoad }>(url, data, config)
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
    .patch<{ result: ILoad }>(`${url}/${id}`, data, config)
    .then((response) => {
      return response.data.result;
    });
}

export async function get(id: string) {
  const config = {
    headers: {
      ...getAuthHeader(),
    },
  };
  return await axios
    .get<{ result: ILoad }>(`${url}/${id}`, config)
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
    .delete<{ result: ILoad }>(`${url}/${id}`, config)
    .then((response) => {
      return response.data.result;
    });
}
