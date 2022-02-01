export default {
  namespaced: true,
  state: {
    userData: {},
    userChild: [],
  },
  getters: {
    userDataStore: (state) => state.userData,
    userChildStore: (state) => state.userChild,
  },
  mutations: {
    setUserData(state, payload) {
      state.userData = {};
      for (let key in payload) {
        state.userData[key] = payload[key];
      }
    },
    setUserChild(state, payload) {
      payload.forEach((e) => {
        state.userChild.push(e);
      });
    },
  },
  actions: {
    setUserData({ commit }, payload) {
      commit("setUserData", payload);
    },
    setUserChild({ commit }, payload) {
      commit("setUserChild", payload);
    },
  },
};
