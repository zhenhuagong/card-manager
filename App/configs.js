/**
 *
 * configs.js

 * Description:       This file defines const and configs for the whole app.
 * Version:           0.0.1
 * Author:            Gong Zhenhua
 * Author URI:        http://allmyverse.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

let apiServer = 'http://101.200.176.31:8080/zxtd';
let storagePrefix = '@SimonGongRNWWT:';

let Configs = {
  timeout: 10000,  // network request timeout, 10s

  endpoints: {
    login: apiServer + '/appuser/login', // 登陆
    overview: apiServer + '/appbusi/queryinfo',   //查询汇总信息
    history: apiServer + '/appbusi/qryusedbydate',  //查询短信和GPRS历史使用量
    cardinfo: apiServer + '/appbusi/qrycardinfo',   //查询号码信息
    sendSMS: '',
    listSMS: '',
    queryQuota: ''
  },

  routes: {
    DASHBOARD: 'dashboard',
    SMS: 'sms_management',
    SMS_SEND: 'sms_send',
    SMS_LIST: 'sms_list',
    QUOTA: 'quota_management',
    ESHOP: 'eshop',
    LOGIN: 'login',
    ABOUT: 'about'
  },

  colors: {
    greenDark: '#16A085',
    greenLight: '#1ABC9C'
  },

  literals: {
    title: '物物通'
  },

  errorMsg: {
    fetchTimeout: '网络超时。\r\n请检查网络连接，稍后再试。'
  },

  storageKeys: {
    logged: storagePrefix + 'logged'
  }
};

module.exports = Configs;
