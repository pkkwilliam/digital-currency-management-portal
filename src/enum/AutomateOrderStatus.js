export const AUTOMATE_ORDER_STATUS_SOLD = {
  key: 'SOLD',
  label: 'Sold',
  percentComplete: 100,
};
export const AUTOMATE_ORDER_STATUS_FILLED = { key: 'FILLED', label: 'Filled', percentComplete: 50 };
export const AUTOMATE_ORDER_STATUS_IGNORE = {
  key: 'IGNORE',
  label: 'Ignore',
  percentComplete: 100,
};
export const AUTOMATE_ORDER_STATUS_SELLING = {
  key: 'SELLING',
  label: 'Selling',
  percentComplete: 75,
};
export const AUTOMATE_ORDER_STATUS_SUBMITTED = {
  key: 'SUBMITTED',
  label: 'Submitted',
  percentComplete: 25,
};

export const AUTOMATE_ORDER_STATUS = [
  AUTOMATE_ORDER_STATUS_FILLED,
  AUTOMATE_ORDER_STATUS_IGNORE,
  AUTOMATE_ORDER_STATUS_SELLING,
  AUTOMATE_ORDER_STATUS_SOLD,
  AUTOMATE_ORDER_STATUS_SUBMITTED,
];
