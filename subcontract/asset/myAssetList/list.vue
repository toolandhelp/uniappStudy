<template>
  <!-- 锚点与数量 -->
  <AnchorPointAndQty
  :qty="list.length"
  :totalQty="totalQty"
  :scrollAreaHeight="windowHeights - 105"
  :scrollTopDistance="scrollTopDistance" 
  @scrollTop="toIndex = 'scrollTop'" 
  />
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
            :style="`height:${windowHeights - 45}px`"
            @scrolltolower="reachBottom"
            @scroll="scroll"
            :scroll-into-view="toIndex"
            :scroll-with-animation="false"
            scroll-y
          >
          <view id="scrollTop"></view>
          <view class="list-item_card" style="background:#fff" v-for="{
                AssetStatus,
                Name,
                AssetStatusText,
                AssetUsageText,
                Code,
                OriginalCode,
                CategoryName,
                LocationName,
                ID,
              } in list"
              :key="ID"
              @click="itemClick(ID)">
            <view>
              <text class="bold">{{ Name }}</text>
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
              <text>使用情况：{{ AssetUsageText }}</text>
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
          <view class="nothing" :style="`height:${windowHeights - 45}px`" v-if="list.length < 1">
            暂 无 数 据
          </view>
          </scroll-view>
      </view>
  </view>
</template>

<script>
import assetController from "../../../service/controller/asset/assetController";
import { showErrorToast,showLoading,clearLoading } from "../../../share/util/message";
import { navigateTo } from "../../../share/redirect/index";
import { ref } from "vue";
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import uniSection from '../../../components/uni-section/uni-section.vue';
import AnchorPointAndQty from "../../../components/anchor-point-and-qty/anchor-point-and-qty.vue";
import {assetStatusColor} from "../../../share/util/billBasicConfig";
export default {
  components: { 
    uniSection,
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

    const windowHeights = ref("");

    const windowWidths = ref("");

    function search() {
      showLoading();
      assetController
        .myAssetList(qst.value, currentPage)
        .then(({ PageCount, Items,TotalRecordQty }) => {
          pageCount = PageCount;
          if (currentPage === 1) {
            list.value = Items;
            console.log(list.value)
          } else {
            list.value = list.value.concat(Items);
          }
          totalQty.value = TotalRecordQty;
          uni.stopPullDownRefresh();
          uni.hideNavigationBarLoading();
        }).finally(()=>clearLoading());
    }

    function refreshList() {
      currentPage = 1;
      search();
    }

    {
      uni.showNavigationBarLoading();
      search();
      // 获取屏幕高度
      uni.getSystemInfo({
        success: (result) => {
          windowHeights.value = result.windowHeight;
          windowWidths.value = result.windowWidth;
        },
      });
    }

    onReachBottom(() => {
      if (currentPage >= pageCount) {
        uni.hideNavigationBarLoading();
        showErrorToast("暂无更多数据");
      } else {
        ++currentPage;
        search();
      }
    });

    onPullDownRefresh(() => {
      refreshList();
    });
    
    function scroll({detail}){
      scrollTopDistance.value = detail.scrollTop;
      toIndex.value = '';
    }

    function itemClick(id) {
      navigateTo(`subcontract/asset/assetInfo/assetView?id=${id}&handle=1&setLocation=1`);
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
      windowWidths,
      windowHeights,
      assetStatusColor,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
