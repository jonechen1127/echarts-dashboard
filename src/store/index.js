import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import Cookies from 'js-cookie';

export default new Vuex.Store({
  state: {
    users: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : '',
    token: Cookies.get('token') || '', // 相当于token
    tags: '' // 标签及面包屑
  },
  getters: {
    users(state) {
      return state.users;
    }
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    },
    settoken(state, token) {
      state.token = token;
    },
    setTags(state, tags) {
      state.tags = tags;
    }
  },
  actions: {
    // 登录
    handleLogin({ commit }, loginInfo) {
      commit('setUsers', loginInfo);
      commit('settoken', loginInfo.token);
      Cookies.set('token', loginInfo.token);
      localStorage.setItem('userInfo', JSON.stringify(loginInfo));
    },
    // 登出
    handleLogOut({ commit }) {
      commit('setUsers', '');
      commit('settoken', '');
      Cookies.remove('token');
      localStorage.removeItem('userInfo');
    }
  }
});
