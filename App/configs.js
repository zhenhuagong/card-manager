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

let apiServer = 'http://101.200.176.31';
let storagePrefix = '@SimonGongRNWWT:';

let Configs = {
  timeout: 10000,  // network request timeout, 10s

  endpoints: {
    login: apiServer + '/appuser/login', // 登陆
    queryInfo: apiServer + '/appbusi/queryinfo',   //查询卡的使用汇总信息
    queryInfoByDate: apiServer + '/appbusi/qryusedbydate',  //按时间段查询短信和GPRS历史使用量
    queryCardInfo: apiServer + '/appbusi/qrycardinfo',   //查询号码信息
    sendSMS: apiServer + '/appbusi/sendmsg',  //发送短信
    listSMS: apiServer + '/appbusi/getmsg'   // 接收短信
  },

  routes: {
    DASHBOARD: 'dashboard',
    SMS: 'sms_management',
    SMS_SEND: 'sms_send',
    QUOTA: 'quota_management',
    ESHOP: 'eshop',
    ABOUT: 'about'
  },

  colors: {
    greenDark: '#004D40',
    greenLight: '#1ABC9C',
    greenButton: '#00796B',
    grayMenu: '#FAFAFA',
    whiteContent: '#F5FCFF',
    buttonUnderlay: '#009688',
    menuBorder: '#CCCCCC',
    activeText: '#004D40',
    inactiveText: 'gray'
  },

  literals: {
    title: '物讯通'
  },

  errorMsg: {
    fetchTimeout: '网络超时。请检查网络连接，稍后再试。'
  },

  storageKeys: {
    logged: storagePrefix + 'logged'
  }
};

module.exports = Configs;
