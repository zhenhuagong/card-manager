/**
 *
 * dashboard.

 * Description:       This file defines the dashboard component.
 * Version:           0.0.1
 * Author:            Gong Zhenhua
 * Author URI:        http://allmyverse.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

'use strict';

let React = require('react-native');
let {
  AsyncStorage,
  Platform,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid,
  TouchableHighlight,
  ToolbarAndroid
} = React;

let RowSection = require('./Shared/rowSection');
let rowSectionStyle = {height: 50};

let Login = require('./Login');
let DrawerList = require('./drawerList');
let Button = require('./Shared/button');
let Configs = require('../configs');
let DRAWER_WIDTH_LEFT = 96;
let BottomMenuBar = require('./Shared/bottomMenuBar');

let Reflux = require('reflux');
let Store = require('../stores/dashboard');
let { Icon } = require('react-native-icons');
let FlashData = require('../Networks/flashData');

let Dashboard = React.createClass({

  mixins: Reflux.connect([Store]),

  getInitialState() {
    return {
      loaded: false,
      loggedin: false
    };
  },

  // check login state
  componentWillMount() {
    this._checkLoginState().done();
  },

  componentWillUpdate(nextState, nextProps) {
    console.log('dashboard update');
  },

  render() {
    console.log('loggedin? ' + this.state.loggedin);
    if (!this.state.loggedin) { // not logged in yet, show login form
      return (
        <View style={styles.container}>
          <Login navigator={this.props.navigator}/>
        </View>
      );
    } else {  // already logged in, show dashboard
      let content = (
        <View style={styles.content}>
          <Text style={styles.welcome}>
            欢迎登陆，{this.state.user.USERNAME}
          </Text>
          <View style={styles.button}>
            <Button onPress={this._login}>
              <Text style={{color: '#ffffff'}}>卡详情查询</Text>
            </Button>
          </View>
        </View>
      );

      return (
        <DrawerLayoutAndroid
          ref={(drawer) => { this.drawer = drawer; }}
          drawerWidth={Dimensions.get('window').width - DRAWER_WIDTH_LEFT}
          keyboardDismissMode="on-drag"
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={this._renderNavigationView}>
          <View style={styles.container}>
            <ToolbarAndroid
              title={Configs.literals.title}
              titleColor="white"
              navIcon={require('../images/ic_drawer.png')}
              style={styles.toolbar}
              onIconClicked={() => this.drawer.openDrawer()}
              onActionSelected={this.onActionSelected} />
            {content}
          </View>
          <BottomMenuBar style={{height: 56}} current={Configs.routes.DASHBOARD}
            navigator={this.props.navigator}/>
        </DrawerLayoutAndroid>
      );
    }
  },

  _renderNavigationView() {
    return(
      <DrawerList navigator={this.props.navigator} name={this.props.name}/>
    );
  },

  async _checkLoginState() {
    try {
      let value = await AsyncStorage.getItem(Configs.storageKeys.logged);
      if (value !== null){
        let user = JSON.parse(value);
        this.setState({
          user: user,
          loggedin: true
        });
        FlashData.set('userid', user.USER_ID);
      } else {
        this.setState({
          loggedin: false,
          error: ''
        });
      }
    } catch (error) {
      this.setState({
        loggedin: false,
        error: error
      });
      console.log(error);
    }
  }
});

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  toolbar: {
    backgroundColor: Configs.colors.greenLight,
    height: 56,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Configs.colors.whiteContent
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

module.exports = Dashboard;
