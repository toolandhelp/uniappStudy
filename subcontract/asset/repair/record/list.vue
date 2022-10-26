<template>
        <uni-list>
            <uni-list-item>
                <template v-slot:body>
                    <view class="width-fill">
                        <view class="list-item_row">
                            <text>资产名称：</text>
                            <text>{{assetInfo.AssetName}}</text>
                        </view>
                        <view class="list-item_col">
                            <view>资产编码：<text selectable>{{assetInfo.AssetCode}}</text></view>
                            <view>原编码：<text selectable>{{assetInfo.OriginalCode}}</text></view>
                        </view>
                        <view class="list-item_col">
                            <view>管理人员：{{assetInfo.KAEName}}</view>
                            <view>使用人员：{{assetInfo.UAEName}}</view>
                        </view>
                        <view class="list-item_row">
                            <text>管理部门：</text>
                            <text>{{assetInfo.KAOName}}</text>
                        </view>
                        <view class="list-item_row">
                            <text>使用部门：</text>
                            <text>{{assetInfo.UAOName}}</text>
                        </view>
                        <view class="list-item_row">
                            <text>资产分类：</text>
                            <text>{{assetInfo.AssetCategoryName}}</text>
                        </view>
                        <view class="list-item_row">
                            <text>存放位置：</text>
                            <text>{{assetInfo.LocationName}}</text>
                        </view>
                        
                        <view class="list-item_col">
                            <view>数量：{{assetInfo.Qty}}</view>
                            <view>原值：{{assetInfo.OriginalAmountText}}</view>
                        </view>
                        <view class="list-item_col">
                            <view>品牌：{{assetInfo.Brand}}</view>
                            <view>规格：{{assetInfo.Space}}</view>
                        </view>
                        <view class="list-item_col">
                            <view>型号：{{assetInfo.Model}}</view>
                        </view>
                    </view>
                </template>
            </uni-list-item>
            <uni-list-item>
                <template v-slot:body>
                    <view class="width-fill">
                        <view class="list-item_row">
                            <text>报修单号：</text>
                            <text selectable>{{assetInfo.RequestCode}}</text>
                        </view>
                        <view class="list-item_col">
                            <view>报修人：{{assetInfo.OperatorEmployeeName}}</view>
                            <view>报修日期：{{assetInfo.RequestRepairDatetime}}</view>
                        </view>
                        <view class="list-item_row">
                            <text>报修原因：</text>
                            <text>{{assetInfo.RequestReason}}</text>
                        </view>
                    </view>
                </template>
            </uni-list-item>
            <uni-list-item>
                <template v-slot:body>
                    <view class="width-fill">
                        <view class="list-item_row">
                            <text>维修单号：</text>
                            <text selectable>{{assetInfo.RepairCode}}</text>
                        </view>
                        <view class="list-item_col">
                            <view>故障类型：{{assetInfo.FaultName}}</view>
                            <view>维修日期：{{assetInfo.RepairedDate?assetInfo.RepairedDate.substring(0,10):""}}</view>
                        </view>
                        <view class="list-item_col">
                            <view>维修方：{{assetInfo.RepairCorp}}</view>
                            <view>维修人员：{{assetInfo.Repairer}}</view>
                        </view>
                        <view class="list-item_col">
                            <view>维修费用：{{assetInfo.RepairedCostText}}</view>
                            <view>维修结果：{{assetInfo.RepairedResult}}</view>
                        </view>
                        <view class="list-item_row">
                            <text>报修原因：</text>
                            <text>{{assetInfo.RequestReason}}</text>
                        </view>
                        <view class="list-item_row">
                            <text>维修说明：</text>
                            <text>{{assetInfo.RepairedDesc}}</text>
                        </view>
                    </view>
                </template>
            </uni-list-item>
        </uni-list>
        <uni-section title="报修图片" type="line">
            <uni-grid :column="3">
                
                <uni-grid-item v-for="(img, i) in applyRepairPics">
                    <image class="fill" mode="scaleToFill" :src="img" @click="imgApplyRepairPicsClick(i)" />
                </uni-grid-item>
                <uni-grid-item v-if="applyRepairPics.length < 1">
                    <image class="fill" mode="scaleToFill" src="/static/images/zw.png" />
                </uni-grid-item>
            </uni-grid>
        </uni-section>
        <uni-section title="维修图片" type="line">
            <uni-grid :column="3">
                <uni-grid-item v-for="(img, i) in repairResultPics">
                    <image class="fill" mode="scaleToFill" :src="img" @click="imgRepairResultPicsClick(i)" />
                </uni-grid-item>
                <uni-grid-item v-if="repairResultPics.length < 1">
                    <image class="fill" mode="scaleToFill" src="/static/images/zw.png" />
                </uni-grid-item>
            </uni-grid>
        </uni-section>
</template>
<script>
import UniFilePicker from "../../../../components/uni-file-picker/components/uni-file-picker/uni-file-picker.vue";
import { reactive, ref,nextTick } from "vue";
import { getFileUrl } from "../../../../share/http/serveUrl";
import { previewImgs } from "../../../../share/util/image";
import { useStore } from "vuex";
export default {
     components: {
     UniFilePicker,
     },
     props:{
          id:String
     },
     setup({id}) {
          const repairReason = ref("");//报修原因
          const windowHeights = ref("");
          const files = ref([]);
          const store = useStore();
          const repairData = store.state.repairRecord.detailInfo.data;
          const assetInfo = repairData[0];
          const applyRepairPics = repairData[0].ApplyRepairPics.map(p=>{
              return getFileUrl(p.FileUrl);
          });
          const repairResultPics = repairData[0].RepairResultPics.map(p=>{
              return getFileUrl(p.FileUrl);
          });
          // 查看资产图片
          function imgApplyRepairPicsClick(index) {
            previewImgs(applyRepairPics, index);
          }
          function imgRepairResultPicsClick(index) {
            previewImgs(repairResultPics, index);
          }
          // 获取屏幕高度
          uni.getSystemInfo({
               success: (result) => {
               windowHeights.value = result.windowHeight;
               },
          })
          return {
               assetInfo,
               applyRepairPics,
               repairResultPics,
               repairReason,
               windowHeights,
               imgApplyRepairPicsClick,
               imgRepairResultPicsClick,
               files,
          }
     }
}
</script>
<style lang="scss" scoped>
     .list-item {
          display: flex;
          width: 100%;
          flex-direction: column;
     }
     .list-item_col{
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          font-size: 12px;  
          color: #999;
          padding: 5px 0;
          >view{
               width: 50%;
               overflow: hidden;
               white-space: nowrap;
               text-overflow: ellipsis;
          }
     }
     .list-item_row{
          display: flex;
          width: 100%;
          font-size: 12px;  
          color: #999;
          padding: 5px 0;
            >text:nth-child(1){
                white-space: nowrap;
            }
     }
     .list-item-warp{
          white-space: pre-line !important;
     }
     .repair-request-detail{
          // height: calc(100% - 120px);
          overflow-y: auto;
     }
     .repair-request-button{
          width: 100%;
          height: 100px;
          background: rgb(237, 237, 237);
          // position: fixed;
          bottom: 0;
          display: flex;
          justify-content: flex-end;
          flex-wrap: wrap;
          text-align: right;
          padding: 10px 0;
          button {
               width: 100%;
               font-size: 14px;
               font-weight: bold;
               color: #fff;
               margin: 0 5px;
               border-radius: 5px;
               &:first-child{
                    margin-bottom: 10px;
               }
               &:last-child{
                    color: #000;
               }
          }
     }
</style>