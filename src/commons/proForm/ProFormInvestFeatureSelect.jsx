import { getEnumObjectByKey, getValueEnum } from '@/enum/enumUtil';
import { INVEST_FEATURES } from '@/enum/investFeature';
import { ProFormSelect } from '@ant-design/pro-form';
import { Popover, Select, Space, Tag } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';

const { Option } = Select;

export const ProFormInvestFeatureSelect = (props) => {
  return (
    <ProFormSelect
      mode="multiple"
      valueEnum={getValueEnum(INVEST_FEATURES)}
      fieldProps={{
        optionItemRender: ({ label, value }) => {
          const enumObject = getEnumObjectByKey(INVEST_FEATURES, value);
          return <Popover content={enumObject.description}>{label}</Popover>;
        },
      }}
      {...props}
    />
  );
};

export default ProFormInvestFeatureSelect;
