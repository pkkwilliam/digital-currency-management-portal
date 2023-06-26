import { constructBasicRequest } from './config';

const USER_MANUAL_ORDER_SERVICE_URL = '/user/manual_order/v1';

export const USER_MANUAL_ORDER_SERVICE_CONFIG = {
  requireAuth: true,
  serviceUrl: USER_MANUAL_ORDER_SERVICE_URL,
};

export const OPEN_ORDER = (investId, params) => {
  const request = {
    authenticated: USER_MANUAL_ORDER_SERVICE_CONFIG.requireAuth,
    body: params,
    method: 'POST',
    requestUrl: USER_MANUAL_ORDER_SERVICE_CONFIG.serviceUrl + `/${investId}/open`,
  };
  return constructBasicRequest(request);
};

export const CLOSE_ORDER = (orderId, params) => {
  const request = {
    authenticated: USER_MANUAL_ORDER_SERVICE_CONFIG.requireAuth,
    body: params,
    method: 'POST',
    requestUrl: USER_MANUAL_ORDER_SERVICE_CONFIG.serviceUrl + `/${orderId}/close`,
  };
  return constructBasicRequest(request);
};

export const IGNORE_ORDER = (orderId) => {
  const request = {
    authenticated: USER_MANUAL_ORDER_SERVICE_CONFIG.requireAuth,
    method: 'PUT',
    requestUrl: USER_MANUAL_ORDER_SERVICE_CONFIG.serviceUrl + `/${orderId}/ignore`,
  };
  return constructBasicRequest(request);
};
