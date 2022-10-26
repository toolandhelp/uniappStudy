"use strict";
var service_controller_controllerBase_assetControllerBase = require("../controllerBase/assetControllerBase.js");
class ApprovalProcess extends service_controller_controllerBase_assetControllerBase.AssetControllerBase {
  preStartFlow(billType, id) {
    const url = `/Bill/${billType}/PreStartFlow`;
    return this.request(url, { "ID": id });
  }
  startFlow(billType, obj) {
    const url = `/Bill/${billType}/StartFlow`;
    return this.request(url, obj);
  }
  prevApproval(billType, id) {
    const url = `/Bill/${billType}/PrevApproval`;
    return this.request(url, { "ID": id });
  }
  submitApproval(billType, obj) {
    const url = `/Bill/${billType}/SubmitApproval`;
    return this.request(url, obj);
  }
  getFlowTrail(billType, id) {
    const url = `/Bill/${billType}/GetFlowTrail`;
    return this.request(url, { "ID": id });
  }
}
var assetApprovalProcess = new ApprovalProcess();
exports.assetApprovalProcess = assetApprovalProcess;