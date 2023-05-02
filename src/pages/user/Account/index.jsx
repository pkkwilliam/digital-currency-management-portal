import React, { useRef } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Tabs } from 'antd';
import TabPane from '@ant-design/pro-card/lib/components/TabPane';
import { CHANGE_PASSWORD } from '@/services/hive/userProfile';

const UserProfile = () => {
  const formRef = useRef();

  const changePasswordServiceRequest = async (request) => {
    await CHANGE_PASSWORD(request);
    formRef.current.resetFields();
    return true;
  };

  return (
    <PageContainer>
      <Tabs defaultActiveKey="1">
        <TabPane key="1" tab="更改密碼">
          <ProForm destroyOnClose onFinish={changePasswordServiceRequest} formRef={formRef}>
            <ProFormText.Password label="原始密碼" name="password" />
            <ProFormText.Password label="新密碼" name="newPassword" />
            <ProFormText.Password label="確認新密碼" name="newPasswordConfirm" />
          </ProForm>
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};

export default UserProfile;
