import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

const ProFormToolBarButtons = (onClickCreate) => {
  () => [
    <Button icon={<PlusOutlined />} key="button" type="primary" onClick={onClickCreate}>
      新建
    </Button>,
  ];
};

export default ProFormToolBarButtons;
