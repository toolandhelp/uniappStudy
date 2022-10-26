<template>
	<cj-signed-version v-if="signShow" @success='success' @cancel="cancel"></cj-signed-version>
</template>

<script>
	import {
		GetFullUrlByKey,
		GetUploadFilePath
	} from '../../../share/resources/confirm.js'
	import AssetController from '@/service/controller/asset/assetController.js'
	import {
		send
	} from '@/share/http/axios.js'
	import {
		createSocket,
		sendSocketMessage
	} from '@/share/util/websocket.js'
	import {
		pathToBase64
	} from '../../../share/util/image-tools.js'
	import {
		emitPromise
	} from "../../../share/util/uniEvent";
	import eventNames from "../../../service/enumeration/eventNames";
	import {
		redirectTo,
		navigateTo,
		navigateBack,
	} from "../../../share/redirect/index";
	import {
		showLoading,
		clearLoading,
	} from "../../../share/util/message";
	export default {
		data() {
			return {
				signShow: false,
				key: '',
				billID: '',
				apiPath: '',
				filePath: '/Attachment/Upload',
				type: 0 // 0 扫码  1 单据签字
			}
		},
		methods: {
			cancel() {
				uni.navigateBack({
					delta: 1
				});
			},
			async success(file) {
				let base64str = "";
				// #ifdef MP-ALIPAY 
				base64str = await pathToBase64(file.filePath);
				// #endif
				// #ifdef MP-WEIXIN
				base64str = await pathToBase64(file.tempFilePath);
				// #endif
				// #ifdef H5 
				base64str = await pathToBase64(file.tempFilePath);
				// #endif
				if (typeof dd === "object") {
					showLoading();
					AssetController.uploadRotate(base64str).then((res) => {
						let target = res;
						send(this.apiPath, {
							ID: parseInt(this.billID),
							IsPass: true,
							SignPictureUrl: target.UploadedFileInfo.FileUrl
						}).then(() => {
							//扫码模式需要签完字 刷新PC页面
							if (this.type == 0) {
								let wsMsg = {
									target: 0,
									billType: this.key
								};
								uni.sendSocketMessage({
									data: JSON.stringify(wsMsg)
								});
							}
							//   uni.navigateBack({delta:1});
							// 返回单据详情刷新界面
							emitPromise(eventNames.signBack).then(() => navigateBack());
						});
					}).finally(() => clearLoading());
				} else {
					showLoading();
					AssetController.uploadSignImageByBase64(base64str).then((res) => {
						let target = res;
						console.log(target)
						send(this.apiPath, {
							ID: parseInt(this.billID),
							IsPass: true,
							SignPictureUrl: target.UploadedFileInfo.FileUrl
						}).then(() => {
							//扫码模式需要签完字 刷新PC页面
							if (this.type == 0) {
								let wsMsg = {
									target: 0,
									billType: this.key
								};
								uni.sendSocketMessage({
									data: JSON.stringify(wsMsg)
								});
							}
							//   uni.navigateBack({delta:1});
							// 返回单据详情刷新界面
							emitPromise(eventNames.signBack).then(() => navigateBack());
						});
					}).finally(() => clearLoading());
				}

			}
		},
		mounted() {
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let options = routes[routes.length - 1].options
			this.type = options.type ?? 0;
			//如果是单据签字模式下 需要提供 key 和单据ID
			this.key = options.key;
			this.billID = options.billID;
			//扫码签字
			if (this.type == 0) {
				createSocket();
				let that = this;

				uni.scanCode({
					cancel: () => {
						uni.navigateBack({
							delta: 1
						});
					},
					success: function(res) {
						let result = res.result;
						if (result.substring(0, 3).toLowerCase() == '##t') {

							var patten =
								/T=(1|2|10|3|100|101|102|103|104|105|106|107|108|109|110|111|112|200|201|202|203|204|205|206|207|208|209|210|211|212|213)&V=(\d+)/g;

							if (!patten.test(result)) {
								uni.showToast({
									title: '二维码无效',
									icon: 'error'
								});
								return;
							}
							that.key = RegExp.$1;
							that.billID = RegExp.$2;
							//获取后台签字接口
							that.apiPath = GetFullUrlByKey(that.key);
							// that.filePath=GetUploadFilePath();
							that.signShow = true;
						} else {
							uni.showToast({
								title: '二维码无效',
								icon: 'error'
							});
						}
					}
				});
			}
			//单据签字
			if (this.type == 1) {
				this.apiPath = GetFullUrlByKey(this.key);
				this.signShow = true;
			}
		}
	}
</script>

<style>
</style>
