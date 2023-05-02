import React from 'react';
import { getValueEnum } from '@/enum/enumUtil';
import { ProFormSelect } from '@ant-design/pro-form';
import { COUNTRY_CODES } from '@/enum/countryCode';

const ProFormCountryCodeSelect = (props) => {
  return <ProFormSelect valueEnum={getValueEnum(COUNTRY_CODES)} {...props} />;
};

export default ProFormCountryCodeSelect;
