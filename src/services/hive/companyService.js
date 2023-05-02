import { constructBasicRequest, contructPaginationRequest } from './config';

const ADMIN_COMPANY_SERVICE_URL = '/admin/company/v1';

export const ADMIN_COMPANY_SERVICE_CONFIG = {
  authenticated: true,
  serviceUrl: ADMIN_COMPANY_SERVICE_URL,
};

export const PUBLIC_COMAPNY_SERVICE_CONFIG = {
  authenticated: false,
  serviceUrl: '/public/company/v1',
};

// export async function ADMIN_COMPANY_DELETE(companyId) {
//   const requestBody = {
//     authenticated: true,
//     method: 'DELETE',
//     requestUrl: ADMIN_COMPANY_SERVICE_URL + `/${companyId}`,
//   };
//   return contructPaginationRequest(requestBody);
// }

// export async function ADMIN_COMPANY_SERACH(nameLike) {
//   const requestBody = {
//     authenticated: true,
//     method: 'GET',
//     params: {
//       nameLike,
//     },
//     requestUrl: ADMIN_COMPANY_SERVICE_URL + '/search_name_like',
//   };
//   return constructBasicRequest(requestBody);
// }

// export async function COMPANY_QUERY(params = {}, sort, filter) {
//   const requestBody = {
//     authenticated: true,
//     method: 'GET',
//     params: {
//       ...params,
//       pageRequest: params.current - 1,
//     },
//     requestUrl: ADMIN_COMPANY_SERVICE_URL + '/query',
//   };
//   return contructPaginationRequest(requestBody);
// }

// export async function CREATE_COMPANY(company) {
//   const requestBody = {
//     authenticated: true,
//     body: company,
//     method: 'POST',
//     requestUrl: ADMIN_COMPANY_SERVICE_URL,
//   };
//   return constructBasicRequest(requestBody);
// }

// export async function UPDATE_COMPANY(company) {
//   const requestBody = {
//     authenticated: true,
//     body: company,
//     method: 'PUT',
//     requestUrl: ADMIN_COMPANY_SERVICE_URL,
//   };
//   return constructBasicRequest(requestBody);
// }
