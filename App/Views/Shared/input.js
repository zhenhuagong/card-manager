/**
 *
 * input.js

 * Description:       Input Component.
 * Version:           0.0.1
 * Author:            Gong Zhenhua
 * Author URI:        http://allmyverse.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

'use strict';

let React = require('react-native');
let { StyleSheet, TextInput } = React;

let Input = React.createClass({

  getInitialState() {
    return { value: '' };
  },

  render() {
    return <TextInput
      style={[styles.input, this.props.style]}
      autoCapitalize="none"
      placeholder={this.props.defaultValue}
      autoCorrect={false}
      onChange={(event) => this._handleChange(event.nativeEvent.text)}
      onBlur={this._handleBlur} />;
  },

  _handleChange(value) {
    this.props.onChange && this.props.onChange(value);
    this.setState({ value });
  },

  _handleBlur() {
    this.props.onBlur && this.props.onBlur(this.state.value);
  },

  _setFocus() {
    React.findDOMNode(this.refs.input).focus();
  }
});

let styles = StyleSheet.create({
  input: {
    color: 'black',
    height: 20
  }
});

module.exports = Input;
