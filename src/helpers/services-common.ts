import { getToken } from './auth-common';
import queryString from 'query-string';

export const getApiURL = (route: string): string => {
  return `${process.env.REACT_APP_API_URL}/api/${getApiVersion()}${route}`;
};

const getApiVersion = () => {
  return 'v1';
};

export const getAxiosConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
};

export const handleError = (e: any): string[] => {
  const errorMsgArr = [];
  if (e.response) {
    const { general, fields } = e.response.data.result.errors;

    if (general) {
      errorMsgArr.push(general.message);
    }

    if (fields) {
      errorMsgArr.push(fields.map((value: any) => value.msg));
    }
  }else {
    alert(e.message)
    errorMsgArr.push('Something went wrong.')
  }
  return errorMsgArr;
};

export const buildQueryParams = (filter: any) => {
  let queryParams = '';
  if (filter) {
    queryParams = queryString.stringify(filter);
  }
  return queryParams;
};
