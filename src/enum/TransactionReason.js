import {
  AlertTwoTone,
  ExpandAltOutlined,
  FileSyncOutlined,
  SettingTwoTone,
  ThunderboltTwoTone,
  ToolTwoTone,
} from '@ant-design/icons';

export const TRANSACTION_REASON_AUTOMATE_ORDER = {
  key: 'AUTOMATE_ORDER',
  label: 'Auto',
  description: 'Trade was execute automatically by system',
  color: 'success',
  icon: <SettingTwoTone />,
};
export const TRANSACTION_REASON_MANUAL_ORDER = {
  key: 'MANUAL_ORDER',
  label: 'Manual',
  description: 'Trade was execute manually by user',
  color: 'error',
  icon: <ToolTwoTone twoToneColor="#9fa2a6" />,
};
export const TRANSACTION_REASON_RISK_MANAGEMENT = {
  key: 'RISK_MANAGEMENT',
  label: 'Risk',
  description:
    'Invest Config contains Risk Manage - Application will attempt to force close the order if lost >= 30%.',
  color: 'error',
  icon: <AlertTwoTone twoToneColor="#f5210a" />,
};
export const TRANSACTION_REASON_EXTERNAL_ORDER_SYNC = {
  key: 'EXTERNAL_ORDER_SYNC',
  label: 'Sync',
  color: 'warn',
  icon: <FileSyncOutlined color="#1b44fa" />,
};

export const TRANSACTION_REASON_AUTO_EXPAND = {
  key: 'AUTO_EXPAND',
  label: 'Expand',
  description:
    'Invest Config contains Auto Expand - Application will expand the invest size by confidence rate.',
  color: 'success',
  icon: <ExpandAltOutlined color="#1b44fa" />,
};

export const TRANSACTION_REASON_EXTERNAL_RAPID_CLOSE = {
  key: 'RAPID_CLOSE',
  label: 'RC',
  description:
    'Invest Config contains Rapid Close - Application will attempt to close the order if SELECTED Algoirthm supports it.',
  color: 'error',
  icon: <ThunderboltTwoTone color="#fceb49" />,
};

export const TRANSACTION_REASONS = [
  TRANSACTION_REASON_AUTOMATE_ORDER,
  TRANSACTION_REASON_MANUAL_ORDER,
  TRANSACTION_REASON_RISK_MANAGEMENT,
  TRANSACTION_REASON_EXTERNAL_ORDER_SYNC,
  TRANSACTION_REASON_AUTO_EXPAND,
  TRANSACTION_REASON_EXTERNAL_RAPID_CLOSE,
];
