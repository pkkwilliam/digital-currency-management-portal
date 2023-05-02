import React from 'react';
import { ProFormCheckbox } from '@ant-design/pro-form';
import { getValueEnum } from '@/enum/enumUtil';
import { USER_ROLES } from '@/enum/userRole';

const ProFormUserRoleCheckbox = (props) => {
  return (
    <ProFormCheckbox.Group
      valueEnum={getValueEnum(props.userRoles ? props.userRoles : USER_ROLES)}
      {...props}
    />
  );
};

export default ProFormUserRoleCheckbox;
