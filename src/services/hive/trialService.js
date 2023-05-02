import { constructBasicRequest } from './config';

const TRIAL_SERVICE_URL = '/public/trial/v1';

export async function TRIAL_REQUEST(trial) {
  const requset = {
    authenticated: false,
    body: trial,
    method: 'POST',
    requestUrl: TRIAL_SERVICE_URL + '/request_trial',
  };
  return constructBasicRequest(requset);
}

export async function TRIAL_VERIFY(trial) {
  const requset = {
    authenticated: false,
    body: trial,
    method: 'POST',
    requestUrl: TRIAL_SERVICE_URL + '/verify_trial',
  };
  return constructBasicRequest(requset);
}
