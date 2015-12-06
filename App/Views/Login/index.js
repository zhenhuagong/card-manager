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
let {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Image,
  TextInput,
  ProgressBarAndroid,
  ActivityIndicatorIOS,
  Platform
} = React;

let BackDrop = require('../Shared/backdrop');
let Button = require('../Shared/button');
let Request = require('../../Networks/request');
let Configs = require('../../configs');
let MD5 = require('crypto-js/md5');
let Moment = require('moment');

let RowSection = require('../Shared/rowSection');
let rowSectionStyle = {height: 50, alignItems: 'center'};
let FlashData = require('../../Networks/flashData');

let Login = React.createClass({
  getInitialState() {
    return {
      username: '',
      pwd: '',
      showSpinner: false,
      editable: true
    };
  },

  componentWillUpdate(nextProps, nextState) {
    nextState.showSpinner = !nextState.editable;
  },

  render() {
    let spinnerNode, errorNode;
    if (this.state.showSpinner) {
      spinnerNode = Platform.OS === 'ios' ? (
        <View style={{flexDirection: 'row'}}>
          <ActivityIndicatorIOS color='#00aa00' />
          <Text style={{marginLeft: 20}}>登陆中...</Text>
        </View>
        ) : (
        <View style={{flexDirection: 'row'}}>
          <ProgressBarAndroid styleAttr='Small'/>
          <Text style={{marginLeft: 20}}>登陆中...</Text>
        </View>
      );
    }
    if (this.state.error) {
      errorNode = (
        <Text style={[styles.inputStyle, styles.errorStyle]}>
          {this.state.error}
        </Text>
      );
    }

    return (
      <View style={styles.container}>
        <View style={{marginBottom: 50}}>
          <Image
            source={require('../../images/ic_logo.png')}
            style={{width: 92, height: 92}} />
        </View>
        <RowSection style={rowSectionStyle}>
          <TextInput style={styles.inputStyle} value={this.state.username}
            autoCapitalize='none' autoCorrect={false}
            placeholder='用户名/ID/邮箱'
            editable={this.state.editable}
            onChangeText={(name) => this._setUsername(name)}/>
        </RowSection>
        <RowSection style={rowSectionStyle}>
          <TextInput style={styles.inputStyle} password={true}
            placeholder='密码'
            value={this.state.pwd} editable={this.state.editable}
            onChangeText={(pwd) => this._setPassword(pwd)}/>
        </RowSection>
        <RowSection style={rowSectionStyle}>
          {errorNode}
          {spinnerNode}
        </RowSection>
        <RowSection style={rowSectionStyle}>
          <Button onPress={this._login}>
            <Text style={{color: '#ffffff'}}>登陆</Text>
          </Button>
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
      this.setState({
        error: '',
        editable: false
      });
      let fkey = MD5(this.state.username + Moment().format('YYYYMMDD') + ',fh,');
      console.log('login with combo: ' + JSON.stringify(this.state));
      Request.get(
        Configs.endpoints.login,
        {
          USERNAME: this.state.username,
          PASSWORD: this.state.pwd,
          FKEY: fkey.toString()   // must call `toString` here
        }
      )
      .then((data) => {
        console.log(data);
        console.log('got login data' + JSON.stringify(data));
        switch(data.result) {
          case '00':
            this._setUserLogin(JSON.stringify(data.pd)).done();
            this.props.navigator.replace({
              name: Configs.routes.DASHBOARD
            });
            break;
          case '01':
            this.setState({
              error: '用户名或者密码错',
              editable: true
            });
            break;
          case '02':
            this.setState({
              error: '用户名密码校验成功，读取用户信息失败',
              editable: true
            });
            break;
          case '03':
            this.setState({
              error: '该用户未注册',
              editable: true
            });
            break;
          case '04':
            this.setState({
              error: '用户名和密码不能为空',
              editable: true
            });
            break;
          case '05':
            this.setState({
              error: '登陆请求校验码不匹配',
              editable: true
            });
            break;
          default:
            this.setState({
              error: '服务器异常，暂时无法登陆，请稍后再试',
              editable: true
            });
            break;
        }
      })
      .catch((error) => {
        console.log('got error when login ' + error);
        this.setState({
          error: error.toString(),
          editable: true
        });
      });
    } else {
      this.setState({
        error: '用户名和密码不能为空',
        editable: true
      });
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
    color: 'red',
    fontSize: 14
  }
});

module.exports = Login;
