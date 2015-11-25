/**
 *
 * about.

 * Description:       About.
 * Version:           0.0.1
 * Author:            Gong Zhenhua
 * Author URI:        http://allmyverse.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */


let React = require('react-native');
let {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

let Configs = require('../configs');
let NavToolbar = require('./Shared/navToolBar');

let About = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <NavToolbar style={styles.navBar} title="关于" navigator={this.props.navigator}/>
        <View style={styles.content}>
          <Text style={styles.welcome}>
            欢迎使用{Configs.literals.title}!
          </Text>
          <Text style={styles.instructions}>
            版本号 v0.0.1
          </Text>
          <Text style={styles.instructions}>
            @2015 All Rights Reserved.
          </Text>
        </View>
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

module.exports = About;
