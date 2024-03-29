import InactiveableLinkButton from '@/commons/InactiveableLinkButton';
import PingChecker from '@/components/PingChecker';
import { ALGORITHM_TYPES } from '@/enum/Algorithm';
import {
  CALCULATE_METHODS,
  CALCULATE_METHOD_FIXED,
  CALCULATE_METHOD_PERCENTAGE,
} from '@/enum/CalculateMethod';
import { CHANNEL_TYPES } from '@/enum/Channel';
import { getEnumLabelByKey, getEnumObjectByKey } from '@/enum/enumUtil';
import { INVEST_TYPES } from '@/enum/investType';
import {
  BEDROCK_ACTIVATE_SERVICE_REQEUST,
  BEDROCK_CREATE_SERVICE_REQEUST,
  BEDROCK_DEACTIVATE_SERVICE_REQUEST,
  BEDROCK_UPDATE_SERVICE_REQUEST,
} from '@/services/hive/bedrockTemplateService';
import { INVEST_SYNC } from '@/services/hive/investSyncService';
import { LoadingOutlined, PlusOutlined, ReloadOutlined, WarningFilled } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Popover, Space, Switch, Tabs, Tooltip } from 'antd';
import { useRef, useState } from 'react';
import { GET_INVEST_DETAIL, USER_INVEST_SERVICE_CONFIG } from '../../services/hive/investService';
import AutomateOrderTable from './components/AutomateOrderTable';
import InvestDetailModal from './components/InvestDetailModal';
import Text from 'antd/lib/typography/Text';
import InvestSummary from './components/InvestSummary';
import InvestWarningModal from './components/InvestWarningModal';
import InvestStrategy from './components/InvestStrategy';
import { findMaxDecimalPoint } from '@/util/numberUtil';
import { getNullableData } from '@/util/dataUtil';
import { AUTOMATE_ORDER_EXECUTE_METHOD_AUTO } from '@/enum/AutomateOrderExecuteMethod';
import { INVEST_FEATURES } from '@/enum/investFeature';
import InvestNewsModal from './components/InvestNewsModal';
import InvestForecast from './components/InvestForecast';
import ManualForecastRequest from './components/ManualForecastRequest';

const POLLING_INTERVAL = 5000;

function getGetSellRateLabel(gainSellCalculateMethod, gainSellRate) {
  switch (gainSellCalculateMethod) {
    case CALCULATE_METHOD_FIXED.key:
      return '$' + gainSellRate;
    case CALCULATE_METHOD_PERCENTAGE.key:
      return gainSellRate + '%';
    default:
      return gainSellRate;
  }
}

