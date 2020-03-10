import Vue from "vue";
import Buefy from "buefy";
import App from "./App.vue";
import store from "./store";
import Moment from "moment";
import router from "./router";

Vue.use(Buefy);

Vue.filter("formatDate", function(value) {
  return Moment(value).format("Do MMM YYYY");
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
