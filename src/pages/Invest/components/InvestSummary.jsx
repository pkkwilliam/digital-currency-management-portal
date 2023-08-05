import React, { useEffect, useState } from 'react';
import { Card, Col, Divider, Row, Space, Statistic, Tag, Tooltip } from 'antd';
import { GET_INVEST_SUMMARY } from '@/services/hive/investService';
import { getDate, toApplicationLocalDate } from '@/util/dateUtil';
import Text from 'antd/lib/typography/Text';
import AutomateOrderBar from './InvestSmmaryBar';
import { AUTOMATE_ORDER_EXECUTE_METHODS } from '@/enum/AutomateOrderExecuteMethod';

const InvestSummary = (props) => {
  const [investSummary, setInvestSummary] = useState({});
  const [dateRange, setDateRange] = useState({
    startDate: getDate(-1),
    endDate: getDate(0),
  });

  useEffect(() => {
    getSummary(dateRange.startDate, dateRange.endDate);
  }, [dateRange]);

  const getSummary = async (startDate, endDate) => {
    const response = await GET_INVEST_SUMMARY(
      props.invest.id,
      toApplicationLocalDate(startDate),
      toApplicationLocalDate(endDate),
    );
    setInvestSummary(response);
  };

  return (
    <Card
      title="Invest Summary"
      // extra={
      //   <Space>
      //     <DatePicker.RangePicker
      //       dataFormat="YYYY-MM-DD"
      //       defaultValue={[dateRange.startDate, dateRange.endDate]}
      //       onChange={(dates) => setDateRange({ startDate: dates[0], endDate: dates[1] })}
      //     />
      //     <Button
      //       shape="circle"
      //       icon={<SearchOutlined />}
      //       onClick={() => getSummary(dateRange.startDate, dateRange.endDate)}
      //     />
      //   </Space>
      // }
    >
      <Row>
        <Text>Financial Report</Text>
      </Row>
      <Row>
        <InvestFinancialReport investSummary={investSummary} />
      </Row>
      <Divider />
      <Row>
        <Text>Automate Order Bar</Text>
      </Row>
      <Row>
        <Col span={24}>
          <AutomateOrderBar invest={investSummary} />
        </Col>
      </Row>
    </Card>
  );
};

const InvestFinancialReport = (props) => {
  const { dateRangeOrderClosedCount, dateRangeOrderClosedProfit, executeMethodOrderCount } =
    props.investSummary;

  const ExecuteMethodOrderCountTags = AUTOMATE_ORDER_EXECUTE_METHODS.map((method) => {
    return (
      <Tag color={method.color} key={method.key}>{`${method.label} - ${
        executeMethodOrderCount[method.key]
      }`}</Tag>
    );
  });
  return (
    <Space direction="vertical">
      <Space split={<Divider type="vertical" />}>
        <Statistic title="-1 Day Order Count" value={dateRangeOrderClosedCount} />
        <Statistic title="-1 Day Profit" value={dateRangeOrderClosedProfit} prefix={'$'} />
      </Space>
      {ExecuteMethodOrderCountTags}
    </Space>
  );
};

export default InvestSummary;
