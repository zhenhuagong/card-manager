/**
 *
 * send.android.js

 * Description:       Send SMS.
 * Version:           0.0.1
 * Author:            Gong Zhenhua
 * Author URI:        http://allmyverse.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

'use strict';

let React = require('react-native');
let { StyleSheet, Text, View } = React;

let Input = require('../Shared/input');
let Button = require('../Shared/button');
let Request = require('../../Networks/request');
let Configs = require('../../configs');
let { Icon } = require('react-native-icons');

let FormBlock = React.createClass({
  render() {
    let formElementStyle = {
      flexDirection: 'column',   // column direction by default
      alignItems: 'center',
      marginTop: 20
    };
    return (
      <View style={[formElementStyle, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
});

let SendSMS = React.createClass({
  getInitialState() {
    return {
      phoneNumbers: '',
      content: ''
    };
  },

  render() {
    return (
      <View style={styles.container}>
        <FormBlock>
          <Text style={styles.inputLabel}>发送号码：</Text>
          <Input style={styles.inputStyle} onBlur={this._setPhoneNumbers}/>
        </FormBlock>
        <FormBlock>
          <Text style={styles.inputLabel}>发送内容：</Text>
          <Input style={styles.inputStyle} onBlur={this._setContent}/>
          <Text style={styles.registerText}>（通配符: 姓名:%name% , 尊称:%title%）</Text>
        </FormBlock>
        <FormBlock style={{marginTop: 30}}>
          <Button onPress={this._send}>
            <Text style={{color: '#ffffff'}}>发送</Text>
            <Icon
              name='material|mail-send'
              size={22}
              color='#ffffff'
              style={styles.sendIcon} />
          </Button>
        </FormBlock>
      </View>
      )
  },

  _setPhoneNumbers(phoneNumbers) {
    this.setState({ phoneNumbers});
  },

  _setContent(content) {
    this.setState({ content });
  },

  _send() {
    if (this._validateInput()) {
      // Send a post request to login api
      Request.post(Configs.api.sendSMS, {
        phoneNumbers: this.state.phoneNumbers,
        content: this.state.content
      }, {
        onSuccess: (data) => {
        },
        onFail: (error) => {
        }
      }).then((result) => {

      }).catch((err) => {

      })
    } else {
      // popup an error message
    }
  },

  _validateInput() {
    if (!this.state.phoneNumbers || !this.state.content) {
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
    width: 180,
    textAlign: 'left'
  },
  registerText: {
    color: 'orange'
  },
  sendIcon: {
    width: 24,
    height: 24,
    marginLeft: 6,
    marginRight: 6
  }
});

module.exports = SendSMS;
