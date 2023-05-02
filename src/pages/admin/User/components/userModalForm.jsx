import React, { useEffect, useState } from 'react';
import { ModalForm, ProFormCheckbox, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { Form } from 'antd';
import {
  USER_ROLE_ADMIN,
  USER_ROLE_COMPANY_MANAGER,
  USER_ROLE_SHOP_MANAGER,
  USER_ROLE_WAREHOUSE_MANAGER,
  USER_ROLE_STAFF,
  USER_ROLE_BUYER,
} from '@/enum/userRole';

const UserModalForm = (props) => {
  const { onClickSubmit, setModalVisible, user, visible } = props;
  const [form] = Form.useForm();
  form.setFieldsValue({ ...user, company: user?.company.id, grantedRoles: user?.authorities });

  return (
    <ModalForm
      destroyOnClose
      form={form}
      onFinish={(values) =>
        onClickSubmit({
          ...values,
          company: { id: values.company },
          sid: user?.sid,
        })
      }
      onVisibleChange={setModalVisible}
      title={user ? '修改用戶' : '新增用戶'}
      visible={visible}
    >
      <ProFormSelect label="企業" showSearch required name="company" />
      <ProFormText label="名字" placeholder="請輸入名字" required name="name" />
      <ProFormText label="用戶名(英文無空格)" placeholder="請輸入用戶名" required name="username" />
      <ProFormCheckbox.Group
        name="grantedRoles"
        label="權限"
        options={[
          USER_ROLE_ADMIN,
          USER_ROLE_COMPANY_MANAGER,
          USER_ROLE_SHOP_MANAGER,
          USER_ROLE_WAREHOUSE_MANAGER,
          USER_ROLE_STAFF,
          USER_ROLE_BUYER,
        ]}
      />
    </ModalForm>
  );
};

export default UserModalForm;
