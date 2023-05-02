import { COMPANY_ACCOUNT_TYPES } from '@/enum/companyAccountType';
import { getValueEnum } from '@/enum/enumUtil';
import { ProFormRadio } from '@ant-design/pro-form';
import React from 'react';

const ProFormCompanyTypeRadio = (props) => {
  return <ProFormRadio.Group valueEnum={getValueEnum(COMPANY_ACCOUNT_TYPES)} {...props} />;
};

export default ProFormCompanyTypeRadio;
