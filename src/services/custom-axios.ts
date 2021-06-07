import axios from 'axios';
// import history from '../history';
// import { logout } from '../state/actions/authAction';
// import { store } from '../state/store';

// const defaultToken = localStorage.getItem('token');
const customAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  // headers: { Authorization: 'Bearer ' + defaultToken },
});

// customAxios.interceptors.request.use(
//   async (config) => {
//     const token = await localStorage.getItem('token');
//     console.log(token, config);
//     if (token) {
//       console.log('TOKEN UPDATED')
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     console.log('UPDATED TOKEN',config.headers.Authorization)
//     return config;
//   },
//   (error) => {
//     throw error;
//   }
// );

// customAxios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     if (error) {
//       if (error.response.status === 401) {
//         await store.dispatch(logout());
//         await localStorage.removeItem('token');
//         history.push('/login');
//       }

//       if (error.response.status === 503) {
//         alert(error.response.data.result.errors.general.message);
//       }

//       throw error;
//     }
//   }
// );

export default customAxios;
