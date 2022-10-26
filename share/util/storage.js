/**
 * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容
 * @param {string} key 本地缓存中的指定的 key
 * @param {any} data 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象
 * @param {bool} isSync 是否同步调用，默认异步调用
 */
function setStorage(key, data, isSync = false) {
	if (isSync) {
		uni.setStorageSync(key, data);
		return;
	}
	uni.setStorage({
		key,
		data
	});
}

/**
 * 从本地缓存中获取指定 key 对应的内容
 * @param {string} key 本地缓存中的指定的 key
 * @param {bool} isAsync 是否异步调用，默认同步调用
 */
function getStorage(key, isAsync = false) {
	if (isAsync) {
		return new Promise(function (resolve, reject) {
			uni.getStorage({
				key,
				success: ({
					data
				}) => resolve(data),
				fail: (res) => reject(res),
			});
		});
	}
	return uni.getStorageSync(key);
}

/**
 * 获取当前 storage 的相关信息
 * @param {bool} isAsync 是否异步调用，默认同步调用
 * @return {string[]} keys 当前storage中所有的 key
 * @return {number} currentSize 当前占用的空间大小, 单位：kb
 * @return {number} limitSize 限制的空间大小, 单位：kb
 */
function getStorageInfo(isAsync = false) {
	if (isAsync) {
		return new Promise(function (resolve, reject) {
			uni.getStorageInfo({
				success: (res) => resolve(res),
				fail: (res) => reject(res),
			});
		});
	}
	return uni.getStorageInfoSync();
}

/**
 * 从本地缓存中移除指定 key
 * @param {string} key 本地缓存中的指定的 key
 * @param {bool} isSync 是否同步调用，默认异步调用
 */
function removeStorage(key, isSync = false) {
	if (isSync) {
		uni.removeStorageSync(key);
		return;
	}
	uni.removeStorage({
		key
	});
}

/**
 * 清理本地数据缓存
 * @param {bool} isSync 是否同步调用，默认异步调用
 */
function clearStorage(isSync = false) {
	if (isSync) {
		uni.clearStorageSync();
		return;
	}
	uni.clearStorage();
}

export { setStorage, getStorage, getStorageInfo, removeStorage, clearStorage };