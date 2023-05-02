import { constructBasicRequest } from './config';

const COMPANY_ADMIN_COMPANY_CONFIG_SERVICE_URL = '/company_admin/company_config/v1';
const PUBLIC_COMPANY_CONFIG_SERVICE_URL = '/public/company_config/v1';

export const COMPANY_ADMIN_COMPANY_CONFIG_SERVICE_CONFIG = {
  requireAuth: true,
  serviceUrl: COMPANY_ADMIN_COMPANY_CONFIG_SERVICE_URL,
};

export async function PUBLIC_GET_COMPANY_CONFIG_BY_COMPANY_ID(companyId) {
  const request = {
    authenticated: false,
    method: 'GET',
    requestUrl: PUBLIC_COMPANY_CONFIG_SERVICE_URL + `/companyId/${companyId}`,
  };
  return constructBasicRequest(request);
}
