<template>
  <!-- 锚点与数量 -->
  <AnchorPointAndQty
  :qty="list.length"
  :totalQty="totalQty"
  :scrollAreaHeight="windowHeights - 115"
  :scrollTopDistance="scrollTopDistance" 
  @scrollTop="toIndex = 'scrollTop'" 
  />
  <!-- 手动输入编码 -->
  <view class="manualInput">
    <uni-popup ref="manualInput" type="dialog">
      <uni-popup-dialog
        mode="input"
        title="输入编码检索"
        placeholder="输入编码检索"
        @confirm="searchQuery"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
  <!-- 报修资产弹框 -->
  <uni-popup ref="assetDialog" type="dialog">
    <uni-popup-cancel-dialog title="选择资产" @close="assetDialogClose">
      <view class="retrieval" :style="`height:${windowHeights / 2}px`">
        <uni-list>
          <uni-list-item
            v-for="{
              ID,
              Code,
              AssetStatusText,
              Name,
              CategoryName,
              LocationName,
            } in assetDialogList"
            :key="ID"
            @click="jumpRepair(ID)"
            link
          >
            <template v-slot:body>
              <view class="retrieval_content">
                <view class="retrieval_item">
                  <text class="retrieval_item_title"
                    >资产编码：{{ Code }}</text
                  >
                  <view class="retrieval_item_row">
                    <text>资产状态：{{ AssetStatusText }}</text>
                  </view>
                  <view class="retrieval_item_row">
                    <text>资产名称：{{ Name }}</text>
                  </view>
                  <view class="retrieval_item_row">
                    <text>资产分类：{{ CategoryName }}</text>
                  </view>
                  <view class="retrieval_item_row">
                    <text>存放位置：{{ LocationName }}</text>
                  </view>
                </view>
              </view>
            </template>
          </uni-list-item>
        </uni-list>
      </view>
    </uni-popup-cancel-dialog>
  </uni-popup>
  <!-- 列表 -->
  <uni-easyinput
    prefixIcon="search"
    v-model="qst"
    placeholder="编码/名称"
    @iconClick="refreshList"
    confirmType="search"
    trim="both"
    :inputBorder="false"
    @confirm="refreshList"
    @clear="refreshList"
  >
  </uni-easyinput>
  <view class="list-style">
      <view class="list-content">
          <scroll-view
            :style="`height:${windowHeights - 115}px`"
            @scrolltolower="reachBottom"
            @scroll="scroll"
            :scroll-into-view="toIndex"
            :scroll-with-animation="false"
            scroll-y
          >
          <view id="scrollTop"></view>
          <view class="list-item_card" style="background:#fff" v-for="{
                AssetCategoryName,
                LocationName,
                RequestCode,
                RequestRepairDatetime,
                Model,
                Qty,
                AssetCode,
                OperatorEmployeeName,
                AssetName,
                Brand,
                Space,
                AssetID,
                RequestReason,
                ApplyRepairPics,
              } in list"
              :key="AssetID"
               @click="itemClick(AssetID)">
            <view>
              <text class="bold">{{ AssetName }}</text>
            </view>
            <view class="list-item-col">
              <text selectable>报修单号：{{ RequestCode }}</text>
              <text selectable>资产编码：{{ AssetCode }}</text>
            </view>
            <view class="list-item-col">
              <text>报修人员：{{ OperatorEmployeeName }}</text>
              <text>报修日期：{{ RequestRepairDatetime?RequestRepairDatetime.substring(0,10):"" }}</text>
            </view>
            <view class="list-item-row">
              <text>资产分类：</text>
              <text>{{ AssetCategoryName }}</text>
            </view>
            <view class="list-item-row">
              <text>存放位置：</text>
              <text>{{ LocationName }}</text>
            </view>
            <view class="list-item-row">
              <text>报修原因：</text>
              <text>{{ RequestReason }}</text>
            </view>
            <uni-grid :column="4">
              <uni-grid-item v-for="(img, i) in ApplyRepairPics">
                <image class="fill" mode="scaleToFill" @click.stop="previewImg(getFileUrl(img.FileUrl))" :src="getFileUrl(img.FileUrl)" />
              </uni-grid-item>
              <uni-grid-item v-if="ApplyRepairPics.length == 0">
                <image class="fill" mode="scaleToFill" src="/static/images/zw.png" />
              </uni-grid-item>
            </uni-grid>
          </view>
          <view class="nothing" :style="`height:${windowHeights - 115}px`" v-if="list.length < 1">
            暂 无 数 据
          </view>
          </scroll-view>
      </view>
  </view>
  <view class="list_footer_button">
    <view class="center" @click="inputkeyword">
      <uni-icons type="compose" color="#2979ff" size="26"></uni-icons>
      <text>手动输入报修</text>
    </view>
    <view class="center" @click="fastRepair">
      <uni-icons type="scan" color="#2979ff" size="26"></uni-icons>
      <text>扫码查询报修</text>
    </view>
  </view>
