/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

let React = require('react-native');

let {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  BackAndroid
} = React;

let Configs = require('./App/configs');
let Login = require('./App/Views/Login');
let About = require('./App/Views/about');
let Dashboard = require('./App/Views/dashboard');
let SMSManagement = require('./App/Views/SMS');
let SMSSend = require('./App/Views/SMS/send');
let SMSList = require('./App/Views/SMS/list');
let QuotaManagement = require('./App/Views/Quota');
let EShop = require('./App/Views/EShop');
let NavToolbar = require('./App/Views/Shared/navToolBar');
let BottomMenuBar = require('./App/Views/Shared/bottomMenuBar');

let _navigator;

BackAndroid.addEventListener('hardwareBackPress', function() {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  // TODO: add toast when _navigator.getCurrentRoutes().length === 1
  // which means user will exit the app
  return false;
});

let CardManager = React.createClass({
  getInitialState() {
    // check login state
    return {
      loginExpired: false
    };
  },

  render() {
    console.log('enterance of app for android platform');
    if (this.state.loginExpired) {
      <View style={styles.loginContainer}>
        <Login />
      </View>
    } else {
      return (
        <Navigator
          style={styles.container}
          initialRoute={{name: Configs.routes.DASHBOARD, index: 0}}
          configureScene={() => Navigator.SceneConfigs.FadeAndroid}
          renderScene={this._renderScene} />
      );
    }
  },

  _renderScene(route, navigator) {
    _navigator = navigator;
    switch(route.name) {
      // index: 0
      case Configs.routes.DASHBOARD:
        return (
          <View style={styles.container}>
            <Dashboard navigator={navigator} name={route.name}/>
            <BottomMenuBar current={Configs.routes.DASHBOARD} navigator={navigator} name={route.name}/>
          </View>
        );
      // index: 1
      case Configs.routes.SMS:
        return (
          <View style={styles.container}>
            <NavToolbar navIcon={true} navigator={navigator}/>
            <SMSManagement navigator={navigator} name={route.name}/>
            <BottomMenuBar current={Configs.routes.SMS} navigator={navigator} name={route.name}/>
          </View>
        );
      case Configs.routes.SMS_SEND:
        return (
          <View style={styles.container}>
            <NavToolbar navIcon={true} navigator={navigator}/>
            <SMSSend navigator={navigator} name={route.name}/>
            <BottomMenuBar current={Configs.routes.SMS} navigator={navigator} name={route.name}/>
          </View>
        );
      case Configs.routes.SMS_LIST:
        return (
          <View style={styles.container}>
            <NavToolbar navIcon={true} navigator={navigator}/>
            <SMSList navigator={navigator} name={route.name}/>
            <BottomMenuBar current={Configs.routes.SMS} navigator={navigator} name={route.name}/>
          </View>
        );
      // index: 2
      case Configs.routes.QUOTA:
        return (
          <View style={styles.container}>
            <NavToolbar navIcon={true} navigator={navigator}/>
            <QuotaManagement navigator={navigator} name={route.name}/>
            <BottomMenuBar current={Configs.routes.QUOTA} navigator={navigator} name={route.name}/>
          </View>
        );
      // index: 3
      case Configs.routes.ESHOP:
        return (
          <View style={styles.container}>
            <NavToolbar navIcon={true} navigator={navigator}/>
            <EShop navigator={navigator} name={route.name}/>
            <BottomMenuBar current={Configs.routes.ESHOP} navigator={navigator} name={route.name}/>
          </View>
        );
      // index: 4
      case Configs.routes.LOGIN:
        return (
          <View style={styles.container}>
            <NavToolbar navIcon={true} navigator={navigator}/>
            <Login navigator={navigator} name={route.name}/>
          </View>
        );
      // index: 5
      case Configs.routes.ABOUT:
        return (
          <View style={styles.container}>
            <NavToolbar navIcon={true} navigator={navigator}/>
            <About navigator={navigator} name={route.name}/>
          </View>
        );
    }
  },
});

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('CardManager', () => CardManager);

module.exports = CardManager;
