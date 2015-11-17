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
let { StyleSheet, Text, View, AsyncStorage, Image } = React;

let BackDrop = require('../Shared/backdrop');
let Input = require('../Shared/input');
let Button = require('../Shared/button');
let Request = require('../../Networks/request');
let Configs = require('../../configs');
let MD5 = require('crypto-js/md5');
let Moment = require('moment');

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
        <View style={{marginBottom: 50}}>
          <Image
            source={require('../../images/ic_logo.png')}
            style={{width: 92, height: 92}} />
        </View>
        <RowSection style={rowSectionStyle}>
          <Text style={styles.inputLabel}>用户名：</Text>
          <Input style={styles.inputStyle}
            onChange={(name) => this._setUsername(name)}/>
        </RowSection>
        <RowSection style={rowSectionStyle}>
          <Text style={styles.inputLabel}>密码：</Text>
          <Input style={styles.inputStyle}
            onChange={(pwd) => this._setPassword(pwd)}/>
        </RowSection>
        <RowSection style={rowSectionStyle}>
          <Text style={styles.inputLabel}></Text>
          <Text style={[styles.inputStyle, styles.errorStyle]}>
            {this.state.error}
          </Text>
        </RowSection>
        <RowSection style={rowSectionStyle}>
          <Button onPress={this._login}>
            登陆
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

  _setUsername(username) {
    this.setState({ username });
  },

  _setPassword(pwd) {
    this.setState({ pwd });
  },

  _login() {
    if (this._validateInput()) {
      this.setState({ error: '' });
      let fkey = MD5(this.state.username + Moment().format('YYYYMMDD') + ',fh,');
      Request.get(
        Configs.endpoints.login,
        {
          USERNAME: this.state.username,
          PASSWORD: this.state.pwd,
          FKEY: fkey.toString()   // must call `toString` here
        },
        {
          onSuccess: (data) => {
            console.log('got login data' + JSON.stringify(data));
            this._setUserLogin(JSON.stringify(data.pd));
            this.props.navigator.push({
              name: Configs.routes.DASHBOARD
            });
          },
          onFail: (error) => {
            console.log('got error when login ' + error);
            this.setState({ error });
          }
        }
      );
    } else {
      this.setState({error: '用户名和密码不能为空'})
    }
  },

  _validateInput() {
    if (!this.state.username || !this.state.pwd) {
      return false;
    } else {
      return true;
    }
  },

  async _setUserLogin(info) {
    try {
      await AsyncStorage.setItem(Configs.storageKeys.logged, info);
    } catch (error) {
      console.log(error);
    }
  },
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
  },
  errorStyle: {
    color: 'red'
  }
});

module.exports = Login;
