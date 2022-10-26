<template>
  <!-- 检索资产 -->
  <uni-popup ref="inputCodeDialog" type="dialog">
    <uni-popup-dialog
      mode="input"
      title="输入资产编码检索资产"
      :before-close="true"
      value=""
      placeholder="输入资产编码"
      @confirm="inputCodeConfirm"
      @close="inputCodeDialog.close()"
    />
  </uni-popup>
  <!-- 锚点与数量 -->
  <AnchorPointAndQty
  :qty="listLength"
  :totalQty="totalQty"
  :bottom="120"
  :scrollAreaHeight="windowHeights - 156"
  :scrollTopDistance="scrollTopDistance" 
  @scrollTop="toIndex = 'scrollTop'" 
  />
  <!-- 模糊检索 -->
  <view class="keyword">
    <uni-easyinput
      prefixIcon="search"
      placeholder="编码/原编码/名称"
      @iconClick="refreshList"
      confirmType="search"
      trim="both"
      v-model="qst"
      :inputBorder="false"
      @confirm="refreshList"
      @clear="refreshList"
    >
    </uni-easyinput>
  </view>
  <!-- tab栏 -->
  <uni-segmented-control
    :current="tabIndex"
    :values="tabVal"
    style-type="text"
    :active-color="
      tabIndex === 0 ? '#d70000' : tabIndex === 1 ? '#7ecc21' : '#db5200'
    "
    @clickItem="switchTab"
  />
  
  <view class="list-style">
      <view class="list-content">
          <scroll-view
            :style="`height:${windowHeights - 196}px`"
            @scrolltolower="reachBottom"
            @scroll="scroll"
            :scroll-into-view="toIndex"
            :scroll-with-animation="false"
            scroll-y
          >
          <view id="scrollTop"></view>
          <template v-if="tabIndex === 0">
              <view class="list-item_card" style="background:#fff" v-for="{
                    StockCheckStatus,
                    StockCheckStatusText,
                    Name,
                    Code,
                    OriginalCode,
                    KAOName,
                    KAEName,
                    UAOName,
                    UAEName,
                    AssetCategoryName,
                    LocationName,
                    AssetID,
                  } in listWaitingCheck"
                  :key="ID"
                  @click="itemClick(AssetID)">
                <view class="inventory-list-title">
                  <view class="item-name">
                    <text>{{ Name }}</text>
                  </view>
                  <view style="border-color: #d70000;">
                    <view class="inventory_status" style="color:#d70000;">
                      <text>{{ StockCheckStatusText }}</text>
                    </view>
                  </view>
                </view>
                <view class="list-item-col">
                  <text>资产编码：<text selectable>{{ Code }}</text></text>
                  <text>原编码：<text selectable>{{ OriginalCode }}</text></text>
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
                  <text>资产分类：</text>
                  <text>{{ AssetCategoryName }}</text>
                </view>
                <view class="list-item-row">
                  <text>存放位置：</text>
                  <text>{{ LocationName }}</text>
                </view>
              </view>
          </template>
          <template v-if="tabIndex === 1">
              <view class="list-item_card" style="background:#fff" v-for="{
                    StockCheckStatus,
                    StockCheckStatusText,
                    Name,
                    Code,
                    OriginalCode,
                    KAOName,
                    KAEName,
                    UAOName,
                    UAEName,
                    AssetCategoryName,
                    LocationName,
                    AssetID,
                  } in listAlreadyCheck"
                  :key="ID"
                  @click="itemClick(AssetID)">
                <view class="inventory-list-title">
                  <view class="item-name">
                    <text>{{ Name }}</text>
                  </view>
                  <view style="border-color: #7ecc21;">
                    <view class="inventory_status" style="color:#7ecc21;">
                      <text>{{ StockCheckStatusText }}</text>
                    </view>
                  </view>
                </view>
                <view class="list-item-col">
                  <text>资产编码：<text selectable>{{ Code }}</text></text>
                  <text>原编码：<text selectable>{{ OriginalCode }}</text></text>
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
                  <text>资产分类：</text>
                  <text>{{ AssetCategoryName }}</text>
                </view>
                <view class="list-item-row">
                  <text>存放位置：</text>
                  <text>{{ LocationName }}</text>
                </view>
              </view>
          </template>
          <template v-if="tabIndex === 2">
              <view class="list-item_card" style="background:#fff" v-for="{
                    StockCheckStatus,
                    StockCheckStatusText,
                    Name,
                    Code,
                    OriginalCode,
                    KAOName,
                    KAEName,
                    UAOName,
                    UAEName,
                    AssetCategoryName,
                    LocationName,
                    AssetID,
                  } in listProfit"
                  :key="ID"
                  @click="itemClick(AssetID)">
                <view class="inventory-list-title">
                  <view class="item-name">
                    <text>{{ Name }}</text>
                  </view>
                  <view style="border-color: #db5200;">
                    <view class="inventory_status" style="color:#db5200;">
                      <text>{{ StockCheckStatusText }}</text>
                    </view>
                  </view>
                </view>
                <view class="list-item-col">
                  <text>资产编码：<text selectable>{{ Code }}</text></text>
                  <text>原编码：<text selectable>{{ OriginalCode }}</text></text>
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
                  <text>资产分类：</text>
                  <text>{{ AssetCategoryName }}</text>
                </view>
                <view class="list-item-row">
                  <text>存放位置：</text>
                  <text>{{ LocationName }}</text>
                </view>
              </view>
          </template>
          <view class="nothing" :style="`height:${windowHeights - 196}px`" v-if="listLength < 1">
            暂 无 数 据
          </view>
          </scroll-view>
      </view>
  </view>
  <view class="header-type">
    <view>
      <uni-data-picker
        v-slot:default="{ data, error, options }"
        :border="false"
        :clear-icon="false"
        @input="sortTypeChange"
        :localdata="sortTypeOption"
        v-model="sortTypeText.value"
      >
        <view class="sort-text">
          <view>{{ sortTypeText.text }}</view>
          <uni-icons type="bottom" color="#4a74e7" size="14"></uni-icons>
        </view>
      </uni-data-picker>
    </view>
    <view v-if="tabIndex === 0"> 数量：{{ summarys.WaitingCheck }} </view>
    <view v-if="tabIndex === 1"> 数量：{{ summarys.AlreadyCheck }} </view>
    <view v-if="tabIndex === 2"> 数量：{{ summarys.Profit }} </view>
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
  <!-- 新增明细 -->
  <view class="asset-register" @click="inventoryRegister" v-if="tabIndex === 2">
    <uni-icons type="compose" size="30" color="#fff"></uni-icons>
    <view>盘点登记</view>
  </view>
