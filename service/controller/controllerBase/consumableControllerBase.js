import ControllerBase from "./controllerBase";
import productEnum from "../../enumeration/productEnum";

const product = productEnum.consumable;

class ConsumableControllerBase extends ControllerBase {

    constructor(billName){
    	super(billName,product);
    }
    /**
     * 
     * @param {string} url 请求地址
     * @param {any} data 
     */
    request(url, data) {
        return super.httpRequest(url, data);
    }
	
	preStartFlow(id){
	    return super.preStartFlow(id);
	}
	startFlow(obj){
	    return super.startFlow(obj);
	}
	prevApproval(id){
	    return super.prevApproval(id);
	}
	submitApproval(obj){
	    return super.submitApproval(obj);
	}
}

export default ConsumableControllerBase;