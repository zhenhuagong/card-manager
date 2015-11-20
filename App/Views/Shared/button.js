/**
 *
 * button.js

 * Description:       Button Component.
 * Version:           0.0.1
 * Author:            Gong Zhenhua
 * Author URI:        http://allmyverse.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

'use strict';

let React = require('react-native');
let { StyleSheet, Text, TouchableHighlight, View } = React;
let Configs = require('../../configs');

let Button = React.createClass({
  propTypes: {
    onPress: React.PropTypes.func,
  },

  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={[styles.button, this.props.style]}
        underlayColor={Configs.colors.buttonUnderlay}>
          <View style={styles.content}>{this.props.children}</View>
      </TouchableHighlight>
    );
  }
});

let styles = StyleSheet.create({
  button: {
    borderColor: '#E0F2F1',
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
    height: 44,
    width: 160,
    fontSize: 18,
    backgroundColor: '#00796B',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content : {
    flexDirection: 'row'
  }
});

module.exports = Button;
