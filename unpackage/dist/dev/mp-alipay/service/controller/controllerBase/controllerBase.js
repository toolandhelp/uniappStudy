"use strict";
var share_http_axios = require("../../../share/http/axios.js");
class ControllerBase {
  constructor(billName, product) {
    this.billName = billName;
    this.product = product;
  }
  httpRequest(...s) {
    return share_http_axios.sendAjax(this.product, ...s);
  }
  httpUpload(...s) {
    return share_http_axios.sendUpload(this.product, ...s);
  }
  preStartFlow(id) {
    return share_http_axios.sendAjax(this.product, `/Bill/${this.billName}/PreStartFlow`, { "ID": id });
  }
  startFlow(obj) {
    return share_http_axios.sendAjax(this.product, `/Bill/${this.billName}/StartFlow`, obj);
  }
  prevApproval(id) {
    return share_http_axios.sendAjax(this.product, `/Bill/${this.billName}/PrevApproval`, { "ID": id });
  }
  submitApproval(obj) {
    return share_http_axios.sendAjax(this.product, `/Bill/${this.billName}/SubmitApproval`, obj);
  }
  getFlowTrail(id) {
    return share_http_axios.sendAjax(this.product, `/Bill/${this.billName}/GetFlowTrail`, { "ID": id });
  }
}
exports.ControllerBase = ControllerBase;
