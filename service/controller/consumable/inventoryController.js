import ConsumableControllerBase from "../controllerBase/consumableControllerBase";

class InventoryController extends ConsumableControllerBase {
	  getInventoryList(obj) {
	    return this.request("/Inventory/Bill/List", obj);
	  }
	  getByID(obj) {
	    return this.request("/Inventory/Bill/GetById", obj);
	  }
	  
	  getDetailIDByCode(obj){
		   return this.request("/Inventory/Bill/GetDetailIDByCode", obj);
	  }
	  
	  getDetailByID(obj){
	  	 return this.request("/Inventory/Bill/GetDetailByID", obj);
	  }
	  appletSave(obj){
		  return this.request("/Inventory/Bill/AppletSave",obj)
	  }
}

export default new InventoryController();