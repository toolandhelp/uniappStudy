<template>
  <!-- 锚点与数量 -->
  <AnchorPointAndQty
  :qty="list.length"
  :totalQty="totalQty"
  :scrollAreaHeight="windowHeights - 105"
  :scrollTopDistance="scrollTopDistance" 
  @scrollTop="toIndex = 'scrollTop'" 
  />
  <!-- 保存弹框 -->
  <uni-popup ref="saveDialog" class="saveDialog" type="dialog">
    <uni-popup-dialog
      model="base"
      type="info"
      cancelText="取消"
      confirmText="确认"
      title="盘点结束"
      content="保存后，视为资产盘点结束；未盘点到的资产视为缺失。确定要保存吗？"
      @confirm="saveDialogConfirm"
    ></uni-popup-dialog>
  </uni-popup>
  <uni-popup ref="inputCodeDialog" type="dialog">
    <uni-popup-dialog
      mode="input"
      title="输入资产编码检索资产"
      value=""
      placeholder="输入资产编码"
      @confirm="inputCodeConfirm"
    />
  </uni-popup>
  <view class="title">
    <view class="title-left bold">
      <text class="text-ellipsis title-left-width" selectable>
        盘点单号：{{ code }}
      </text>
      <text class="text-ellipsis title-left-width" selectable>
        盘点主题：{{ title }}
      </text>
    </view>
    <view class="title-right">
      <view>条数：{{ list.length }}</view>
      <button type="primary" class="center" @click="saveDialog.open()">
        保存
      </button>
    </view>
  </view>
   <view class="list-style">
     <view class="list-content">
       <scroll-view
            :style="`height:${windowHeights - 138}px`"
            @scrolltolower="reachBottom"
            @scroll="scroll"
            :scroll-into-view="toIndex"
            :scroll-with-animation="false"
            scroll-y
          >
            <view id="scrollTop"></view>
            <view class="list-item_card" style="background:#fff" v-for="{
                  TaskAssetID,
                  Code,
                  Name,
                  OriginalCode,
                  Brand,
                  Spec,
                  Model,
                  Qty,
                  ActualQty,
                  AssetPics,
                  StockCheckDesc,
                  AssetPictureUrl,
                  KAOName,
                  KAEName,
                  UAOName,
                  UAEName,
                  LocationName,
                  StockConfirmResultText,
                  InventoryModel,
                },index in list"
                :key="TaskAssetID"
                @click="itemClick(TaskAssetID)">
              <view>
                <text class="bold">{{ Name }}</text>
              </view>
              <view class="list-item-col">
                <text selectable>资产编码：{{ Code }}</text>
                <text selectable>原编码：{{ OriginalCode }}</text>
              </view>
              <view class="list-item-col">
                <text>管理部门：{{ KAOName }}</text>
                <text>管理人员：{{ KAEName }}</text>
              </view>
              <view class="list-item-col">
                <text>使用部门：{{ UAOName }}</text>
                <text>使用人员：{{ UAEName }}</text>
              </view>
              <view class="list-item-row">
                <text>存放位置：</text>
                <text>{{ LocationName }}</text>
              </view>
              <view class="list-item-col">
                <view class="bold black-character confirm_results">
                  确认结果：
                  <text
                    style="width:50px"
                    :class="`confirm-tag ${getColor(StockConfirmResultText)}`"
                  >
                    {{ StockConfirmResultText ?? confirmResult.lack }}
                  </text>
                </view>
                <view v-if="InventoryModel === 1">
                  <button
                    class="btn-confirm center"
                    @click.stop="stockConfirm(list[index])"
                  >
                    点击确认结果
                  </button>
                </view>
              </view>
              <view class="list-item-col">
                <text>实盘数：{{ ActualQty }}</text>
                <text>盘点说明：{{ StockCheckDesc }}</text>
              </view>
            </view>
            <view class="nothing" :style="`height:${windowHeights - 138}px`" v-if="list.length < 1">
              暂 无 数 据
            </view>
          </scroll-view>
     </view>
   </view>
  <view class="list_footer_button">
    <view class="center" @click="inputCodeDialog.open()">
      <uni-icons type="compose" color="#2979ff" size="26"></uni-icons>
      <text>手动输入编码</text>
    </view>
    <view class="center" @click="scan">
      <uni-icons type="scan" color="#2979ff" size="26"></uni-icons>
      <text>扫码查资产</text>
    </view>
  </view>
</template>

<script>
import inventoryController from "../../../../service/controller/asset/inventoryController";
import { ref } from "vue";
import {
  showLoading,
  clearLoading,
  showErrorToast,
} from "../../../../share/util/message";
import { navigateTo, navigateBack } from "../../../../share/redirect";
import { useStore } from "vuex";
import { getPrevPage } from "../../../../share/util/page";
import { emitPromise, only } from "../../../../share/util/uniEvent";
import eventNames from "../../../../service/enumeration/eventNames";
import { previewImgs } from "../../../../share/util/image";
import { getScanCode } from "../../../../share/util/index";
import { getFileUrl } from "../../../../share/http/serveUrl";
import AnchorPointAndQty from "../../../../components/anchor-point-and-qty/anchor-point-and-qty.vue";

