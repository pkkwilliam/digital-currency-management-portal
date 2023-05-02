import React from 'react';
import { ProFormSelect } from '@ant-design/pro-form';
import { getValueEnum } from '@/enum/enumUtil';
import { COMPANY_BUSINESS_PAYMENT_TYPES } from '@/enum/companyBusinessPaymentType';

const ProFormCompanyBusinessPaymentTypeSelect = (props) => {
  return <ProFormSelect valueEnum={getValueEnum(COMPANY_BUSINESS_PAYMENT_TYPES)} {...props} />;
};

export default ProFormCompanyBusinessPaymentTypeSelect;
