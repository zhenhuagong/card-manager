/**
 *
 * backdrop.js

 * Description:       An overlay of backdrop.
 * Version:           0.0.1
 * Author:            Gong Zhenhua
 * Author URI:        http://allmyverse.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

'use strict';

let React = require('react-native');

let BackDrop = React.createClass({
  getInitialState() {
    return {
      zIndex: this.props.zIndex ? this.props.zIndex : 99,
    };
  },

  render() {
    let style = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: this.state.zIndex,
      backgroundColor: 'rgba(0,0,0,0.3)'
    };

    return (<div style={style}></div>);
  }
});

module.exports = BackDrop;

