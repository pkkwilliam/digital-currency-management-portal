import { constructBasicRequest } from './config';

const COMPANY_ONBOARD_SERVICE_URL = '/company/onboard/v1';

export const COMPANY_ONBOARD_SERVICE_CONFIG = {
  requireAuth: true,
  serviceUrl: COMPANY_ONBOARD_SERVICE_URL,
};

export async function GET_COMPANY_ONBOARD() {
  const request = {
    authenticated: COMPANY_ONBOARD_SERVICE_CONFIG.requireAuth,
    method: 'GET',
    requestUrl: COMPANY_ONBOARD_SERVICE_CONFIG.serviceUrl,
  };
  return constructBasicRequest(request);
}
