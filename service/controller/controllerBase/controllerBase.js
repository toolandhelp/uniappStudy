import {
	sendAjax,
	sendUpload
} from "../../../share/http/axios";

class ControllerBase {
	constructor(billName,product){
		this.billName=billName;
		this.product=product;
	}
	/**
	 * http请求
	 */
	httpRequest(...s) {
		return sendAjax(this.product,...s);
	}
	
	/**
	 * http上传
	 */
	httpUpload(...s) {
		return sendUpload(this.product,...s);
	}
	
	preStartFlow(id){
	    return sendAjax(this.product,`/Bill/${this.billName}/PreStartFlow`,{"ID": id});
	}
	startFlow(obj){
	    return sendAjax(this.product,`/Bill/${this.billName}/StartFlow`,obj);
	}
	prevApproval(id){
	    return sendAjax(this.product,`/Bill/${this.billName}/PrevApproval`,{"ID": id});
	}
	submitApproval(obj){
	    return sendAjax(this.product,`/Bill/${this.billName}/SubmitApproval`,obj);
	}
	getFlowTrail(id) {
	    return sendAjax(this.product,`/Bill/${this.billName}/GetFlowTrail`, { "ID":id });
	}
}

export default ControllerBase;
