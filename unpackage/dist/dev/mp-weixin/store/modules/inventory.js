"use strict";
const moduleInventory = {
  namespaced: true,
  state: () => ({
    employee: {
      item: {}
    },
    manageUser: {
      item: {}
    }
  }),
  mutations: {
    setEmployeeItem(state, item) {
      state.employee.item = item;
    },
    setmanageUserItem(state, item) {
      state.manageUser.item = item;
    }
  },
  getters: {}
};
exports.moduleInventory = moduleInventory;
