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
let {
  Modal,
  StyleSheet,
  Text,
  View,
} = React;
let Button = require('./button');

let ModalDialog = React.createClass({

  propTypes: {
    content: React.PropTypes.string.isRequired,
    onClose: React.PropTypes.func,
    visible: React.PropTypes.bool,
    transparent: React.PropTypes.bool
  },

  getInitialState() {
    return {
      animated: true,
      modalVisible: this.props.visible || false
    };
  },

  render() {
    let modalBackgroundStyle = {
      backgroundColor: this.props.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    let innerContainerTransparentStyle = this.props.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;

    return (
      <Modal
        animated={this.state.animated}
        transparent={this.props.transparent}
        visible={this.state.modalVisible}>
        <View style={[styles.container, modalBackgroundStyle]}>
          <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
            <Text>{this.props.content}</Text>
            <Button
              onPress={this.hide}
              style={styles.modalButton}>
              确定
            </Button>
          </View>
        </View>
      </Modal>
    );
  },

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  },

  hide() {
    this.setModalVisible(false);
    this.props.onClose && this.props.onClose();
  },
});

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButton: {
    marginTop: 10,
  }
});

module.exports = ModalDialog;

