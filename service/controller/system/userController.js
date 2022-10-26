import { setStorage } from "../../../share/util/storage";
import SystemControllerBase from "../controllerBase/systemControllerBase";

class UserController extends SystemControllerBase {
    constructor() {
        super("system");
    }
    /**
     * 获取租户ID
     * @param {string} userName 用户名
     */
    getTenantIDByUser(userName) {
        return this.request("/User/GetTenantIDByUser", { UserName: userName });
    }
    /**
     * 获取用户数据
     * @param {string} userID 用户id
     */
    getUser(userID) {
        return this.request("/Employee/GetByID", userID);
    }
    /**
     * 登录
     * @param {any} data 
     */
    login(data) {
        return this.request("/User/Login", data);
    }

    /**
     * 钉钉免登
     * @param {string} code 钉钉免登授权码
     * @param {string} uid 账户名
     * @param {string} pwd 账户密码
     * @returns 
     */
    ddLogin(code, uid, pwd) {
        return this.request("/User/Platform/ddLogin", {
            Code: code,
            UserName: uid,
            Password: pwd,
        });
    }

    /**
     * 微信免登
     * @param {string} code 微信免登授权码
     * @param {string} uid 账户名
     * @param {string} pwd 账户密码
     * @returns 
     */
    wxLogin(code, uid, pwd) {
        return this.request("/User/Platform/wxLogin", {
            Code: code,
            UserName: uid,
            Password: pwd,
        });
    }

    /**
     * 获取菜单权限
     */
    getkinds() {
        const product = 2;//当前移动端不会需要系统管理的菜单，所以写死系统管理即可
        return this.request("/User/Menu/Mine", { Product: product });
    }

    /**
     * 获取员工账户菜单权限
     */
    getEmployeekinds() {
        return this.request("/User/Menu/Employee", { IsPower: false });
    }

    /**
     * 登录
     * @param {stirng} userName 用户名
     * @param {stirng} password 密码
     * @returns 
     */
    quickLogin(userName, password) {
        return this.getTenantIDByUser(userName)
            .then((res) => {
                setStorage("TenantID", res);
                return this.login({
                    SessionID: "",
                    VerifyCode: "9",
                    UserName: userName,
                    Password: password,
                    TenantID: res,
                });
            });
    }
}

export default new UserController;