</template>

<script>
import inventoryController from "../../../../service/controller/asset/inventoryController";
import {
  showErrorToast,
  showLoading,
  clearLoading,
} from "../../../../share/util/message";
import { navigateTo, navigateBack } from "../../../../share/redirect";
import eventNames from "../../../../service/enumeration/eventNames";
import { only } from "../../../../share/util/uniEvent";
import { getScanCode } from "../../../../share/util/index";
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import { getStorage } from "../../../../share/util/storage";
import { reactive, ref, nextTick } from "vue";
import { useStore } from "vuex";
import AnchorPointAndQty from "../../../../components/anchor-point-and-qty/anchor-point-and-qty.vue";
export default {
  components:{
    AnchorPointAndQty
  },
  props: {
    id: String,
    taskType: String,
  },
  setup({ id, taskType }) {
    const tabVal = ref(["待盘(0)", "已盘(0)", "盘盈(0)"]);
    const tabIndex = ref(0);
    const sortTypeText = ref({
      text: "默认排序",
      value: 0,
    });
    const sortTypeOption = ref([
      {
        text: "默认排序",
        value: 0,
      },
      {
        text: "编码排序",
        value: 1,
      },
      {
        text: "编码倒序",
        value: 2,
      },
      {
        text: "购置日期正序",
        value: 3,
      },
      {
        text: "购置日期倒序",
        value: 4,
      },
      {
        text: "登记日期正序",
        value: 5,
      },
      {
        text: "登记日期倒序",
        value: 6,
      },
    ]);

    let currentPageWaitingCheck = 1;
    let pageCountWaitingCheck = -1;
    const listWaitingCheck = ref([]);

    let currentPageAlreadyCheck = 1;
    let pageCountAlreadyCheck = -1;
    const listAlreadyCheck = ref([]);

    let currentPageProfit = 1;
    let pageCountProfit = -1;
    const listProfit = ref([]);

    const totalQty = ref(0);

    const toIndex = ref("");

    const scrollTopDistance = ref(0);

    const listLength = ref(0);

    const summarys = ref({});

    const inputCodeDialog = ref(null);

    const store = useStore();

    const qst = ref("");

    const scrollTop = ref(0);

    const windowHeights = ref(0);

    function refreshList() {
      if (tabIndex.value == 0) {
        currentPageWaitingCheck = 1;
      } else if (tabIndex.value == 1) {
        currentPageAlreadyCheck = 1;
      } else {
        currentPageProfit = 1;
      }
      nextTick(() => {
        toIndex.value = 'scrollTop';
      });
      return search();
    }

    function sortTypeChange(val) {
      sortTypeText.value.text = sortTypeOption.value[val].text;
      sortTypeText.value.value = val;
      refreshList();
    }
    function switchTab(e) {
      if (tabIndex.value !== e.currentIndex) {
        tabIndex.value = e.currentIndex;
        if (tabIndex.value == 0) {
          currentPageWaitingCheck = 1;
        } else if (tabIndex.value == 1) {
          currentPageAlreadyCheck = 1;
        } else {
          currentPageProfit = 1;
        }
        nextTick(() => {
          toIndex.value = 'scrollTop';
        });
        search();
      }
    }

    async function search() {
      showLoading();
      try {
        const index = tabIndex.value == 0 ? 2 : tabIndex.value == 1 ? 3 : 4;
        let obj = {
          QST: qst.value,
          ID: id,
          InventoryAssetSummary: index,
          PageNO: 1,
          PageSize: 10,
          SortPropertyID: sortTypeText.value.value,
        };

        const { PageCount, Detail,Items, Summarys,TotalRecordQty } =
          await inventoryController.inventoryCorpTaskDetail(obj, taskType);
        const taskDetail = taskType == 3 ? Detail : Items;
        if (index == 2) {
          pageCountWaitingCheck = PageCount;
          if (currentPageWaitingCheck === 1) {
            listWaitingCheck.value = taskDetail;
          } else {
            listWaitingCheck.value = listWaitingCheck.value.concat(taskDetail);
          }
          listLength.value = listWaitingCheck.value.length;
        } else if (index == 3) {
          pageCountAlreadyCheck = PageCount;
          if (currentPageAlreadyCheck === 1) {
            listAlreadyCheck.value = taskDetail;
          } else {
            listAlreadyCheck.value = listAlreadyCheck.value.concat(taskDetail);
          }
          listLength.value = listAlreadyCheck.value.length;
        } else {
          pageCountProfit = PageCount;
          if (currentPageProfit === 1) {
            listProfit.value = taskDetail;
          } else {
            listProfit.value = listProfit.value.concat(taskDetail);
          }
          listLength.value = listProfit.value.length;
        }
        summarys.value = Summarys;
        tabVal.value = [
          `待盘(${Summarys.WaitingCheck})`,
          `已盘(${Summarys.AlreadyCheck})`,
          `盘盈(${Summarys.Profit})`,
        ];
        totalQty.value = TotalRecordQty;
        uni.stopPullDownRefresh();
        uni.hideNavigationBarLoading();
      } finally {
        clearLoading();
      }
    }

    function reachBottom() {
      if (tabIndex.value == 0) {
        if (currentPageWaitingCheck >= pageCountWaitingCheck) {
          uni.hideNavigationBarLoading();
          showErrorToast("暂无更多数据");
        } else {
          ++currentPageWaitingCheck;
          search();
        }
      } else if (tabIndex.value == 1) {
        if (currentPageAlreadyCheck >= pageCountAlreadyCheck) {
          uni.hideNavigationBarLoading();
          showErrorToast("暂无更多数据");
        } else {
          ++currentPageAlreadyCheck;
          search();
        }
      } else {
        if (currentPageProfit >= pageCountProfit) {
          uni.hideNavigationBarLoading();
          showErrorToast("暂无更多数据");
        } else {
          ++currentPageProfit;
          search();
        }
      }
    }

    function inputCodeConfirm(code) {
      if (!code) {
        showErrorToast("请输入资产编码");
        return;
      }
      keyWordSearch(code);
    }
    function keyWordSearch(keyWord) {
      showLoading();
      inventoryController
        .inventoryGetAssetByCode(id, keyWord)
        .then((Item) => {
          if (!Item) {
            showErrorToast("暂未查询到可用资产");
            return;
          }
          inputCodeDialog.value.close();
          JumpLink(Item);
        })
        .finally(() => clearLoading());
    }

    function scan() {
      uni.scanCode({
        scanType: ["barCode", "qrCode"],
        success: ({ result }) => {
          keyWordSearch(getScanCode(result));
        },
      });
    }

    function inventoryRegister() {
      navigateTo(
        `subcontract/asset/inventory/manageUser/register?id=${id}&checkstatus=3`
      );
    }

    function JumpLink(item) {
      store.commit("inventory/setmanageUserItem", item);
      navigateTo(`subcontract/asset/inventory/manageUser/inventoryConfirm?id=${id}`);
    }

    function itemClick(id) {
      navigateTo(`subcontract/asset/assetInfo/assetView?id=${id}`);
    }

    onPullDownRefresh(() => {
      refreshList();
    });

    {
      search();
      only(eventNames.inventoryConfirmDetailBack, refreshList);
      only(eventNames.registerDetailBack, refreshList);
      uni.getSystemInfo({
        success: (result) => {
          windowHeights.value = result.windowHeight;
        },
      });
    }

    function scroll({detail}){
      scrollTopDistance.value = detail.scrollTop;
      toIndex.value = '';
    }

    return {
      qst,
      switchTab,
      tabVal,
      tabIndex,
      sortTypeText,
      sortTypeOption,
      sortTypeChange,
      listWaitingCheck, //待盘
      listAlreadyCheck, //已盘
      listProfit, //盘盈
      summarys,
      totalQty,
      toIndex,
      scrollTopDistance,
      scroll,
      listLength,
      reachBottom,
      inputCodeDialog,
      inputCodeConfirm,
      keyWordSearch,
      refreshList,
      scan,
      JumpLink,
      inventoryRegister,
      itemClick,
      scrollTop,
      windowHeights,
    };
  },
};
</script>

