import React from 'react';
import { COMPANY_MANAGER_ITEM_SPECIFICATION_PRICE_TEMPLATE_SERVICE_CONFIG } from '@/services/hive/itemSpecificationPriceTemplate';
import { ProFormSelect } from '@ant-design/pro-form';
import { BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';

const ProFormItemSpecificationPriceTemplate = (props) => {
  const queryItemSpecificationPriceTemplate = async (params) => {
    const response = await BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(
      COMPANY_MANAGER_ITEM_SPECIFICATION_PRICE_TEMPLATE_SERVICE_CONFIG,
      {
        active: true,
        current: 1,
        pageSize: 20,
        name: params.keyWords,
      },
    );
    return response.content.map((priceTemplate) => ({
      label: priceTemplate.name,
      value: priceTemplate.id,
    }));
  };

  return <ProFormSelect request={queryItemSpecificationPriceTemplate} showSearch {...props} />;
};

export default ProFormItemSpecificationPriceTemplate;