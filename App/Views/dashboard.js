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
  ToolbarAndroid
} = React;

let DrawerList = require('./drawerList');
let DRAWER_WIDTH_LEFT = 96;
let Dashboard = React.createClass({
  render() {
    let content = (
    <View style={styles.container}>
      <View style={styles.bottomMenu}>
      </View>
    </View>);
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
            logo={require('image!ic_launcher')}
            style={styles.toolbar}
            onIconClicked={() => this.drawer.openDrawer()}
            onActionSelected={this.onActionSelected} />
          {content}
        </View>
      </DrawerLayoutAndroid>
    );
  },

  _renderNavigationView(){
    return(
      <DrawerList navigator={this.props.navigator} name={this.props.name}/>
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
    backgroundColor: '#16A085',
    height: 56,
  }
});

module.exports = Dashboard;
