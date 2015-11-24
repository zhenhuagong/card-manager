/**
 *
 * ListView.

 * Description:       A component for displaying data in list.
 * Version:           0.0.1
 * Author:            Gong Zhenhua
 * Author URI:        http://allmyverse.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

'use strict';

let React = require('react-native');
let {
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} = React;

let Configs = require('../../configs');

let ItemList = React.createClass({

  propTypes: {
    list: React.PropTypes.array.isRequired
  },

  getInitialState() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this.props.list),
    };
  },

  componentWillUpdate(nextProps, nextState) {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    nextState.dataSource = ds.cloneWithRows(nextProps.list);
  },

  render() {
    if (!this.props.list || this.props.list.length === 0) {
      return (<Text>目前没有数据</Text>);
    } else {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderHeader={this._renderHeader}/>
      );
    }
  },

  _renderRow(rowData: object, sectionID: number, rowID: number) {
    console.log('render list row: ' + rowID);
    let rowColor = (rowID % 2) === 1 ? '#F6F6F6' : Configs.colors.whiteContent;
    let fontColor;
    if (sectionID === -1) {
      // header row
      rowColor = '#F6F6F6';
    }
    let rowTexts = Object.keys(rowData).map((key) => (
      <View style={styles.cell}>
        <Text>{rowData[key]}</Text>
      </View>
    ));
    return (
      <TouchableHighlight>
        <View style={[styles.row, {backgroundColor: rowColor}]}>
          {rowTexts}
        </View>
      </TouchableHighlight>
    );
  },

  _renderHeader() {
    return this._renderRow(this.props.header, -1, 1);
  }
});

let styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderBottomColor: Configs.colors.menuBorder,
    borderBottomWidth: 1,
    paddingLeft: 5
  },
  cell: {
    flex: 1
  },
});

module.exports = ItemList;
