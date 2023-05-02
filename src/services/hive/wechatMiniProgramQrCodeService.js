import { constructBasicRequest } from './config';

export const COMPANY_WECHAT_MINI_PROGRAM_QR_CODE_SERVICE_URL =
  '/company/wechat_mini_program_qr_code';

export async function COMPANY_GET_WECHAT_MINI_PROGRAM_QR_CODE(requestBody) {
  const request = {
    authenticated: true,
    body: requestBody,
    download: true,
    method: 'POST',
    requestUrl: COMPANY_WECHAT_MINI_PROGRAM_QR_CODE_SERVICE_URL,
    responseType: 'blob',
  };
  return constructBasicRequest(request);
}
