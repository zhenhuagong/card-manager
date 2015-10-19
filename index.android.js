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

let _navigator;
BackAndroid.addEventListener('hardwareBackPress', function() {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

let Configs = require('./App/configs');
let Login = require('./App/Views/Login');
let Dashboard = require('./App/Views/dashboard');

let CardManager = React.createClass({
  getInitialState() {
    // check login state
    return {
      loginExpired: false
    };
  },

  render() {
    if (this.state.loginExpired) {
      <View style={styles.loginContainer}>
        <Login />
      </View>
    } else {
      let initialRoute = {name: Configs.routes.DASHBOARD};
      return (
        <Navigator
          style={styles.container}
          initialRoute={initialRoute}
          configureScene={() => Navigator.SceneConfigs.FadeAndroid}
          renderScene={this.RouteMapper} />

      );
    }
  },

  RouteMapper(route, navigationOperations, onComponentRef) {
    _navigator = navigationOperations;
    switch(route.name) {
      case Configs.routes.DASHBOARD:
        return (
          <View style={styles.container}>
            <Dashboard navigator={navigationOperations}/>
          </View>
        );
      default:
        // Redirect to error page
        break;
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
