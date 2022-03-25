import { constructBasicRequest } from './config';

const PUBLIC_PRE_ORDER_SERVICE_IRL = '/public/preorder/v1';

export const PUBLIC_PRE_ORDER_SERVICE_CONFIG = {
  requireAuth: false,
  serviceUrl: PUBLIC_PRE_ORDER_SERVICE_IRL,
};

export async function PUBLIC_PRE_ORDER_ITEM_SPECIFICATION(companyBusiness, item, includeStock) {
  const request = {
    authenticated: PUBLIC_PRE_ORDER_SERVICE_CONFIG.requireAuth,
    method: 'GET',
    params: {
      'companyBusiness.id': companyBusiness.id,
      'item.id': item.id,
      includeStock,
    },
    requestUrl: PUBLIC_PRE_ORDER_SERVICE_CONFIG.serviceUrl + '/itemSpecification',
  };
  return constructBasicRequest(request);
}
