import {
	setStorage,
	getStorage,
	removeStorage
} from "../util/storage.js";

const tokenKey = "X-Token";

/**
 * 设置令牌
 * @param text 要设置的token文本
 */
export function setToken(text) {
	setStorage(tokenKey, text,true);
}

/**
 * 获取令牌
 * @return {string} 令牌
 */
export function getToken() {
	return getStorage(tokenKey);
}

/**
 * 删除令牌
 */
export function removeToken() {
	removeStorage(tokenKey);
}

export default tokenKey;
