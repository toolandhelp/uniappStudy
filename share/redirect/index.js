import {
	clearStorage
} from "../util/storage.js";

/**
 * 保留当前页面，跳转到应用内的某个页面，使用navigateBack可以返回到原页面
 * @param {string} url
 */
function navigateTo(url) {
	url = formatAddress(url);
	uni.navigateTo({
		url
	});
}

/**
 * 关闭当前页面，跳转到应用内的某个页面
 * @param {string} url
 */
function redirectTo(url) {
	url = formatAddress(url);
	uni.redirectTo({
		url
	});
}

/**
 * 关闭所有页面，打开到应用内的某个页面
 * @param {string} url
 */
function reLaunch(url) {
	url = formatAddress(url);
	uni.reLaunch({
		url
	});
}

/**
 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
 * @param {string} url
 */
function switchTab(url) {
	url = formatAddress(url);
	uni.switchTab({
		url
	});
}

/**
 * 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层
 * @param {number} delta 返回的页面数，如果 delta 大于现有页面数，则返回到首页
 */
function navigateBack(delta) {
	uni.navigateBack({ delta });
}

/**
 * 退出登录
 */
function logout() {
	clearStorage();
	reLaunch('pages/login/login');
}

function formatAddress(url) {
	if (!(url.startsWith(".") || url.startsWith("/"))) {
		return "/" + url;
	}
	return url;
}

export {
	logout,
	navigateTo,
	redirectTo,
	reLaunch,
	switchTab,
	navigateBack,
};
