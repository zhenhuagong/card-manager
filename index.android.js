/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

let React = require('react-native');

let { AppRegistry, StyleSheet, Text, View, } = React;

let Login = require('./App/Views/Login');

let CardManager = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Login />
      </View>
    );
  }
});

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('CardManager', () => CardManager);
