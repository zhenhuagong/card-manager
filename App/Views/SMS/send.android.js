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
let { StyleSheet, Text, View, TextInput} = React;

let Button = require('../Shared/button');
let Request = require('../../Networks/request');
let Configs = require('../../configs');
let { Icon } = require('react-native-icons');
let FlashData = require('../../Networks/flashData');

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
      number: '',
      text: ''
    };
  },

  render() {
    //define delimiter
    let delimiter = /\s+/;

    //split string
    let _text = this.state.text;
    let token, index, contents = [];
    while (_text) {
      delimiter.lastIndex = 0;
      token = delimiter.exec(_text);
      if (token === null) {
        break;
      }
      index = token.index;
      if (token[0].length === 0) {
        index = 1;
      }
      contents.push(_text.substr(0, index));
      contents.push(token[0]);
      index = index + token[0].length;
      _text = _text.slice(index);
    }
    contents.push(_text);

    return (
      <View style={styles.container}>
        <FormBlock>
          <Text style={styles.inputLabel}>发送号码：</Text>
          <TextInput style={styles.input}
            keyboardType='numeric'
            autoCapitalize='none'
            placeholder='请输入手机号'
            value={this.state.number}
            onChangeText={(number) => {
              this.setState({number});
            }}/>
        </FormBlock>
        <FormBlock>
          <Text style={styles.inputLabel}>发送内容：</Text>
          <TextInput style={[styles.input, styles.inputArea]} multiline={true}
            autoCapitalize='none' autoCorrect={false}
            placeholder='请输入短信内容' textAlign='start' textAlignVertical='top'
            onChangeText={(text) => {
              this.setState({text});
            }}>
            <Text>{contents}</Text>
          </TextInput>
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

  _send() {
    if (this._validateInput()) {
      // Send a post request to login api
      console.log('send sms with: ' + JSON.stringify(this.state) + ',' + FlashData.get('userid')) ;
      Request.get(
        Configs.endpoints.sendSMS,
        {
          MSISDN: this.state.number,
          CONTENT: this.state.text,
          USERID:  FlashData.get('userid')
        }
      )
      .then((response) => {
        console.log('message sent' + JSON.stringify(response));
      })
      .catch((err) => {
        console.log('got error when sending message ' + error);
      });
    } else {
      // popup an error message
    }
  },

  _validateInput() {
    if (!this.state.number || !this.state.content) {
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
  input: {
    width: 180,
    height: 40,
    fontSize: 16,
    padding: 4,
  },
  inputArea: {
    height: 80,
    marginBottom: 10,
  },
  highlight: {
    color: 'blue',
    fontWeight: 'bold'
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
