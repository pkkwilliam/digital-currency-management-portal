import { InfoCircleOutlined } from '@ant-design/icons';
import { Popconfirm, Popover, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';

const InactiveableLinkButton = (props) => {
  const {
    description,
    disabled,
    info,
    key = 'delete',
    label,
    onClick,
    popConfirm,
    popConfirmMessage,
    textType = 'link' | 'danger',
  } = props;
  let button;
  let DescriptionElement = description ? <Text type="secondary">{description}</Text> : null;
  let InfoIcon = info ? (
    <Popover content={info}>
      <InfoCircleOutlined style={{ color: '#bbbbbb' }} />
    </Popover>
  ) : null;
  if (popConfirm) {
    button = (
      <Popconfirm
        cancelText="Cancel"
        key={key}
        onConfirm={onClick}
        okText="OK"
        title={popConfirmMessage ? popConfirmMessage : '確定執行?'}
      >
        <Space direction="vertical" size={0}>
          <Space>
            {textType === 'danger' ? <Text type="danger">{label}</Text> : <a>{label}</a>}
            {InfoIcon}
          </Space>
          {DescriptionElement}
        </Space>
      </Popconfirm>
    );
  } else {
    button =
      textType === 'danger' ? (
        <Text onClick={onClick} type="danger">
          {label}
        </Text>
      ) : (
        <a onClick={onClick}>{label}</a>
      );
  }
  return disabled ? (
    <Space>
      <Text disabled>{label}</Text>
      {InfoIcon}
    </Space>
  ) : (
    button
  );
};

export default InactiveableLinkButton;
