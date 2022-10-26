<template>
  <!-- 高级搜索 -->
  <DrawerAdvancedSearch
    ref="conditionSearchPopup"
    mode="right"
    :mask-click="true"
    :width="windowWidths"
  >
    <!-- 输入类型弹框 -->
    <uni-popup ref="advancedInputDialog" type="dialog">
      <uni-popup-keyword
        ref="inputClose"
        mode="input"
        title="录入检索信息"
        :value="advancedInputVal"
        placeholder="请输入检索信息"
        @confirm="advancedInputConfirm"
      ></uni-popup-keyword>
    </uni-popup>
    <view class="advanced-search">
      <uni-section title="高级搜索" type="line"></uni-section>
      <scroll-view :style="`height:${windowHeights - 105}px`" :scroll-y="true">
        <view class="advanced-condition_content">
          <uni-list>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">退库单号：</text>
                </view>
              </template>
              <template v-slot:body>
                <text
                  class="condition_item_text"
                  :class="
                    advancedSearch.returnCode.value ? 'content_effective' : ''
                  "
                  @click="openAdvancedInputDialog('returnCode')"
                  >{{
                    advancedSearch.returnCode.value
                      ? advancedSearch.returnCode.value
                      : "退库单号"
                  }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.returnCode.value"
                        @click="removeAdvancedInput('returnCode')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        @click="scanInput('returnCode')"
                        type="scan"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">退库日期起：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="condition_item_text">
                  <picker
                    mode="date"
                    @change="
                      (data) => applyDateTimeChange(data, 'returnDateStart')
                    "
                  >
                    <text
                      class="condition_item_text"
                      :class="
                        advancedSearch.returnDateStart.value
                          ? 'content_effective'
                          : ''
                      "
                    >
                      {{
                        advancedSearch.returnDateStart.value
                          ? advancedSearch.returnDateStart.value
                          : "退库日期起"
                      }}
                    </text>
                  </picker>
                </view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.returnDateStart.value"
                        @click="removeAdvancedInput('returnDateStart')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">退库日期止：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="condition_item_text">
                  <picker
                    mode="date"
                    @change="
                      (data) => applyDateTimeChange(data, 'returnDateEnd')
                    "
                  >
                    <text
                      class="condition_item_text"
                      :class="
                        advancedSearch.returnDateEnd.value
                          ? 'content_effective'
                          : ''
                      "
                    >
                      {{
                        advancedSearch.returnDateEnd.value
                          ? advancedSearch.returnDateEnd.value
                          : "退库日期止"
                      }}
                    </text>
                  </picker>
                </view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.returnDateEnd.value"
                        @click="removeAdvancedInput('returnDateEnd')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
          </uni-list>
        </view>
      </scroll-view>
      <view class="advanced-search_button">
        <button @click="querySearch" type="primary">查询</button>
        <button @click="conditionReset">重置</button>
        <button @click="conditionSearchPopup.close()">关闭</button>
      </view>
    </view>
  </DrawerAdvancedSearch>
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
    placeholder="单号"
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
                BillStatus,
                BillStatusText,
                DrawBackOrgName,
                BillCode,
                BillDatetime,
                BillerEmployeeName,
                DrawBackDatetime,
                DrawBackEmployeeName,
                NewKAOName,
                NewKAEName,
                NewLocationName,
                BillID,
                Remark,
                SignPictureUrl,
              } in list"
              :key="BillID"
               @click="itemClick(BillID)">
            <view>
              <text class="bold" selectable>单号：{{ BillCode }}</text>
            </view>
            <view class="list-item-bill_status" :style="billStatusColor(BillStatus)">
              {{BillStatusText}}
            </view>
            <view class="list-item-signpicture">
              <view class="sign_left">
                <image 
                class="fill" 
                mode="scaleToFill" 
                :src="SignPictureUrl ? getFileUrl(SignPictureUrl):'/static/images/zw.png'" 
                @click.stop="SignPictureUrl ? previewImg(getFileUrl(SignPictureUrl)) : null" alt="" />
              </view>
              <div class="sign_right">
                <text>单据状态：{{ BillStatusText }}</text>
                <text>签字状态：{{ SignPictureUrl?'已签字':'未签字' }}</text>
                <text>退库日期：{{ DrawBackDatetime?DrawBackDatetime.substring(0,10):"" }}</text>
              </div>
            </view>
            <view class="list-item-col">
              <text>经办部门：{{ DrawBackOrgName }}</text>
              <text>经办人员：{{ DrawBackEmployeeName }}</text>
            </view>
            <view class="list-item-col">
              <text>退库后管理部门：{{ NewKAOName }}</text>
              <text>退库后管理人员：{{ NewKAEName }}</text>
            </view>
            <view class="list-item-row">
              <text>退库后存放位置：</text>
              <text>{{ NewLocationName }}</text>
            </view>
            <view class="list-item-col">
              <text>制单人员：{{ BillerEmployeeName }}</text>
              <text>制单部门：{{ BillDateTime }}</text>
            </view>
            <view class="list-item-row">
              <text>单据备注：</text>
              <text>{{ Remark }}</text>
            </view>
          </view>
          <view class="nothing" :style="`height:${windowHeights - 105}px`" v-if="list.length < 1">
            暂 无 数 据
          </view>
          </scroll-view>
      </view>
  </view>
  <!-- <scroll-view
    class="request-draw-list"
    :style="`height:${windowHeights - 99}px`"
    @scrolltolower="reachBottom"
    scroll-y
  >
    <uni-list>
      <uni-list-item
        link
        v-for="{
          BillStatusText,
          DrawBackOrgName,
          BillCode,
          BillDatetime,
          BillerEmployeeName,
          DrawBackDatetime,
          DrawBackEmployeeName,
          NewKAOName,
          NewKAEName,
          NewLocationName,
          BillID,
          Remark,
        } in list"
        :key="BillID"
        @click="itemClick(BillID)"
      >
        <template v-slot:body>
          <view class="list-item">
            <text class="list-item-title" selectable>单号：{{ BillCode }}</text>
            <view class="list-item-column">
              <text>单据状态：{{ BillStatusText }}</text>
            </view>
            <view class="list-item-column">
              <text>经办部门：{{ DrawBackOrgName }}</text>
              <text>经办人员：{{ DrawBackEmployeeName }}</text>
            </view>
            <view class="list-item-column">
              <text
                >退库日期：{{
                  DrawBackDatetime ? DrawBackDatetime.substring(0, 10) : ""
                }}</text
              >
              <text>退库后管理部门：{{ NewKAOName }}</text>
            </view>
            <view class="list-item-column">
              <text>退库后管理人员：{{ NewKAEName }}</text>
              <text>退库后存放位置：{{ NewLocationName }}</text>
            </view>
            <view class="list-item-column">
              <text>制单人员：{{ BillerEmployeeName }}</text>
              <text>制单时间：{{ BillDatetime }}</text>
            </view>
            <view class="list-item-textarea">
              <text>单据备注：{{ Remark }}</text>
            </view>
          </view>
        </template>
      </uni-list-item>
    </uni-list>
  </scroll-view> -->
  <view class="condition-query">
    <button @click="conditionSearchPopup.open()">高级搜索</button>
  </view>
