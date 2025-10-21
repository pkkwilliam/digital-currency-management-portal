import { constructBasicRequest, contructPaginationRequest } from './config';

const ADMIN_INVEST_FORECAST_SERVICE_URL = '/admin/invest_forecast/v1';
const ADMIN_INVEST_FORECAST_SERVICE_CONFIG = {
  requireAuth: true,
  serviceUrl: ADMIN_INVEST_FORECAST_SERVICE_URL,
};

export async function GENERATE_MANUAL_AI_REQUEST_WORDING(investId) {
  const request = {
    authenticated: ADMIN_INVEST_FORECAST_SERVICE_CONFIG.requireAuth,
    method: 'GET',
    requestUrl:
      ADMIN_INVEST_FORECAST_SERVICE_CONFIG.serviceUrl +
      `/${investId}/generate_manual_ai_request_wording`,
  };
  return constructBasicRequest(request);
}

export async function GET_INVEST_FORECAST(investId, params, sort, filter) {
  const request = {
    authenticated: ADMIN_INVEST_FORECAST_SERVICE_CONFIG.requireAuth,
    method: 'GET',
    params: {
      ...params,
      pageRequest: params.current - 1,
    },
    requestUrl: ADMIN_INVEST_FORECAST_SERVICE_CONFIG.serviceUrl + `/${investId}/query_pagination`,
  };
  return contructPaginationRequest(request);
}

export async function CREATE_INVEST_FORECAST(requestBody) {
  const request = {
    authenticated: ADMIN_INVEST_FORECAST_SERVICE_CONFIG.requireAuth,
    body: requestBody,
    method: 'POST',
    requestUrl: ADMIN_INVEST_FORECAST_SERVICE_CONFIG.serviceUrl,
  };
  return constructBasicRequest(request);
}
