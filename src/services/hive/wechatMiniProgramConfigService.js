import { constructBasicRequest } from './config';

const COMPANY_WECHAT_MINI_PROGRAM_CONFIG_SERVICE_URL = '/company/wechat_mini_program_config/v1';

export const COMPANY_WECHAT_MINI_PROGRAM_CONFIG_SERVICE_CONFIG = {
  requireAuth: true,
  serviceUrl: COMPANY_WECHAT_MINI_PROGRAM_CONFIG_SERVICE_URL,
};

export async function COMPANY_GET_COMPANY_WECHAT_MINI_PROGRAM_CONFIG_BY_COMPANY_ID(companyId) {
  const request = {
    authenticated: true,
    method: 'GET',
    requestUrl: COMPANY_WECHAT_MINI_PROGRAM_CONFIG_SERVICE_URL + `/company/${companyId}`,
  };
  return constructBasicRequest(request);
}
