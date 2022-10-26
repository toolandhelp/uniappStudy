<template>
  <!-- <uni-easyinput
    prefixIcon="search"
    v-model="qst"
    placeholder="编码/原编码/名称"
    @iconClick="refreshList"
    confirmType="search"
    trim="both"
    :inputBorder="false"
    @confirm="refreshList"
    @clear="refreshList"
  >
  </uni-easyinput> -->
  <!-- 锚点与数量 -->
  <AnchorPointAndQty
  :qty="list.length"
  :totalQty="totalQty"
  :scrollAreaHeight="windowHeights - 46"
  :scrollTopDistance="scrollTopDistance" 
  @scrollTop="toIndex = 'scrollTop'" 
  />
  <view class="list-style">
      <view class="list-content">
          <scroll-view
            :style="`height:${windowHeights - 10}px`"
            @scrolltolower="reachBottom"
            @scroll="scroll"
            :scroll-into-view="toIndex"
            :scroll-with-animation="false"
            scroll-y
          >
          <view id="scrollTop"></view>
          <view class="list-item_card" style="background:#fff" v-for="{
                BillStatus,
                BillName,
                BillStatusText,
                BillCode,
                BillDatetime,
                RequestDate,
                BillerOrgName,
                AssetUsageText,
                BillerEmployeer,
                BillerRequestOrgName,
                BillerRequestEmployeer,
                Remark,
                urlName,
                BillID,
                ID,
              } in list"
              :key="ID"
               @click="itemClick(BillID, urlName)">
            <view>
              <text class="bold" selectable>单号：{{ BillCode }}</text>
            </view>
            <view class="list-item-bill_status" :style="billStatusColor(BillStatus)">
              {{BillStatusText}}
            </view>
            <view class="list-item-col">
              <text>单据状态：{{ BillStatusText }}</text>
              <text>单据名称：{{ BillName }}</text>
            </view>
            <view class="list-item-col">
              <text>申请日期：{{ RequestDate?RequestDate.substring(0,10):"" }}</text>
              <text>制单时间：{{ BillDatetime }}</text>
            </view>
            <view class="list-item-col">
              <text>申请人员：{{ BillerRequestEmployeer }}</text>
              <text>申请部门：{{ BillerRequestOrgName }}</text>
            </view>
            <view class="list-item-col">
              <text>制单人员：{{ BillerEmployeer }}</text>
              <text>制单部门：{{ BillerOrgName }}</text>
            </view>
            <view class="list-item-row">
              <text>单据备注：</text>
              <text>{{ Remark }}</text>
            </view>
          </view>
          <view class="nothing" :style="`height:${windowHeights - 10}px`" v-if="list.length < 1">
            暂 无 数 据
          </view>
          </scroll-view>
      </view>
  </view>
</template>

<script>
import doneController from "../../../service/controller/myWork/doneController";
import { getStorage } from "../../../share/util/storage";
import {
  showErrorToast,
  showLoading,
  clearLoading,
} from "../../../share/util/message";
import { navigateTo } from "../../../share/redirect/index";
import { reactive, ref } from "vue";
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import { only } from "../../../share/util/uniEvent";
import eventNames from "../../../service/enumeration/eventNames";
import AnchorPointAndQty from "../../../components/anchor-point-and-qty/anchor-point-and-qty.vue";
import {billStatusColor} from "../../../share/util/billBasicConfig";
export default {
  components:{
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
    // 获取屏幕高度
    const windowHeights = ref("");

    async function search() {
      showLoading();
      try {
        const { PageCount, Items,TotalRecordQty } =
          await doneController.Done(
            getStorage("EmployeeID"),
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
      return search();
    }

    {
      search();
      only(eventNames.billDetailBack, refreshList);
      uni.getSystemInfo({
        success: (result) => {
          windowHeights.value = result.windowHeight;
        },
      });
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

    function itemClick(billId, urlName) {
      switch (urlName) {
        case "RequestDrawDetail":
          navigateTo(
            `subcontract/asset/requestDraw/requestDraw?id=${billId}&type=list`
          );
          break;
        case "drawDetail":
          navigateTo(`subcontract/asset/draw/drawDetail?id=${billId}&type=list`);
          break;
        case "drawBackDetail":
          navigateTo(
            `subcontract/asset/drawBack/drawBackDetail?id=${billId}&type=list`
          );
          break;
        case "WaitReceivingListAdd":
          navigateTo(
            `subcontract/asset/takeDelivery/takeDelivery?id=${billId}&type=list`
          );
          break;
        case "transformDetail":
          navigateTo(
            `subcontract/asset/transform/detail?id=${billId}&type=list`
          );
          break;
        case "requestDiscardDetail":
          navigateTo(
            `subcontract/asset/requestDiscard/detail?id=${billId}&type=list`
          );
          break;
        case "discardDetail":
          navigateTo(
            `subcontract/asset/discard/detail?id=${billId}&type=list`
          );
          break;
        case "ComRequestDrawDetail":
          navigateTo(
            `subcontract/consumable/requestDraw/requestDraw?id=${billId}&type=list`
          );
          break;
        case "ComInWarehouseDetail":
          navigateTo(
            `subcontract/consumable/inwarehouse/detail/detail?id=${billId}&type=list`
          );
          break;
        case "ComOutWarehouseDetail":
          navigateTo(
            `subcontract/consumable/outwarehouse/detail/detail?id=${billId}&type=list`
          );
          break;
        case "ComAllocateDetail":
          navigateTo(
            `subcontract/consumable/allocate/detail/detail?id=${billId}&type=list`
          );
          break;
        case "ComDiscardDetail":
          navigateTo(
            `subcontract/consumable/discard/detail/detail?id=${billId}&type=list`
          );
          break;
      }
    }
    function scroll({detail}){
      scrollTopDistance.value = detail.scrollTop;
      toIndex.value = '';
    }
    
    
    return { 
      qst, 
      list,
      totalQty,
      toIndex,
      scroll,
      scrollTopDistance,
      refreshList, 
      itemClick, 
      reachBottom, 
      windowHeights,
      billStatusColor
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
