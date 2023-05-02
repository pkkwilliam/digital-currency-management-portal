import { ProFormSelect } from '@ant-design/pro-form';
import { getValueEnum } from '@/enum/enumUtil';
import React from 'react';
import { COMPANY_ACCOUNT_TYPES } from '@/enum/companyAccountType';

const ProFormCompanyAccountType = (props) => {
  return <ProFormSelect valueEnum={getValueEnum(COMPANY_ACCOUNT_TYPES)} {...props} />;
};

export default ProFormCompanyAccountType;
