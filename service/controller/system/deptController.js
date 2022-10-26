import SystemControllerBase from "../controllerBase/systemControllerBase";

class DeptController extends SystemControllerBase {

    /**
     * 获取公司部门树结构数据
     * @param {*} isPower 是否权限过滤
     * @param {*} type 加载的类型
     * @returns 部门树
     */
    getDeptTree(isPower = true, type = null) {
        let _OnlyLoadOrganization = false;
        if (type != 2) {
            //暂时做的兼容处理，因为后端不支持的缘故
            type = 3;
        }
        const data = {
            LoadOrganizationType: type,//1.部门；2.公司；null.全部
            OnlyLoadOrganization: _OnlyLoadOrganization,//是否只显示部门
            OnlyLoadEnableOrg: true,//是否只加载启用的部门
            OnlyLoadPrivilegeOrg: isPower,//是否开启权限过滤
            Delay: false,//不需要延迟加载
            ParentId: null,//上级id
            IsIncludeSelf: false,//按照上级id加载时需不需要显示上级本身
        };
        return this.request("/Organization/GetTree", data);
    }
}

export default new DeptController;