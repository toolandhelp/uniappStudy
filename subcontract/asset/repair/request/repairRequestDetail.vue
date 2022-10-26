<template>
     <view class="content" :style="`height:${windowHeights - 10}px`">
          <view class="content_region">
               <scroll-view  :style="`height:${windowHeights - 140}px`"  scroll-y>
                    <uni-section title="资产信息" type="line"></uni-section>
                    <uni-list>
                         <uni-list-item>
                              <template v-slot:body>
                                   <view class="list-item">
                                        <view class="list-item-header">
                                             <view>
                                                  <img :src="assetInfo.AssetPictureUrl" @click="previewSingleImg"  alt="">
                                             </view>
                                             <view>
                                                  <view>资产编码：<text selectable>{{assetInfo.Code}}</text></view>
                                                  <view>原编码：<text selectable>{{assetInfo.OriginalCode}}</text></view>
                                                  <view>设备序列号：<text selectable>{{assetInfo.SN}}</text></view>
                                                  <view>资产状态：{{assetInfo.AssetStatusText}}</view>
                                                  <view>资产名称：{{assetInfo.Name}}</view>
                                             </view>
                                        </view>
                                   </view>
                              </template>
                         </uni-list-item>
                         <uni-list-item>
                              <template v-slot:body>
                                   <view class="width-fill">
                                        <view class="list-item-colum">
                                             <view>品牌：{{assetInfo.Brand}}</view>
                                             <view>规格：{{assetInfo.Space}}</view>
                                        </view>
                                        <view class="list-item-colum">
                                             <view>型号：{{assetInfo.Model}}</view>
                                             <view>计量单位：{{assetInfo.Unit}}</view>
                                        </view>
                                        <view class="list-item-colum">
                                             <view>管理部门：{{assetInfo.KAOName}}</view>
                                             <view>管理人员：{{assetInfo.KAEName}}</view>
                                        </view>
                                        <view class="list-item-colum">
                                             <view>使用部门：{{assetInfo.UAOName}}</view>
                                             <view>使用人员：{{assetInfo.UAEName}}</view>
                                        </view>
                                        <view class="list-item-row">
                                             <view>资产分类：{{assetInfo.CategoryName}}</view>
                                        </view>
                                        <view class="list-item-row">
                                             <view>存放位置：{{assetInfo.LocationName}}</view>
                                        </view>
                                   </view>
                              </template>
                         </uni-list-item>
                         <uni-list-item>
                              <template v-slot:header>
                                   <text class="list-item-title">报修原因：</text>
                              </template>
                              <template v-slot:body>
                                   <view class="list-item-textarea">
                                        <uni-easyinput type="textarea" @focus="textareaFocus" @blur="textareaBlur" v-model="repairReason"  maxlength="400" autoHeight placeholder="请输入报修原因" />
                                   </view>
                              </template>
                         </uni-list-item>
                    </uni-list>
                    <uni-section title="资产图片" type="line">
                         <uni-file-picker
                         ref="filePicker"
                         :limit="9"
                         file-mediatype="image"
                         file-extname="jpg,jpeg,png"
                         mode="grid"
                         v-model="files"
                         :auto-upload="false"
                         @select="select"
                         @delete="deletefile"
                         >
                         </uni-file-picker>
                    </uni-section>
               </scroll-view>
          </view>
     </view>
     <view class="colum_confirm_cancel">
          <button type="primary" @click="repairConfirm">确定</button>
          <button @click="repairCancel">取消</button>
     </view>
