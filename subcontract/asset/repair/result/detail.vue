<template>
	<uni-popup ref="addFaultType" type="dialog">
		<uni-popup-dialog mode="input" title="添加故障类型" value="" placeholder="请输入故障类型"
			@confirm="addFaultTypeConfirm"></uni-popup-dialog>
	</uni-popup>
	<!-- 输入类型弹框 -->
	<uni-popup ref="inputDialog" type="dialog">
		<uni-popup-dialog mode="input" title="录入信息" :value="inputVal" placeholder="请输入信息"
			@confirm="inputDialogConfirm"></uni-popup-dialog>
	</uni-popup>
	<uni-popup ref="assetDialog" type="dialog">
		<uni-popup-cancel-dialog title="选择资产" @close="assetDialog.close()">
			<view class="retrieval" :style="`height:${windowHeights / 2}px`">
				<uni-list>
					<uni-list-item v-for="(item,index) in assetList" :key="index" @click="clickItem(item)" link>
						<template v-slot:body>
							<view class="retrieval_content">
								<view class="retrieval_item">
									<text class="retrieval_item_title">{{item.Name}}</text>
									<view class="retrieval_item_row">
										<text>资料编码：{{item.Code}}</text>
									</view>
									<view class="retrieval_item_row">
										<text>资产分类 ：{{item.CategoryName}}</text>
									</view>
									<view class="retrieval_item_row">
										<text>品牌：{{item.Brand}}</text>
									</view>
									<view class="retrieval_item_row">
										<text>规格：{{item.Spec}}</text>
									</view>
									<view class="retrieval_item_row">
										<text>型号：{{item.Model}}</text>
									</view>
								</view>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
			</view>
		</uni-popup-cancel-dialog>
	</uni-popup>
	<view class="nav-search">
			<uni-easyinput prefixIcon="search" v-model="repairInfo.keywords" placeholder="编码/名称" @iconClick="refreshList"
				confirmType="search" trim="both" :inputBorder="false" @confirm="refreshList" @clear="refreshList" />
			<uni-icons type="scan" color="#2979ff" size="25" @click="scan"></uni-icons>
		</view>
	<view class="repair_content">
		<view class="repair_item_content">
			<scroll-view :style="`height:${IsScroll}px`" scroll-y>
					<uni-section title="资产信息" type="line"></uni-section>
					<view class="bill_header">
						<uni-list>
							<uni-list-item disabled>
								<template v-slot:header>
									<view class="bill_header_label">
										<text class="item_label_color ensp" selectable>资产名称：</text>
									</view>
								</template>
								<template v-slot:body>
									<view class="item_text_content">
										{{assetInfo.Name}}
									</view>
								</template>
							</uni-list-item>
							<uni-list-item disabled>
								<template v-slot:header>
									<view class="bill_header_label">
										<text class="item_label_color ensp" selectable>资产编码：</text>
									</view>
								</template>
								<template v-slot:body>
									<view class="item_text_content">
										{{assetInfo.Code}}
									</view>
								</template>
							</uni-list-item>
							<uni-list-item disabled>
								<template v-slot:header>
									<view class="bill_header_label">
										<text class="item_label_color ensp" selectable>存放位置：</text>
									</view>
								</template>
								<template v-slot:body>
									<view class="item_text_content">
										{{assetInfo.LocationName}}
									</view>
								</template>
							</uni-list-item>
							<uni-list-item disabled>
								<template v-slot:header>
									<view class="bill_header_label">
										<text class="item_label_color ensp" selectable>资产分类：</text>
									</view>
								</template>
								<template v-slot:body>
									<view class="item_text_content">
										{{assetInfo.CategoryName}}
									</view>
								</template>
							</uni-list-item>
							<uni-list-item disabled>
								<template v-slot:header>
									<view class="bill_header_label">
										<text class="item_label_color ensp">品牌：</text>
									</view>
								</template>
								<template v-slot:body>
									<view class="item_text_content">
										{{assetInfo.Brand}}
									</view>
								</template>
							</uni-list-item>
							<uni-list-item disabled>
								<template v-slot:header>
									<view class="bill_header_label">
										<text class="item_label_color ensp">规格：</text>
									</view>
								</template>
								<template v-slot:body>
									<view class="item_text_content">
										{{assetInfo.Spec}}
									</view>
								</template>
							</uni-list-item>
							<uni-list-item disabled>
								<template v-slot:header>
									<view class="bill_header_label">
										<text class="item_label_color ensp">型号：</text>
									</view>
								</template>
								<template v-slot:body>
									<view class="item_text_content">
										{{assetInfo.Model}}
									</view>
								</template>
							</uni-list-item>
						</uni-list>
					</view>
					<uni-section title="资产图片" type="line">
						<uni-grid :column="3">
							<uni-grid-item v-for="(img, i) in assetInfo.AssetPics">
								<image class="fill" mode="scaleToFill" :src="getFileUrl(img.FileUrl)" @click="repairPicsClick(getFileUrl(img.FileUrl))" />
							</uni-grid-item>
							<uni-grid-item v-if="assetInfo.AssetPics==null">
								<image class="fill" src="/static/images/zw.png" mode="scaleToFill" />
							</uni-grid-item>
						</uni-grid>
					</uni-section>
					<view class="bill_header">
						<uni-list>
							<uni-list-item>
								<template v-slot:header>
									<view class="bill_header_label">
										<text class="required">*</text>
										<text class="item_label_color">维修结果：</text>
									</view>
								</template>
								<template v-slot:body>
									<view class="item_text_content">
										<uni-data-picker v-slot:default="{ data, error, options }" class="data-picker-request-draw"
											placeholder="请选择申领原因" :border="false" :clear-icon="false"
											:localdata="repairInfo.result.options" @input="repairChange"
											v-model="repairInfo.result.value">
											<text class="item_text_content"
												:class="repairInfo.result.value ? 'content_effective' : ''">{{
								repairInfo.result.value
								? repairInfo.result.text
								: "请选择维修结果"
							}}</text>
										</uni-data-picker>
									</view>
								</template>
								<template v-slot:footer>
									<view class="info-flex">
										<view class="content_delete_icon">
											<view>
												<uni-icons v-if="nonEditable ? false : repairInfo.result.value"
													@click="removeInput('result')" type="close" size="16"></uni-icons>
											</view>
										</view>
										<view class="content_delete_icon">
											<view></view>
										</view>
									</view>
								</template>
							</uni-list-item>
							<uni-list-item>
								<template v-slot:header>
									<view class="bill_header_label">
										<text class="item_label_color ensp">维修方：</text>
									</view>
								</template>
								<template v-slot:body>
									<text class="item_text_content" :class="repairInfo.maintainer.value ? 'content_effective' : ''"
										@click="InputInformation('maintainer')">{{
						repairInfo.maintainer.value ? repairInfo.maintainer.value : "请输入维修方"
						}}</text>
								</template>
								<template v-slot:footer>
									<view class="info-flex">
										<view class="content_delete_icon">
											<view>
												<uni-icons v-if="repairInfo.maintainer.value" @click="removeInput('maintainer')"
													type="close" size="16"></uni-icons>
											</view>
										</view>
										<view class="content_delete_icon">
											<view></view>
										</view>
									</view>
								</template>
							</uni-list-item>
							<uni-list-item>
								<template v-slot:header>
									<view class="bill_header_label">
										<text class="item_label_color ensp">维修人员：</text>
									</view>
								</template>
								<template v-slot:body>
									<text class="item_text_content" :class="repairInfo.repairPersonnel.value ? 'content_effective' : ''"
										@click="InputInformation('repairPersonnel')">{{
						repairInfo.repairPersonnel.value ? repairInfo.repairPersonnel.value : "请输入维修人员"
						}}</text>
								</template>
								<template v-slot:footer>
									<view class="info-flex">
										<view class="content_delete_icon">
											<view>
												<uni-icons v-if="repairInfo.repairPersonnel.value"
													@click="removeInput('repairPersonnel')" type="close" size="16"></uni-icons>
											</view>
										</view>
										<view class="content_delete_icon">
											<view></view>
										</view>
									</view>
								</template>
							</uni-list-item>
							<uni-list-item>
								<template v-slot:header>
									<view class="bill_header_label">
										<text class="item_label_color ensp">联系电话：</text>
									</view>
								</template>
								<template v-slot:body>
									<text class="item_text_content" :class="repairInfo.phone.value ? 'content_effective' : ''"
										@click="InputInformation('phone')">{{
						repairInfo.phone.value ? repairInfo.phone.value : "请输入联系电话"
						}}</text>
								</template>
								<template v-slot:footer>
									<view class="info-flex">
										<view class="content_delete_icon">
											<view>
												<uni-icons v-if="repairInfo.phone.value" @click="removeInput('phone')" type="close"
													size="16"></uni-icons>
											</view>
										</view>
										<view class="content_delete_icon">
											<view></view>
										</view>
									</view>
								</template>
							</uni-list-item>
							<uni-list-item>
								<template v-slot:header>
									<view class="bill_header_label">
										<text class="required">*</text>
										<text class="item_label_color">维修费用：</text>
									</view>
								</template>
								<template v-slot:body>
									<text class="item_text_content" :class="repairInfo.cost.value ? 'content_effective' : ''"
										@click="InputInformation('cost')">{{
						repairInfo.cost.value ? repairInfo.cost.value : "请输入维修费用"
						}}</text>
								</template>
								<template v-slot:footer>
									<view class="info-flex">
										<view class="content_delete_icon">
											<view>
												<uni-icons v-if="repairInfo.cost.value" @click="removeInput('cost')" type="close"
													size="16"></uni-icons>
											</view>
										</view>
										<view class="content_delete_icon">
											<view></view>
										</view>
									</view>
								</template>
							</uni-list-item>
							<uni-list-item>
								<template v-slot:header>
									<view class="bill_header_label">
										<text class="item_label_color ensp">维修日期：</text>
									</view>
								</template>
								<template v-slot:body>
									<view class="item_text_content">
										<picker mode="date" @change="repairDateChange">
											<text class="item_text_content"
												:class="repairInfo.repairDateTime.value ? 'content_effective' : ''">
												{{
								repairInfo.repairDateTime.value
								? repairInfo.repairDateTime.value
								: "请选择日期"
							}}
											</text>
										</picker>
									</view>
								</template>
								<template v-slot:footer>
									<view class="info-flex">
										<view class="content_delete_icon">
											<view>
												<uni-icons v-if="nonEditable ? false : repairInfo.repairDateTime.value"
													@click="removeInput('repairDateTime')" type="close" size="16"></uni-icons>
											</view>
										</view>
										<view class="content_delete_icon">
											<view></view>
										</view>
									</view>
								</template>
							</uni-list-item>
							<uni-list-item>
								<template v-slot:header>
									<view class="bill_header_label">
										<text class="item_label_color ensp">故障类型：</text>
									</view>
								</template>
								<template v-slot:body>
									<view class="item_text_content">
										<uni-data-picker v-slot:default="{ data, error, options }" class="data-picker-request-draw"
											:border="false" :clear-icon="false" :localdata="repairInfo.faultType.options"
											@input="faultTypeChange" v-model="repairInfo.faultType.value">
											<text class="item_text_content"
												:class="repairInfo.faultType.value ? 'content_effective' : ''">{{
										repairInfo.faultType.value
										? repairInfo.faultType.text
										: "请选择故障类型"
									}}</text>
										</uni-data-picker>
									</view>
								</template>
								<template v-slot:footer>
									<view class="info-flex">
										<view class="content_delete_icon">
											<view>
												<uni-icons v-if="repairInfo.faultType.value" @click="removeInput('faultType')"
													type="close" size="16"></uni-icons>
											</view>
										</view>
										<view class="content_delete_icon">
											<view>
												<uni-icons v-if="assetInfo.AssetCategoryID > 0" color="blue" type="plusempty" @click="addFaultType.open()" size="16"></uni-icons>
											</view>
										</view>
									</view>
								</template>
							</uni-list-item>
						</uni-list>
					</view>
					<view class="reason">
						<uni-list>
							<uni-list-item>
								<template v-slot:header>
									<view class="repair_reason">
										<text class="required">*</text>
										<text class="item_label_color">报修原因：</text>
									</view>
								</template>
								<template v-slot:body>
									<view class="list-item-textarea">
										<uni-easyinput type="textarea" v-model="repairInfo.repairReason.value" maxlength="400"
											autoHeight placeholder="请输入报修原因" />
									</view>
								</template>
							</uni-list-item>
						</uni-list>
					</view>
					<uni-section title="维修图片" type="line">
						<uni-file-picker ref="filePicker" :limit="9" file-mediatype="image" file-extname="jpg,jpeg,png" mode="grid"
							v-model="files" :auto-upload="false" @select="select" @delete="deletefile">
						</uni-file-picker>
					</uni-section>
			</scroll-view>
		</view>	
	</view>

	
	<view class="colum_confirm_cancel">
		<button type="primary" @click="submit()">确定</button>
		<button type="info" @click="goBack()">取消</button>
	</view>
