'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

let Configs = require('../../configs');
let NavToolbar = require('../Shared/navToolBar');
let BottomMenuBar = require('../Shared/bottomMenuBar');

let Quota = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <NavToolbar style={styles.navBar} title="流量管理" navigator={this.props.navigator}/>
        <View style={styles.content}>
          <Text style={styles.welcome}>
            敬请期待！
          </Text>
        </View>
        <BottomMenuBar style={styles.tabBar} current={Configs.routes.QUOTA}
          navigator={this.props.navigator}/>
      </View>
    );
  }
});

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Configs.colors.whiteContent
  },
  navBar: {
    height: 56
  },
  tabBar: {
    height: 56
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

module.exports= Quota;
