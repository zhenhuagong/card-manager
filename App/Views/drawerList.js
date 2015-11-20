/**
 *
 * drawer list.

 * Description:       This file definesapp-wide overlay of draw list component.
 * Version:           0.0.1
 * Author:            Gong Zhenhua
 * Author URI:        http://allmyverse.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

'use strict'

let React = require('react-native');
let {
  AsyncStorage,
  Platform,
  ListView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableHighlight,
} = React

let Configs = require('../configs');
let Actions = require('../actions');
let { Icon } = require('react-native-icons');

let DrawerList = React.createClass({
  getInitialState() {
    return {
      loggedin: false,
    };
  },

  componentDidMount() {
    this._checkLoginState();
  },

  render(){
    let TouchableElement = TouchableHighlight;
    // if (Platform.OS === 'android') {
    //   TouchableElement = TouchableNativeFeedback;
    // }
    let loginoutLabel = this.state.loggedin ? '注销' : '登陆';
    let loginoutHandler = this.state.loggedin ? this._logout : this._login;
    let loginout = (
      <TouchableElement onPress={loginoutHandler}>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 16}}>
            <Icon
              name='material|sign-in'
              size={22}
              color='#ffffff'
              style={styles.menuIcon} />
          <Text style={styles.menuText}>
            {loginoutLabel}
          </Text>
        </View>
      </TouchableElement>
    );

    return (
      <View style={styles.container} {...this.props}>
        <View style={styles.header}/>
        <TouchableElement onPress={this._gotoAbout}>
          <View style={{flexDirection: 'row', alignItems: 'center', padding: 16}}>
            <Icon
              name='material|info-outline'
              size={22}
              color='#ffffff'
              style={styles.menuIcon} />
            <Text style={styles.menuText}>
              关于
            </Text>
          </View>
        </TouchableElement>
        {loginout}
      </View>
    );
  },

  _gotoLogin() {
    console.log('go to login');
    this.props.navigator.push({
      name: Configs.routes.LOGIN
    });
  },

  _gotoAbout() {
    console.log('go to about');
    this.props.navigator.push({
      name: Configs.routes.ABOUT
    });
  },

  _logout() {
    this._removeStorage();
    Actions.logout();
    this.setState({
      loggedin: false
    });
  },

  async _checkLoginState() {
    try {
      var value = await AsyncStorage.getItem(Configs.storageKeys.logged);
      if (value !== null){
        this.setState({
          loggedin: true
        });
      } else {
        this.setState({
          loggedin: false
        });
      }
    } catch (error) {
      this.setState({
        loggedin: false
      });
    }
  },

  async _removeStorage() {
    try {
      await AsyncStorage.removeItem(Configs.storageKeys.logged);
      this.props.navigator.push({
        name: Configs.routes.DASHBOARD
      });
    } catch (error) {
      console.log(error);
    }
  },
});

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Configs.colors.greenLight,
  },
  header: {
    height: 56,
    backgroundColor: Configs.colors.greenDark,
  },
  menuText: {
    fontSize: 14,
    color: 'white',
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginLeft: 6,
    marginRight: 6
  }
});

module.exports = DrawerList;
