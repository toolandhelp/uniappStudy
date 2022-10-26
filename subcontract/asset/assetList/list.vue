<template>
  <!-- 锚点与数量 -->
  <AnchorPointAndQty
  :qty="list.length"
  :totalQty="totalQty"
  :scrollAreaHeight="windowHeights - 105"
  :scrollTopDistance="scrollTopDistance" 
  @scrollTop="toIndex = 'scrollTop'" 
  />
  <!-- 高级搜索 -->
  <advancedSearch
    :show="showAdvancedSearch"
    @confirm="advancedConfirm"
    @closeDialog="showAdvancedSearch = false"
  />
  <uni-easyinput
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
  </uni-easyinput>

  <view class="list-style">
      <view class="list-content">
          <scroll-view
            :style="`height:${windowHeights - 105}px`"
            @scrolltolower="reachBottom"
            @scroll="scroll"
            :scroll-into-view="toIndex"
            :scroll-with-animation="false"
            scroll-y
          >
          <view id="scrollTop"></view>
          <view class="list-item_card" style="background:#fff" v-for="{
                AssetStatus,
                AssetStatusText,
                Code,
                Name,
                UAEName,
                UAOName,
                OriginalCode,
                SN,
                CategoryName,
                AssetUsageText,
                LocationName,
                KAOName,
                KAEName,
                ID,
              } in list"
              :key="ID"
              @click="itemClick(ID)">
            <view>
              <text class="bold" selectable>{{ Name }}</text>
            </view>
            <view class="list-item-bill_status" :style="assetStatusColor(AssetStatus)">
              {{AssetStatusText}}
            </view>
            <view class="list-item-col">
              <text selectable>资产编码：{{ Code }}</text>
              <text>资产状态：{{ AssetStatusText }}</text>
            </view>
            <view class="list-item-col">
              <text selectable>原编码：{{ OriginalCode }}</text>
              <text selectable>设备序列号：{{ SN }}</text>
            </view>
            <view class="list-item-col">
              <text>管理人员：{{ KAEName }}</text>
              <text>使用人员：{{ UAEName }}</text>
            </view>
            <view class="list-item-row">
              <text>管理部门：</text>
              <text>{{ KAOName }}</text>
            </view>
            <view class="list-item-row">
              <text>使用部门：</text>
              <text>{{ UAOName }}</text>
            </view>
             <view class="list-item-row">
               <text>资产分类：</text>
               <text>{{ CategoryName }}</text>
             </view>
             <view class="list-item-row">
               <text>存放位置：</text>
               <text>{{ LocationName }}</text>
             </view>
          </view>
          <view class="nothing" :style="`height:${windowHeights - 105}px`" v-if="list.length < 1">
            暂 无 数 据
          </view>
          </scroll-view>
      </view>
  </view>
  <view class="condition-query">
    <button @click="showAdvancedSearch = true">高级搜索</button>
  </view>
</template>

<script>
import assetController from "../../../service/controller/asset/assetController";
import {
  showErrorToast,
  showLoading,
  clearLoading,
} from "../../../share/util/message";
import { navigateTo } from "../../../share/redirect/index";
import { reactive, ref } from "vue";
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import advancedSearch from "../../../components/advancedSearch/advancedSearch.vue";
import { currentPlatform, isMP } from "../../../share/util/platform";
import platformEnum from "../../../service/enumeration/platformEnum";
import AnchorPointAndQty from "../../../components/anchor-point-and-qty/anchor-point-and-qty.vue";
import {assetStatusColor} from "../../../share/util/billBasicConfig";

export default {
  components: { advancedSearch,AnchorPointAndQty },
  setup() {
    const showAdvancedSearch = ref(false);
    const qst = ref("");
    let currentPage = 1;
    let pageCount = -1;
    const list = ref([]);
    const totalQty = ref(0);
    const toIndex = ref("");
    const scrollTopDistance = ref(0);
    const condition = ref([{
      AssetPropertyCode: "AssetStatus",
      Operator: 7,
      Values: [{Value: 1}, {Value: 2}],
    }]);
    const kAEText = ref(null);
    const uAEText = ref(null);
    const bottomHeight = ref("");
    // 获取屏幕高度
    const windowHeights = ref(0);
    bottomHeight.value=(currentPlatform==platformEnum.app?165:95);

    function search() {
      showLoading();
      assetController
        .assetListQuery(qst.value, currentPage, condition.value,kAEText.value,uAEText.value)
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

    function advancedConfirm(conditions,kAE,uAE) {
      condition.value = conditions;
      kAEText.value = kAE;
      uAEText.value = uAE;
      showAdvancedSearch.value = false;
      toIndex.value = 'scrollTop';
      refreshList();
    }

    function scroll({detail}){
      scrollTopDistance.value = detail.scrollTop;
      toIndex.value = '';
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

    function itemClick(id) {
      navigateTo(`subcontract/asset/assetInfo/assetView?id=${id}&handle=1`);
    }

    
    return {
      showAdvancedSearch,
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
      bottomHeight,
      advancedConfirm,
      assetStatusColor,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
