import HttpStatus from "../../service/enumeration/businessStatusCode";
import AjaxResult from "../../service/model/ajaxResult";
import tokenKey, { getToken } from "../token/index.js";
import ServiceUrl from "./serveUrl.js";
import {
	logout
} from "../redirect/index.js";
import {
	stringIsNull
} from "../util/index.js";
import {
	showErrorToast
} from "../util/message.js";
import { requestMethod, httpRequest, httpUploadFile } from "./http";
import { getThisPagePath } from "../util/page";

const ignorePaths = [
	"pages/login/login",
	"pages/login/appletLogin",
];

/**
 * 发送ajax请求（含全局拦截器）
 * @param {enum} product 产品枚举
 * @param {*} _url 请求地址
 * @param {*} data 请求数据
 * @returns {Promise} 请求结果
 */
function sendAjax(product, _url, data) {

	const { header, url } = getUtilHttpOptions(product, _url);

	return http(url, header, data);

}
function send( _url, data) {
	const token = getToken();
    if (!ignorePaths.includes(getThisPagePath())) {
		if (stringIsNull(token)) {
			logout();
			return;
		}
	}
	const header = {
		[tokenKey]: token
	};
	return http(_url, header, data);

}

/**
 * 执行文件上传（含全局拦截器）
 * @param {enum} product 产品枚举
 * @param {*} _url 请求地址
 * @param {*} fileType 文件类型
 * @param {*} filePath 文件blob地址
 * @returns {Promise} 请求结果
 */
function sendUpload(product, _url, fileType, filePath) {

	const { header, url } = getUtilHttpOptions(product, _url);

	return uploadFile(url, header, fileType, filePath);
}

function getUtilHttpOptions(product, url) {

	const token = getToken();
	
	const header = {
		[tokenKey]: token
	};

	if (!ignorePaths.includes(getThisPagePath())) {
		if (stringIsNull(token)) {
			logout();
			return;
		}
	}

	

	//获取完成的请求地址
	url = ServiceUrl.get(product) + url;

	return { header, url };
}


function http(url, header, data) {
	return new Promise(function (resolve, reject) {
		httpRequest(url, header, requestMethod.post, { Data: data })
			.then(d => httpSuccess(d, resolve, reject))
			.catch(d => httpError(url, d, reject));
	});
}

function uploadFile(url, header, fileType, filePath) {
	return new Promise(function (resolve, reject) {
		httpUploadFile(url, header, fileType, filePath)
			.then(d => httpSuccess(d, resolve, reject))
			.catch(d => httpError(url, d, reject));
	});
}

function httpSuccess({ data }, resolve, reject) {
	const result = new AjaxResult(data);
	if (result.Code === HttpStatus.TokenNoExist ||
		result.Code === HttpStatus.TokenInvalid) {
		//登录状态无效：退出登录
		logout();
		reject({});
		return;
	}
	if (result.Code !== HttpStatus.OK) {
		//后端报错
		showErrorToast(result.Message);
		reject(result.Data);
		return;
	}
	resolve(result.Data);
}

function httpError(url, res, reject) {
	showErrorToast(`地址【${url}】无法访问,请检查网络或联系管理员`);
	reject(res);
	return;
}


export { sendAjax, sendUpload,send};