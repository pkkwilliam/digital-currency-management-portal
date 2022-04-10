import React, { useEffect, useState } from 'react';
import {
  StepsForm,
  ProFormText,
  ProFormTextArea,
  ProFormGroup,
  ProFormMoney,
  ProFormDigit,
} from '@ant-design/pro-form';
import { Alert, Button, Modal, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProFormCategoryListSelect from '@/commons/proForm/ProFormCategoryListSelect';
import ProFormItemSpecificationStatusSelect from '@/commons/proForm/ProFormItemSpecificationStatusSelect';
import {
  BEDROCK_CREATE_SERVICE_REQEUST,
  BEDROCK_QUERY_LIST_SERVICE_REQUEST,
  BEDROCK_UPDATE_BATCH_SERVICE_REQUEST,
} from '@/services/hive/bedrockTemplateService';
import { COMPANY_ITEM_SERVICE_CONFIG } from '@/services/hive/itemService';
import { ITEM_SPECIFICATION_SERVICE_CONFIG } from '@/services/hive/itemSpecificationService';
import { COMPANY_SHOP_MANAGER_ITEM_SPECIFICATION_STOCK_SERVICE_CONFIG } from '@/services/hive/itemSpecificationStockService';
import { EditableProTable } from '@ant-design/pro-table';
import { getValueEnum } from '@/enum/enumUtil';
import { SHOP_TYPES } from '@/enum/shopType';
import {
  ITEM_SPECIFICATION_STOCK_TYPES,
  ITEM_SPECIFICATION_STOCK_TYPE_LIMITED,
} from '@/enum/itemSpecificationStockType';

const defaultData = () => {
  return [
    {
      active: true,
      id: 664,
      itemSpecification: {
        active: true,
        id: 660,
        barcode: null,
        cost: null,
        discountPrice: null,
        height: 0,
        imageUrl: null,
        item: {
          active: true,
          id: 659,
          brand: null,
          categories: [],
          content: null,
          description: null,
          imageUrl: null,
          itemStatus: null,
          manufacturer: null,
          name: '1',
          remark: null,
          itemSpecificationPriceRangeResponse: null,
          stockResponse: null,
        },
        itemSpecificationStatus: null,
        length: 0,
        name: '1',
        price: 1.0,
        remark: null,
        sku: null,
        stockResponse: null,
        weight: null,
        width: 0,
      },
      shop: {
        active: true,
        id: 25,
        address: {
          active: true,
          id: 24,
          addressType: 'SHOP',
          contactName: 'Pun Ka Keid',
          countryCode: 'Macaod',
          phoneNumber: '63530392d',
          street: 'Rua dos Pescadores no 166. Edificio Industrial Veng Houf',
          unit: '2',
          remark: null,
        },
        defaultPrinter: {
          active: true,
          id: 133,
          name: '源代碼測試機',
          printer: 'FEIE_58MM_RECEIPT_PRINTER',
          remark: 'REMAK',
          serialNumber: '922589824',
        },
        name: '永好7樓配貨中心',
        shopType: 'REGULAR',
      },
      stock: 90,
      itemStockType: 'LIMITED',
    },
    {
      active: true,
      id: 663,
      itemSpecification: {
        active: true,
        id: 660,
        barcode: null,
        cost: null,
        discountPrice: null,
        height: 0,
        imageUrl: null,
        item: {
          active: true,
          id: 659,
          brand: null,
          categories: [],
          content: null,
          description: null,
          imageUrl: null,
          itemStatus: null,
          manufacturer: null,
          name: '1',
          remark: null,
          itemSpecificationPriceRangeResponse: null,
          stockResponse: null,
        },
        itemSpecificationStatus: null,
        length: 0,
        name: '1',
        price: 1.0,
        remark: null,
        sku: null,
        stockResponse: null,
        weight: null,
        width: 0,
      },
      shop: {
        active: true,
        id: 32,
        address: {
          active: true,
          id: 31,
          addressType: 'SHOP',
          contactName: 'XX',
          countryCode: 'XX',
          phoneNumber: 'XX',
          street: 'XX',
          unit: 'XX',
          remark: null,
        },
        defaultPrinter: {
          active: true,
          id: 133,
          name: '源代碼測試機',
          printer: 'FEIE_58MM_RECEIPT_PRINTER',
          remark: 'REMAK',
          serialNumber: '922589824',
        },
        name: '小史配貨中心',
        shopType: 'SHELVES',
      },
      stock: 0,
      itemStockType: 'LIMITED',
    },
    {
      active: true,
      id: 662,
      itemSpecification: {
        active: true,
        id: 660,
        barcode: null,
        cost: null,
        discountPrice: null,
        height: 0,
        imageUrl: null,
        item: {
          active: true,
          id: 659,
          brand: null,
          categories: [],
          content: null,
          description: null,
          imageUrl: null,
          itemStatus: null,
          manufacturer: null,
          name: '1',
          remark: null,
          itemSpecificationPriceRangeResponse: null,
          stockResponse: null,
        },
        itemSpecificationStatus: null,
        length: 0,
        name: '1',
        price: 1.0,
        remark: null,
        sku: null,
        stockResponse: null,
        weight: null,
        width: 0,
      },
      shop: {
        active: true,
        id: 66,
        address: {
          active: true,
          id: 65,
          addressType: 'SHOP',
          contactName: '潘嘉朞',
          countryCode: '853',
          phoneNumber: '63530392',
          street: '111',
          unit: '222',
          remark: null,
        },
        defaultPrinter: {
          active: true,
          id: 133,
          name: '源代碼測試機',
          printer: 'FEIE_58MM_RECEIPT_PRINTER',
          remark: 'REMAK',
          serialNumber: '922589824',
        },
        name: '源代碼2號倉',
        shopType: 'WAREHOUSE',
      },
      stock: 0,
      itemStockType: 'LIMITED',
    },
    {
      active: true,
      id: 661,
      itemSpecification: {
        active: true,
        id: 660,
        barcode: null,
        cost: null,
        discountPrice: null,
        height: 0,
        imageUrl: null,
        item: {
          active: true,
          id: 659,
          brand: null,
          categories: [],
          content: null,
          description: null,
          imageUrl: null,
          itemStatus: null,
          manufacturer: null,
          name: '1',
          remark: null,
          itemSpecificationPriceRangeResponse: null,
          stockResponse: null,
        },
        itemSpecificationStatus: null,
        length: 0,
        name: '1',
        price: 1.0,
        remark: null,
        sku: null,
        stockResponse: null,
        weight: null,
        width: 0,
      },
      shop: {
        active: true,
        id: 161,
        address: {
          active: true,
          id: 160,
          addressType: 'SHOP',
          contactName: null,
          countryCode: null,
          phoneNumber: null,
          street: null,
          unit: null,
          remark: null,
        },
        defaultPrinter: null,
        name: '路環暫轉倉',
        shopType: 'REGULAR',
      },
      stock: 0,
      itemStockType: 'LIMITED',
    },
  ];
};

const ItemStepForm = (props) => {
  // const [editableKeys, setEditableRowKeys] = useState();
  const [item, setItem] = useState();
  const [itemSpecification, setItemSpecification] = useState();
  const [itemSpecificationsStock, setItemSpecificationsStock] = useState();
  const [visible, setVisible] = useState(false);
  const [editableKeys, setEditableRowKeys] = useState(defaultData().map((item) => item.id));
  const [dataSource, setDataSource] = useState(defaultData());

  useEffect(() => {
    console.log('starttt');
    setEditableRowKeys(defaultData().map((item) => item.id));
    console.log(editableKeys);
  }, []);

  const SHOP_ITEM_SPECIFICATION_COLUMNS = [
    { title: '地點', dataIndex: ['shop', 'name'], editable: false },
    {
      title: '地點類型',
      dataIndex: ['shop', 'shopType'],
      editable: false,
      search: false,
      valueEnum: getValueEnum(SHOP_TYPES),
    },
    {
      title: '庫存類型',
      dataIndex: ['itemStockType'],
      editable: true,
      search: false,
      valueEnum: getValueEnum(ITEM_SPECIFICATION_STOCK_TYPES),
    },
    {
      title: '地點庫存',
      dataIndex: 'stock',
      editable: true,
      search: false,
      valueType: 'number',
      renderText: (text, record) =>
        record.itemStockType === ITEM_SPECIFICATION_STOCK_TYPE_LIMITED.key ? text : '-',
    },
  ];

  const columns = [
    {
      title: '活动名称',
      dataIndex: ['shop', 'name'],
      width: '30%',
    },
    {
      title: '状态',
      dataIndex: 'itemStockType',
    },
    {
      title: '描述',
      dataIndex: 'stock',
      editable: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 250,
      render: () => {
        return null;
      },
    },
  ];

  const createItem = async (request) => {
    const response = await BEDROCK_CREATE_SERVICE_REQEUST(COMPANY_ITEM_SERVICE_CONFIG, request);
    setItem(response);
    return true;
  };

  const createItemSpecification = async (request) => {
    const response = await BEDROCK_CREATE_SERVICE_REQEUST(ITEM_SPECIFICATION_SERVICE_CONFIG, {
      item: item,
      ...request,
    });
    setItemSpecification(response);
    queryItemSpecificationStock(response);
    return true;
  };

  const queryItemSpecificationStock = async (itemSpecificationResponse) => {
    const response = await BEDROCK_QUERY_LIST_SERVICE_REQUEST(
      COMPANY_SHOP_MANAGER_ITEM_SPECIFICATION_STOCK_SERVICE_CONFIG,
      {
        'itemSpecification.id': itemSpecificationResponse.id,
        active: true,
        itemSpecificationActive: true,
      },
    );
    // get item specification stock by each shop
    setItemSpecificationsStock(response.data);
    // set item is being edit for EditiableTable
    setEditableRowKeys(response.data.map((itemSpecificationStock) => itemSpecificationStock.id));
  };

  const updateBatchItemSpecificationStock = async (request) => {
    console.log(request);
    await BEDROCK_UPDATE_BATCH_SERVICE_REQUEST(
      COMPANY_SHOP_MANAGER_ITEM_SPECIFICATION_STOCK_SERVICE_CONFIG,
      request,
    );
    setVisible(false);
    return true;
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        <PlusOutlined />
        快速創建商品
      </Button>
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
              title="分步表单"
              width={1500}
              onCancel={() => setVisible(false)}
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
          onFinish={createItem}
          name="base"
          stepProps={{
            description: '增加商品，如: 巧克力餅乾',
          }}
          title="創建商品"
        >
          <Space direction="vertical">
            <Alert
              message="此為快速創建商品通道，商品圖片可在左則導航欄'管理' -> '商品'中增加"
              type="success"
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
          </Space>
          <ProFormCategoryListSelect label="標簽" mode="multiple" name={['categories']} />
          <Space>
            <ProFormTextArea label="內容" name="content" placeholder="5分包裝 每包25塊" />
            <ProFormTextArea
              label="描述"
              name="description"
              placeholder="非常可口的維他巧克力餅乾..."
            />
          </Space>
          <ProFormText label="備註" name="remark" />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="checkbox"
          stepProps={{
            description: '增加規格，如: 250克包裝',
          }}
          title="創建規格"
          onFinish={createItemSpecification}
        >
          <Alert
            message="此為快速創建商品通道，規格圖片可在左則導航欄'管理' -> '商品規格'中增加"
            type="success"
            showIcon
            banner
            style={{
              margin: -12,
              marginBottom: 24,
            }}
          />
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
              name={['name']}
              placeholder="300克"
              rules={[{ required: true, message: '請輸入規格名稱' }]}
            />
            <ProFormItemSpecificationStatusSelect label="狀態" name={['itemSpecificationStatus']} />
          </ProFormGroup>
          <ProFormGroup title="庫存管理">
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
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="time"
          onFinish={() => updateBatchItemSpecificationStock(itemSpecificationsStock)}
          stepProps={{
            description: '設置倉庫/門店或貨架之庫存',
          }}
          title="庫存設置"
        >
          <EditableProTable
            headerTitle="可编辑表格"
            columns={SHOP_ITEM_SPECIFICATION_COLUMNS}
            rowKey="id"
            value={itemSpecificationsStock}
            editable={{
              type: 'multiple',
              editableKeys,
              onValuesChange: (record, recordList) => {
                setItemSpecificationsStock(recordList);
              },
              onChange: setEditableRowKeys,
            }}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
};

export default ItemStepForm;
