"use strict";
var store_modules_asset = require("./asset.js");
var store_modules_inventory = require("./inventory.js");
var store_modules_repairRecord = require("./repairRecord.js");
var modules = {
  asset: store_modules_asset.moduleAsset,
  inventory: store_modules_inventory.moduleInventory,
  repairRecord: store_modules_repairRecord.moduleRepairRecord
};
exports.modules = modules;
