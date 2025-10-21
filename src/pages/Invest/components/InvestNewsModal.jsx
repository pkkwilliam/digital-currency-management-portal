import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { GET_INVEST_NEWS } from '@/services/hive/investService';
import ProList from '@ant-design/pro-list';
const InvestNewsModal = (props) => {
  const { invest, onFinish, setVisible, visible } = props;
  const [news, setNews] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  useEffect(() => {
    getNews();
  }, [invest]);

  const getNews = async () => {
    if (!invest || !invest.id) {
      return;
    }
    const response = await GET_INVEST_NEWS(invest.id);
    setNews(response.news);
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
      title={`ID: ${invest?.id} News`}
      visible={visible}
    >
      <ProList
        rowKey="id"
        dataSource={news}
        expandable={{
          expandedRowKeys,
          onExpandedRowsChange: (keys) => {
            const lastIndex = keys[keys.length - 1];
            setExpandedRowKeys([lastIndex]);
          },
        }}
        metas={{
          title: {
            render: (_, { id, header }) => `ID: ${id} - ${header}`,
          },
          description: {
            render: (_, record) => {
              return record.content;
            },
          },
        }}
        pagination={false}
      />
    </Modal>
  );
};

export default InvestNewsModal;
