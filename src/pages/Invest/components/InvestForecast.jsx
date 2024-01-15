import { INVEST_FORECAST_USAGE_TYPES } from '@/enum/InvestForecastUsageType';
import { ANALYSIS_CHANNELS } from '@/enum/analysisChannel';
import { getEnumLabelByKey } from '@/enum/enumUtil';
import { GET_INVEST_FORECAST } from '@/services/hive/investForecastService';
import { toDisplayDateFromDouble } from '@/util/dateUtil';
import { findMaxDecimalPoint, money } from '@/util/numberUtil';
import ProTable from '@ant-design/pro-table';
import { Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useEffect, useRef } from 'react';

const InvestForecast = (props) => {
  const { invest } = props;

  const tableRef = useRef();

  useEffect(() => {});

  const getInvestForecastResult = async (params, sort, filter) => {
    if (!invest || !invest.id) {
      return;
    }
    const response = await GET_INVEST_FORECAST(invest.id, params, sort, filter);
    return response;
  };

  const COLUMNS = [
    {
      title: 'ID',
      render: (_, { createTime, id }) => (
        <Space direction="vertical">
          <Text>{id}</Text>
          <Text>{toDisplayDateFromDouble(createTime)}</Text>
        </Space>
      ),
    },
    {
      title: 'News',
      dataIndex: ['newsId'],
    },
    {
      title: 'Channel',
      dataIndex: ['analysisChannel'],
      renderText: (analysisChannel) => getEnumLabelByKey(ANALYSIS_CHANNELS, analysisChannel),
    },
    {
      title: 'Confidence',
      dataIndex: ['confidenceRate'],
      renderText: (text) => (text * 100).toFixed(2) + '%',
    },
    {
      title: 'Max/Min',
      render: ({ maxPrice, minPrice }) => {
        const difference = maxPrice - minPrice;
        const maxDecimalPoint = findMaxDecimalPoint([minPrice, maxPrice]);
        return (
          <Space direction="vertical" size={0}>
            <Text>{money(maxPrice, maxDecimalPoint)}</Text>
            <Text type="secondary">{money(difference, maxDecimalPoint)}</Text>
            <Text>{money(minPrice, maxDecimalPoint)}</Text>
          </Space>
        );
      },
    },
    {
      title: 'Usage',
      dataIndex: ['usageType'],
      renderText: (usageType) => getEnumLabelByKey(INVEST_FORECAST_USAGE_TYPES, usageType),
    },
  ];
  return (
    <>
      <ProTable
        actionRef={tableRef}
        columns={COLUMNS}
        request={getInvestForecastResult}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
        search={false}
        size="small"
      />
    </>
  );
};

export default InvestForecast;
