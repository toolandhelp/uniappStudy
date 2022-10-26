<template>
  <!-- 锚点与数量 -->
  <AnchorPointAndQty
  :qty="list.length"
  :totalQty="totalQty"
  :scrollAreaHeight="windowHeights - 45"
  :scrollTopDistance="scrollTopDistance" 
  @scrollTop="toIndex = 'scrollTop'" 
  />
  <uni-easyinput
    prefixIcon="search"
    v-model="qst"
    placeholder="主题名称"
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
            :style="`height:${windowHeights - 45}px`"
            @scrolltolower="reachBottom"
            @scroll="scroll"
            :scroll-into-view="toIndex"
            :scroll-with-animation="false"
            scroll-y
          >
          <view id="scrollTop"></view>
          <view class="list-item_card" style="background:#fff" v-for="{
                Status,
                BillDatetime,
                StatusText,
                TaskTypeText,
                TaskType,
                BillerEmployeeName,
                TaskCode,
                Remark,
                Title,
                EndDate,
                TaskSummarys,
                ID,
              } in list"
              :key="ID"
               @click="itemClick(ID,TaskType)">
            <view>
              <text class="bold" selectable>单号：{{ TaskCode }}</text>
            </view>
            <view class="list-item-bill_status" :style="billStatusColor(Status)">
              {{StatusText}}
            </view>
            <view class="list-item-row">
              <text>盘点主题：</text>
              <text>{{ Title }}</text>
            </view>
            <view class="list-item-col">
              <text>状态：{{ StatusText }}</text>
              <text>任务类型：{{ TaskTypeText }}</text>
            </view>
            <view class="list-item-col">
              <text>制单人员：{{ BillerEmployeeName }}</text>
              <text>制单时间：{{ BillDatetime }}</text>
            </view>
            <view class="list-item-col">
              <text>应盘数量：<text class="all">{{ TaskSummarys.All }}</text></text>
              <text>实盘数量：<text class="actualQty">{{ TaskSummarys.ActualQty }}</text></text>
            </view>
            <view class="list-item-col">
              <text>待盘数量：<text class="waitingCheck">{{ TaskSummarys.WaitingCheck }}</text></text>
              <text>已盘数量：<text class="alreadyCheck">{{ TaskSummarys.AlreadyCheck }}</text></text>
            </view>
            <!-- <view class="list-item-col">
              <text>盘盈：<text class="profit">{{ TaskSummarys.Profit }}</text></text>
            </view> -->
            <view class="list-item-row">
              <text>盘点说明：</text>
              <text>{{ Remark }}</text>
            </view>
          </view>
          <view class="nothing" :style="`height:${windowHeights - 45}px`" v-if="list.length < 1">
            暂 无 数 据
          </view>
          </scroll-view>
      </view>
  </view>
</template>

<script>
import inventoryController from "../../../../service/controller/asset/inventoryController";
import {
  showErrorToast,
  showLoading,
  clearLoading,
} from "../../../../share/util/message";
import { navigateTo } from "../../../../share/redirect/index";
import { reactive, ref } from "vue";
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import AnchorPointAndQty from "../../../../components/anchor-point-and-qty/anchor-point-and-qty.vue";
import {billStatusColor} from "../../../../share/util/billBasicConfig";
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

    function search() {
      showLoading();
      inventoryController
        .manageUserList(qst.value, currentPage)
        .then(({ PageCount, Items,TotalRecordQty }) => {
          pageCount = PageCount;
          if (currentPage === 1) {
            list.value = Items;
          } else {
            list.value = list.value.concat(Items);
          }
          totalQty.value = TotalRecordQty;
          uni.stopPullDownRefresh();
          uni.hideNavigationBarLoading();
        })
        .finally(() => clearLoading());
    }

    function refreshList() {
      currentPage = 1;
      search();
    }

    {
      uni.showNavigationBarLoading();
      search();
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

    function itemClick(id,taskType) {
      navigateTo(`subcontract/asset/inventory/manageUser/detail?id=${id}&taskType=${taskType}`);
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
      scrollTopDistance,
      scroll, 
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
.all {
  color: #4a74e7;
}
.actualQty {
  color: #385ab7;
}
.waitingCheck {
  color: #b50000;
}
.alreadyCheck {
  color: #9bcc2f;
}
.profit {
  color: #bd5000;
}
</style>
