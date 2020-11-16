/*
 * @Date: 2020-11-14 21:18:23
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-15 10:42:57
 */
import {baseUrl} from './config'

import Taro from '@tarojs/taro';



export default (options = {
  method: 'GET',
  data: {}
}) => {
  return Taro.request({
    url: baseUrl + options.url,
    data: {
      ...options.data,
    },
    header: {
      'Content-Type': 'application/json',
    },
    method: options.method.toUpperCase(),
  }).then(res => {
    const {
      statusCode,
      data
    } = res;
    if (statusCode >= 200 && statusCode < 300) {
      if (data.code !== 200) {
        Taro.showToast({
          title: `似乎出了点错误~` || res.data.error.code,
          icon: 'none',
          mask: true,
        });
      }
      return data;
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  });
};


