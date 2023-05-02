const USER_TOKEN = 'USER_TOKEN';

export function getUserToken() {
  const token = localStorage.getItem(USER_TOKEN);
  return token ? token : '';
}

export function removeUserToken() {
  localStorage.removeItem(USER_TOKEN);
}

export function saveUserToken(token) {
  localStorage.setItem(USER_TOKEN, token);
}
