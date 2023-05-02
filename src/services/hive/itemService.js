import { constructBasicRequest, contructPaginationRequest } from './config';

const COMPANY_ITEM_SERVICE_URL = '/company_manager/item/v1';

export const COMPANY_MANAGER_ITEM_SERVICE_CONFIG = {
  requireAuth: true,
  serviceUrl: COMPANY_ITEM_SERVICE_URL,
};

export const COMPANY_ITEM_SERVICE_CONFIG = {
  requireAuth: true,
  serviceUrl: COMPANY_ITEM_SERVICE_URL,
};

export const PUBLIC_ITEM_SERVICE_CONFIG = {
  requireAuth: true,
  serviceUrl: '/public/item/v1',
};

export async function COMPANY_MANAGER_QUERY_WITH_STOCK(params, sort, filter) {
  const request = {
    authenticated: COMPANY_MANAGER_ITEM_SERVICE_CONFIG.requireAuth,
    method: 'GET',
    params,
    requestUrl: COMPANY_MANAGER_ITEM_SERVICE_CONFIG.serviceUrl + '/query_with_stock',
  };
  return contructPaginationRequest(request);
}

export async function COMPANY_MANAGER_GET_DISTINCT_ITEM_BRAND_LIST(params) {
  const request = {
    authenticated: COMPANY_MANAGER_ITEM_SERVICE_CONFIG.requireAuth,
    method: 'GET',
    params,
    requestUrl: COMPANY_MANAGER_ITEM_SERVICE_CONFIG.serviceUrl + '/brand',
  };
  return constructBasicRequest(request);
}

export async function COMPANY_MANAGER_GET_DISTINCT_ITEM_NAME_LIST(params) {
  const request = {
    authenticated: COMPANY_MANAGER_ITEM_SERVICE_CONFIG.requireAuth,
    method: 'GET',
    params,
    requestUrl: COMPANY_MANAGER_ITEM_SERVICE_CONFIG.serviceUrl + '/name',
  };
  return constructBasicRequest(request);
}
