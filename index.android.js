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
let About = require('./App/Views/about');
let Dashboard = require('./App/Views/dashboard');
let SMSManagement = require('./App/Views/SMS');
let SMSSend = require('./App/Views/SMS/send');
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

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: Configs.routes.DASHBOARD, index: 0}}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={this._renderScene} />
    );
  },

  _renderScene(route, navigator) {
    _navigator = navigator;
    switch(route.name) {
      // index: 0
      case Configs.routes.DASHBOARD:
        return (
          <Dashboard navigator={navigator} name={route.name}/>
        );
      // index: 1
      case Configs.routes.SMS:
        return (
          <SMSManagement navigator={navigator} name={route.name}/>
        );
      case Configs.routes.SMS_SEND:
        return (
          <SMSSend navigator={navigator} name={route.name}/>
        );
      // index: 2
      case Configs.routes.QUOTA:
        return (
          <QuotaManagement navigator={navigator} name={route.name}/>
       );
      // index: 3
      case Configs.routes.ESHOP:
        return (
          <EShop navigator={navigator} name={route.name}/>
        );
      // index: 4
      case Configs.routes.ABOUT:
        return (
          <About navigator={navigator} name={route.name}/>
        );
    }
  },
});

let styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  }
});

AppRegistry.registerComponent('CardManager', () => CardManager);

module.exports = CardManager;
