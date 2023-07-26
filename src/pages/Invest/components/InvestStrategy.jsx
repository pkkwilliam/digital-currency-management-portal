import { Card, Descriptions } from 'antd';
import React from 'react';

const InvestStrategy = (props) => {
  const { nextEstimateOpenPrice } = props.invest;
  return (
    <Card title="Invest Strategy">
      <Descriptions>
        <Descriptions.Item label="Next Open Price">
          {nextEstimateOpenPrice ? `$${nextEstimateOpenPrice}` : '-'}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default InvestStrategy;
