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
