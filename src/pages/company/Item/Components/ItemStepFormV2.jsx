import React, { useState } from 'react';
import {
  StepsForm,
  ProFormText,
  ProFormTextArea,
  ProFormGroup,
  ProFormMoney,
  ProFormDigit,
  ProFormList,
} from '@ant-design/pro-form';
import { Alert, Button, Form, Modal, Result, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProFormCategoryListSelect from '@/commons/proForm/ProFormCategoryListSelect';
import ProFormItemSpecificationStatusSelect from '@/commons/proForm/ProFormItemSpecificationStatusSelect';
import {
  BEDROCK_CREATE_BATCH_SERVICE_REQEUST,
  BEDROCK_CREATE_SERVICE_REQEUST,
} from '@/services/hive/bedrockTemplateService';
import { COMPANY_ITEM_SERVICE_CONFIG } from '@/services/hive/itemService';
import { ITEM_SPECIFICATION_SERVICE_CONFIG } from '@/services/hive/itemSpecificationService';
import ProFormMediaUpload from '@/commons/proForm/ProFormMediaUpload';
import ProCard from '@ant-design/pro-card';
import Text from 'antd/lib/typography/Text';
import ItemStockEditableTableModal from '@/commons/itemStock/ItemStockEditableTableModal';
import { useModel } from 'umi';
import ShopModalForm from '@/pages/companyManager/Shop/components/shopModalForm';
import { onChangeModalVisible } from '@/commons/proTable/proTableUtil';
import { COMPANY_SHOP_SERVICE_CONFIG } from '@/services/hive/shopService';

const MODAL_WIDTH = 1500;

const ItemStepFormV2 = (props) => {
  // model
  const { shops, getShops } = useModel('shop');
  const [itemForm] = Form.useForm();
  const [itemSpecificationForm] = Form.useForm();
  const [item, setItem] = useState();
  const [itemSpecifications, setItemSpecifications] = useState([]);
  const [itemStockEditableTableVisible, setItemStockEditableTableVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [shopModalFormVisible, setShopModalFormVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const createItem = async (request) => {
    const response = await BEDROCK_CREATE_SERVICE_REQEUST(COMPANY_ITEM_SERVICE_CONFIG, request);
    setItem(response);
    return true;
  };

  const createItemSpecification = async (request) => {
    const response = await BEDROCK_CREATE_BATCH_SERVICE_REQEUST(
      ITEM_SPECIFICATION_SERVICE_CONFIG,
      request.map((itemSpecificationRequest) => ({
        ...itemSpecificationRequest,
        item: {
          id: item.id,
        },
      })),
    );
    setItemSpecifications(response);
    onChangeVisible(false);
    setResultVisible(true);
    return true;
  };

  const createShop = async (request) => {
    const response = await BEDROCK_CREATE_SERVICE_REQEUST(COMPANY_SHOP_SERVICE_CONFIG, request);
    getShops();
    setShopModalFormVisible(false);
  };

  const onChangeVisible = (visible) => {
    if (!visible) {
      itemForm.resetFields();
    }
    setVisible(visible);
  };

  return (
    <>
      <Space align="end" direction="vertical">
        {shops.length < 1 ? (
          <Alert
            message="請先添加門店/倉庫"
            showIcon
            type="warning"
            action={
              <Button onClick={() => setShopModalFormVisible(true)} type="ghost">
                創建門店/倉庫
              </Button>
            }
          />
        ) : (
          <Button type="primary" onClick={() => onChangeVisible(true)}>
            <PlusOutlined />
            創建商品
          </Button>
        )}
      </Space>
      <Modal
        title=""
        onCancel={() => setResultVisible(false)}
        visible={resultVisible}
        width={MODAL_WIDTH}
        footer={null}
        destroyOnClose
      >
        <Text type="secondary">ID:{item?.id}</Text>
        <Result
          status="success"
          title={`${item?.name}及${itemSpecifications.length}個規格創建成功`}
          subTitle="請到庫存管理為規格增加庫存"
          extra={[
            <Button
              key="createNew"
              onClick={() => {
                setResultVisible(false);
                onChangeVisible(true);
              }}
            >
              創建新商品
            </Button>,
            <Button
              key="itemStock"
              onClick={() => {
                setItemStockEditableTableVisible(true);
              }}
              type="primary"
            >
              管理庫存
            </Button>,
          ]}
        />
      </Modal>
      <StepsForm
        onFinish={props?.onFinish}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title="創建商品"
              width={MODAL_WIDTH}
              maskClosable={false}
              onCancel={() => onChangeVisible(false)}
              visible={visible}
              footer={submitter}
              destroyOnClose
            >
              {dom}
            </Modal>
          );
        }}
      >
        <StepsForm.StepForm
          form={itemForm}
          onFinish={createItem}
          name="base"
          stepProps={{
            description: '添加商品，如: 巧克力餅乾',
          }}
          title="創建商品"
        >
          <Space direction="vertical">
            <Alert
              message="基本商品的資料，商品中的不同規格會在下一步中設置。"
              type="warning"
              showIcon
              banner
              style={{
                margin: -12,
                marginBottom: 24,
              }}
            />
            <Space>
              <ProFormText
                label="品名"
                name="name"
                placeholder="品名 如: 巧克力餅乾"
                rules={[{ required: true, message: '請輸入品名 如: 巧克力餅乾' }]}
              />
              <ProFormText label="品牌" name="brand" placeholder="品牌 如: 維他" />
            </Space>
            <ProFormMediaUpload form={itemForm} label="圖片" max={1} name={['imageUrl']} />
          </Space>
          <ProFormCategoryListSelect
            label="標籤/分類"
            mode="multiple"
            name={['categories']}
            tooltip="如分類為空，請先添加 標籤/分類"
          />
          <Space>
            <ProFormTextArea
              label="內容"
              name="content"
              placeholder="（一）主要成分或材料。（二）標示法定度量衡單位，必要時，得加註其他單位。"
            />
            <ProFormTextArea
              label="描述"
              name="description"
              placeholder="非常可口的維他巧克力餅乾..."
            />
          </Space>
          <ProFormText label="備註" name="remark" />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          form={itemSpecificationForm}
          name="checkbox"
          stepProps={{
            description: '添加規格，如: 250克包裝',
          }}
          title="創建規格"
          onFinish={(requestList) => createItemSpecification(requestList?.itemSpecifications)}
        >
          <Alert
            message="此為快速創建商品通道，更多規格可在 '商品管理' -> '商品規格' 中添加"
            type="warning"
            showIcon
            banner
            style={{
              margin: -12,
              marginBottom: 24,
            }}
          />

          <ProFormList
            creatorButtonProps={{
              position: 'bottom',
              creatorButtonText: '添加一行規格',
            }}
            itemRender={({ listDom, action }, { record, index }) => {
              return (
                <ProCard
                  bordered
                  title={`${index + 1}.`}
                  style={{
                    marginBottom: 8,
                  }}
                >
                  {listDom}
                  {action}
                </ProCard>
              );
            }}
            initialValue={[
              {
                name: '',
              },
            ]}
            min={1}
            name="itemSpecifications"
          >
            <ProFormGroup title="基本資料">
              {/* <ProFormItemSelect label="商品" name={['item', 'id']} /> */}

              <ProFormText
                disabled
                hidden
                label="商品ID"
                fieldProps={{ value: item?.id }}
                name={['item', 'id']}
              />
              <ProFormText
                disabled
                label="商品"
                fieldProps={{ value: item?.name }}
                name={['item', 'name']}
              />
              <ProFormText
                label="規格"
                name="name"
                placeholder="300克"
                rules={[{ required: true, message: '請輸入規格名稱' }]}
              />
              <ProFormItemSpecificationStatusSelect
                label="狀態"
                name={['itemSpecificationStatus']}
              />
            </ProFormGroup>
            <ProFormGroup>
              <ProFormMediaUpload
                form={itemSpecificationForm}
                label="圖片"
                max={1}
                name={['imageUrl']}
                tooltip="如不上傳圖片，則會使用上一步商品的圖片。"
              />
            </ProFormGroup>
            <ProFormGroup title="倉庫識別">
              <ProFormText label="SKU" name={['sku']} />
              <ProFormText label="條碼" name={['barcode']} />
            </ProFormGroup>
            <ProFormGroup title="價錢">
              <ProFormMoney
                label="零售原價"
                name={['price']}
                rules={[{ required: true, message: '請輸入零售原價' }]}
                placeholder="30"
              />
              <ProFormMoney label="零售折扣" name={['discountPrice']} />
            </ProFormGroup>
            <ProFormGroup title="尺吋/重量">
              <ProFormDigit label="長" name={['length']} />
              <ProFormDigit label="寬" name={['width']} />
              <ProFormDigit label="高" name={['height']} />
              <ProFormDigit label="重量" name={['weight']} />
            </ProFormGroup>
            <ProFormText label="備註" name={['remark']} />
          </ProFormList>
        </StepsForm.StepForm>
      </StepsForm>
      <ItemStockEditableTableModal
        item={item}
        key="stock"
        setVisible={setItemStockEditableTableVisible}
        visible={itemStockEditableTableVisible}
      />
      <ShopModalForm
        onClickSubmit={createShop}
        setModalVisible={(visible) => onChangeModalVisible(visible, setShopModalFormVisible)}
        visible={shopModalFormVisible}
      />
    </>
  );
};

export default ItemStepFormV2;
