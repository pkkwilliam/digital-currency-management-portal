import { getValueEnum } from '@/enum/enumUtil';
import { ORDER_STATUSES } from '@/enum/orderStatus';
import { ProFormRadio } from '@ant-design/pro-form';
import React from 'react';

const ProFormOrderStatusRadio = (props) => {
  return <ProFormRadio.Group valueEnum={getValueEnum(ORDER_STATUSES)} {...props} />;
};

export default ProFormOrderStatusRadio;
