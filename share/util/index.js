
/**
 * 判断字符串是否为空
 * @param {Object} str 字符串
 */
function stringIsNull(str) {
	return str === "" || str === null || str === undefined;
}

/**
 * 替换数组（在不改变原数组内存位置的情况下替换数组内的值）
 * @param {Array} source 源数组，需要改变值的数组
 * @param {Array} target 目标数组，改变后的值的数组，如果需要清空该参数传[]
 * @returns 改变值后的数组
 */
function replaceArray(source, target) {
	if (source == undefined || target == undefined) return;
	return source.splice(0, undefined, ...target);
}

/**
 * 深克隆
 * @param {*} obj 需要深克隆的对象
 * @returns 新的对象
 */
function cloneDeep(obj) {
	const objClone = Array.isArray(obj) ? [] : {};
	if (obj && typeof obj === "object") {
		for (key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (obj[key] && typeof obj[key] === "object") {
					objClone[key] = cloneDeep(obj[key]);
				} else {
					objClone[key] = obj[key];
				}
			}
		}
	}
	return objClone;
}

/**
 * 等待延迟
 * @param {*} millisecond 毫秒数;默认值:0
 * @returns 返回一个Promise
 */
function awaitDelay(millisecond = 0) {
	return new Promise(function (resolve) {
		setTimeout(function () {
			resolve({});
		}, millisecond);
	});
}

/**
 * 判断是否Promise
 * @param {any} obj 对象
 * @returns 是否Promise
 */
function isPromise(obj) {
	if (obj === null || obj === undefined) return false;
	const b1 = Promise.prototype;
	const b2 = Object.getPrototypeOf(obj);
	return b1 === b2 || b1.toString() === b2.toString();
}

/**
 * 判断是否有保存草稿
 * @param {any} name 要从哪个缓存里找这个东西
 * @param {any} key 这个保存草稿是哪个的
 * @returns 是否Promise
 */
import { getStorage } from "./storage";
function systemShow(name, Key) {
	// 获取保存为草稿的设置
	let assetDicSettings = JSON.parse(getStorage(name));
	if (assetDicSettings != null) {
		for (let index = 0; index < assetDicSettings.length; index++) {
			if (assetDicSettings[index].Key == Key) {
				let isAutoGenerateCode = assetDicSettings[index].Value;
				if (isAutoGenerateCode === 'True' || isAutoGenerateCode == true) {
					return true
				} else {
					return false
				}
			}
		}
	}
}

/**
 * 判断是否有这个菜单,,获得这个菜单的按钮权限
 * @param {any} code 判断这个菜单的code
 * @param {any} data 菜单的数据
 * @returns 是否Promise
 */
function getJurisdiction(data, code) {
	if (data.length == 0 || data == null || data == undefined) {
		return { permissionData: [], index: null };
	}
	let permissionData_ = [];
	let index_ = 0;
	for (let i = 0; i < data.length; i++) {
		if (data[i].Code == code) {
			permissionData_ = data[i].Permissions;
			index_ = data[i].Index;
			break;
		}
		if (data[i].Children && data[i].Children.length > 0) {
			let { permissionData, index } = getJurisdiction(data[i].Children, code);
			if (permissionData.length > 0) {
				index_ = index;
				permissionData_ = permissionData;
				break;
			}
		}

	}
	return { permissionData: permissionData_, index: index_ };
}
//判断按钮权限是否存在
function getpermission(permissionCode, code) {
	if (permissionCode && permissionCode.length > 0) {
		for (var i = 0; i < permissionCode.length; i++) {
			if (code == permissionCode[i].Code) {
				return true
			}
		}
		return false;
	} else {
		return false
	}
}

function _getMenuByCode(code, menus) {
	for (const menu of menus) {
		if (menu.Code === code) {
			return menu;
		}
		if (menu.Children && menu.Children.length) {
			const _menu = _getMenuByCode(code, menu.Children);
			if (_menu) return _menu;
		}
	}
}

/**
 * 根据菜单code获取菜单
 * @param {*} code 菜单code
 */
function getMenuByCode(code, products) {
	for (const product of products) {
		const _menu = _getMenuByCode(code, product.Menus);
		if (_menu) return _menu;
	}
	return false;
}



function _getMenuCode(code, menus) {
	for (const menu of menus) {
		if (menu.Code === code) {
			return menu;
		}
		if (menu.Children && menu.Children.length) {
			const _menu = _getMenuCode(code, menu.Children);
			if (_menu) return _menu;
		}
	}
}


/**
 * 根据菜单code获取菜单
 * @param {*} code 菜单code
 */
 function getMenuCode(code, products) {
	for (const product of products) {
		const _menu = _getMenuCode(code, product.Menus);
		if (_menu) return _menu;
	}
	return false;
}


/**
* 获取get url上的参数值
* @param {string} name url参数
* @returns url上的参数值
*/
function getUrlValue(name, url) {
	var url = decodeURIComponent(url);
	var csi = url.indexOf(name + "=");
	if (csi === -1) return "";
	var jsfi = url.indexOf("&", csi);
	if (jsfi === -1) jsfi = undefined;
	var v = url.substring(csi, jsfi).split("=")[1];
	if (v) return v; else return "";
}

/**
 * 获取扫码内容
 * @param {string} v 扫码内容
 * @returns 
 */
function getScanCode(v) {
	if (v.startsWith("http")) {
		return getUrlValue("Code", v);
	}
	return v;
}

export {
	stringIsNull,
	replaceArray,
	cloneDeep,
	awaitDelay,
	isPromise,
	getJurisdiction,
	getpermission,
	systemShow,
	getScanCode,
	getMenuByCode,
	getMenuCode,
};
