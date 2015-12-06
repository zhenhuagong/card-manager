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
  Navigator
} = React;

let Configs = require('./App/configs');
// let About = require('./App/Views/about');
let Dashboard = require('./App/Views/dashboard');
// let SMSManagement = require('./App/Views/SMS');
// let SMSSend = require('./App/Views/SMS/send');
// let QuotaManagement = require('./App/Views/Quota');
// let EShop = require('./App/Views/EShop');

let _navigator;

let CardManager = React.createClass({

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: Configs.routes.DASHBOARD}}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={this._renderScene} />
    );
  },

  _renderScene(route, navigator) {
    _navigator = navigator;
    switch(route.name) {
      case Configs.routes.DASHBOARD:
        return (
          <Dashboard navigator={navigator} name={route.name}/>
        );
      // case Configs.routes.SMS:
      //   return (
      //     <SMSManagement navigator={navigator} name={route.name}/>
      //   );
      // case Configs.routes.SMS_SEND:
      //   return (
      //     <SMSSend navigator={navigator} name={route.name}/>
      //   );
      // case Configs.routes.QUOTA:
      //   return (
      //     <QuotaManagement navigator={navigator} name={route.name}/>
      //  );
      // case Configs.routes.ESHOP:
      //   return (
      //     <EShop navigator={navigator} name={route.name}/>
      //   );
      // case Configs.routes.ABOUT:
      //   return (
      //     <About navigator={navigator} name={route.name}/>
      //   );
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
