import React from 'react';
import ProFormItemSpecificationStatusSelect from '@/commons/proForm/ProFormItemSpecificationStatusSelect';
import ProFormMediaUpload from '@/commons/proForm/ProFormMediaUpload';
import { onModalFormVisibleChange } from '@/commons/proForm/proformUtil';
import {
  ModalForm,
  ProFormDigit,
  ProFormGroup,
  ProFormMoney,
  ProFormText,
} from '@ant-design/pro-form';
import { Form } from 'antd';
import ProFormItemSelect from '@/commons/proForm/ProFormItemSelect';

const ItemSpecificationModalForm = (props) => {
  const { itemSpecification, onFinish, setModalFormVisible, visible } = props;
  const [form] = Form.useForm();

  form.setFieldsValue(itemSpecification);

  return (
    <ModalForm
      destroyOnClose
      form={form}
      onVisibleChange={(visible) => onModalFormVisibleChange(setModalFormVisible, form, visible)}
      onFinish={onFinish}
      title={itemSpecification ? '修改規格' : '新建規格'}
      visible={visible}
      width={1500}
    >
      <ProFormDigit hidden label="ID" name={['id']} />
      <ProFormGroup title="基本資料">
        <ProFormItemSelect
          label="商品"
          name={['item', 'id']}
          rules={[{ required: true, message: '請選擇商品' }]}
        />
        <ProFormText
          label="規格名稱"
          name={['name']}
          placeholder="300克"
          rules={[{ required: true, message: '請輸入規格名稱' }]}
        />
        <ProFormItemSpecificationStatusSelect label="狀態" name={['itemSpecificationStatus']} />
      </ProFormGroup>
      <ProFormMediaUpload form={form} label="圖片" max={1} name={['imageUrl']} />
      <ProFormGroup title="倉儲">
        <ProFormText label="SKU" name={['sku']} />
        <ProFormText label="條碼" name={['barcode']} />
      </ProFormGroup>
      <ProFormGroup title="價錢">
        <ProFormMoney
          label="零售原價"
          name={['price']}
          rules={[{ required: true, message: '請輸零售原價' }]}
        />
        <ProFormMoney label="零售折扣" name={['discountPrice']} placeholder="30" />
      </ProFormGroup>
      <ProFormGroup title="尺吋/重量">
        <ProFormDigit label="長" name={['length']} />
        <ProFormDigit label="寬" name={['width']} />
        <ProFormDigit label="高" name={['height']} />
        <ProFormDigit label="重量" name={['weight']} />
      </ProFormGroup>
      <ProFormText label="備註" name={['remark']} />
    </ModalForm>
  );
};

export default ItemSpecificationModalForm;