</template>

<script>
	import { navigateBack } from "../../../../share/redirect/index";
	import assetController from "../../../../service/controller/asset/assetController";
	import assetRepairResultController from "../../../../service/controller/asset/assetRepairResultController";
	import {
		reactive,
		ref,
		computed,
		nextTick,
		getCurrentInstance
	} from "vue";
	import {
		showOkToast,
		showErrorToast,
		showLoading,
		clearLoading,
	} from "../../../../share/util/message";
	import UniFilePicker from "../../../../components/uni-file-picker/components/uni-file-picker/uni-file-picker.vue";
	import {
		getFileUrl
	} from "../../../../share/http/serveUrl";
	import {
		previewImg
	} from "../../../../share/util/image";
	

	function picturesConvertUni(pictures) {
		return pictures.map((p) => {
			const name = p.FileName;
			const i = name.lastIndexOf(".");
			//组装uniapp上传组件需要的数据
			return {
				...p,
				name: name,
				url: getFileUrl(p.FileUrl),
				extname: name.substr(i + 1),
			};
		});
	}

	export default {
		components: {
			UniFilePicker,
		},
		setup() {
			const repairInfo = ref({
				// 检索条件
				keywords: null,
				// 维修结果
				result: {
					text: null,
					value: null,
					options: [{
						text: '已修复',
						value: 1
					}, {
						text: '待继续修复',
						value: 2
					}, {
						text: '不可修复',
						value: 3
					}, ]
				},
				// 维修方
				maintainer: {
					hint: "请输入维修方",
					value: null,
				},
				// 维修人员
				repairPersonnel: {
					hint: "请输入维修人员",
					value: null,
				},
				// 联系电话
				phone: {
					hint: "请输入联系电话",
					vlaue: null,
				},
				// 维修费用
				cost: {
					hint: "请输入维修费用",
					value: null,
				},
				// 维修日期
				repairDateTime: {
					hint: "请选择维修日期",
					value: null,
				},
				// 故障类型
				faultType: {
					hint: "请选择故障类型",
					text: null,
					value: null,
					options: [{
						text: '测试数据1',
						value: 1
					}]
				},
				// 报修原因
				repairReason: {
					hint: '请输入报修原因',
					value: null,
				}
			});
			const assetDialog = ref(null);

			const assetInfo = ref({});

			const assetList = ref([]);

			const files = ref([]);

			const isfiles = ref(true);

			const assetPicture = ref([]);
			const faultType=ref(null);

			const inputKey = ref(null);

			const inputVal = ref(null);

			const addFaultType = ref(null);

			const inputDialog = ref(null);

			const windowHeights = ref(null);

			function refreshList(keyword) {
				if (!keyword) {
					return
				}
				showLoading();
				assetRepairResultController.assetListQueryByBillType(keyword).then(({
					Items
				}) => {
					if (Items.length) {
						assetList.value = Items;
						assetDialog.value.open();
					}else{
						showErrorToast('暂未查询到有效数据');
					}
				}).finally(() => clearLoading());
			}

			function repairChange(val) {
				repairInfo.value.result.text = repairInfo.value.result.options.filter(
					(p) => p.value == val
				)[0].text;
				repairInfo.value.result.value = val;
			}

			function faultTypeChange(val) {
				repairInfo.value.faultType.text = repairInfo.value.faultType.options.filter(
					(p) => p.value == val
				)[0].text;
				repairInfo.value.faultType.value = val;
			}

			function removeInput(key) {
				if (key == 'result' || key == 'faultType') {
					repairInfo.value[key].text = null;
					repairInfo.value[key].value = null;
				} else {
					repairInfo.value[key].value = null;
				}
			}

			// 上传图片
			function select({
				tempFilePaths
			}) {
				showLoading();
				assetController
					.uploadImage(tempFilePaths)
					.then((res) => {
						isfiles.value = false;
						const _files = picturesConvertUni(res);
						files.value.push(..._files);
						nextTick(() => {
							isfiles.value = true;
						});
					}).finally(() => clearLoading());
			}
			// 删除附件
			function deletefile({
				tempFile
			}) {
				const i = files.value.findIndex((p) => p === tempFile);
				files.value.splice(i, 1);
				isfiles.value = false;
				nextTick(() => {
					isfiles.value = true;
				});
			}

			function clickItem(item) {
				assetInfo.value = item;
		
			getFalutTypeList()
				assetDialog.value.close();
			}

			function repairPicsClick(url) {
				previewImg(url);
			}

			function InputInformation(key) {
				inputKey.value = key;
				inputVal.value = repairInfo.value[key].value;
				inputDialog.value.open();
				
			}
			function getFalutTypeList(){
				assetRepairResultController.getFalutTypeListByCategoryID({AssetCategoryID:assetInfo.value.AssetCategoryID}).then((res)=>{
					
					const typeList = [];
					
					 res.FaultType.forEach((item) => {
					     
						 typeList.push({text:item.Name,value:item.ID});
					 })
					repairInfo.value.faultType.options = typeList;
				})
			}
		

			function inputDialogConfirm(val) {
				const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
				if(inputKey.value=='cost' && !reg.test(val)){
					showErrorToast('请输入正确的金额');
					return
				}
				repairInfo.value[inputKey.value].value = val;

			}

			function addFaultTypeConfirm(newVal){
				assetRepairResultController.submitFalutTypeInfo({Name:newVal,AssetCategoryID:assetInfo.value.AssetCategoryID}).then((res)=>{
					showOkToast("添加成功！");
					getFalutTypeList()
				});
			}

			// 扫码查询
			function scan() {
			uni.scanCode({
				scanType: ["barCode", "qrCode"],
				success: ({ result }) => {
					refreshList(result);
				},
			});
			}

			{
				// 获取屏幕高度
				uni.getSystemInfo({
					success: (result) => {
						windowHeights.value = result.windowHeight;
					},
				})
			}

			// 屏幕可视区域是否需要滚动处理
			let IsScroll = computed(() => {
				return windowHeights.value - 190;
			});

			function submit() {
				if(!assetInfo.value.ID){
					showErrorToast('请检索需要报修的资产');
					return
				}
				if(!repairInfo.value.result.value){
					showErrorToast('请选择维修结果');
					return
				}
				if(!repairInfo.value.cost.value){
					showErrorToast('请输入维修费用');
					return
				}
				if(!repairInfo.value.repairReason.value){
					showErrorToast('请输入报修原因');
					return
				}
				const data={
					RelatedID:null,
					AssetID:assetInfo.value.ID,
					AssetOriginalAmount:assetInfo.value.OriginalAmount,
					RepairedResult:repairInfo.value.result.value,
					RepairCorp:repairInfo.value.maintainer.value,
					Repairer:repairInfo.value.repairPersonnel.value,
					RepairerTelephone:repairInfo.value.phone.value,
					RepairedCost:repairInfo.value.cost.value,
					RepairedDate:repairInfo.value.repairDateTime.value,
					FaultTypeID:repairInfo.value.faultType.value,
					RepairedDesc:repairInfo.value.repairReason.value,
					AssetPics:files.value
				};
					assetRepairResultController.submitRepairInfo(data).then((res)=>{
					showOkToast('操作成功！');
					navigateBack();
					});
			}
			function goBack(){
				 navigateBack();
			}

			return {
				repairDateChange: ({
					detail: {
						value
					}
				}) => {
					repairInfo.value.repairDateTime.value = value;
				},
				repairInfo,
				IsScroll,
				refreshList,
				removeInput,
				getFileUrl,
				goBack,
				repairChange,
				select,
				deletefile,
				assetPicture,
				repairPicsClick,
				assetList,
				assetInfo,
				assetDialog,
				clickItem,
				submit,
				faultTypeChange,
				addFaultType,
				inputDialog,
				inputKey,
				inputVal,
				addFaultTypeConfirm,
				inputDialogConfirm,
				InputInformation,
				scan,
				windowHeights,
			}
		},
	};
</script>

<style lang="scss" scoped>
	.repair_content{
		padding: 5px;
    	background: #f2f1f6;
		>.repair_item_content{
			background: #fff;
			border-radius: 10px;
			overflow: hidden;
			padding: 10px 5px;
		}
	}

	.nav-search {
		border-radius: 10px;
		display: flex;
		align-items: center;
	}

	.nav-search ::v-deep .uni-icons {
		margin: 0 10px;
	}

	.repair_reason{
		width: 100px;
		display: flex;
		align-items: flex-start;
		>.required{
			display: flex;
			align-items: center;
			color: red;
			width: 10px;
			margin-left: 5px;
			text-align: center;
		}
		>.item_label_color{
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size: 14px;
			color: #333;
			white-space: nowrap;
		}
	}

	.reason ::v-deep .uni-list--border-top{
		display: none;
	}

	.list-item-textarea {
		width: calc(100% - 100px);
	}
</style>
