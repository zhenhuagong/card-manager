/**
 *
 * flashData.

 * Description:       Store application-wide data. A implementation of session.
 * Version:           0.0.1
 * Author:            Gong Zhenhua
 * Author URI:        http://allmyverse.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */


let data = {};

module.exports = {
  get: (key) => {
    if (data.hasOwnProperty(key)) {
      return data[key];
    }
    return new Error('No data with such key exists');
  },
  set: (key, value) => {
    data[key] = value;
  },
  remove: (key) => {
    if (data.hasOwnProperty(key)) {
      delete data[key];
    }
    return new Error('No data with such key exists');
  },
  clear: () => {
    data = {};
  }
};
