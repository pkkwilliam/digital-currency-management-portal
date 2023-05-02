import { ProFormSelect } from '@ant-design/pro-form';
import { getValueEnum } from '@/enum/enumUtil';
import React from 'react';
import { PRINTERS } from '@/enum/printer';

const ProFormPrinterSelect = (props) => {
  return <ProFormSelect valueEnum={getValueEnum(PRINTERS)} {...props} />;
};

export default ProFormPrinterSelect;
