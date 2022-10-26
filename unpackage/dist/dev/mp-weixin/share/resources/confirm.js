"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var share_http_serveUrl = require("../http/serveUrl.js");
var service_enumeration_productEnum = require("../../service/enumeration/productEnum.js");
class ConfirmEntity {
}
__publicField(ConfirmEntity, "keyValues", [
  {
    key: 100,
    url: "/Bill/RequestDraw/Confirm",
    product: service_enumeration_productEnum.productEnum.asset
  },
  {
    key: 101,
    url: "/Bill/Draw/Confirm",
    product: service_enumeration_productEnum.productEnum.asset
  },
  {
    key: 102,
    url: "/Bill/DrawBack/Confirm",
    product: service_enumeration_productEnum.productEnum.asset
  },
  {
    key: 103,
    url: "/Bill/Transform/Confirm",
    product: service_enumeration_productEnum.productEnum.asset
  },
  {
    key: 104,
    url: "/Bill/Borrow/Confirm",
    product: service_enumeration_productEnum.productEnum.asset
  },
  {
    key: 105,
    url: "/Bill/Return/Confirm",
    product: service_enumeration_productEnum.productEnum.asset
  },
  {
    key: 106,
    url: "/Bill/RequestDiscard/Confirm",
    product: service_enumeration_productEnum.productEnum.asset
  },
  {
    key: 107,
    url: "/Bill/Discard/Confirm",
    product: service_enumeration_productEnum.productEnum.asset
  },
  {
    key: 108,
    url: "/Bill/PurchasingApplication/Confirm",
    product: service_enumeration_productEnum.productEnum.asset
  },
  {
    key: 109,
    url: "/Bill/PurchasingOrder/Confirm",
    product: service_enumeration_productEnum.productEnum.asset
  },
  {
    key: 110,
    url: "/Bill/PurchasingAccept/Confirm",
    product: service_enumeration_productEnum.productEnum.asset
  },
  {
    key: 111,
    url: "/Bill/PurchasingReturn/Confirm",
    product: service_enumeration_productEnum.productEnum.asset
  },
  {
    key: 112,
    url: "/Bill/AssetInWarehouse/Confirm",
    product: service_enumeration_productEnum.productEnum.asset
  },
  {
    key: 200,
    url: "/Bill/InWarehouse/Confirm",
    product: service_enumeration_productEnum.productEnum.consumable
  },
  {
    key: 201,
    url: "/Bill/OutWarehouse/Confirm",
    product: service_enumeration_productEnum.productEnum.consumable
  },
  {
    key: 202,
    url: "/Bill/Discard/Confirm",
    product: service_enumeration_productEnum.productEnum.consumable
  },
  {
    key: 203,
    url: "/Bill/Allocate/Confirm",
    product: service_enumeration_productEnum.productEnum.consumable
  },
  {
    key: 204,
    url: "/Bill/PurchasingApplication/Confirm",
    product: service_enumeration_productEnum.productEnum.consumable
  },
  {
    key: 205,
    url: "/Bill/PurchasingOrder/Confirm",
    product: service_enumeration_productEnum.productEnum.consumable
  },
  {
    key: 206,
    url: "/Bill/PurchasingReturn/Confirm",
    product: service_enumeration_productEnum.productEnum.consumable
  },
  {
    key: 207,
    url: "/Bill/RequestDraw/Confirm",
    product: service_enumeration_productEnum.productEnum.consumable
  },
  {
    key: 208,
    url: "/Bill/TransferOut/Confirm",
    product: service_enumeration_productEnum.productEnum.consumable
  },
  {
    key: 209,
    url: "/Bill/TransferIn/Confirm",
    product: service_enumeration_productEnum.productEnum.consumable
  },
  {
    key: 210,
    url: "/Bill/OriginalAmountAlteration/Confirm",
    product: service_enumeration_productEnum.productEnum.asset
  },
  {
    key: 211,
    url: "/Bill/Project/Confirm",
    product: service_enumeration_productEnum.productEnum.OBPProject
  },
  {
    key: 212,
    url: "/Bill/Contract/Confirm",
    product: service_enumeration_productEnum.productEnum.OBPProject
  },
  {
    key: 213,
    url: "/Bill/Convert/Confirm",
    product: service_enumeration_productEnum.productEnum.OBPProject
  },
  {
    key: 214,
    url: "/Bill/CancelRequestDiscard/Confirm",
    product: service_enumeration_productEnum.productEnum.OBPProject
  },
  {
    key: 215,
    url: "/Bill/Split/Confirm",
    product: service_enumeration_productEnum.productEnum.OBPProject
  }
]);
__publicField(ConfirmEntity, "filePath", "/Attachment/Upload");
function GetFullUrlByKey(key) {
  let target = ConfirmEntity.keyValues.filter((t) => {
    return t.key == key;
  })[0];
  let product = target.product;
  let service = share_http_serveUrl.getAPIUrlByEnum(product, target.url);
  return service;
}
function GetSignPath(filePath) {
  return share_http_serveUrl.getAPIUrlByEnum(service_enumeration_productEnum.productEnum.system, filePath);
}
exports.GetFullUrlByKey = GetFullUrlByKey;
exports.GetSignPath = GetSignPath;
