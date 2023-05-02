import { ProFormSelect } from '@ant-design/pro-form';
import { getValueEnum } from '@/enum/enumUtil';
import React from 'react';
import { SYSTEM_LOG_OPERATIONS } from '@/enum/systemLogOperation';

const ProFormSystemLogOperationSelect = (props) => {
  return <ProFormSelect valueEnum={getValueEnum(SYSTEM_LOG_OPERATIONS)} {...props} />;
};

export default ProFormSystemLogOperationSelect;