<style lang="scss" scoped>
.inventory_status{
  margin-left: 10px;
}
.header-type {
  font-size: 14px;
  padding: 10px 16px;
  height: 20px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > view {
    width: 50%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &:nth-child(1) {
      display: flex;
      align-items: center;
      white-space: nowrap;
      justify-content: flex-start;
    }
    &:last-child {
      text-align: right;
      margin-left: 10px;
    }
  }
}
.sort-text {
  height: 20px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  .uni-icons{
    margin:0 5px;
  }
}

.sort-text ::v-deep .uni-icons{
  margin-left: 5px;
}
.list-item_card{
  overflow: hidden;
  position: relative;
}
.inventory-list-title {
  font-weight: 600;
  font-size: 14px;
  text-align: left;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  > view {
    &:nth-last-child(2) {
      display: flex;
      align-items: center;
      width: 65%;
    }
    &:nth-last-child(1) {
      width: 35%;
      border-style: double;
      transform: rotate(40deg);
      text-align: center;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      font-size: 16px;
      position: absolute;
      right: 0;
      top: 45px;

    }
  }
  .uni-icons {
    width: 20px;
  }
  .item-name {
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.asset-register {
  position: fixed;
  right: 10px;
  bottom: 250px;
  opacity: 0.8;
  background: #db5200;
  width: 55px;
  height: 55px;
  display: flex;
  opacity: 0.7;
  justify-content: center;
  border-radius: 20%;
  view {
    font-size: 12px;
    position: absolute;
    bottom: 0;
    color: #fff;
  }
}
</style>
