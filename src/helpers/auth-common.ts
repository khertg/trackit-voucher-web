export const tokenKey = 'trackit-token';

export function getAuthHeader() {
  const token = getToken();
  return { Authorization: `Bearer ${token}` };
}

export function getToken() {
  return localStorage.getItem(tokenKey);
}

export function setToken(token: string) {
  localStorage.setItem(tokenKey, token);
}

export async function removeToken() {
  await localStorage.removeItem(tokenKey);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function isAuth() {
  const token = getToken();
  return token !== null;
}
