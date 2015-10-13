/**
 *
 * index.android.js

 * Description:       This file defines component of login for android platform.
 * Version:           0.0.1
 * Author:            Gong Zhenhua
 * Author URI:        http://allmyverse.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

'use strict';

import React, { StyleSheet, Text, View } from 'react-native';

import BackDrop from '../Shared/backdrop.android.js';
import Input from '../Shared/input.android.js';
import Button from '../Shared/button.android.js';

let FormBlock = React.createClass({
  render() {
    let formElementStyle = {
      flexDirection: 'row',   // row direction by default
      backgroundColor: '#f6f7f8',
      borderWidth: 0.5,
      borderColor: '#d6d7da',
      marginBottom: 2,
    };
    return (
      <View style={[formElementStyle, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
});

let Login = React.createClass({
  render() {
    return (
      <View>
        <Text>登陆</Text>
        <FormBlock style={{flexDirection: 'column'}}>
          <Text>用户名：</Text>
          <Input ref='username' style={styles.inputStyle} onBlur={this._setUsername}/>
        </FormBlock>
        <FormBlock style={{flexDirection: 'column'}}>
          <Text>密码：</Text>
          <Input ref='pwd' style={styles.inputStyle} onBlur={this._setPassword}/>
        </FormBlock>
        <FormBlock style={{flexDirection: 'column'}}>
          <Button ref='pwd' style={styles.inputStyle} onPress={this._login}/>
        </FormBlock>
      </View>
      )
  },

  _setUsername(name) {
    this.setState({ username: name});
  },

  _setPassword(pwd) {
    this.setState({ pwd: pwd });
  },

  _login() {
    if (this._validateInput()) {
      // Send a post request to login api
    }
  },

  _validateInput() {
    if (!this.state.username || !this.state.pwd) {
      return false;
    } else {
      return true;
    }
  }
});

let styles = StyleSheet.create({
  inputStyle: {
    width: 180,
    height: 80
  }
});

module.exports = Login;
