import { getValueEnum } from '@/enum/enumUtil';
import { INVEST_FEATURES } from '@/enum/investFeature';
import { ProFormSelect } from '@ant-design/pro-form';
import React from 'react';

export const ProFormInvestFeatureSelect = (props) => {
  return <ProFormSelect mode="multiple" valueEnum={getValueEnum(INVEST_FEATURES)} {...props} />;
};

export default ProFormInvestFeatureSelect;
