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
      <View style={styles.menubar}>
        <TouchableHighlight style={menuStyles.dashboard} ref={Configs.routes.DASHBOARD} onPress={this._goFav}>
          <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
            <Image
              source={require('image!ic_explore_white_24dp')}
              style={{width: 24, height: 24, marginLeft: 6, marginRight: 6}} />
            <Text style={styles.menuText}>
              概览
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={menuStyles.sms} ref={Configs.routes.SMS} onPress={this._goSMS}>
          <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
            <Image
              source={require('image!ic_explore_white_24dp')}
              style={{width: 24, height: 24, marginLeft: 6, marginRight: 6}} />
            <Text style={styles.menuText}>
              短信
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={menuStyles.quota} ref={Configs.routes.QUOTA} onPress={this._goQuota}>
          <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
            <Image
              source={require('image!ic_explore_white_24dp')}
              style={{width: 24, height: 24, marginLeft: 6, marginRight: 6}} />
            <Text style={styles.menuText}>
              流量
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={menuStyles.eshop} ref={Configs.routes.ESHOP} onPress={this._goEShop}>
          <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
            <Image
              source={require('image!ic_explore_white_24dp')}
              style={{width: 24, height: 24, marginLeft: 6, marginRight: 6}} />
            <Text style={styles.menuText}>
              商城
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  },

  _goFav() {
    let _nagiavtor = this.props.navigator;
    if (_nagiavtor.name !== Configs.routes.DASHBOARD) {
      _nagiavtor.push({
        name: Configs.routes.DASHBOARD,
        index: 0
      });
    }
  },

  _goSMS() {
    let _nagiavtor = this.props.navigator;
    if (_nagiavtor.name !== Configs.routes.SMS) {
      _nagiavtor.push({
        name: Configs.routes.SMS,
        index: 1
      });
    }
  },

  _goQuota() {
    let _nagiavtor = this.props.navigator;
    if (_nagiavtor.name !== Configs.routes.QUOTA) {
      _nagiavtor.push({
        name: Configs.routes.QUOTA,
        index: 2
      });
    }
  },

  _goEShop() {
    let _nagiavtor = this.props.navigator;
    if (_nagiavtor.name !== Configs.routes.ESHOP) {
      _nagiavtor.push({
        name: Configs.routes.ESHOP,
        index: 3
      });
    }
  }
});

let styles = StyleSheet.create({
  menubar: {
    backgroundColor: Configs.colors.greenDark,
    height: 56,
    flexDirection: 'row'
  },
  menu: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  menuText: {
    fontSize: 14,
    color: 'white',
  },
  currentMenu: {
    backgroundColor: Configs.colors.greenLight
  }
});

module.exports = BottomMenuBar;

