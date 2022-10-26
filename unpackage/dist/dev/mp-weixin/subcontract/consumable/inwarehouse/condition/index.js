"use strict";
var common_vendor = require("../../../../common/vendor.js");
var subcontract_consumable_inwarehouse_condition_metadata = require("./metadata.js");
var share_util_uniEvent = require("../../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../../service/enumeration/eventNames.js");
var share_redirect_index = require("../../../../share/redirect/index.js");
var MetaData = () => {
  const {
    Data,
    BillType,
    Condition
  } = subcontract_consumable_inwarehouse_condition_metadata.GetMetadata();
  function query() {
    share_util_uniEvent.emit(service_enumeration_eventNames.eventNames.consumableInwarehouseConditionBack, Data.value);
    share_redirect_index.navigateBack();
  }
  function getWarehouseOrCorpText() {
    return Condition.value.WarehouseOrCorp.reduce((prevaluer, n) => {
      if (prevaluer == "") {
        return n.Name;
      }
      return n.Name + "/" + prevaluer;
    }, "");
  }
  function getPersonText() {
    return Condition.value.Person.reduce((prevaluer, n) => {
      if (prevaluer == "") {
        return n.Name;
      }
      return n.Name + "/" + prevaluer;
    }, "");
  }
  function getPersonIDs() {
    share_util_uniEvent.only(service_enumeration_eventNames.eventNames.employeeSelectBack, (obj) => {
      let person = obj.items.map((e) => {
        return {
          Name: e.Name,
          ID: e.ID
        };
      });
      console.log(obj);
      Condition.value.Person = person;
      Data.value.HandlerEmployeeIDs = person.map((d) => d.ID);
    });
    common_vendor.index.navigateTo({
      url: `/pages/selector/system/employee?multiple=1&ids=${Data.value.HandlerEmployeeIDs}`
    });
  }
  function getSupplierText() {
    return Condition.value.Supplier.reduce((prevaluer, n) => {
      if (prevaluer == "") {
        return n.Name;
      }
      return n.Name + "/" + prevaluer;
    }, "");
  }
  function getSupplierIDs() {
    share_util_uniEvent.only(service_enumeration_eventNames.eventNames.supplierSelectBack, (obj) => {
      let supplier = obj.items.map((e) => {
        return {
          Name: e.Name,
          ID: e.ID
        };
      });
      Condition.value.Supplier = supplier;
      Data.value.SupplierIDs = supplier.map((d) => d.ID);
    });
    common_vendor.index.navigateTo({
      url: `/pages/selector/asset/supplier?multiple=1&ids=${Data.value.SupplierIDs}`
    });
  }
  function getWarehouseOrCorpIDs() {
    common_vendor.index.navigateTo({
      url: `/pages/selector/consumable/warehouse?ids=${Data.value.HandlerOrgIDs}&multiple=${1}`
    });
    share_util_uniEvent.only(service_enumeration_eventNames.eventNames.consumableWarehouseBack, (obj) => {
      let warehouse = obj.items.map((e) => {
        return {
          Name: e.label,
          ID: e.id
        };
      });
      Condition.value.WarehouseOrCorp = warehouse;
      Data.value.WarehouseOrCorpIDs = warehouse.map((d) => d.ID);
    });
  }
  function bindInWarehouseStartDatePickerChange(data) {
    Data.value.InWarehouseStartDate = data.detail.value;
  }
  function bindInWarehouseEndDatePickerChange(data) {
    Data.value.InWarehouseEndDate = data.detail.value;
  }
  function bindPickerChange(e) {
    let index = BillType.findIndex((obj, index2, arr) => {
      return obj.value == e.detail.value;
    });
    Data.value.BillStatus = index;
  }
  function reset() {
    Data.value.BillStatus = 0;
    clearInputText("WarehouseOrCorp");
    clearInputText("BillCode");
    clearInputText("InWarehouseStartDate");
    clearInputText("InWarehouseEndDate");
    clearInputText("Person");
    clearInputText("Supplier");
  }
  function clearInputText(key) {
    switch (key) {
      case "WarehouseOrCorp":
        Data.value.WarehouseOrCorpIDs = [];
        Condition.value.WarehouseOrCorp = [];
        break;
      case "BillCode":
        Data.value.BillCode = "";
        break;
      case "InWarehouseStartDate":
        Data.value.InWarehouseStartDate = "";
        break;
      case "InWarehouseEndDate":
        Data.value.InWarehouseEndDate = "";
        break;
      case "Person":
        Condition.value.Person = [];
        Data.value.HandlerEmployeeIDs = [];
        break;
      case "Supplier":
        Condition.value.Supplier = [];
        Data.value.SupplierIDs = [];
        break;
    }
  }
  return {
    Data,
    query,
    BillType,
    bindPickerChange,
    getWarehouseOrCorpText,
    getWarehouseOrCorpIDs,
    bindInWarehouseStartDatePickerChange,
    bindInWarehouseEndDatePickerChange,
    clearInputText,
    reset,
    getPersonText,
    getPersonIDs,
    getSupplierText,
    getSupplierIDs
  };
};
exports.MetaData = MetaData;