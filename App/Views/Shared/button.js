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
let { StyleSheet, Text, TouchableHighlight } = React;

let Button = React.createClass({
  propTypes: {
    onPress: React.PropTypes.func,
  },

  getInitialState() {
    return {
      active: false,
    };
  },

  _onHighlight() {
    this.setState({ active: true });
  },

  _onUnhighlight() {
    this.setState({ active: false });
  },

  render() {
    let colorStyle = {
      color: this.state.active ? '#grey' : '#000',
    };
    return (
      <TouchableHighlight
        onHideUnderlay={this._onUnhighlight}
        onPress={this.props.onPress}
        onShowUnderlay={this._onHighlight}
        style={[styles.button, this.props.style]}
        underlayColor="grey">
          <Text style={[styles.buttonText, colorStyle, this.props.style]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
});

let styles = StyleSheet.create({
  button: {
    borderColor: '#696969',
    borderRadius: 2,
    borderWidth: 1,
    margin: 10,
    height: 44,
    width: 160,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

module.exports = Button;