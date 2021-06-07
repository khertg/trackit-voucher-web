import axios from './custom-axios';

const url = `${process.env.REACT_APP_API_URL}/api/v1/auth`;

export async function login(email: string, password: string) {
  const data = {
    email,
    password,
  };
  return await axios
    .post<{ result: any }>(url + '/login', data)
    .then((response) => {
      return response.data.result;
    });
}
