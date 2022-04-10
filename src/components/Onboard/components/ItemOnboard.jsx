import ItemStepForm from '@/pages/company/Item/Components/ItemStepForm';
import { BEDROCK_CREATE_SERVICE_REQEUST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_CATEGORY_SERVICE_CONFIG } from '@/services/hive/categoryService';
import ProCard from '@ant-design/pro-card';
import { Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useState } from 'react';

const ItemOnboard = () => {
  const [modalFormVisible, setModalFormVisible] = useState(false);

  const create = async (request) => {
    await BEDROCK_CREATE_SERVICE_REQEUST(COMPANY_CATEGORY_SERVICE_CONFIG, request);
    return true;
  };

  return (
    <>
      <ProCard extra={<ItemStepForm />} headerBordered title="商品">
        <Space>
          <Text>創建首個商品</Text>
        </Space>
      </ProCard>
    </>
  );
};

export default ItemOnboard;
