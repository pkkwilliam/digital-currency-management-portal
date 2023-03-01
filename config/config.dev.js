// https://umijs.org/config/
import { defineConfig } from 'umi';
export default defineConfig({
  define: {
    API_URL: 'http://127.0.0.1:9091',
  },
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
});
