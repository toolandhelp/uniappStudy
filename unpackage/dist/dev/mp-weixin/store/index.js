"use strict";
var common_vendor = require("../common/vendor.js");
var store_modules_index = require("./modules/index.js");
const store = common_vendor.createStore({
  modules: store_modules_index.modules
});
exports.store = store;
