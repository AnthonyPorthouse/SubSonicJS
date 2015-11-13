var Vue = require('vue');
var App = require('./app.vue');

Vue.config.debug = true;

new Vue({
  el: 'body',
  components: {
    app: App
  }
});
