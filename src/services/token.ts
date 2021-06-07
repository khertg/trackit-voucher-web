import axios from './custom-axios';

const url = `${process.env.REACT_APP_API_URL}/api/v1/token`;

export async function validateToken() {
  return await axios.post<any>(url + '/validateToken').then((response) => {
    return response.data.result;
  });
}
