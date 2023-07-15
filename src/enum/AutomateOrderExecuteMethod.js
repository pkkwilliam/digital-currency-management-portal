export const AUTOMATE_ORDER_EXECUTE_METHOD_AUTO = {
  key: 'AUTO',
  info: 'Auto mode - System will take care of closing the consider this order in concurrent when opening new order',
  label: 'Auto',
  color: 'success',
};
export const AUTOMATE_ORDER_EXECUTE_METHOD_IGNORE_CONCURRENT = {
  key: 'IGNORE_CONCURRENT',
  info: 'Ignore Concurrent mode - System will not count this order in concurrent but will still try to close if profitable',
  label: 'IC',
  color: 'warning',
};
export const AUTOMATE_ORDER_EXECUTE_METHOD_TOTAL_IGNORE = {
  key: 'TOTAL_IGNORE',
  info: 'Ignore mode - System will ignore this order totally even profitable',
  label: 'Ignore',
  color: 'error',
};

export const AUTOMATE_ORDER_EXECUTE_METHODS = [
  AUTOMATE_ORDER_EXECUTE_METHOD_AUTO,
  AUTOMATE_ORDER_EXECUTE_METHOD_IGNORE_CONCURRENT,
  AUTOMATE_ORDER_EXECUTE_METHOD_TOTAL_IGNORE,
];
