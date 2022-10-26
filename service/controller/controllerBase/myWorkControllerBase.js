import ControllerBase from "./controllerBase";
import productEnum from "../../enumeration/productEnum";

const product = productEnum.myWork;

class MyWorkControllerBase extends ControllerBase {

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
}

export default MyWorkControllerBase;