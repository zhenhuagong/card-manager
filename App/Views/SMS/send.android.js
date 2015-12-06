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
let { StyleSheet, Text, View, TextInput, ToastAndroid, ProgressBarAndroid } = React;

let Button = require('../Shared/button');
let Request = require('../../Networks/request');
let Configs = require('../../configs');
let { Icon } = require('react-native-icons');
let FlashData = require('../../Networks/flashData');
let NavToolbar = require('../Shared/navToolBar');

let SendSMS = React.createClass({
  getInitialState() {
    return {
      number: '',
      text: '',
      delivered: 'no',
      error: '',
      editable: true
    };
  },

  componentWillUpdate(nextProps, nextState) {
    nextState.editable = nextState.delivered === 'pending' ? false : true;
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

    let deliverNode, errorNode;
    switch(this.state.delivered) {
      case 'pending':
        deliverNode = (
          <View style={{flexDirection: 'row'}}>
            <ProgressBarAndroid styleAttr='Small'/>
            <Text style={{marginLeft: 20}}>正在发送...</Text>
          </View>
        );
        break;
      case 'yes':
        deliverNode = (
          <View style={{flexDirection: 'row'}}>
            <Icon
              name='material|check'
              size={24}
              style={styles.sendIcon} />
            <Text style={{marginLeft: 20}}>已发送</Text>
          </View>
        );
        break;
      default:
        break;
    }

    if (this.state.error) {
      errorNode = ( <Text style={styles.error}> {this.state.error} </Text> );
    }

    return (
      <View style={styles.container}>
        <NavToolbar style={styles.navBar} title="发送短信" navigator={this.props.navigator}/>
        <View style={styles.content}>
          <View style={styles.formItem}>
            <TextInput style={styles.input}
              keyboardType='numeric'
              placeholder='卡号'
              editable={this.state.editable}
              value={this.state.number}
              onChangeText={(number) => {
                this.setState({number});
              }}/>
          </View>
          <View style={styles.formItem}>
            <TextInput style={[styles.input, styles.inputArea]} multiline={true}
              autoCapitalize='none' autoCorrect={false}
              editable={this.state.editable}
              placeholder='短信内容' textAlign='start' textAlignVertical='top'
              onChangeText={(text) => {
                this.setState({text});
              }}>
              <Text>{contents}</Text>
            </TextInput>
            <Text style={styles.registerText}>（通配符: 姓名:%name% , 尊称:%title%）</Text>
          </View>
          <View style={styles.formItem}>
            {deliverNode}
            {errorNode}
          </View>
          <View style={{marginTop: 30}}>
            <Button onPress={this._send}>
              <Text style={{color: '#ffffff'}}>发送</Text>
              <Icon
                name='material|mail-send'
                size={22}
                color='#ffffff'
                style={styles.sendIcon} />
            </Button>
          </View>
        </View>
      </View>
      )
  },

  _send() {
    if (this._validateInput()) {
      this.setState({ error: '', delivered: 'pending'});
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
        switch(response.result) {
          case '00':
            this.setState({error: '', delivered: 'yes'});
            ToastAndroid.show('发送成功！', ToastAndroid.SHORT);
            setTimeout(() => {
              this.props.navigator.pop();
            }, 1000);
            break;
          case '01':
            this.setState({ error: '发送短信失败！请稍后再试。', delivered: 'no' });
            break;
          default:
            this.setState({
              error: '服务器异常，暂时无法发送短信，请稍后再试',
              delivered: 'no'
            });
            break;
        }
      })
      .catch((err) => {
        console.log('got error when sending message ' + error);
      });
    } else {
      this.setState({ error: '提示：卡号和短信内容不能为空！', delivered: 'no' });
    }
  },

  _validateInput() {
    if (!this.state.number || !this.state.text) {
      return false;
    } else {
      return true;
    }
  }
});

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Configs.colors.whiteContent
  },
  navBar: {
    height: 56
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 180
  },
  formItem: {
    alignItems: 'center',
    marginTop: 20
  },
  input: {
    width: 180,
    height: 40,
    fontSize: 16,
    padding: 4,
  },
  inputArea: {
    height: 60
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
  },
  error: {
    color: 'red'
  }
});

module.exports = SendSMS;
