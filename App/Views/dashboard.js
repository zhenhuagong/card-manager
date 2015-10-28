/**
 *
 * dashboard.

 * Description:       This file defines the dashboard component.
 * Version:           0.0.1
 * Author:            Gong Zhenhua
 * Author URI:        http://allmyverse.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

'use strict';

let React = require('react-native');
let {
  AsyncStorage,
  Platform,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid,
  TouchableHighlight,
  ToolbarAndroid
} = React;

let RowSection = require('./Shared/rowSection');
let rowSectionStyle = {height: 50};

let DrawerList = require('./drawerList');
let Button = require('./Shared/button');
let Configs = require('../configs');
let DRAWER_WIDTH_LEFT = 96;
let Dashboard = React.createClass({
  render() {
    let content = (
    <View style={styles.content}>
      <Text style={styles.welcome}>
        欢迎登陆，DEF001
      </Text>
      <Text style={styles.instructions}>
        短信充值总数：1000000
      </Text>
      <Text style={styles.instructions}>
        已发短信总数：6740
      </Text>
      <Text style={styles.instructions}>
        剩余短信总数：993260
      </Text>
      <View style={styles.button}>
        <Button onPress={this._login}>
          <Text>卡详情查询</Text>
        </Button>
      </View>
    </View>);
    return (
      <DrawerLayoutAndroid
        ref={(drawer) => { this.drawer = drawer; }}
        drawerWidth={Dimensions.get('window').width - DRAWER_WIDTH_LEFT}
        keyboardDismissMode="on-drag"
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this._renderNavigationView}>
        <View style={styles.container}>
          <ToolbarAndroid
            title={Configs.literals.title}
            titleColor="white"
            navIcon={require('image!ic_drawer')}
            logo={require('image!ic_launcher')}
            style={styles.toolbar}
            onIconClicked={() => this.drawer.openDrawer()}
            onActionSelected={this.onActionSelected} />
          {content}
        </View>
      </DrawerLayoutAndroid>
    );
  },

  _renderNavigationView(){
    return(
      <DrawerList navigator={this.props.navigator} name={this.props.name}/>
    );
  },
});

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
  },
  toolbar: {
    backgroundColor: Configs.colors.greenDark,
    height: 56,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    marginTop: 20
  }
});

module.exports = Dashboard;
