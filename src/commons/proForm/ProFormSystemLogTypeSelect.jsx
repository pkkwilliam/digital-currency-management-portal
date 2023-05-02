import { ProFormSelect } from '@ant-design/pro-form';
import { getValueEnum } from '@/enum/enumUtil';
import React from 'react';
import { SYSTEM_LOG_TYPES } from '@/enum/systemLogType';

const ProFormSystemLogTypeSelect = (props) => {
  return <ProFormSelect valueEnum={getValueEnum(SYSTEM_LOG_TYPES)} {...props} />;
};

export default ProFormSystemLogTypeSelect;
