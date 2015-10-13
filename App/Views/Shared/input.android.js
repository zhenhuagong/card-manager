/**
 *
 * input.android.js

 * Description:       Input Component.
 * Version:           0.0.1
 * Author:            Gong Zhenhua
 * Author URI:        http://allmyverse.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

'use strict';

import React, { StyleSheet, Text, TextInput } from 'react-native';

let Input = React.createClass({
  propTypes: {
    defaultValue: React.PropTypes.string.isRequired,
    onBlur: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return { onfocus: false };
  },

  render() {
    let value;

    if (this.state.onfocus || this.state.value) {
      // non default value cases
      value = this.state.value ? this.state.value : '';
    }
    return <TextInput
      style={[styles.input, this.props.style]}
      autoCapitalize="none"
      placeholder={this.props.defaultValue}
      autoCorrect={false}
      onChange={this._handleChange}
      onBlur={this._handleBlur}
      onFocus={this._onFocus}
      value={value} />;
  },

  _handleChange(e) {
    this.setState({ value: e.nativeEvent.text });
  },

  _handleBlur(e) {
    if (this.state.onfocus && !this.state.value) {
      // user clicked but no input, stay the same as before
      this.props.onBlur(this.props.defaultValue, this.props.extraId);
    } else {
      this.props.onBlur(this.state.value, this.props.extraId);
    }
    this.setState({ onfocus: false });
  },

  _onFocus(e) {
    this.setState({ onfocus: true });
  },

  _setFocus() {
    React.findDOMNode(this.refs.input).focus();
  }
});

let styles = StyleSheet.create({
  input: {
    borderRadius: 5,
    borderWidth: 1,
    color: '#c7c7c7',
    padding: '0 5px',
    margin: 5,
    flex: 1,
    height: 44,
    justifyContent: 'left'
  }
});

module.exports = Input;
