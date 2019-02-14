import Vue from "vue";
import VueRouter from "./vue-router";
import routes from "./routes";

Vue.use(VueRouter, { a: 1 });

export default new VueRouter({
  mode: "hash", //
  routes
});