</template>

<script>
import drawBackController from "../../../service/controller/asset/drawBackController";
import {
  showErrorToast,
  showLoading,
  clearLoading,
} from "../../../share/util/message";
import { navigateTo, redirectTo } from "../../../share/redirect/index";
import { reactive, ref } from "vue";
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import { only } from "../../../share/util/uniEvent";
import { getScanCode } from "../../../share/util/index";
import eventNames from "../../../service/enumeration/eventNames";
import DrawerAdvancedSearch from "../../../components/uni-drawer/components/uni-drawer/uni-drawer.vue";
import AnchorPointAndQty from "../../../components/anchor-point-and-qty/anchor-point-and-qty.vue";
import {billStatusColor} from "../../../share/util/billBasicConfig";
import UniPopupKeyword from "../../../components/uni-popup-keyword/components/uni-popup-dialog/uni-popup-dialog.vue";
import { previewImg } from "../../../share/util/image";
import { getFileUrl } from "../../../share/http/serveUrl";
export default {
  components:{
    DrawerAdvancedSearch,
    AnchorPointAndQty,
    UniPopupKeyword
  },
  setup() {
    const qst = ref("");

    let currentPage = 1;

    let pageCount = -1;

    const list = ref([]);

    const totalQty = ref(0);

    const toIndex = ref("");

    const scrollTopDistance = ref(0);

    const advancedInputVal = ref("");

    const advancedInputKey = ref("");

    const advancedInputDialog = ref(null);

    const advancedSearch = ref({
      returnCode: {
        hint: "退库单号",
        value: null,
      },
      returnDateStart: {
        hint: "退库日期起",
        value: null,
      },
      returnDateEnd: {
        hint: "申领日期止",
        value: null,
      },
    });

    // 条件搜索弹框
    const conditionSearchPopup = ref(null);

    // 获取屏幕高度
    const windowWidths = ref("");

    const windowHeights = ref("");

    function openAdvancedInputDialog(key) {
      advancedInputVal.value = advancedSearch.value[key].value;
      advancedInputKey.value = key;
      advancedInputDialog.value.open();
    }

    function removeAdvancedInput(key) {
      if (
        key == "returnCode" ||
        key == "returnDateStart" ||
        key == "returnDateEnd"
      ) {
        advancedSearch.value[key].value = null;
        return;
      }
    }

    function scanInput(key) {
      uni.scanCode({
        scanType: ["barCode", "qrCode"],
        success: ({ result }) => {
          advancedSearch.value[key].value = getScanCode(result);
        },
      });
    }

    function conditionReset() {
      advancedSearch.value.returnCode.value = null;
      advancedSearch.value.returnDateStart.value = null;
      advancedSearch.value.returnDateEnd.value = null;
    }

    function advancedInputConfirm(val) {
      advancedSearch.value[advancedInputKey.value].value = val;
    }

    function querySearch() {
      refreshList();
      conditionSearchPopup.value.close();
    }

    async function search() {
      showLoading();
      try {
        const { PageCount, Items,TotalRecordQty } = await drawBackController.drawBackList({
          qst: qst.value,
          pageNo: currentPage,
          billCode: advancedSearch.value.returnCode.value,
          drawBackBeginDate: advancedSearch.value.returnDateStart.value,
          drawBackEndDate: advancedSearch.value.returnDateEnd.value,
        });
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

    {
      search();
      only(eventNames.drawBackDetailBack, refreshList);
      uni.getSystemInfo({
        success: (result) => {
          windowWidths.value = result.windowWidth;
          windowHeights.value = result.windowHeight;
        },
      });
    }

    function refreshList() {
      currentPage = 1;
      return search();
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
      navigateTo(`/subcontract/asset/drawBack/drawBackDetail?id=${id}&type=list`);
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
      windowWidths,
      windowHeights,
      advancedInputVal,
      advancedInputKey,
      advancedInputDialog,
      advancedSearch,
      openAdvancedInputDialog,
      removeAdvancedInput,
      scanInput,
      conditionReset,
      advancedInputConfirm,
      conditionSearchPopup,
      applyDateTimeChange: ({ detail: { value } }, key) => {
        advancedSearch.value[key].value = value;
      },
      querySearch,
      billStatusColor,
      previewImg,
      getFileUrl,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
