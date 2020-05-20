import { IConfig } from 'umi-types'; // ref: https://umijs.org/config/

const config: IConfig = {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {
          path: '/report/list',
          component: '../pages/report/list',
        },
        {
          path: '/report/detail',
          component: '../pages/report/detail',
        },
        {
          path: '/',
          component: '../pages/index',
        },
        {
          path: '/test',
          component: '../pages/list',
        },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: {
          webpackChunkName: true,
        },
        title: 'umi-app',
        dll: false,
        locale: {
          enable: true,
          default: 'en-US',
        },
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  theme: {
    // ...darkTheme,
    'primary-color': '#009688',
    'border-radius-base': '4px',
    'border-color-base': '#e4e4e4',
    'select-item-selected-font-weight': '400',
    'select-item-selected-bg': '#f3f3f3',
    'table-selected-row-hover-bg': '#e8f6f6',
    'table-selected-row-bg': '#e8f6f6',
    'table-row-hover-bg': '#e8f6f6',
    'table-header-bg': '#f8f8f9',
  },
  // proxy: {
  //   '/report/': {
  //     target: 'http://dev.report.belle.net.cn:8090/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/report': 'report' },
  //   },
  // },
};
export default config;
