import { constructBasicRequest, contructPaginationRequest } from './config';

const USER_INVEST_SERVICE_URL = '/user/invest/v1';

export const USER_INVEST_SERVICE_CONFIG = {
  requireAuth: true,
  serviceUrl: USER_INVEST_SERVICE_URL,
};

export async function GET_INVEST_DETAIL(serviceConfig, params, sort, filter) {
  const request = {
    authenticated: serviceConfig.requireAuth,
    method: 'GET',
    params: {
      ...params,
      pageRequest: params.current - 1,
    },
    requestUrl: USER_INVEST_SERVICE_CONFIG.serviceUrl + `/query_pagination/detail`,
  };
  return contructPaginationRequest(request);
}

export async function GET_INVEST_ORDER_BOOK(investId) {
  const request = {
    authenticated: USER_INVEST_SERVICE_CONFIG.requireAuth,
    method: 'GET',
    requestUrl: USER_INVEST_SERVICE_CONFIG.serviceUrl + `/${investId}/orderBook`,
  };
  return constructBasicRequest(request);
}

export async function GET_INVEST_SUMMARY(investId, startDate, endDate) {
  const request = {
    authenticated: USER_INVEST_SERVICE_CONFIG.requireAuth,
    method: 'GET',
    requestUrl:
      USER_INVEST_SERVICE_CONFIG.serviceUrl +
      `/${investId}/summary?startDate=${startDate}&endDate=${endDate}`,
  };
  return constructBasicRequest(request);
}

export async function GET_PRODUCT_ID(channel, keyword) {
  const request = {
    authenticated: USER_INVEST_SERVICE_CONFIG.requireAuth,
    method: 'GET',
    requestUrl: USER_INVEST_SERVICE_CONFIG.serviceUrl + `/${channel}/productId?keyword=${keyword}`,
  };
  return constructBasicRequest(request);
}

// Transaction Limiter
export async function DELETE_ALL_ERROR_LOGS(investId) {
  const request = {
    authenticated: USER_INVEST_SERVICE_CONFIG.requireAuth,
    method: 'DELETE',
    requestUrl: USER_INVEST_SERVICE_CONFIG.serviceUrl + `/${investId}/error_log`,
  };
  return constructBasicRequest(request);
}

export async function RESET_TRANSACTION_LIMITER(investId) {
  const request = {
    authenticated: USER_INVEST_SERVICE_CONFIG.requireAuth,
    method: 'PUT',
    requestUrl: USER_INVEST_SERVICE_CONFIG.serviceUrl + `/${investId}/reset_transaction_limiter`,
  };
  return constructBasicRequest(request);
}

// News
export async function GET_INVEST_NEWS(investId) {
  const request = {
    authenticated: USER_INVEST_SERVICE_CONFIG.requireAuth,
    method: 'GET',
    requestUrl: USER_INVEST_SERVICE_CONFIG.serviceUrl + `/${investId}/news`,
  };
  return constructBasicRequest(request);
}
