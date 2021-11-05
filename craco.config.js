/*
 * @Author: 张晗
 * @Date: 2021-10-22 09:58:03
 * @LastEditors: 张晗
 * @LastEditTime: 2021-10-22 10:09:48
 * @Description:
 */
const CracoLessPlugin = require('craco-less')

/* craco.config.js */
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
