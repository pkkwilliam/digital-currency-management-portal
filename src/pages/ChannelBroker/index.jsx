import { CHANNEL_TYPES } from '@/enum/Channel';
import { getEnumLabelByKey } from '@/enum/enumUtil';
import { GET_CHANNEL_ACCOUNTS } from '@/services/hive/channelAccount';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Card, Table } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useEffect, useState } from 'react';

const CHANNEL_ACCOUNT_COLUMNS = [
  {
    title: 'Channel',
    dataIndex: 'channel',
    key: 'channel',
    render: (text) => getEnumLabelByKey(CHANNEL_TYPES, text),
  },
  {
    title: 'Account ID',
    dataIndex: 'accountId',
    key: 'accountId',
  },
  {
    title: 'Margin',
    dataIndex: 'margin',
    key: 'margin',
    render: (text) => <Text type={text > 150 ? 'success' : 'danger'}>{text ?? 0}%</Text>,
  },
  {
    title: 'Equity',
    dataIndex: 'equity',
    key: 'equity',
    renderText: (text, record) => `$${text ?? 0}`,
  },
  {
    title: 'Unreleased P/L',
    dataIndex: 'unreleasedProfitLoss',
    key: 'unreleasedProfitLoss',
    tooltip: 'Unreleased Profit/Loss',
    render: (text) => {
      const displayValue = text ? text : 0;
      let type = 'secondary';
      if (displayValue > 0) {
        type = 'success';
      } else if (displayValue < 0) {
        type = 'danger';
      } else {
        type = 'secondary';
      }
      return <Text type={type}>{`$${displayValue}`}</Text>;
    },
  },
];

const ChannelBroker = () => {
  const [channelAccountDetails, setChannelAccountDetails] = useState({ channelAccounts: [] });

  useEffect(() => {
    getChannelAccounts();
  }, []);

  const getChannelAccounts = async () => {
    const response = await GET_CHANNEL_ACCOUNTS();
    setChannelAccountDetails(response);
  };

  return (
    <PageContainer>
      <Card title="Channel Account">
        <ChannelAccountContent channelAccounts={channelAccountDetails.channelAccounts} />
      </Card>
    </PageContainer>
  );
};

const ChannelAccountContent = (props) => {
  const { channelAccounts } = props;
  return (
    <ProTable
      columns={CHANNEL_ACCOUNT_COLUMNS}
      dataSource={channelAccounts}
      options={false}
      pagination={false}
      refrm
      search={false}
      size="small"
    />
  );
};

export default ChannelBroker;
