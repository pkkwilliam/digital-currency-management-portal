import React, { useState } from 'react';
import { Card, Descriptions, List, Modal, Space } from 'antd';
import { toDisplayDateFromDouble } from '@/util/dateUtil';
import Text from 'antd/lib/typography/Text';
import { WarningFilled } from '@ant-design/icons';
import { DELETE_ALL_ERROR_LOGS, RESET_TRANSACTION_LIMITER } from '@/services/hive/investService';
import InactiveableLinkButton from '@/commons/InactiveableLinkButton';
import DescriptionsItem from 'antd/lib/descriptions/Item';

const InvestWarningModal = (props) => {
  const { invest, onFinish, setVisible, visible } = props;

  const onClickClearAllErrorLog = async () => {
    await DELETE_ALL_ERROR_LOGS(invest.id);
    onFinish();
    setVisible(false);
  };

  const onClickResetTransactionLimiter = async () => {
    await RESET_TRANSACTION_LIMITER(invest.id);
    onFinish();
    setVisible(false);
  };

  return (
    <Modal
      destroyOnClose
      onOk={() => {
        onFinish();
        setVisible(false);
      }}
      onCancel={() => {
        onFinish();
        setVisible(false);
      }}
      title={`ID: ${invest?.id} Warnings`}
      visible={visible}
    >
      <Space direction="vertical">
        <Card
          title={
            <Space>
              <WarningFilled style={{ fontSize: 22, color: '#F9A603' }} />
              <Text>Transaction Limiter</Text>
            </Space>
          }
          extra={
            <InactiveableLinkButton
              label="Reset"
              onClick={onClickResetTransactionLimiter}
              popConfirm
              popConfirmMessage="Rest transaction limiter?"
            />
          }
        >
          <Descriptions>
            <DescriptionsItem label="Fail Count" span={3}>
              {invest?.transactionLimiter?.failCount}
            </DescriptionsItem>
            <DescriptionsItem label="Next Attempt Time" span={3}>
              {toDisplayDateFromDouble(invest?.transactionLimiter?.nextAllowAttemptTime)}
            </DescriptionsItem>
          </Descriptions>
        </Card>
        <Card
          title={
            <Space>
              <WarningFilled style={{ fontSize: 22, color: '#FF5733' }} />
              <Text>Error Logs</Text>
            </Space>
          }
          extra={
            <InactiveableLinkButton
              label="Clear"
              onClick={onClickClearAllErrorLog}
              popConfirm
              popConfirmMessage="Clear all errors?"
            />
          }
          bodyStyle={{ paddingBottom: 0, paddingTop: 0 }}
        >
          <List
            size="small"
            dataSource={invest?.errorLogs}
            renderItem={(errorLog, index) => (
              <List.Item style={{ paddingLeft: 0, paddingRight: 0 }}>
                <List.Item.Meta
                  title={toDisplayDateFromDouble(errorLog.createTime)}
                  description={errorLog.message}
                  style={{ padding: 0 }}
                />
              </List.Item>
            )}
          />
        </Card>
      </Space>
    </Modal>
  );
};

export default InvestWarningModal;
