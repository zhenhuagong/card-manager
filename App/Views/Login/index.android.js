/**
 *
 * index.js

 * Description:       This file defines component of login for android platform.
 * Version:           0.0.1
 * Author:            Gong Zhenhua
 * Author URI:        http://allmyverse.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

'use strict';

let React = require('react-native');
let { StyleSheet, Text, View } = React;

let BackDrop = require('../Shared/backdrop');
let Input = require('../Shared/input');
let Button = require('../Shared/button');
let Request = require('../../Networks/request');
let Configs = require('../../configs');

let RowSection = require('../Shared/rowSection');
let rowSectionStyle = {height: 50, alignItems: 'center'};
let Login = React.createClass({
  getInitialState() {
    return {
      username: '',
      pwd: ''
    };
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>欢迎登陆</Text>
        <RowSection style={rowSectionStyle}>
          <Text style={styles.inputLabel}>用户名：</Text>
          <Input style={styles.inputStyle} onBlur={this._setUsername}/>
        </RowSection>
        <RowSection style={rowSectionStyle}>
          <Text style={styles.inputLabel}>密码：</Text>
          <Input style={styles.inputStyle} onBlur={this._setPassword}/>
        </RowSection>
        <RowSection style={rowSectionStyle} style={{marginTop: 30}}>
          <Button onPress={this._login}>
            <Text>登陆</Text>
          </Button>
          <View style={styles.forgetPwd}>
            <Text>忘记密码?</Text>
          </View>
        </RowSection>
        <RowSection style={rowSectionStyle}>
          <View style={styles.registerView}>
            <Text style={styles.registerText}>免费注册>></Text>
          </View>
        </RowSection>
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
      Request.post(Configs.api.loginUrl, {
        username: this.state.username,
        password: this.state.pwd
      }).then((result) => {

      }).catch((err) => {

      })
    } else {
      // popup an error message
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height: 180
  },
  inputStyle: {
    width: 180,
    height: 40,
    fontSize: 18
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    height: 40
  },
  inputLabel: {
    width: 60,
    textAlign: 'right',
  },
  forgetPwd: {
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  registerView: {
    borderBottomColor: 'orange',
    borderBottomWidth: 1
  },
  registerText: {
    color: 'orange'
  }
});

module.exports = Login;
