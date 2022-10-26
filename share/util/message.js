/**
 * 显示成功消息
 * @param {string} text 消息提示内容
 */
function showOkToast(text) {
	uni.hideLoading({
		complete:function(hide){
			if (text.length > 7) {
				uni.showToast({
					"title": text,
					"icon": "none"
				});
				return;
			}
			uni.showToast({
				"title": text,
				"icon": "success"
			});
		}
	});
}

/**
 * 显示错误消息
 * @param {string} text 消息提示内容
 */
function showErrorToast(text) {
	uni.hideLoading({
		complete:function(hide){
			if (text.length > 7) {
				uni.showToast({
					"title": text,
					"icon": "none"
				});
				return;
			}
			uni.showToast({
				"title": text,
				"icon": "error"
			});
		}
	});
}

/**
 * 显示加载中提示
 */
function showLoading() {
	uni.showLoading({
		mask: true,
		title: "加载中",
	});
}

/**
 * 关闭消息提示
 */
function clearToast() {
	uni.hideToast();
}

/**
 * 隐藏加载中提示
 */
function clearLoading() {
	uni.hideLoading();
}

/**
 * 清除所有
 */
function clearAll() {
	clearLoading();
	clearToast();
}

function openConfirm(content, title = "确认提醒") {
	return new Promise(function (resolve, reject) {
		uni.showModal({
			title,
			content,
			showCancel: true,
			cancelText: "取消",
			confirmText: "确定",
			cancelColor: "#000",
			confirmColor: "#007aff",
			success: ({ confirm, cancel }) => {
				if (confirm) {
					resolve();
					return;
				}
				if (cancel) {
					reject("已取消：" + content);
					return;
				}
				reject();
			},
			fail: reject,
		});
	});
}


export {
	showOkToast,
	showErrorToast,
	showLoading,
	clearToast,
	clearLoading,
	clearAll,
	openConfirm,
};
