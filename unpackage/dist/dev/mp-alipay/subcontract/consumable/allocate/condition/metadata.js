"use strict";
var common_vendor = require("../../../../common/vendor.js");
function GetMetadata() {
  const Data = common_vendor.ref({
    "IsSetNumber": true,
    "QST": "",
    "WarehouseOrCorpIDs": [],
    "BillCode": "",
    "AllocateEndDate": "",
    "AllocateStartDate": "",
    "ConsumableCategoryIDs": [],
    "HandlerEmployeeIDs": [],
    "HandlerOrgIDs": [],
    "ConsumableCode": "",
    "ListMode": 2,
    "Sort": 2,
    "PageSize": 20,
    "PageNO": 1,
    "BillStatus": 0
  });
  const Condition = common_vendor.ref({
    "WarehouseOrCorp": [],
    "Person": []
  });
  const BillType = [
    {
      label: "\u5168\u90E8",
      value: 0
    },
    {
      label: "\u8349\u7A3F",
      value: 1
    },
    {
      label: "\u5DF2\u63D0\u4EA4",
      value: 2
    },
    {
      label: "\u5F85\u5BA1\u6279",
      value: 3
    },
    {
      label: "\u5BA1\u6279\u4E2D",
      value: 4
    },
    {
      label: "\u5BA1\u6279\u4E0D\u901A\u8FC7",
      value: 5
    },
    {
      label: "\u5BA1\u6279\u901A\u8FC7",
      value: 6
    },
    {
      label: "\u5F85\u786E\u8BA4",
      value: 7
    },
    {
      label: "\u5DF2\u751F\u6548",
      value: 8
    },
    {
      label: "\u5DF2\u53D6\u6D88",
      value: 9
    }
  ];
  return {
    Data,
    BillType,
    Condition
  };
}
exports.GetMetadata = GetMetadata;
