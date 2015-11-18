let Reflux = require('reflux');
let Actions = require('../actions');

let DashboardStore = Reflux.createStore({

  init() {
    this.listenTo(Actions.login, this.login);
    this.listenTo(Actions.logout, this.logout);
  },

  login() {
    this.trigger({ loggedin: true });
  },

  logout() {
    this.trigger({ loggedin: false });
  }
});

module.exports = DashboardStore;
