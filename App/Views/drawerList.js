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

let DrawerList = React.createClass({
  getInitialState() {
    return {
      isLoading: false,
    };
  },
  componentDidMount() {
  },

  render(){
    let TouchableElement = TouchableHighlight;
    // if (Platform.OS === 'android') {
    //   TouchableElement = TouchableNativeFeedback;
    // }
    return (
      <View style={styles.container} {...this.props}>
        <View style={styles.header}/>
        <TouchableElement onPress={this._gotoLogin}>
          <View style={{flexDirection: 'row', alignItems: 'center', padding: 16}}>
            <Image
              source={require('image!ic_explore_white_24dp')}
              style={{width: 24, height: 24, marginLeft: 16, marginRight: 16}} />
            <Text style={styles.menuText}>
               登陆
            </Text>
          </View>
        </TouchableElement>
        <TouchableElement onPress={this._gotoAbout}>
          <View style={{flexDirection: 'row', alignItems: 'center', padding: 16}}>
            <Image
              source={require('image!ic_explore_white_24dp')}
              style={{width: 24, height: 24, marginLeft: 16, marginRight: 16}} />
            <Text style={styles.menuText}>
              关于
            </Text>
          </View>
        </TouchableElement>
      </View>
    );
  },

  _gotoLogin() {
    console.log('go to login');
    this.props.navigator.push({
      name: Configs.routes.LOGIN,
      index: 4
    });
  },

  _gotoAbout() {
    console.log('go to about');
    this.props.navigator.push({
      name: Configs.routes.ABOUT,
      index: 5
    });
  },
});

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6F6F00',
  },
  header: {
    height: 56,
    backgroundColor: '#FF6600',
  },
  menuText: {
    fontSize: 14,
    color: 'white',
  }
});

module.exports = DrawerList;
