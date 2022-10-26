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
                  <text class="slot-box">申领单号：</text>
                </view>
              </template>
              <template v-slot:body>
                <text
                  class="condition_item_text"
                  :class="
                    advancedSearch.applyCode.value ? 'content_effective' : ''
                  "
                  @click="openAdvancedInputDialog('applyCode')"
                  >{{
                    advancedSearch.applyCode.value
                      ? advancedSearch.applyCode.value
                      : "申领单号"
                  }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.applyCode.value"
                        @click="removeAdvancedInput('applyCode')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        @click="scanInput('applyCode')"
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
                  <text class="slot-box">申领人员：</text>
                </view>
              </template>
              <template v-slot:body>
                <text
                  class="condition_item_text"
                  :class="
                    advancedSearch.applyPersonnel.value ? 'content_effective' : ''
                  "
                  @click="openAdvancedInputDialog('applyPersonnel')"
                  >{{
                    advancedSearch.applyPersonnel.value
                      ? advancedSearch.applyPersonnel.value
                      : "申领人员"
                  }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.applyPersonnel.value"
                        @click="removeAdvancedInput('applyPersonnel')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        color="red"
                        type="scan"
                        size="16"
                        style="opacity: 0"
                      ></uni-icons>
                    </view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">申领日期起：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="condition_item_text">
                  <picker
                    mode="date"
                    @change="
                      (data) => applyDateTimeChange(data, 'applyDateStart')
                    "
                  >
                    <text
                      class="condition_item_text"
                      :class="
                        advancedSearch.applyDateStart.value
                          ? 'content_effective'
                          : ''
                      "
                    >
                      {{
                        advancedSearch.applyDateStart.value
                          ? advancedSearch.applyDateStart.value
                          : "申领日期起"
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
                        v-if="advancedSearch.applyDateStart.value"
                        @click="removeAdvancedInput('applyDateStart')"
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
                  <text class="slot-box">申领日期起：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="condition_item_text">
                  <picker
                    mode="date"
                    @change="
                      (data) => applyDateTimeChange(data, 'applyDateEnd')
                    "
                  >
                    <text
                      class="condition_item_text"
                      :class="
                        advancedSearch.applyDateEnd.value
                          ? 'content_effective'
                          : ''
                      "
                    >
                      {{
                        advancedSearch.applyDateEnd.value
                          ? advancedSearch.applyDateEnd.value
                          : "申领日期起"
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
                        v-if="advancedSearch.applyDateEnd.value"
                        @click="removeAdvancedInput('applyDateEnd')"
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
                  <text class="slot-box">资产资料编码：</text>
                </view>
              </template>
              <template v-slot:body>
                <text
                  class="condition_item_text"
                  :class="advancedSearch.code.value ? 'content_effective' : ''"
                  @click="openAdvancedInputDialog('code')"
                  >{{
                    advancedSearch.code.value
                      ? advancedSearch.code.value
                      : "资产资料编码"
                  }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.code.value"
                        @click="removeAdvancedInput('code')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        @click="scanInput('code')"
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
                  <text class="slot-box">资产名称：</text>
                </view>
              </template>
              <template v-slot:body>
                <text
                  class="condition_item_text"
                  :class="advancedSearch.name.value ? 'content_effective' : ''"
                  @click="openAdvancedInputDialog('name')"
                  >{{
                    advancedSearch.name.value
                      ? advancedSearch.name.value
                      : "名称"
                  }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.name.value"
                        @click="removeAdvancedInput('name')"
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
                  <text class="slot-box">品牌：</text>
                </view>
              </template>
              <template v-slot:body>
                <text
                  class="condition_item_text"
                  :class="advancedSearch.brand.value ? 'content_effective' : ''"
                  @click="openAdvancedInputDialog('brand')"
                  >{{
                    advancedSearch.brand.value
                      ? advancedSearch.brand.value
                      : "品牌"
                  }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.brand.value"
                        @click="removeAdvancedInput('brand')"
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
                  <text class="slot-box">规格：</text>
                </view>
              </template>
              <template v-slot:body>
                <text
                  class="condition_item_text"
                  :class="advancedSearch.spec.value ? 'content_effective' : ''"
                  @click="openAdvancedInputDialog('spec')"
                  >{{
                    advancedSearch.spec.value
                      ? advancedSearch.spec.value
                      : "规格"
                  }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.spec.value"
                        @click="removeAdvancedInput('spec')"
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
                  <text class="slot-box">型号：</text>
                </view>
              </template>
              <template v-slot:body>
                <text
                  class="condition_item_text"
                  :class="advancedSearch.model.value ? 'content_effective' : ''"
                  @click="openAdvancedInputDialog('model')"
                  >{{
                    advancedSearch.model.value
                      ? advancedSearch.model.value
                      : "型号"
                  }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.model.value"
                        @click="removeAdvancedInput('model')"
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
                  <text class="slot-box">资产分类：</text>
                </view>
              </template>
              <template v-slot:body>
                <scroll-view style="width: calc(100% - 130px)" scroll-x>
                  <view
                    class="selector-content_text"
                    :class="
                      advancedSearch.category.value.length > 0
                        ? 'content_effective'
                        : ''
                    "
                    @click.stop="categorySelect('category')"
                  >
                    {{
                      advancedSearch.category.value.length > 0
                        ? advancedSearch.category.name
                        : "资产分类"
                    }}
                  </view>
                </scroll-view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.category.value.length > 0"
                        @click="removeAdvancedInput('category')"
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
                  <text class="slot-box">是否结束：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="condition_item_text">
                  <uni-data-picker
                    v-slot:default="{ data, error, options }"
                    class="data-picker-request-draw"
                    placeholder="是否结束"
                    :border="false"
                    :clear-icon="false"
                    :localdata="advancedSearch.IsEnd.options"
                    @input="IsEndChange"
                    v-model="advancedSearch.IsEnd.value"
                  >
                    <text
                      class="condition_item_text"
                      :class="
                        advancedSearch.IsEnd.value ? 'content_effective' : ''
                      "
                      >{{
                        advancedSearch.IsEnd.value
                          ? advancedSearch.IsEnd.name
                          : "是否结束"
                      }}</text
                    >
                  </uni-data-picker>
                </view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.IsEnd.value"
                        @click="removeAdvancedInput('IsEnd')"
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
                Status,
                StatusText,
                BillCode,
                BillDateTime,
                BillerEmployeeName,
                RequestDate,
                RequesterEmployeeName,
                RequestOrgName,
                RequestReasonText,
                IsClosedText,
                ID,
                Remark,
                SignPictureUrl,
              } in list"
              :key="ID"
               @click="itemClick(ID)">
            <view>
              <text class="bold" selectable>单号：{{ BillCode }}</text>
            </view>
            <view class="list-item-bill_status" :style="billStatusColor(Status)">
              {{StatusText}}
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
                <text>单据状态：{{ StatusText }}</text>
                <text>签字状态：{{ SignPictureUrl?'已签字':'未签字' }}</text>
                <text>申领日期：{{ RequestDate?RequestDate.substring(0,10):"" }}</text>
              </div>
            </view>
            <view class="list-item-col">
              <text>申领人员：{{ RequesterEmployeeName }}</text>
              <text>申领部门：{{ RequestOrgName }}</text>
            </view>
            <view class="list-item-col">
              <text>申领原因：{{ RequestReasonText }}</text>
              <text>是否结束：{{ IsClosedText }}</text>
            </view>
            <view class="list-item-col">
              <text>制单人员：{{ BillerEmployeeName }}</text>
              <text>制单时间：{{ BillDateTime }}</text>
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
  <view class="condition-query">
    <button @click="conditionSearchPopup.open()">高级搜索</button>
  </view>
</template>

<script>
import requestDrawController from "../../../service/controller/asset/requestDrawController.js";
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
import DrawerAdvancedSearch from "../../../components/uni-drawer/components/uni-drawer/uni-drawer.vue"
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
      applyCode: {
        hint: "申领单号",
        value: null,
      },
      applyPersonnel: {
        hint: "申领人员",
        value: null,
      },
      applyDateStart: {
        hint: "申领日期起",
        value: null,
      },
      applyDateEnd: {
        hint: "申领日期止",
        value: null,
      },
      code: {
        hint: "资产资料编码",
        value: null,
      },
      name: {
        hint: "资产名称",
        value: null,
      },
      brand: {
        hint: "品牌",
        value: null,
      },
      spec: {
        hint: "规格",
        value: null,
      },
      model: {
        hint: "型号",
        value: null,
      },
      category: {
        hint: "资产分类",
        name: "",
        value: [],
      },
      IsEnd: {
        hint: "是否结束",
        name: "",
        value: null,
        options: [
          {
            text: "全部",
            value: "0",
          },
          {
            text: "是",
            value: "1",
          },
          {
            text: "否",
            value: "2",
          },
        ],
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
        key == "applyCode" ||
        key == "applyPersonnel" ||
        key == "applyDateStart" ||
        key == "applyDateEnd" ||
        key == "code" ||
        key == "name" ||
        key == "brand" ||
        key == "spec" ||
        key == "model"
      ) {
        advancedSearch.value[key].value = null;
        return;
      }
      if (key == "category") {
        advancedSearch.value[key].value = [];
        advancedSearch.value[key].name = null;
        return;
      }
      if (key == "IsEnd") {
        advancedSearch.value[key].value = null;
        advancedSearch.value[key].name = null;
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
      advancedSearch.value.applyCode.value = null;
      advancedSearch.value.applyPersonnel.value = null;
      advancedSearch.value.applyDateStart.value = null;
      advancedSearch.value.applyDateEnd.value = null;
      advancedSearch.value.code.value = null;
      advancedSearch.value.name.value = null;
      advancedSearch.value.brand.value = null;
      advancedSearch.value.spec.value = null;
      advancedSearch.value.model.value = null;
      advancedSearch.value.category.value = [];
      advancedSearch.value.category.name = null;
      advancedSearch.value.IsEnd.value = null;
      advancedSearch.value.IsEnd.name = null;
    }

    function advancedInputConfirm(val) {
      advancedSearch.value[advancedInputKey.value].value = val;
    }

    function categorySelect(key) {
      // 资产分类
      only(eventNames.assetCategorySelectBack, ({ ids, names }) => {
        advancedSearch.value.category.value = ids;
        advancedSearch.value.category.name = names;
      });
      const ids = advancedSearch.value.category.value;
      navigateTo(
        `pages/selector/asset/category?isLast=0&multiple=1&ids=${ids}`
      );
    }

    function querySearch() {
      refreshList();
      conditionSearchPopup.value.close();
    }

    function IsEndChange(val) {
      advancedSearch.value.IsEnd.name =
        advancedSearch.value.IsEnd.options.filter(
          (p) => p.value == val
        )[0].text;
      advancedSearch.value.IsEnd.value = val;
    }

    async function search() {
      showLoading();
      try {
        const { PageCount, Items,TotalRecordQty } =
          await requestDrawController.requestDrawList({
            qst: qst.value,
            pageNo: currentPage,
            billCode: advancedSearch.value.applyCode.value,
            requestDrawEmployeeName: advancedSearch.value.applyPersonnel.value,
            startRequestDrawDate: advancedSearch.value.applyDateStart.value,
            EndRequestDrawDate: advancedSearch.value.applyDateEnd.value,
            goodsCode: advancedSearch.value.code.value,
            goodsName: advancedSearch.value.name.value,
            assetCategoryIDs: advancedSearch.value.category.value,
            brand: advancedSearch.value.brand.value,
            spec: advancedSearch.value.spec.value,
            model: advancedSearch.value.model.value,
            IsClosed:
              advancedSearch.value.IsEnd.value == "0"
                ? ""
                : advancedSearch.value.IsEnd.value == "1"
                ? true
                : false,
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
      only(eventNames.requestDrawDetailBack, refreshList);
      uni.getSystemInfo({
        success: (result) => {
          windowWidths.value = result.windowWidth;
          windowHeights.value = result.windowHeight;
        },
      });
    }

    function refreshList() {
      currentPage = 1;
      toIndex.value = 'scrollTop';
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
      navigateTo(`/subcontract/asset/requestDraw/requestDraw?id=${id}&type=list`);
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
      categorySelect,
      conditionSearchPopup,
      applyDateTimeChange: ({ detail: { value } }, key) => {
        advancedSearch.value[key].value = value;
      },
      IsEndChange,
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
