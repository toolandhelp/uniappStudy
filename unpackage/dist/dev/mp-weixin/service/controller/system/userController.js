"use strict";
var share_util_storage = require("../../../share/util/storage.js");
var service_controller_controllerBase_systemControllerBase = require("../controllerBase/systemControllerBase.js");
class UserController extends service_controller_controllerBase_systemControllerBase.SystemControllerBase {
  constructor() {
    super("system");
  }
  getTenantIDByUser(userName) {
    return this.request("/User/GetTenantIDByUser", { UserName: userName });
  }
  getUser(userID) {
    return this.request("/Employee/GetByID", userID);
  }
  login(data) {
    return this.request("/User/Login", data);
  }
  ddLogin(code, uid, pwd) {
    return this.request("/User/Platform/ddLogin", {
      Code: code,
      UserName: uid,
      Password: pwd
    });
  }
  wxLogin(code, uid, pwd) {
    return this.request("/User/Platform/wxLogin", {
      Code: code,
      UserName: uid,
      Password: pwd
    });
  }
  getkinds() {
    const product = 2;
    return this.request("/User/Menu/Mine", { Product: product });
  }
  getEmployeekinds() {
    return this.request("/User/Menu/Employee", { IsPower: false });
  }
  quickLogin(userName, password) {
    return this.getTenantIDByUser(userName).then((res) => {
      share_util_storage.setStorage("TenantID", res);
      return this.login({
        SessionID: "",
        VerifyCode: "9",
        UserName: userName,
        Password: password,
        TenantID: res
      });
    });
  }
}
var userController = new UserController();
exports.userController = userController;
