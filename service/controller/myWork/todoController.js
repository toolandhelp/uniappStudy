import MyWorkControllerBase from "../controllerBase/myWorkControllerBase";

class TodoController extends MyWorkControllerBase {

    /**
     * 待审批单据
     * @param {any} data 
     */
     todoWaitingApprovalBillList(userId,pageNo,pageSize = 20) {
        const data = {
            IsSetNumber: true,
            PageNO: pageNo,
            PageSize: pageSize,
            Sort: 1,
            UserId:userId
        }
        return this.request("/Todo/WaitingApprovalBill/List", data);
    }

}

export default new TodoController();