"use strict";
const moduleRepairRecord = {
  namespaced: true,
  state: () => ({
    detailInfo: {
      data: {}
    }
  }),
  mutations: {
    setrepairRecordInfo(state, item) {
      state.detailInfo.data = item;
    }
  }
};
exports.moduleRepairRecord = moduleRepairRecord;