const Invest = () => {
  const [polling, setPolling] = useState(undefined);
  const [time, setTime] = useState(new Date());
  const tableRef = useRef();

  const [currentRow, setCurrentRow] = useState();
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [newsModalVisible, setNewsModalVisible] = useState(false);
  const [warningModalVisible, setWarningModalVisible] = useState(false);

  const onCreate = async (request) => {
    await BEDROCK_CREATE_SERVICE_REQEUST(USER_INVEST_SERVICE_CONFIG, request);
    tableRef.current.reload();
    return true;
  };

  const onActivateToggled = async (record) => {
    if (record.active) {
      await BEDROCK_DEACTIVATE_SERVICE_REQUEST(USER_INVEST_SERVICE_CONFIG, record.id);
    } else {
      await BEDROCK_ACTIVATE_SERVICE_REQEUST(USER_INVEST_SERVICE_CONFIG, record.id);
    }
    tableRef.current.reload();
    return true;
  };

  const onDelete = async (record) => {
    await BEDROCK_DEACTIVATE_SERVICE_REQUEST(USER_INVEST_SERVICE_CONFIG, record.id);
    tableRef.current.reload();
    return true;
  };

  const onInvestSync = async () => {
    await INVEST_SYNC();
    tableRef.current.reload();
    return true;
  };

  const onUpdate = async (record) => {
    const response = await BEDROCK_UPDATE_SERVICE_REQUEST(USER_INVEST_SERVICE_CONFIG, {
      ...record,
    });
    tableRef.current.reload();
    return true;
  };

  const query = async (params, sort, filter) => {
    const result = await GET_INVEST_DETAIL(
      USER_INVEST_SERVICE_CONFIG,
      { ...params, active: false },
      sort,
      filter,
    );
    setTime(new Date());
    return result;
  };

  const setDetailModalVisibleWithPolling = (modalVisible) => {
    setDetailModalVisible(modalVisible);
    // setPolling(!modalVisible);
  };

  const COLUMNS = [
    {
      title: 'Product',
      render: (_, record) => {
        const { active, channel, productName } = record;
        return (
          <Space>
            <Switch
              key="switch"
              checked={active}
              onChange={() => onActivateToggled(record)}
              size="small"
            />
            <Space direction="vertical" size={0}>
              <Text>{getEnumLabelByKey(CHANNEL_TYPES, channel, 'shortLabel')}</Text>
              <Text>{productName}</Text>
            </Space>
          </Space>
        );
      },
    },
    {
      render: (_, record) => {
        const { errorLogs, transactionLimiter } = record;
        const hasErrorLogs = errorLogs && errorLogs.length > 0;
        const Warning =
          !transactionLimiter && !hasErrorLogs ? null : (
            <WarningFilled
              onClick={() => {
                setCurrentRow(record);
                setWarningModalVisible(true);
              }}
              style={{ fontSize: 22, color: '#FF5733' }}
            />
          );

        return <Space direction="vertical">{Warning}</Space>;
      },
    },
    {
      title: 'Type/Algo/Acc/Feature',
      render: (_, { algorithmType, investFeatures, investType, tradeAccount }) => {
        const featuresIcon = investFeatures.map((feature) => {
          const featureObject = getEnumObjectByKey(INVEST_FEATURES, feature);
          return (
            <Popover content={featureObject.description} key={feature}>
              {featureObject.icon}
            </Popover>
          );
        });
        return (
          <Space direction="vertical" size={0}>
            <Text>{getEnumLabelByKey(INVEST_TYPES, investType)}</Text>
            <Text>{getEnumLabelByKey(ALGORITHM_TYPES, algorithmType)}</Text>
            <Text>{tradeAccount}</Text>
            <Space>{featuresIcon}</Space>
          </Space>
        );
      },
      tooltip: '1. Invest Type (Position Type) 2. Algoirthm Type',
    },
    {
      title: 'Price',
      render: (_, { ticking }) => {
        const { bidPrice, offerPrice } = ticking ?? { bidPrice: 0, offerPrice: 0 };
        const spread = (offerPrice - bidPrice).toFixed(5);
        return (
          <Space>
            <Space direction="vertical" size={0}>
              <Text>O:</Text>
              <Text>S:</Text>
              <Text>C:</Text>
            </Space>
            <Space direction="vertical" size={0}>
              <Text type="success">{offerPrice}</Text>
              <Text type="secondary">{spread}</Text>
              <Text type="danger">{bidPrice}</Text>
            </Space>
          </Space>
        );
      },
      tooltip: '1. Offer Price 2. Spread 3. Bid Price',
    },
    {
      title: 'Con/Size',
      render: (_, { executeMethodOrderCount, maxConcurrent, size }) => {
        const executeMethodAutomateOrderCount =
          executeMethodOrderCount[AUTOMATE_ORDER_EXECUTE_METHOD_AUTO.key];
        const openOrderFull = executeMethodAutomateOrderCount >= maxConcurrent;
        return (
          <Space direction="vertical" size={0}>
            <Space size={1}>
              <Text type={openOrderFull ? 'danger' : 'secondary'}>
                {executeMethodAutomateOrderCount}
              </Text>
              /<Text>{maxConcurrent}</Text>
            </Space>
            <Text>{size}</Text>
          </Space>
        );
      },
      tooltip: '1. Maximum Concurrent 2. Size',
    },
    {
      title: 'Gain/Loss',
      render: (_, { gainSellCalculateMethod, gainSellRate, lossSellRate }) => (
        <Space direction="vertical" size={0}>
          <Text>
            {` ${getGetSellRateLabel(gainSellCalculateMethod, gainSellRate)} (${getEnumLabelByKey(
              CALCULATE_METHODS,
              gainSellCalculateMethod,
            )})`}
          </Text>
          <Text>{`${lossSellRate}% (Percentage)`}</Text>
        </Space>
      ),
      tooltip: '1. Gain Rate 2. Loss Rate',
    },
    {
      title: 'Max/Min - 24H',
      render: (
        _,
        {
          gridInterval,
          maxPrice,
          minPrice,
          maxPrice24Hour,
          minPrice24Hour,
          minMaxPriceDifference,
          minMaxPrice24HourDifference,
          orderCountToCoverMinMaxRange,
          orderCountToCover24HourMinMaxRange,
        },
      ) => {
        const maxDecimalPoint = findMaxDecimalPoint([minPrice, maxPrice]);
        return (
          <Space>
            <Space direction="vertical" size={0}>
              <Text>${maxPrice.toFixed(maxDecimalPoint)}</Text>
              <Space size={0}>
                <Tooltip title="Min/Max Difference">
                  <Text type="secondary">${getNullableData(minMaxPriceDifference)}</Text>
                </Tooltip>
                <Tooltip
                  title={`Order Count to Cover Min/Max Range - ${getNullableData(
                    orderCountToCoverMinMaxRange,
                  )} orders requires to cover the range for Grid Interval ${gridInterval}`}
                >
                  <Text type="secondary">{`(${getNullableData(
                    orderCountToCoverMinMaxRange,
                  )})`}</Text>
                </Tooltip>
              </Space>
              <Text>${minPrice.toFixed(maxDecimalPoint)}</Text>
            </Space>
            <Space direction="vertical" size={0}>
              <Tooltip title="24 Hour Max">
                <Text type="secondary">${getNullableData(maxPrice24Hour)}</Text>
              </Tooltip>
              <Space size={0}>
                <Tooltip title="24 Hour Min/Max Difference">
                  <Text type="secondary">${getNullableData(minMaxPrice24HourDifference)}</Text>
                </Tooltip>
                <Tooltip
                  title={`Order Count to Cover 24 Hour Min/Max Range - ${getNullableData(
                    orderCountToCover24HourMinMaxRange,
                  )} orders requires to cover the range for Grid Interval ${gridInterval}`}
                >
                  <Text type="secondary">{`(${getNullableData(
                    orderCountToCover24HourMinMaxRange,
                  )})`}</Text>
                </Tooltip>
              </Space>
              <Tooltip title="24 Hour Min">
                <Text type="secondary">${getNullableData(minPrice24Hour)}</Text>
              </Tooltip>
            </Space>
          </Space>
        );
      },
      tooltip: '1. Max Open Price 2. Min Open Price - 24 Hour Market Min/Max',
    },
    {
      title: 'Operation',
      valueType: 'option',
      render: (text, record) => {
        return (
          <Space direction="vertical">
            <InactiveableLinkButton
              key="news"
              label="News"
              onClick={() => {
                setCurrentRow(record);
                setNewsModalVisible(true);
              }}
            />
            <InactiveableLinkButton
              key="edit"
              label="Edit"
              onClick={() => {
                setCurrentRow(record);
                setPolling(false);
                setDetailModalVisibleWithPolling(true);
              }}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable
        actionRef={tableRef}
        columns={COLUMNS}
        columnEmptyText={'-'}
        expandable={{
          expandedRowRender: (record) => {
            const items = [
              {
                key: 'investSumamry',
                label: 'Summary',
                children: <InvestSummary invest={record} />,
              },
              {
                key: 'investStrategy',
                label: 'Strategy',
                children: <InvestStrategy invest={record} />,
              },
              {
                key: 'automateOrderTable',
                label: 'Order',
                children: <AutomateOrderTable invest={record} />,
              },
              {
                key: 'forecast',
                label: 'AI Forecast',
                children: <InvestForecast invest={record} />,
              },
              {
                key: 'manualForecast',
                label: 'Manual Forecast',
                children: <ManualForecastRequest invest={record} />,
              },
            ];
            return <Tabs items={items} />;
          },
        }}
        polling={polling || undefined}
        request={(params, sort, filters) => query(params, sort, filters)}
        rowKey="id"
        search={false}
        toolbar={{
          title: `Last Updated: ${time.toLocaleTimeString()}`,
          subTitle: <PingChecker />,
        }}
        toolBarRender={() => [
          <Space key="dateRange">
            {/* <Button icon={<ReloadOutlined />} key="button" type="secondary" onClick={onInvestSync}>
              Sync
            </Button> */}
            <Button
              key="polling"
              type="secondary"
              onClick={() => {
                if (polling) {
                  setPolling(undefined);
                  return;
                }
                setPolling(POLLING_INTERVAL);
              }}
            >
              {polling ? <LoadingOutlined /> : <ReloadOutlined />}
              {polling ? 'Stop Polling' : 'Start Polling'}
            </Button>
            <Button
              icon={<PlusOutlined />}
              key="polling"
              type="primary"
              onClick={() => setDetailModalVisibleWithPolling(true)}
            >
              Add
            </Button>
          </Space>,
        ]}
      />
      <InvestDetailModal
        invest={currentRow}
        onFinish={async (request) => {
          currentRow ? await onUpdate(request) : await onCreate(request);
          setCurrentRow(undefined);
          setDetailModalVisible(false);
        }}
        setVisible={setDetailModalVisibleWithPolling}
        visible={detailModalVisible}
      />
      <InvestNewsModal
        invest={currentRow}
        onFinish={() => {
          setCurrentRow(undefined);
          tableRef.current.reload();
        }}
        setVisible={setNewsModalVisible}
        visible={newsModalVisible}
      />
      <InvestWarningModal
        invest={currentRow}
        onFinish={() => {
          setCurrentRow(undefined);
          tableRef.current.reload();
        }}
        setVisible={setWarningModalVisible}
        visible={warningModalVisible}
      />
    </PageContainer>
  );
};

export default Invest;
