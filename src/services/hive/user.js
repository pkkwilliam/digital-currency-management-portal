import { constructBasicRequest, contructPaginationRequest } from './config';

const ADMIN_USER_SERVICE_URL = '/admin/user/v1';

export async function ADMIN_CREATE_USER(user) {
  const requestInfo = {
    authenticated: true,
    body: user,
    method: 'POST',
    requestUrl: ADMIN_USER_SERVICE_URL,
  };
  return constructBasicRequest(requestInfo);
}

export async function ADMIN_DELETE_USER(userSid) {
  const requestInfo = {
    authenticated: true,
    method: 'DELETE',
    requestUrl: ADMIN_USER_SERVICE_URL + `/${userSid}`,
  };
  return constructBasicRequest(requestInfo);
}

export async function ADMIN_QUERY_USER(params) {
  const requestInfo = {
    authenticated: true,
    method: 'GET',
    params: {
      ...params,
      pageRequest: params.current - 1,
    },
    requestUrl: ADMIN_USER_SERVICE_URL + '/query',
  };
  return contructPaginationRequest(requestInfo);
}

export async function ADMIN_UPDATE_USER(user) {
  const requestInfo = {
    authenticated: true,
    body: user,
    method: 'PUT',
    requestUrl: ADMIN_USER_SERVICE_URL + `/${user.sid}`,
  };
  return constructBasicRequest(requestInfo);
}
