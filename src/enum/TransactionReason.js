export const TRANSACTION_REASON_AUTOMATE_ORDER = {
  key: 'AUTOMATE_ORDER',
  label: 'Auto',
  color: 'success',
};
export const TRANSACTION_REASON_MANUAL_ORDER = {
  key: 'MANUAL_ORDER',
  label: 'Manual',
  color: 'error',
};
export const TRANSACTION_REASON_RISK_MANAGEMENT = {
  key: 'RISK_MANAGEMENT',
  label: 'Risk',
  color: 'error',
};
export const TRANSACTION_REASON_EXTERNAL_ORDER_SYNC = {
  key: 'EXTERNAL_ORDER_SYNC',
  label: 'Sync',
  color: 'warn',
};

export const TRANSACTION_REASON_AUTO_EXPAND = {
  key: 'AUTO_EXPAND',
  label: 'Expand',
  color: 'success',
};

export const TRANSACTION_REASON_EXTERNAL_RAPID_CLOSE = {
  key: 'RAPID_CLOSE',
  label: 'RC',
  color: 'error',
};

export const TRANSACTION_REASONS = [
  TRANSACTION_REASON_AUTOMATE_ORDER,
  TRANSACTION_REASON_MANUAL_ORDER,
  TRANSACTION_REASON_RISK_MANAGEMENT,
  TRANSACTION_REASON_EXTERNAL_ORDER_SYNC,
  TRANSACTION_REASON_AUTO_EXPAND,
  TRANSACTION_REASON_EXTERNAL_RAPID_CLOSE,
];
