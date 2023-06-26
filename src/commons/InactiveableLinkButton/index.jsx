import { Popconfirm, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';

const InactiveableLinkButton = (props) => {
  const {
    description,
    disabled,
    key = 'delete',
    label,
    onClick,
    popConfirm,
    popConfirmMessage,
  } = props;
  let button;
  let DescriptionElement = description ? <Text type="secondary">{description}</Text> : null;
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
          <a>{label}</a>
          {DescriptionElement}
        </Space>
      </Popconfirm>
    );
  } else {
    button = <a onClick={onClick}>{label}</a>;
  }
  return disabled ? <Text disabled>{label}</Text> : button;
};

export default InactiveableLinkButton;
