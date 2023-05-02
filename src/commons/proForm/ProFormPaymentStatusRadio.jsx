import { ProFormRadio } from '@ant-design/pro-form';
import React from 'react';
import { getValueEnum } from '@/enum/enumUtil';
import { PAYMENT_STATUSES } from '@/enum/paymentStatus';

const ProFormPaymentStatusRadio = (props) => {
  return <ProFormRadio.Group valueEnum={getValueEnum(PAYMENT_STATUSES)} {...props} />;
};

export default ProFormPaymentStatusRadio;
