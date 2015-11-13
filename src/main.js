var Vue = require('vue');
var App = require('./app.vue');
Vue.config.debug = true;

Vue.filter('chunked', function (array, count) {
  var returned = [];

  while (array.length > 0) {
    returned.push(array.splice(0, count));
  }

  return returned;
});

new Vue({
  el: 'body',
  components: {
    app: App
  }
});