export default {
  components: {AnchorPointAndQty },
  props: {
    id: String,
    code: String,
    title: String,
    employeeTaskID: String,
  },
  setup({ id, employeeTaskID }) {
    const list = ref([]);
    const totalQty = ref(0);
    const toIndex = ref("");
    const scrollTopDistance = ref(0);
    const store = useStore();
    const confirmResult = {
      ok: "正常",
      lack: "缺失",
    };
    const inputCodeDialog = ref(null);

    const saveDialog = ref(null);
    // 获取屏幕高度
    const windowHeights = ref(0);

    {
      showLoading();
      inventoryController
        .detailByEmployee(id)
        .then((p) => {
          list.value = p;
        })
        .finally(() => clearLoading());
      uni.getSystemInfo({
          success: (result) => {
              console.log(result)
              windowHeights.value = result.windowHeight;
          },
      });
    }

    function saveDialogConfirm() {
      save();
    }

    function itemClick(id) {
      navigateTo(`subcontract/asset/assetInfo/assetView?id=${id}&type=list`);
    }

    function stockConfirm(item) {
      store.commit("inventory/setEmployeeItem", item);
      navigateTo("./stockConfirm");
    }

    function setStockResult(item, qty, desc, img) {
      item.StockConfirmResultText =
        qty === item.Qty ? confirmResult.ok : confirmResult.lack;
      item.ActualQty = qty;
      item.StockCheckDesc = desc;
      item.AssetPics = img;
    }
    only(eventNames.employeeStockConfirmBack, setStockResult);

    function getColor(v) {
      return v === confirmResult.ok
        ? "success-background"
        : "warning-background";
    }

    function inputCodeConfirm(v) {
      if (v == "") {
        showErrorToast("资产编码为空");
        return;
      }
      const assets = list.value.filter((p) => p.Code === v);
      if (assets.length === 0) {
        showErrorToast(`【${v}】在当前盘点任务中不存在`);
        return;
      }
      stockConfirm(assets[0]);
    }

    function scan() {
      uni.scanCode({
        scanType: ["barCode", "qrCode"],
        success: ({ result }) => {
          inputCodeConfirm(getScanCode(result));
        },
      });
    }

    function save() {
      showLoading();
      inventoryController
        .submitEmployeeTask(id, employeeTaskID, list.value)
        .then(() => {
          emitPromise(eventNames.employeeInvDetailBack).then(() =>
            navigateBack()
          );
        })
        .finally(() => clearLoading());
    }

    // 查看资产图片
    function previewFiles(files, index) {
      const imgs = files.map((p) => {
        return getFileUrl(p.FileUrl);
      });
      previewImgs(imgs, index);
    }

    function scroll({detail}){
      scrollTopDistance.value = detail.scrollTop;
      toIndex.value = '';
    }

    return {
      list,
      toIndex,
      totalQty,
      scroll,
      scrollTopDistance,
      itemClick,
      stockConfirm,
      getColor,
      confirmResult,
      inputCodeDialog,
      inputCodeConfirm,
      scan,
      save,
      saveDialog,
      saveDialogConfirm,
      previewFiles,
      getFileUrl,
      windowHeights,
    };
  },
};
</script>

<style lang="scss" scoped>
.title {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 10px 5px;
  .title-left {
    width: 60%;
    flex: 0 0 calc(100% - 120px);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .title-left-width {
    width: 100%;
  }
  .title-right {
    flex: 0 0 120px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    button {
      width: 60px;
      height: 30px;
      font-size: 12px;
      padding: 0;
    }
    view:nth-child(1) {
      display: flex;
      align-items: center;
    }
  }
}
.content {
  box-sizing: border-box;
  height: calc(100% - 45px - 70px);
  min-height: calc(100% - 45px - 70px);
  .list-item {
    display: flex;
    flex-direction: column;
  }
  .list-item-column {
    font-size: 12px;
    color: #999;
    display: flex;
    text,
    view {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    & > text,
    view:nth-child(1) {
      width: 180px;
    }
    & > text,
    view:nth-child(2) {
      width: 180px;
    }
  }
}
.black-character {
  color: #000;
  display: flex;
  align-items: center;
}
.btn-confirm {
  padding: 0;
  margin: 0;
  font-size: 12px;
  width: 85px;
  height: 20px;
  background-color: #007aff;
  color: #fff;
}
.confirm-tag {
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
  padding: 2px 5px;
  text-align: center;
  border-radius: 5px;
}
.warning-background {
  background-color: #f3a73f;
  border-color: #f3a73f;
}
.success-background {
  background-color: #18bc37;
  border-color: #18bc37;
}
</style>
