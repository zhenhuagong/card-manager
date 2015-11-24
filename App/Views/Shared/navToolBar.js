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

let Configs = require('../../configs');
let NavToolbar = React.createClass({

  propTypes: {
    title: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <ToolbarAndroid
        style={[styles.toolbar, this.props.style]}
        navIcon={{uri: "ic_arrow_back_white_24dp", isStatic: true}}
        onIconClicked={this.props.navigator.pop}
        titleColor="#fff"
        title={this.props.title} />
    )
  }
});

let styles = StyleSheet.create({
  toolbar: {
    backgroundColor: Configs.colors.greenLight
  }
});

module.exports = NavToolbar;

