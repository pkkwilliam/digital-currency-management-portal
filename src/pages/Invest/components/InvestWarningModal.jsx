import React, { useState } from 'react';
import { Card, List, Modal, Space } from 'antd';
import { toDisplayDateFromDouble } from '@/util/dateUtil';
import Text from 'antd/lib/typography/Text';
import { WarningFilled } from '@ant-design/icons';
import { DELETE_ALL_ERROR_LOGS } from '@/services/hive/investService';
import InactiveableLinkButton from '@/commons/InactiveableLinkButton';

const InvestWarningModal = (props) => {
  const { invest, onFinish, setVisible, visible } = props;

  const onClickClearAllErrorLog = async () => {
    await DELETE_ALL_ERROR_LOGS(invest.id);
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
    </Modal>
  );
};

export default InvestWarningModal;
