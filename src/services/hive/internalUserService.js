import { constructBasicRequest } from './config';

const COMPANY_INTERNAL_USER_SERVICE_URL = '/company/internal_user/v1';

export const COMPANY_INTERNAL_USER_SERVICE_CONFIG = {
  requireAuth: true,
  serviceUrl: COMPANY_INTERNAL_USER_SERVICE_URL,
};

export async function COMPANY_INTERNAL_USER_RESET_PASSWORD(requestBody) {
  const request = {
    authenticated: COMPANY_INTERNAL_USER_SERVICE_CONFIG.requireAuth,
    body: requestBody,
    method: 'PUT',
    requestUrl: COMPANY_INTERNAL_USER_SERVICE_CONFIG.serviceUrl + '/reset_password',
  };
  return constructBasicRequest(request);
}
