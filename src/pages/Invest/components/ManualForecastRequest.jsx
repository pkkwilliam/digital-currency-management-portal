import { ANALYSIS_CHANNEL_MANUAL } from '@/enum/analysisChannel';
import {
  CREATE_INVEST_FORECAST,
  GENERATE_MANUAL_AI_REQUEST_WORDING,
} from '@/services/hive/investForecastService';
import { Button, Descriptions, Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Paragraph from 'antd/lib/typography/Paragraph';
import React, { useEffect, useState } from 'react';

const ManualForecastRequest = (props) => {
  const { invest } = props;
  const [manaulForecastRequests, setManualForecastRequests] = useState([]);

  useEffect(() => {
    getManualForecastRequests();
  }, []);

  const getManualForecastRequests = async () => {
    if (!invest || !invest.id) {
      return;
    }
    const response = await GENERATE_MANUAL_AI_REQUEST_WORDING(invest.id);
    setManualForecastRequests(response);
  };

  const ManualRequestAndInputs = manaulForecastRequests.map((manaulForecastRequest) => {
    return (
      <ManualRequestAndInput
        invest={invest}
        manaulForecastRequest={manaulForecastRequest}
        onCreateFinished={getManualForecastRequests}
      />
    );
  });

  return <>{ManualRequestAndInputs}</>;
};

const ManualRequestAndInput = (props) => {
  const { invest, manaulForecastRequest, onCreateFinished } = props;
  const { algorithmType, gainSellRate, lossSellRate, size, gridInterval } = invest;
  const { message, newsId } = manaulForecastRequest;
  const onFinish = async (values) => {
    const { rawJsonResponse } = values;
    const parsedJson = JSON.parse(rawJsonResponse);
    const request = {
      invest: {
        id: invest.id,
      },
      newsId,
      analysisChannel: ANALYSIS_CHANNEL_MANUAL.key,
      algorithmType,
      gainSellRate,
      lossSellRate,
      size,
      gridInterval,
      ...parsedJson,
    };
    await CREATE_INVEST_FORECAST(request);
    onCreateFinished();
  };

  return (
    <>
      <Paragraph>
        <pre>{message}</pre>
      </Paragraph>
      <Form name="wrap" labelAlign="left" labelWrap colon={false} onFinish={onFinish}>
        <Form.Item label="JSON Response" name="rawJsonResponse" rules={[{ required: true }]}>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ManualForecastRequest;
