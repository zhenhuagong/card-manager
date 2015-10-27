'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

let Button = require('../Shared/button');
let Configs = require('../../configs');
let SMS = React.createClass({
  _sendSMS() {
    this.props.navigator.push({
      name: Configs.routes.SMS_SEND
    });
  },

  _listSMS() {
    this.props.navigator.push({
      name: Configs.routes.SMS_LIST
    });
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Button onPress={this._sendSMS}>
            <Text>发送短信</Text>
          </Button>
        </View>
        <View style={styles.button}>
          <Button onPress={this._listSMS}>
            <Text>已发短信</Text>
          </Button>
        </View>
      </View>
    );
  }
});

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    marginTop: 20
  }
});

module.exports= SMS;