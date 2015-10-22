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
  StyleSheet,
  Dimensions,
  TouchableHighlight
} = React;

let Configs = require('../../configs');

let BottomMenuBar = React.createClass({

  getInitialState() {
    return {
      currentTab: Configs.appTabs.fav // switch to fav tab by default
    }
  },

  componentDidMount() {
    // Set selected style for current tab
    // this.refs[this.props.navigator.name]
  },

  render() {
    return (
      <View style={styles.menubar}>
        <TouchableHighlight style={styles.menu} ref={Configs.routes.DASHBOARD} onPress={this._goFav}>
          <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
            <Image
              source={require('image!ic_explore_white_24dp')}
              style={{width: 24, height: 24, marginLeft: 6, marginRight: 6}} />
            <Text style={styles.menuText}>
              常用
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.menu} ref={Configs.routes.SMS} onPress={this._goSMS}>
          <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
            <Image
              source={require('image!ic_explore_white_24dp')}
              style={{width: 24, height: 24, marginLeft: 6, marginRight: 6}} />
            <Text style={styles.menuText}>
              短信
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.menu} ref={Configs.routes.QUOTA} onPress={this._goQuota}>
          <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
            <Image
              source={require('image!ic_explore_white_24dp')}
              style={{width: 24, height: 24, marginLeft: 6, marginRight: 6}} />
            <Text style={styles.menuText}>
              流量
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.menu} ref={Configs.routes.ESHOP} onPress={this._goEShop}>
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
    backgroundColor: '#16A085',
    height: 56
  },
  menu: {
    flex: 0
  },
  menuText: {
    fontSize: 14,
    color: 'white',
  }
});

module.exports = BottomMenuBar;

