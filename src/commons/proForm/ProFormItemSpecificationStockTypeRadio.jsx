import { getValueEnum } from '@/enum/enumUtil';
import { ITEM_SPECIFICATION_STOCK_TYPES } from '@/enum/itemSpecificationStockType';
import { ProFormRadio } from '@ant-design/pro-form';
import React from 'react';

const ProFormItemSpecificationStockTypeRadio = (props) => {
  return <ProFormRadio.Group valueEnum={getValueEnum(ITEM_SPECIFICATION_STOCK_TYPES)} {...props} />;
};

export default ProFormItemSpecificationStockTypeRadio;
