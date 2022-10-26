import productEnum from "../../service/enumeration/productEnum";

class ServiceUrl {
	static system = 'http://192.168.0.215:8001';
	static asset = 'http://192.168.0.215:8002';
	static consumable = "http://192.168.0.215:8004";
	static file = "http://192.168.0.215:8003";
	static myWork = "http://192.168.0.215:8006";
	static ws = "ws://192.168.0.215:8002";
	static OBPProject = "http://192.168.0.215:8013";
	// static system = 'https://demosystem.houqinstar.com';
	// static asset = 'https://demoasset.houqinstar.com';
	// static consumable = "https://democonsumable.houqinstar.com";
	// static file = "https://demofile.houqinstar.com";
	// static myWork = "https://demomine.houqinstar.com";


	/**
	 * 根据产品类型获取访问地址
	 * @param {enum} product 产品枚举
	 * @returns {string} 请求地址
	 */
	static get(product) {
		switch (product) {
			case productEnum.asset:
				return ServiceUrl.asset;
			case productEnum.consumable:
				return ServiceUrl.consumable;
			case productEnum.file:
				return ServiceUrl.file;
			case productEnum.myWork:
				return ServiceUrl.myWork;
			case productEnum.system:
				return ServiceUrl.system;
			case product.OBPProject:
				return ServiceUrl.OBPProject
			default:
				throw `找不到产品-${product}`;
		}
	}

	/**
	 * 设置产品的请求地址
	 * @param {enum} product 产品枚举
	 * @param {string} url 请求地址
	 */
	static set(product, url) {
		switch (product) {
			case productEnum.asset:
				ServiceUrl.asset = url;
				return;
			case productEnum.consumable:
				ServiceUrl.consumable = url;
				return;
			case productEnum.file:
				ServiceUrl.file = url;
				return;
			case productEnum.myWork:
				ServiceUrl.myWork = url;
				return;
			case productEnum.system:
				ServiceUrl.system = url;
				return;
			case productEnum.OBPProject:
				ServiceUrl.OBPProject = url;
			default:
				throw `找不到产品-${product}`;
		}
	}
}

export function getFileUrl(url) {
	return ServiceUrl.file + url;
}

export function getAPIUrl(service, apiPath) {
	let root = ServiceUrl[service] + apiPath;
	return root;
}

export function getAPIUrlByEnum(productEnum, apiPath) {
	let root = ServiceUrl.get(productEnum) + apiPath;
	return root;
}

export default ServiceUrl;
