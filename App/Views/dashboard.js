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

let Login = require('./Login');
let DrawerList = require('./drawerList');
let Button = require('./Shared/button');
let Configs = require('../configs');
let DRAWER_WIDTH_LEFT = 96;
let Request = require('../Networks/request');
let BottomMenuBar = require('./Shared/bottomMenuBar');

let Dashboard = React.createClass({
  getInitialState() {
    return {
      loaded: false,
      loggedin: false
    };
  },

  // check login state
  componentWillMount() {
    this._checkLoginState().done();
  },

  render() {
    console.log('loggedin? ' + this.state.loggedin);
    if (!this.state.loggedin) { // not logged in yet, show login form
      return (
        <View style={styles.container}>
          <Login navigator={this.props.navigator}/>
        </View>
      );
    } else {  // already logged in, show dashboard
      let content = (
        <View style={styles.content}>
          <Text style={styles.welcome}>
            欢迎登陆，{this.state.user.USERNAME}
          </Text>
          <View style={styles.button}>
            <Button onPress={this._login}>
              <Text>卡详情查询</Text>
            </Button>
          </View>
        </View>
      );

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
              navIcon={require('../images/ic_drawer.png')}
              logo={require('../images/ic_launcher.png')}
              style={styles.toolbar}
              onIconClicked={() => this.drawer.openDrawer()}
              onActionSelected={this.onActionSelected} />
            {content}
          </View>
          <BottomMenuBar current={Configs.routes.DASHBOARD}
            navigator={this.props.navigator} name={route.name}/>
        </DrawerLayoutAndroid>
      );
    }
  },

  _renderNavigationView() {
    return(
      <DrawerList navigator={this.props.navigator} name={this.props.name}/>
    );
  },

  async _checkLoginState() {
    try {
      var value = await AsyncStorage.getItem(Configs.storageKeys.logged);
      if (value !== null){
        this.setState({
          user: JSON.parse(value),
          loggedin: true
        });
      } else {
        this.setState({
          loggedin: false,
          error: ''
        });
      }
    } catch (error) {
      this.setState({
        loggedin: false,
        error: error
      });
      console.log(error);
    }
  }
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
