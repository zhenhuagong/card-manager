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
  ToolbarAndroid,
  ToastAndroid,
  BackAndroid
} = React;

let DrawerList = require('./drawerList');
let DRAWER_WIDTH_LEFT = 56;
let Dashboard = React.createClass({
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', false);
  },

  render() {
    let content = <View style={styles.container}></View>;
    let title = 'Title';
    return (
      <DrawerLayoutAndroid
        ref={(drawer) => { this.drawer = drawer; }}
        drawerWidth={Dimensions.get('window').width - DRAWER_WIDTH_LEFT}
        keyboardDismissMode="on-drag"
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this._renderNavigationView}>
        <View style={styles.container}>
          <ToolbarAndroid
            title={title}
            titleColor="white"
            navIcon={require('image!ic_drawer')}
            style={styles.toolbar}
            onIconClicked={() => this.drawer.openDrawer()}
            onActionSelected={this.onActionSelected} />
          {content}
        </View>
      </DrawerLayoutAndroid>
    );
  },

  _onSelectDrawerItem(menuId: number){

  },

  _renderNavigationView(){
    return(
      <DrawerList
        onSelectItem={this._onSelectDrawerItem}/>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
  },
  toolbar: {
    backgroundColor: '#000000',
    height: 56,
  }
});

module.exports = Dashboard;