</template>

<script>
import repairRequestController from "../../../../service/controller/asset/repairRequestController";
import {
  showErrorToast,
  showLoading,
  clearLoading,
} from "../../../../share/util/message";
import { navigateTo, redirectTo } from "../../../../share/redirect/index";
import { reactive, ref } from "vue";
import { onPullDownRefresh, onReachBottom, onUnload } from "@dcloudio/uni-app";
import { only } from "../../../../share/util/uniEvent";
import { getScanCode } from "../../../../share/util/index";
import eventNames from "../../../../service/enumeration/eventNames";
import { useStore } from "vuex";
import AnchorPointAndQty from "../../../../components/anchor-point-and-qty/anchor-point-and-qty.vue";
import { previewImg } from "../../../../share/util/image";
import { getFileUrl } from "../../../../share/http/serveUrl";
export default {
  components: {
    AnchorPointAndQty 
  },
  setup() {
    const qst = ref("");
    let currentPage = 1;
    let pageCount = -1;
    const list = ref([]);
    const totalQty = ref(0);
    const toIndex = ref("");
    const scrollTopDistance = ref(0);
    const manualInput = ref(null);
    const store = useStore();
    // 资产弹窗
    const assetDialog = ref(null);
    const assetDialogList = ref([]);
    async function search() {
      showLoading();
      try {
        const { PageCount, Items,TotalRecordQty } = await repairRequestController.repairList(
          qst.value,
          currentPage
        );
        pageCount = PageCount;
        if (currentPage === 1) {
          list.value = Items;
        } else {
          list.value = list.value.concat(Items);
        }
        totalQty.value = TotalRecordQty;
        uni.stopPullDownRefresh();
        uni.hideNavigationBarLoading();
      } finally {
        clearLoading();
      }
    }

    function refreshList() {
      currentPage = 1;
      toIndex.value = 'scrollTop';
      return search();
    }

    {
      search();
      only(eventNames.repairRequestDetailBack, refreshList);
    }

    function reachBottom() {
      if (currentPage >= pageCount) {
        uni.hideNavigationBarLoading();
        showErrorToast("暂无更多数据");
      } else {
        ++currentPage;
        search();
      }
    }

    onPullDownRefresh(() => {
      refreshList();
    });

    // 快速报修
    function fastRepair() {
      // serachAssetInfo("Z");
      uni.scanCode({
        success(res) {
          var content = getScanCode(res.result);
          serachAssetInfo(content);
        },
        fail() {
          return;
        },
      });
    }

    function serachAssetInfo(code) {
      if (!code) {
        showErrorToast("无效数据,请重新检索");
        return;
      }
      showLoading();
      repairRequestController
        .assetListQueryByBillType(code)
        .then(({ Items }) => {
          assetDialogList.value = Items;
          if (assetDialogList.value.length < 1) {
            showErrorToast("暂未查询到可用资产");
            return;
          }
          assetDialog.value.open();
        })
        .finally(() => clearLoading());
    }

    

    // 取消选择
    function assetDialogClose() {
      assetDialog.value.close();
    }

    // 输入检索
    function inputkeyword() {
      manualInput.value.open();
    }

    function searchQuery(val) {
      serachAssetInfo(val);
    }

    // 跳转维修
    function jumpRepair(id) {
      assetDialog.value.close();
      navigateTo(`subcontract/asset/repair/request/repairRequestDetail?id=${id}`);
    }

    function itemClick(id) {
      const rowData = list.value.filter((p) => p.AssetID == id);
      store.commit("repairRecord/setrepairRecordInfo", rowData);
      navigateTo(`../record/list`);
    }

    function scroll({detail}){
      scrollTopDistance.value = detail.scrollTop;
      toIndex.value = '';
    }

    // 获取屏幕高度
    const windowHeights = ref("");
    uni.getSystemInfo({
      success: (result) => {
        windowHeights.value = result.windowHeight;
      },
    });
    return {
      qst,
      list,
      totalQty,
      toIndex,
      scrollTopDistance,
      scroll,
      refreshList,
      itemClick,
      fastRepair,
      assetDialog,
      assetDialogList,
      assetDialogClose,
      serachAssetInfo,
      jumpRepair, //跳转维修
      reachBottom,
      manualInput,
      inputkeyword,
      searchQuery,
      windowHeights,
      previewImg,
      getFileUrl,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
