import ConsumableControllerBase from "../controllerBase/consumableControllerBase";

class StockController extends ConsumableControllerBase {
	  getStockList(obj) {
	    return this.request("/Stock/List", obj);
	  }
}

export default new StockController();