</template>
<script>
import repairRequestController from "../../../../service/controller/asset/repairRequestController";
import assetController from "../../../../service/controller/asset/assetController";
import UniFilePicker from "../../../../components/uni-file-picker/components/uni-file-picker/uni-file-picker.vue";
import { reactive, ref,nextTick } from "vue";
import { getFileUrl } from "../../../../share/http/serveUrl";
import { previewImg } from "../../../../share/util/image";
import { emitPromise } from "../../../../share/util/uniEvent";
import eventNames from "../../../../service/enumeration/eventNames";
import {
  showOkToast,
  showErrorToast,
  showLoading,
  clearLoading,
} from "../../../../share/util/message";
import { redirectTo,navigateBack} from "../../../../share/redirect/index";
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
     props:{
          id:String
     },
     setup({id}) {
          const assetInfo = ref({});
          const files = ref([]);
          const isfiles = ref(true);
          const repairReason = ref("");//报修原因
          const windowHeights = ref("");
          {    
               showLoading();
               repairRequestController.assetGetByID(id).then(({Asset})=>{
                    assetInfo.value = Asset;
                    assetInfo.value.AssetPictureUrl = assetInfo.value.AssetPictureUrl? getFileUrl(Asset.AssetPictureUrl):"/static/images/zw.png";
               }).finally(()=>clearLoading())
          }
          // 报修确认
          function repairConfirm(){
               if(!repairReason.value){
                    showErrorToast('请输入报修原因');
                    return;
               }
               showLoading();
               repairRequestController.requestRepairSubmit(id,repairReason.value,files.value).then(()=>{
                    showOkToast('报修成功');
                    emitPromise(eventNames.repairRequestDetailBack).then(() =>navigateBack());
               }).finally(()=>clearLoading())

          }
          function repairCancel(){
               navigateBack();
          }
          // 查看资产图片
          function previewSingleImg(index){
               if(assetInfo.value.AssetPictureUrl =="/static/images/zw.png")return;
               previewImg(assetInfo.value.AssetPictureUrl);
          }
          // 上传图片
          function select({ tempFilePaths }) {
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
          function deletefile({ tempFile }) {
               const i = files.value.findIndex((p) => p === tempFile);
               files.value.splice(i, 1);
               isfiles.value = false;
               nextTick(() => {
               isfiles.value = true;
               });
          }
          // 获取屏幕高度
          uni.getSystemInfo({
               success: (result) => {
               windowHeights.value = result.windowHeight;
               },
          })
          return {
               assetInfo,
               repairConfirm,
               repairReason,
               repairCancel,
               windowHeights,
               previewSingleImg,
               files,
               isfiles,
               select,
               deletefile,
          }
     }
}
</script>
<style lang="scss" scoped>
    .content{
          background:#f2f1f6;
          padding: 5px;;
          >.content_region{
          padding:5px;
          background: #fff;
          overflow: hidden;
          border-radius: 10px;
       }
    }
     .list-item-textarea{
          width: calc(100% - 80px);
     }
     .list-item {
          display: flex;
          width: 100%;
          flex-direction: column;
     }
     .list-item-title {
          font-weight: bold;
          font-size: 14px;
          width: 80px;
     }

     .list-item-header {
          font-size: 12px;  
          color: #999;
          display: flex;
          padding: 4px 0;
          display: flex;
          align-items: center;
          >view{
               width: 50%;
               display: flex;
               align-items: center;
               &:nth-child(1){
                    width: 130px;
                    img,image{
                         width: 120px;
                         height: 120px;
                         overflow: hidden;
                         background-image: '/static/images/zw.png';
                         background-size: 100% 100%;
                         border-radius: 10px;
                    }
               }
               &:nth-child(2){
                    width: calc(100% - 130px);
                    display: flex;
                    flex-wrap: wrap;
                    margin-left: 10px;
                    view {
                         padding: 5px 0;
                         overflow: hidden;
                         white-space: nowrap;
                         text-overflow: ellipsis;
                         width: 100%;
                    }
               }
                
          }
         
     }

     .list-item-colum{
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          font-size: 12px;  
          color: #999;
          padding: 5px 0;
          view{
               width: 50%;
               overflow: hidden;
               white-space: nowrap;
               text-overflow: ellipsis;
          }
     }
     
     .list-item-row{
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          font-size: 12px;  
          color: #999;
          padding: 5px 0;
          view{
               width: 100%;
               overflow: hidden;
               white-space: nowrap;
               text-overflow: ellipsis;
          }
     }
</style>