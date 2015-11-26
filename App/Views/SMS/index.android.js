'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
  SwitchAndroid,
  ProgressBarAndroid,
  TouchableHighlight
} = React;

let NavToolbar = require('../Shared/navToolBar');
let BottomMenuBar = require('../Shared/bottomMenuBar');
let Button = require('../Shared/button');
let Configs = require('../../configs');
let ItemList = require('../Shared/itemList');
let FlashData = require('../../Networks/flashData');
let Request = require('../../Networks/request');
let Moment = require('moment');
let { Icon } = require('react-native-icons');

let SMS = React.createClass({

  listHeader: {
    CONTENT: '短信内容',
    MSISDN: '卡号'
  },

  getInitialState() {
    return {
      showSendList: true,  // show sent messages by default
      rcvList: [],  // receive list
      sendList: [],  // send list
      error: '',
      dataLoaded: false,
      queryDateStart: '',   // default time span for query is the current month
      queryDateEnd: Moment().format('YYYYMMDD')
    }
  },

  componentDidMount() {
    // fetch list after mounted
    let cachedList = FlashData.get('smslist');
    if (cachedList) {
      this._divideList(cachedList);
    } else {
      this._fetchList();
    }
  },

  render() {
    // show progress bar if data is not loaded yet
    let contentNode = <ProgressBarAndroid styleAttr="Large" />;
    let sendText, rcvText;
    if (this.state.dataLoaded) {
      if (this.state.showSendList) {
        sendText = Configs.colors.activeText;
        rcvText = Configs.colors.inactiveText;
        contentNode = <ItemList header={this.listHeader} list={this.state.sendList} />;
      } else {
        rcvText = Configs.colors.activeText;
        sendText = Configs.colors.inactiveText;
        contentNode = <ItemList header={this.listHeader} list={this.state.rcvList} />;
      }
    }

    return (
      <View style={styles.container}>
        <NavToolbar style={styles.navBar} title="短信列表" navigator={this.props.navigator}/>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.filter}>
              <Text style={{color: rcvText}}>已接收</Text>
              <SwitchAndroid
                onValueChange={(value) => this.setState({showSendList: value})}
                value={this.state.showSendList} />
              <Text style={{color: sendText}}>已发送</Text>
              <TouchableHighlight onPress={this._fetchList}
                underlayColor={Configs.colors.greenLight}>
                <View style={styles.refresh}>
                  <Icon
                    name='material|refresh'
                    size={22}
                    style={styles.sendIcon} />
                  <Text style={{color: '#000000'}}>刷新</Text>
                </View>
              </TouchableHighlight>
            </View>
            <TouchableHighlight onPress={this._sendSMS}
              underlayColor={Configs.colors.greenLight}>
              <View style={styles.filter}>
                <Icon
                  name='material|border-color'
                  size={22}
                  style={styles.sendIcon} />
                  <Text style={{color: '#000000'}}>新建</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.content}>
            {contentNode}
          </View>
        </View>
        <BottomMenuBar style={styles.tabBar} current={Configs.routes.SMS}
          navigator={this.props.navigator}/>
      </View>
    );
  },

  _sendSMS() {
    this.props.navigator.push({
      name: Configs.routes.SMS_SEND
    });
  },

  // shrink a message, only reserve property of content and msisdn
  _messageShrink(message) {
    Object.keys(message).forEach((key) => {
      if (key !== 'CONTENT' && key !== 'MSISDN') {
        delete message[key];
      }
    });
    return message;
  },

  // divide sms list by type: 发送，接收
  _divideList(list) {
    let rcvList = [];
    let sendList = [];
    let dataLoaded = true;
    list.map((item) => {
      if (item.TYPE === '发送') {
        sendList.push(this._messageShrink(item));
      } else {
        rcvList.push(this._messageShrink(item));
      }
    });
    this.setState({ rcvList, sendList, dataLoaded });
  },

  _fetchList() {
    Request.fetchAll(Configs.endpoints.listSMS, {
      // TODO: query parameters
      USERID: FlashData.get('userid'),
      PAGE_NUM: 1,
      PAGE_SIZE: 20,
      DATE_S: this.state.queryDateStart,
      DATA_E: this.state.queryDateEnd
    }, [])
    .then((list) => {
      FlashData.set('smslist', list);
      this._divideList(list);
    })
    .catch((err) => {
      let dataLoaded = true;
      this.setState({ err, dataLoaded });
    })
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
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  header: {
    flexDirection: 'row',
    marginTop: 20,
    height: 60
  },
  filter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  refresh: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  tabBar: {
    height: 56
  },
  sendIcon: {
    width: 24,
    height: 24,
    marginLeft: 6,
    marginRight: 6
  }
});

module.exports= SMS;
