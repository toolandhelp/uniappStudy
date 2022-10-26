import ConsumableControllerBase from "../controllerBase/consumableControllerBase";

class AllocateController extends ConsumableControllerBase {
	
		constructor(){
			super("Allocate");
		}
	getStockList(WarehouseIDs, QST) {
		return this.request("/Stock/List", {
			WarehouseIDs: WarehouseIDs,
			QST: QST
		});
	}
	getAllocateList(obj) {
		return this.request("/Allocate/List", obj)
	}

	SaveDraft(obj) {
		return this.request("/Bill/Allocate/SaveDraft", obj)
	}
	GetByID(id) {
		return this.request("/Bill/Allocate/GetByID", id)
	}
	/**
	 * 根据资产id删除资产数据
	 * @param {number} id 单据ID
	 * @returns 
	 */
	Delete(id) {
		return this.request("/Bill/Allocate/Delete", {
			"ID": id
		});
	}
	/**
	 * 根据资产id启动审批流弹框
	 * @param {number} id 单据ID
	 * @returns 
	 */
	PreStartFlow(id) {
		return this.preStartFlow(id)
	}
	/**
	 * 启动审批流
	 * @param {string} obj 
	 * @returns 
	 */
	StartFlow(obj) {
		return this.startFlow(obj);
	}
	/**
	 * 根据资产id启动审批弹框
	 * @param {number} id 单据ID 
	 * @returns 
	 */
	PrevApproval(id) {
		return this.prevApproval(id)
	}
	/**
	 * 审批确定
	 * @param {string} obj 
	 * @returns 
	 */
	SubmitApproval(obj) {
		return this.submitApproval(obj)
	}
	/**
	 * 流程轨迹
	 * @param {number} id 资产id 
	 * @returns 
	 */
	GetFlowTrail(id) {
		return this.getFlowTrail(id);
	}
}

export default new AllocateController();
