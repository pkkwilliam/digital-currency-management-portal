import { BEDROCK_QUERY_LIST_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_PRINTER_SERVICE_CONFIG } from '@/services/printerService';
import { ProFormSelect } from '@ant-design/pro-form';
import React from 'react';

const ProFormCompanyPrinterSelect = (props) => {
  const query = async (params) => {
    const response = await BEDROCK_QUERY_LIST_SERVICE_REQUEST(COMPANY_PRINTER_SERVICE_CONFIG, {
      ...params,
      active: true,
    });
    return response.data.map((printer) => ({
      data: printer,
      value: printer.id,
      label: `${printer.name}`,
    }));
  };

  return <ProFormSelect request={query} {...props} />;
};

export default ProFormCompanyPrinterSelect;
