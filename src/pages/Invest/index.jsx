import InactiveableLinkButton from '@/commons/InactiveableLinkButton';
import PingChecker from '@/components/PingChecker';
import { ALGORITHM_TYPES } from '@/enum/Algorithm';
import {
  CALCULATE_METHODS,
  CALCULATE_METHOD_FIXED,
  CALCULATE_METHOD_PERCENTAGE,
} from '@/enum/CalculateMethod';
import { CHANNEL_TYPES } from '@/enum/Channel';
import { getEnumLabelByKey } from '@/enum/enumUtil';
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
import { Button, Space, Switch, Tooltip } from 'antd';
import { useRef, useState } from 'react';
import { GET_INVEST_DETAIL, USER_INVEST_SERVICE_CONFIG } from '../../services/hive/investService';
import AutomateOrderTable from './components/AutomateOrderTable';
import InvestDetailModal from './components/InvestDetailModal';
import Text from 'antd/lib/typography/Text';
import InvestSummary from './components/InvestSummary';
import InvestWarningModal from './components/InvestWarningModal';
import InvestStrategy from './components/InvestStrategy';
import { findMaxDecimalPoint } from '@/util/numberUtil';

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
    setPolling(!modalVisible);
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
        if (!transactionLimiter && !hasErrorLogs) {
          return null;
        }
        return (
          <WarningFilled
            onClick={() => {
              setCurrentRow(record);
              setWarningModalVisible(true);
            }}
            style={{ fontSize: 22, color: '#FF5733' }}
          />
        );
      },
    },
    {
      title: 'Type/Algo/Acc',
      render: (_, { algorithmType, investType, tradeAccount }) => (
        <Space direction="vertical" size={0}>
          <Text>{getEnumLabelByKey(INVEST_TYPES, investType)}</Text>
          <Text>{getEnumLabelByKey(ALGORITHM_TYPES, algorithmType)}</Text>
          <Text>{tradeAccount}</Text>
        </Space>
      ),
      tooltip: '1. Invest Type (Position Type) 2. Algoirthm Type',
    },
    {
      title: 'Price/24hr',
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
      render: (_, { maxConcurrent, size }) => (
        <Space direction="vertical" size={0}>
          <Text>{maxConcurrent}</Text>
          <Text>{size}</Text>
        </Space>
      ),
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
      render: (_, { maxPrice, minPrice, maxPrice24Hour, minPrice24Hour }) => {
        const maxDecimalPoint = findMaxDecimalPoint([minPrice, maxPrice]);
        return (
          <Space direction="vertical" size={0}>
            <Space>
              <Text>${maxPrice.toFixed(maxDecimalPoint)}</Text>
              <Tooltip title="24 Hour Max">
                <Text type="secondary">${maxPrice24Hour ? maxPrice24Hour : '-'}</Text>
              </Tooltip>
            </Space>
            <Space>
              <Text>${minPrice.toFixed(maxDecimalPoint)}</Text>
              <Tooltip title="24 Hour Min">
                <Text type="secondary">${minPrice24Hour ? minPrice24Hour : '-'}</Text>
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
              key="edit"
              label="Edit"
              onClick={() => {
                setCurrentRow(record);
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
          expandedRowRender: (record) => (
            <>
              <InvestSummary invest={record} />
              <InvestStrategy invest={record} />
              <AutomateOrderTable invest={record} />
            </>
          ),
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
        onFinish={currentRow ? onUpdate : onCreate}
        setVisible={setDetailModalVisibleWithPolling}
        visible={detailModalVisible}
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
