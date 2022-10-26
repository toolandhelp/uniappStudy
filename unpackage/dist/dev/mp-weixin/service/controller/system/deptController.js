"use strict";
var service_controller_controllerBase_systemControllerBase = require("../controllerBase/systemControllerBase.js");
class DeptController extends service_controller_controllerBase_systemControllerBase.SystemControllerBase {
  getDeptTree(isPower = true, type = null) {
    let _OnlyLoadOrganization = false;
    if (type != 2) {
      type = 3;
    }
    const data = {
      LoadOrganizationType: type,
      OnlyLoadOrganization: _OnlyLoadOrganization,
      OnlyLoadEnableOrg: true,
      OnlyLoadPrivilegeOrg: isPower,
      Delay: false,
      ParentId: null,
      IsIncludeSelf: false
    };
    return this.request("/Organization/GetTree", data);
  }
}
var deptController = new DeptController();
exports.deptController = deptController;
