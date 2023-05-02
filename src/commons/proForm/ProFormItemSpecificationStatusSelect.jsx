import { ProFormSelect } from '@ant-design/pro-form';
import { getValueEnum } from '@/enum/enumUtil';
import React from 'react';
import { ITEM_SPECIFICATION_STATUSES } from '@/enum/itemSpecificationStatus';

const ProFormItemSpecificationStatusSelect = (props) => {
  return <ProFormSelect valueEnum={getValueEnum(ITEM_SPECIFICATION_STATUSES)} {...props} />;
};

export default ProFormItemSpecificationStatusSelect;
