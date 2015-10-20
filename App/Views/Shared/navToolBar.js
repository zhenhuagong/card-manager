/**
 *
 * navToolBar.

 * Description:       Navigation in toolbar.
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
  ToolbarAndroid
} = React;

let NavToolbar = React.createClass({

  render() {
    if (this.props.navIcon) {
      return (
        <ToolbarAndroid
          style={styles.toolbar}
          logo={require('image!ic_launcher')}
          navIcon={{uri: "ic_arrow_back_white_24dp", isStatic: true}}
          onIconClicked={this.props.navigator.pop}
          titleColor="#fff"
          title='CardManager' />
      )
    }
    return (
      <ToolbarAndroid
        style={styles.toolbar}
        logo={require('image!ic_launcher')}
        onIconClicked={this.props.navigator.pop}
        titleColor="#fff"
        title='CardManager' />
    )
  }
});

let styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#16A085',
    height: 56
  }
});

module.exports = NavToolbar;

