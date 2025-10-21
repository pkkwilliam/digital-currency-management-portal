import React from 'react';
import { GET_CHANNEL_ACCOUNTS } from '@/services/hive/channelAccount';
import { ProFormSelect } from '@ant-design/pro-form';
import { getEnumLabelByKey } from '@/enum/enumUtil';
import { CHANNEL_TYPES } from '@/enum/Channel';

const ProFormChannelAccountSelect = (props) => {
  const query = async (params) => {
    const response = await GET_CHANNEL_ACCOUNTS(params);
    const { channelAccounts } = response;
    const list = channelAccounts.map(({ accountId, channel }) => ({
      value: accountId,
      label: `${getEnumLabelByKey(CHANNEL_TYPES, channel, 'shortLabel')} ${accountId}`,
    }));
    return list;
  };

  return <ProFormSelect request={query} {...props} />;
};

export default ProFormChannelAccountSelect;
