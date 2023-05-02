import { getValueEnum } from '@/enum/enumUtil';
import { ORDER_PLACE_CHANNELS } from '@/enum/orderPlaceChannel';
import { ProFormRadio } from '@ant-design/pro-form';
import React from 'react';

const ProFormOrderPlaceChannelRadio = (props) => {
  return <ProFormRadio.Group valueEnum={getValueEnum(ORDER_PLACE_CHANNELS)} {...props} />;
};

export default ProFormOrderPlaceChannelRadio;
