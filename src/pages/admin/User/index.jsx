import React, { useRef, useState } from 'react';
import {
  ADMIN_CREATE_USER,
  ADMIN_DELETE_USER,
  ADMIN_QUERY_USER,
  ADMIN_UPDATE_USER,
} from '@/services/hive/user';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm } from 'antd';
import UserModalForm from './components/userModalForm';

const AdminUser = () => {
  const actionRef = useRef();
  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState();
  const [updateFormVisible, setUpdateFormVisible] = useState(false);

  const adminCreateUserService = async (user) => {
    await ADMIN_CREATE_USER(user);
    setCreateFormVisible(false);
    onDataChanged();
  };

  const adminDeleteUserService = async (user) => {
    await ADMIN_DELETE_USER(user.sid);
    onDataChanged();
  };

  const adminUpdateUserService = async (user) => {
    await ADMIN_UPDATE_USER(user);
    setUpdateFormVisible(false);
    onDataChanged();
  };

  const onDataChanged = () => {
    actionRef.current.reload();
  };

  const COLUMNS = [
    { title: '名字', dataIndex: 'name' },
    { title: '用戶名', dataIndex: 'username' },
    { title: '企業中文名', dataIndex: ['company', 'chineseName'] },
    { title: '企業英文名', dataIndex: ['company', 'englishName'] },
    { title: '創建日期', dataIndex: 'createTime', dataType: 'date', search: false },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="edit"
          onClick={() => {
            setCurrentRow(record);
            setUpdateFormVisible(true);
          }}
        >
          修改
        </a>,

        <Popconfirm
          cancelText="取消"
          key="delete"
          onConfirm={() => adminDeleteUserService(record)}
          okText="確定"
          title="確認刪除用戶?"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        columns={COLUMNS}
        request={async (params = {}, sort, filter) => ADMIN_QUERY_USER(params)}
        toolBarRender={() => [
          <Button
            icon={<PlusOutlined />}
            key="button"
            type="primary"
            onClick={() => setCreateFormVisible(true)}
          >
            新建
          </Button>,
        ]}
      />
      <UserModalForm
        onClickSubmit={(values) => adminCreateUserService(values)}
        setModalVisible={setCreateFormVisible}
        visible={createFormVisible}
      />
      <UserModalForm
        onClickSubmit={adminUpdateUserService}
        user={currentRow}
        visible={updateFormVisible}
        setModalVisible={setUpdateFormVisible}
      />
    </PageContainer>
  );
};

export default AdminUser;
