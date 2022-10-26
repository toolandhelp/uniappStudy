<template>
	<cj-signed-version v-if="signShow" @success='success' @cancel="cancel"></cj-signed-version>
</template>

<script>
	import {
		GetFullUrlByKey,
		GetSignPath
	} from '../../../share/resources/confirm.js'
	import AssetController from '@/service/controller/asset/assetController.js'
	import {
		send
	} from '@/share/http/axios.js'
	import {
		pathToBase64
	} from '../../../share/util/image-tools.js'
	export default {
		data() {
			return {
				signShow: false,
				ID: "",
				SignPictureUrl: "",
				ProductType: "",
				BillType: "",
				ActivityID: "",
				ActivityName: "",
				apiPath: '/BillApproval/ApprovalFlow/Sign',
			}
		},
		methods: {
			cancel() {
				uni.navigateBack({
					delta: 1
				});
			},
			async success(file) {
				let base64str = file.tempFilePath;
				//#ifndef H5
				//H5 下返回的tempFilePath为base64
				base64str = await pathToBase64(file.tempFilePath);
				console.log(base64str)
				//#endif
				if (typeof dd === "object") {
					AssetController.uploadRotate(base64str).then((res) => {
						let target = res;
						send(this.apiPath, {
							ID: parseInt(this.billID),
							IsPass: true,
							SignPictureUrl: target.UploadedFileInfo.FileUrl
						}).then(() => {
							uni.navigateBack({
								delta: 1
							});
						});
					})
				} else {
					AssetController.uploadSignImageByBase64(base64str).then((res) => {
						let target = res;
						let data = {
							ID: parseInt(this.ID),
							SignPictureUrl: target.UploadedFileInfo.FileUrl,
							ProductType: this.ProductType,
							BillType: this.BillType,
							ActivityID: this.ActivityID,
							ActivityName: this.ActivityName
						};
						send(this.apiPath, data).then(() => {
							uni.navigateBack({
								delta: 1
							});
						});
					
					})
				}
				
			}
		},
		mounted() {
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let options = routes[routes.length - 1].options
			this.ID = options.ID;
			this.ProductType = options.ProductType;
			this.BillType = options.BillType;
			this.ActivityID = options.ActivityID;
			this.ActivityName = options.ActivityName;
			this.apiPath = GetSignPath(this.apiPath);
			this.signShow=true;
		}
	}
</script>

<style>
</style>
