import React, { useState } from 'react';
import ProFormInvestChannelSelect from '@/commons/proForm/ProFormChannelSelect';
import { ProFormField } from '@ant-design/pro-form';
import { Button, Col, Row, Space } from 'antd';
import { GET_PRODUCT_ID } from '../../../services/hive/investService';
import Text from 'antd/lib/typography/Text';

const ChannelProductIdLookup = (props) => {
  const [selectedChannel, setSelectedChannel] = useState();
  const [keyword, setKeyword] = useState();
  const [productIds, setProductIds] = useState([]);

  const onClickSearch = async () => {
    const response = await GET_PRODUCT_ID(selectedChannel, keyword);
    setProductIds(response);
  };

  return (
    <>
      <Row align="middle" gutter={24}>
        <Col span={10}>
          <ProFormInvestChannelSelect
            fieldProps={{ onSelect: (channel) => setSelectedChannel(channel) }}
            label="Channel"
          />
        </Col>
        <Col span={10}>
          <ProFormField
            disabled={!selectedChannel}
            fieldProps={{ onChange: (event) => setKeyword(event.target.value) }}
            label="Keyword"
          />
        </Col>
        <Col span={4}>
          <Button disabled={!selectedChannel || !keyword} onClick={onClickSearch} type="primary">
            Search
          </Button>
        </Col>
      </Row>
      <ResponseList productIds={productIds} />
    </>
  );
};

const ResponseList = (props) => {
  const { productIds } = props;
  if (productIds.length < 1) {
    return null;
  }
  return productIds.map(({ channelProductId, message }, index) => {
    return (
      <Row key="ResponseList">
        <Text>{`Channel Product ID: ${channelProductId} - Message: ${message}`}</Text>
      </Row>
    );
  });
};

export default ChannelProductIdLookup;
