/**
 *
 * section aligned in row.

 * Description:       a section with items lined in row.
 * Version:           0.0.1
 * Author:            Gong Zhenhua
 * Author URI:        http://allmyverse.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */


let RowSection = React.createClass({

  render() {
    let formElementStyle = {
      flexDirection: 'row'   // row direction by default
    };
    return (
      <View style={[formElementStyle, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
});
