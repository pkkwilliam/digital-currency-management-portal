import { constructBasicRequest } from './config';

const USER_PROFILE_SERVICE_URL = '/user_profile/v1';

export async function GET_USER_PROFILE() {
  const requestInfo = {
    authenticated: true,
    method: 'GET',
    requestUrl: USER_PROFILE_SERVICE_URL,
  };
  return constructBasicRequest(requestInfo);
}

export async function CHANGE_PASSWORD(request) {
  const requestInfo = {
    authenticated: true,
    body: request,
    method: 'PUT',
    requestUrl: USER_PROFILE_SERVICE_URL + '/change_password',
    successMessage: '修改密碼成功',
  };
  return constructBasicRequest(requestInfo);
}
