import React from 'react';
import {
  ModalForm,
  ProFormDependency,
  ProFormDigit,
  ProFormGroup,
  ProFormMoney,
  ProFormText,
} from '@ant-design/pro-form';
import { Form } from 'antd';
import { onModalFormVisibleChange } from '@/commons/proForm/proformUtil';
import ProFormCompanyBusinessSelect from '@/commons/proForm/ProFormCompanyBusinessSelect';
import ProFormCompanyBusinessAddressSelect from '@/commons/proForm/ProFormCompanyBusinessAddress';
import ProFormOrderPlaceChannelRadio from '@/commons/proForm/ProFormOrderPlaceChannelRadio';
import ProFormOrderStatusRadio from '@/commons/proForm/ProFormOrderStatusRadio';
import ProFormPaymentStatusRadio from '@/commons/proForm/ProFormPaymentStatusRadio';
import OrderItemInfoList from '../../components/OrderItemInfoList';
import ProFormShopSelect from '@/commons/proForm/ProFormShopSelect';
import ProFormPaymentChannelRadio from '@/commons/proForm/ProFormPaymentChannelRadio';

const InternalOrderModalForm = (props) => {
  const [form] = Form.useForm();
  const { order, onFinish, onVisibleChange, visible } = props;
  form.setFieldsValue(order);
  return (
    <ModalForm
      destroyOnClose
      form={form}
      onFinish={onFinish}
      onVisibleChange={(visible) => onModalFormVisibleChange(onVisibleChange, form, visible)}
      title={order ? '修改訂單' : '創建訂單'}
      visible={visible}
      width={1200}
    >
      <ProFormDigit hidden disabled label="ID" name="id" />
      <ProFormShopSelect label="配貨地點" name={['distributionShop', 'id']} />
      <ProFormGroup>
        <ProFormCompanyBusinessSelect label="客戶" name={['companyBusiness', 'id']} width={'md'} />
        <ProFormDependency name={['companyBusiness']}>
          {({ companyBusiness }, form) => {
            if (form) {
              form.resetFields(['deliveryAddress']);
            }
            return (
              <ProFormCompanyBusinessAddressSelect
                companyBusiness={companyBusiness}
                dependencies={['companyBusiness', 'id']}
                label="送貨地址"
                name={['deliveryAddress', 'id']}
                width={'lg'}
              />
            );
          }}
        </ProFormDependency>
      </ProFormGroup>
      <OrderItemInfoList label="訂單內容" name="orderItemInfos" form={form} />
      <ProFormGroup>
        <ProFormMoney label="拆扣費用" name="discount" />
        <ProFormMoney label="額外費用" name="extraFee" />
      </ProFormGroup>
      <ProFormOrderPlaceChannelRadio label="訂單渠道" name="orderPlaceChannel" />
      <ProFormOrderStatusRadio label="訂單狀態" name="orderStatus" />
      <ProFormPaymentChannelRadio label="支付渠道" name={['paymentChannel']} />
      <ProFormPaymentStatusRadio label="支付狀態" name="paymentStatus" />
      <ProFormText label="備註" name="remark" />
    </ModalForm>
  );
};

export default InternalOrderModalForm;
