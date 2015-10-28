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

var Configs = {
  api: {
    login: '',
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
    title: 'CardManager'
  }
};

module.exports = Configs;
