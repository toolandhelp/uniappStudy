import SystemControllerBase from "../controllerBase/systemControllerBase";

class EmployeeController extends SystemControllerBase {

    /**
     * 获取公司部门树结构数据
     * @param {*} isPower 是否权限过滤
     * @param {*} type 加载的类型
     * @returns 部门树
     */
    list({ qst = "",
        qse = "",
        corpID = null,
        isLeave = null,
        isUser = null,
        isPower = true,
        isChildrenCorp = null,
        enableEmployeeAccount = null } = {}) {
        return this.request("/Employee/List", {
            QST: qst,
            QSE: qse,
            CorpID: corpID,
            IsShowLeaveJobEmployee: isLeave,
            IsFilterUser: isUser,
            IsContainSubordinateCompany: isChildrenCorp,
            EnableEmployeeAccount: enableEmployeeAccount,
            IsEnableDataPermission: isPower,
            PageNO: 1,
            PageSize: 30,
        });
    }
}

export default new EmployeeController;