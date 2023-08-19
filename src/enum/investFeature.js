import { SettingTwoTone } from '@ant-design/icons';

export const INVEST_FEATURE_AUTO_EXPAND = {
  key: 'AUTO_EXPAND',
  label: 'Auto Expand',
  description:
    'Invest Config contains Auto Expand - Application will expand the invest size by confidence rate.',
  icon: <SettingTwoTone />,
};
export const INVEST_FEATURE_RAPID_CLOSE = {
  key: 'RAPID_CLOSE',
  label: 'Rapid Close',
  description:
    'Invest Config contains Rapid Close - Application will attempt to close the order by Algoirthm supports it.',
  icon: <SettingTwoTone />,
};
export const INVEST_FEATURE_RISK_MANAGE = {
  key: 'RISK_MANAGE',
  label: 'Risk Manage',
  description:
    'Invest Config contains Risk Manage - Application will attempt to force close the order if lost >= 30%.',
  icon: <SettingTwoTone />,
};

export const INVEST_FEATURES = [
  INVEST_FEATURE_AUTO_EXPAND,
  INVEST_FEATURE_RAPID_CLOSE,
  INVEST_FEATURE_RISK_MANAGE,
];
