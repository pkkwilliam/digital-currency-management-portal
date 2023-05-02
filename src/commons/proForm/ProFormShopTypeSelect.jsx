import React from 'react';
import { ProFormSelect } from '@ant-design/pro-form';
import { getValueEnum } from '@/enum/enumUtil';
import { SHOP_TYPES } from '@/enum/shopType';

const ProFormShopTypeSelect = (props) => {
  return <ProFormSelect valueEnum={getValueEnum(SHOP_TYPES)} {...props} />;
};

export default ProFormShopTypeSelect;
