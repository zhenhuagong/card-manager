let Reflux = require('reflux');
let Actions = require('../actions');

let DashboardStore = Reflux.createStore({

  init() {
    this.listenTo(Actions.logout, this.logout);
  },

  logout() {
    this.trigger({ loggedin: false });
  }
});

module.exports = DashboardStore;
