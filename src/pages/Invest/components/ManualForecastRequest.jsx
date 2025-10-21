import {
  INVEST_FORECAST_USAGE_TYPE_APPLY,
  INVEST_FORECAST_USAGE_TYPE_DISUSE,
} from '@/enum/InvestForecastUsageType';
import { ANALYSIS_CHANNEL_MANUAL } from '@/enum/analysisChannel';
import {
  CREATE_INVEST_FORECAST,
  GENERATE_MANUAL_AI_REQUEST_WORDING,
} from '@/services/hive/investForecastService';
import { ReloadOutlined } from '@ant-design/icons';
import { Button, Form, Skeleton, Space } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Paragraph from 'antd/lib/typography/Paragraph';
import React, { useEffect, useState } from 'react';

const ManualForecastRequest = (props) => {
  const { invest } = props;
  const [loading, setLoading] = useState(true);
  const [manaulForecastRequests, setManualForecastRequests] = useState([]);
  const [updatedValue, setUpdatedValue] = useState();

  useEffect(() => {
    getManualForecastRequests();
  }, []);

  const getManualForecastRequests = async () => {
    if (!invest || !invest.id) {
      return;
    }
    setLoading(true);
    const response = await GENERATE_MANUAL_AI_REQUEST_WORDING(invest.id);
    setManualForecastRequests(response);
    setLoading(false);
  };

  const onCreateFinished = () => {
    setManualForecastRequests(manaulForecastRequests.slice(1));
  };

  const ManualRequestAndInputs = manaulForecastRequests.map((manaulForecastRequest) => {
    return (
      <ManualRequestAndInput
        invest={invest}
        manaulForecastRequest={manaulForecastRequest}
        onCreateFinished={onCreateFinished}
        setUpdatedValue={setUpdatedValue}
        updatedValue={updatedValue}
      />
    );
  });

  return (
    <>
      <Button icon={<ReloadOutlined />} onClick={getManualForecastRequests}>
        Refresh Manual Request
      </Button>
      <Skeleton loading={loading}>{ManualRequestAndInputs}</Skeleton>
    </>
  );
};

const ManualRequestAndInput = (props) => {
  const { invest, manaulForecastRequest, onCreateFinished, setUpdatedValue, updatedValue } = props;
  const { message, newsId } = manaulForecastRequest;

  const onFinish = async (values) => {
    const { rawJsonResponse } = values;
    const parsedJson = JSON.parse(rawJsonResponse);
    const request = generateManualForecastResult(
      invest,
      newsId,
      INVEST_FORECAST_USAGE_TYPE_APPLY,
      parsedJson,
    );
    await CREATE_INVEST_FORECAST(request);
    setUpdatedValue(request);
    onCreateFinished();
  };

  const onClickDisuse = async () => {
    const request = generateManualForecastResult(invest, newsId, INVEST_FORECAST_USAGE_TYPE_DISUSE);
    await CREATE_INVEST_FORECAST(request);
    onCreateFinished();
  };

  const updatedValueMessage = !updatedValue
    ? message
    : getReplaceMinMaxMessage(message, updatedValue.maxPrice, updatedValue.minPrice);
  const toDisplayMessage = messageCleaner(updatedValueMessage, ['<']);
  return (
    <>
      <Paragraph>
        <pre>{toDisplayMessage}</pre>
      </Paragraph>
      <Form
        name="wrap"
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        onFinish={onFinish}
      >
        <Form.Item label="JSON Response" name="rawJsonResponse" rules={[{ required: true }]}>
          <TextArea rows={4} />
        </Form.Item>
        <Space>
          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <Form.Item label=" ">
            <Button type="ghost" onClick={onClickDisuse}>
              Disuse
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </>
  );
};

function messageCleaner(message, posfixRemovers) {
  let result = message;
  for (let symbol of posfixRemovers) {
    result = result.substring(0, result.indexOf(symbol));
  }
  return result;
}

function getReplaceMinMaxMessage(message, maxPrice, minPrice) {
  let result = replaceGeneratedValue(message, 'minPrice=', 'minPrice=' + minPrice);
  result = replaceGeneratedValue(result, 'maxPrice=', 'maxPrice=' + maxPrice);
  return result;
}

function generateManualForecastResult(invest, newsId, usageType, toUpdateValues = {}) {
  const { algorithmType, gainSellRate, lossSellRate, size, gridInterval, maxPrice, minPrice } =
    invest;
  const request = {
    invest: {
      id: invest.id,
    },
    newsId,
    analysisChannel: ANALYSIS_CHANNEL_MANUAL.key,
    algorithmType,
    gainSellRate,
    lossSellRate,
    maxPrice,
    minPrice,
    size,
    gridInterval,
    usageType: usageType.key,
    ...toUpdateValues,
  };
  return request;
}

function replaceGeneratedValue(news, label, newValue) {
  const startIndex = news.indexOf(label);
  const endIndex = news.substring(startIndex).indexOf(' ');
  const toReplace = news.substring(startIndex, startIndex + endIndex);
  const updatedNews = news.replace(toReplace, newValue);
  return updatedNews;
}

export default ManualForecastRequest;
