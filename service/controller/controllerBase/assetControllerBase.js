import ControllerBase from "./controllerBase";
import productEnum from "../../enumeration/productEnum";

const product = productEnum.asset;

class AssetControllerBase extends ControllerBase {
	
    constructor(billName){
		super(billName,product);
	}
    /**
     * 
     * @param {string} url 请求地址
     * @param {any} data 
     */
    request(url, data) {
        return super.httpRequest( url, data);
    }

    /**
     * 
     * @param {*} url 请求地址
     * @param {*} fileType 文件类型
     * @param {*} filePath 文件blob地址
     */
    upload(url, fileType, filePath) {
        return super.httpUpload( url, fileType, filePath);
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
	getFlowTrail(id) {
	    return super.getFlowTrail(id);
	}
}

export default AssetControllerBase;