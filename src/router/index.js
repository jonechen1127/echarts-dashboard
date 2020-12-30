/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: routes,
});

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
