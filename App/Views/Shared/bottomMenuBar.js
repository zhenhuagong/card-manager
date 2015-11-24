/**
 *
 * BottomMenuBar.

 * Description:       App-wide menubar at bottom.
 * Version:           0.0.1
 * Author:            Gong Zhenhua
 * Author URI:        http://allmyverse.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */


'use strict';

let React = require('react-native');

let {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableHighlight
} = React;

let Configs = require('../../configs');
let { Icon } = require('react-native-icons');

let BottomMenuBar = React.createClass({
  render() {
    let menuStyles = {
      dashboard: [styles.menu],
      sms: [styles.menu],
      quota: [styles.menu],
      eshop: [styles.menu]
    };
    switch(this.props.current) {
      case Configs.routes.DASHBOARD:
        menuStyles.dashboard.push(styles.currentMenu);
        break;
      case Configs.routes.SMS:
        menuStyles.sms.push(styles.currentMenu);
        break;
      case Configs.routes.QUOTA:
        menuStyles.quota.push(styles.currentMenu);
        break;
      case Configs.routes.ESHOP:
        menuStyles.eshop.push(styles.currentMenu);
        break;
      default:
        break;
    }
    return (
      <View style={[styles.menubar, this.props.style]}>
        <TouchableHighlight style={menuStyles.dashboard}
          onPress={this._goDashboard} underlayColor={Configs.colors.grayMenu}>
          <View style={{flexDirection: 'column', alignItems: 'center', padding: 5}}>
            <Icon
              name='material|view-dashboard'
              size={24}
              style={styles.menuIcon} />
            <Text style={styles.menuText}>
              概览
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={menuStyles.sms}
          onPress={this._goSMS} underlayColor={Configs.colors.grayMenu}>
          <View style={{flexDirection: 'column', alignItems: 'center', padding: 5}}>
            <Icon
              name='material|email'
              size={24}
              style={styles.menuIcon} />
            <Text style={styles.menuText}>
              短信
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={menuStyles.quota}
          onPress={this._goQuota} underlayColor={Configs.colors.grayMenu}>
          <View style={{flexDirection: 'column', alignItems: 'center', padding: 5}}>
            <Icon
              name='material|input-antenna'
              size={24}
              style={styles.menuIcon} />
            <Text style={styles.menuText}>
              流量
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={menuStyles.eshop}
          onPress={this._goEShop} underlayColor={Configs.colors.grayMenu}>
          <View style={{flexDirection: 'column', alignItems: 'center', padding: 5}}>
            <Icon
              name='material|shopping-cart'
              size={24}
              style={styles.menuIcon} />
            <Text style={styles.menuText}>
              商城
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  },

  _goDashboard() {
    let _nagiavtor = this.props.navigator;
    if (_nagiavtor.name !== Configs.routes.DASHBOARD) {
      _nagiavtor.push({
        name: Configs.routes.DASHBOARD
      });
    }
  },

  _goSMS() {
    let _nagiavtor = this.props.navigator;
    if (_nagiavtor.name !== Configs.routes.SMS) {
      _nagiavtor.push({
        name: Configs.routes.SMS
      });
    }
  },

  _goQuota() {
    let _nagiavtor = this.props.navigator;
    if (_nagiavtor.name !== Configs.routes.QUOTA) {
      _nagiavtor.push({
        name: Configs.routes.QUOTA
      });
    }
  },

  _goEShop() {
    let _nagiavtor = this.props.navigator;
    if (_nagiavtor.name !== Configs.routes.ESHOP) {
      _nagiavtor.push({
        name: Configs.routes.ESHOP
      });
    }
  }
});

let styles = StyleSheet.create({
  menubar: {
    backgroundColor: Configs.colors.grayMenu,
    borderTopColor: Configs.colors.menuBorder,
    borderTopWidth: 1,
    flexDirection: 'row'
  },
  menu: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  menuText: {
    fontSize: 12,
    color: 'black',
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginLeft: 6,
    marginRight: 6
  },
  currentMenu: {
    backgroundColor: Configs.colors.greenLight
  }
});

module.exports = BottomMenuBar;

