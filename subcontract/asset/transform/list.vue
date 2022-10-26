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
                  <text class="slot-box">转移单号：</text>
                </view>
              </template>
              <template v-slot:body>
                <text
                  class="condition_item_text"
                  :class="
                    advancedSearch.billCode.value ? 'content_effective' : ''
                  "
                  @click="openAdvancedInputDialog('billCode')"
                  >{{
                    advancedSearch.billCode.value
                      ? advancedSearch.billCode.value
                      : "转移单号"
                  }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.billCode.value"
                        @click="removeAdvancedInput('billCode')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        @click="scanInput('billCode')"
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
                  <text class="slot-box">转移日期起：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="condition_item_text">
                  <picker
                    mode="date"
                    @change="
                      (data) => applyDateTimeChange(data, 'transformDateStart')
                    "
                  >
                    <text
                      class="condition_item_text"
                      :class="
                        advancedSearch.transformDateStart.value
                          ? 'content_effective'
                          : ''
                      "
                    >
                      {{
                        advancedSearch.transformDateStart.value
                          ? advancedSearch.transformDateStart.value
                          : "转移日期起"
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
                        v-if="advancedSearch.transformDateStart.value"
                        @click="removeAdvancedInput('transformDateStart')"
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
                  <text class="slot-box">转移日期止：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="condition_item_text">
                  <picker
                    mode="date"
                    @change="
                      (data) => applyDateTimeChange(data, 'transformDateEnd')
                    "
                  >
                    <text
                      class="condition_item_text"
                      :class="
                        advancedSearch.transformDateEnd.value
                          ? 'content_effective'
                          : ''
                      "
                    >
                      {{
                        advancedSearch.transformDateEnd.value
                          ? advancedSearch.transformDateEnd.value
                          : "转移日期止"
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
                        v-if="advancedSearch.transformDateEnd.value"
                        @click="removeAdvancedInput('transformDateEnd')"
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
                  <multiplePopupSelect
                    :options="advancedSearch.transformReason.options"
                    @change="IsEndChange"
                    :value="advancedSearch.transformReason.value"
                  >
                    <text
                      class="condition_item_text"
                      :class="
                        advancedSearch.transformReason.value.length
                          ? 'content_effective'
                          : ''
                      "
                      >{{
                        advancedSearch.transformReason.value.length
                          ? advancedSearch.transformReason.name
                          : "是否结束"
                      }}</text
                    >
                  </multiplePopupSelect>
                </view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.transformReason.value.length"
                        @click="removeAdvancedInput('transformReason')"
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
          <uni-section title="转移前" type="line"></uni-section>
          <uni-list>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">使用部门：</text>
                </view>
              </template>
              <template v-slot:body>
                <scroll-view style="width: calc(100% - 130px)" scroll-x>
                  <view
                    class="selector-content_text"
                    :class="
                      advancedSearch.originalUAO.value.length > 0
                        ? 'content_effective'
                        : ''
                    "
                    @click.stop="corpDeptSelect('originalUAO')"
                  >
                    {{
                      advancedSearch.originalUAO.value.length > 0
                        ? advancedSearch.originalUAO.name
                        : "原使用部门"
                    }}
                  </view>
                </scroll-view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.originalUAO.value.length > 0"
                        @click="removeAdvancedInput('originalUAO')"
                        type="close"
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
                  <text class="slot-box">使用人员：</text>
                </view>
              </template>
              <template v-slot:body>
                <scroll-view style="width: calc(100% - 130px)" scroll-x>
                  <view
                    class="selector-content_text"
                    :class="
                      advancedSearch.originalUAE.value.length > 0
                        ? 'content_effective'
                        : ''
                    "
                    @click="personnelSelect('originalUAE')"
                  >
                    {{
                      advancedSearch.originalUAE.value.length > 0
                        ? advancedSearch.originalUAE.name
                        : "原使用人员"
                    }}
                  </view>
                </scroll-view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.originalUAE.value.length > 0"
                        @click="removeAdvancedInput('originalUAE')"
                        type="close"
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
                  <text class="slot-box">管理部门：</text>
                </view>
              </template>
              <template v-slot:body>
                <scroll-view style="width: calc(100% - 130px)" scroll-x>
                  <view
                    class="selector-content_text"
                    :class="
                      advancedSearch.originalKAO.value.length > 0
                        ? 'content_effective'
                        : ''
                    "
                    @click.stop="corpDeptSelect('originalKAO')"
                  >
                    {{
                      advancedSearch.originalKAO.value.length > 0
                        ? advancedSearch.originalKAO.name
                        : "原管理部门"
                    }}
                  </view>
                </scroll-view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.originalKAO.value.length > 0"
                        @click="removeAdvancedInput('originalKAO')"
                        type="close"
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
                  <text class="slot-box">管理人员：</text>
                </view>
              </template>
              <template v-slot:body>
                <scroll-view style="width: calc(100% - 130px)" scroll-x>
                  <view
                    class="selector-content_text"
                    :class="
                      advancedSearch.originalKAE.value.length > 0
                        ? 'content_effective'
                        : ''
                    "
                    @click="personnelSelect('originalKAE')"
                  >
                    {{
                      advancedSearch.originalKAE.value.length > 0
                        ? advancedSearch.originalKAE.name
                        : "原管理人员"
                    }}
                  </view>
                </scroll-view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.originalKAE.value.length > 0"
                        @click="removeAdvancedInput('originalKAE')"
                        type="close"
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
                  <text class="slot-box">存放位置：</text>
                </view>
              </template>
              <template v-slot:body>
                <scroll-view style="width: calc(100% - 130px)" scroll-x>
                  <view
                    class="selector-content_text"
                    :class="
                      advancedSearch.originalLocation.value.length > 0
                        ? 'content_effective'
                        : ''
                    "
                    @click.stop="locationSelect('originalLocation')"
                  >
                    {{
                      advancedSearch.originalLocation.value.length > 0
                        ? advancedSearch.originalLocation.name
                        : "原存放位置"
                    }}
                  </view>
                </scroll-view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.originalLocation.value.length > 0"
                        @click="removeAdvancedInput('originalLocation')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                </view>
              </template>
            </uni-list-item>
          </uni-list>
          <uni-section title="转移后" type="line"></uni-section>
          <uni-list>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">使用部门：</text>
                </view>
              </template>
              <template v-slot:body>
                <scroll-view style="width: calc(100% - 130px)" scroll-x>
                  <view
                    class="selector-content_text"
                    :class="
                      advancedSearch.transferToUAO.value.length > 0
                        ? 'content_effective'
                        : ''
                    "
                    @click.stop="corpDeptSelect('transferToUAO')"
                  >
                    {{
                      advancedSearch.transferToUAO.value.length > 0
                        ? advancedSearch.transferToUAO.name
                        : "转移后使用部门"
                    }}
                  </view>
                </scroll-view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.transferToUAO.value.length > 0"
                        @click="removeAdvancedInput('transferToUAO')"
                        type="close"
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
                  <text class="slot-box">使用人员：</text>
                </view>
              </template>
              <template v-slot:body>
                <scroll-view style="width: calc(100% - 130px)" scroll-x>
                  <view
                    class="selector-content_text"
                    :class="
                      advancedSearch.transferToUAE.value.length > 0
                        ? 'content_effective'
                        : ''
                    "
                    @click="personnelSelect('transferToUAE')"
                  >
                    {{
                      advancedSearch.transferToUAE.value.length > 0
                        ? advancedSearch.transferToUAE.name
                        : "转移后使用人员"
                    }}
                  </view>
                </scroll-view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.transferToUAE.value.length > 0"
                        @click="removeAdvancedInput('transferToUAE')"
                        type="close"
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
                  <text class="slot-box">管理部门：</text>
                </view>
              </template>
              <template v-slot:body>
                <scroll-view style="width: calc(100% - 130px)" scroll-x>
                  <view
                    class="selector-content_text"
                    :class="
                      advancedSearch.transferToKAO.value.length > 0
                        ? 'content_effective'
                        : ''
                    "
                    @click.stop="corpDeptSelect('transferToKAO')"
                  >
                    {{
                      advancedSearch.transferToKAO.value.length > 0
                        ? advancedSearch.transferToKAO.name
                        : "转移后管理部门"
                    }}
                  </view>
                </scroll-view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.transferToKAO.value.length > 0"
                        @click="removeAdvancedInput('transferToKAO')"
                        type="close"
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
                  <text class="slot-box">管理人员：</text>
                </view>
              </template>
              <template v-slot:body>
                <scroll-view style="width: calc(100% - 130px)" scroll-x>
                  <view
                    class="selector-content_text"
                    :class="
                      advancedSearch.transferToKAE.value.length > 0
                        ? 'content_effective'
                        : ''
                    "
                    @click="personnelSelect('transferToKAE')"
                  >
                    {{
                      advancedSearch.transferToKAE.value.length > 0
                        ? advancedSearch.transferToKAE.name
                        : "转移后管理人员"
                    }}
                  </view>
                </scroll-view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.transferToKAE.value.length > 0"
                        @click="removeAdvancedInput('transferToKAE')"
                        type="close"
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
                  <text class="slot-box">存放位置：</text>
                </view>
              </template>
              <template v-slot:body>
                <scroll-view style="width: calc(100% - 130px)" scroll-x>
                  <view
                    class="selector-content_text"
                    :class="
                      advancedSearch.transferToLocation.value.length > 0
                        ? 'content_effective'
                        : ''
                    "
                    @click.stop="locationSelect('transferToLocation')"
                  >
                    {{
                      advancedSearch.transferToLocation.value.length > 0
                        ? advancedSearch.transferToLocation.name
                        : "转移后存放位置"
                    }}
                  </view>
                </scroll-view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="
                          advancedSearch.transferToLocation.value.length > 0
                        "
                        @click="removeAdvancedInput('transferToLocation')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
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
                StatusTxt,
                NewCorpName,
                BillCode,
                BillDatetime,
                BillerEmployeeName,
                DrawBackDatetime,
                NewKAOName,
                NewKAEName,
                NewUAOName,
                NewUAEName,
                NewLocationName,
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
              {{StatusTxt}}
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
                <text>单据状态：{{ StatusTxt }}</text>
                <text>签字状态：{{ SignPictureUrl?'已签字':'未签字' }}</text>
                <text>转移日期：{{ BillDatetime?BillDatetime.substring(0,10):"" }}</text>
              </div>
            </view>
            <view class="list-item-col">
              <text>管理部门：{{ NewKAOName }}</text>
              <text>管理人员：{{ NewKAEName }}</text>
            </view>
            <view class="list-item-col">
              <text>使用部门：{{ NewUAOName }}</text>
              <text>使用人员：{{ NewUAEName }}</text>
            </view>
            <view class="list-item-row">
              <text>所属公司：</text>
              <text>{{ NewCorpName }}</text>
            </view>
            <view class="list-item-row">
              <text>存放位置：</text>
              <text>{{ NewLocationName }}</text>
            </view>
            <view class="list-item-col">
              <text>制单人员：{{ BillerEmployeeName }}</text>
              <text>制单时间：{{ BillDatetime }}</text>
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
import transformController from "../../../service/controller/asset/transformController";
import dictionaryController from "../../../service/controller/system/dictionaryController.js";
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
import multiplePopupSelect from "../../../components/multiplePopupSelect/select.vue";
import { previewImg } from "../../../share/util/image";
import { getFileUrl } from "../../../share/http/serveUrl";
export default {
  components:{
    DrawerAdvancedSearch,
    AnchorPointAndQty,
    UniPopupKeyword,
    multiplePopupSelect
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
      billCode: {
        hint: "转移单号",
        value: null,
      },
      transformDateStart: {
        hint: "转移日期起",
        value: null,
      },
      transformDateEnd: {
        hint: "申领日期止",
        value: null,
      },
      transformReason: {
        hint: "转移原因",
        name: "",
        value: [],
        options: [],
      },
      originalUAO: {
        hint: "原使用部门",
        name: "",
        value: [],
      },
      originalUAE: {
        hint: "原使用人员",
        name: "",
        value: [],
      },
      originalKAO: {
        hint: "原管理部门",
        name: "",
        value: [],
      },
      originalKAE: {
        hint: "原管理人员",
        name: "",
        value: [],
      },
      originalLocation: {
        hint: "原存放位置",
        name: "",
        value: [],
      },
      transferToUAO: {
        hint: "转移后使用部门",
        name: "",
        value: [],
      },
      transferToUAE: {
        hint: "转移后使用人员",
        name: "",
        value: [],
      },
      transferToKAO: {
        hint: "转移后管理部门",
        name: "",
        value: [],
      },
      transferToKAE: {
        hint: "转移后管理人员",
        name: "",
        value: [],
      },
      transferToLocation: {
        hint: "转移后存放位置",
        name: "",
        value: [],
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
        key == "billCode" ||
        key == "transformDateStart" ||
        key == "transformDateEnd"
      ) {
        advancedSearch.value[key].value = null;
        return;
      }
      if (key == "transformReason") {
        advancedSearch.value[key].value = [];
        advancedSearch.value[key].name = null;
        return;
      }
      if (
        key == "originalUAO" ||
        key == "originalUAE" ||
        key == "originalKAO" ||
        key == "originalKAE" ||
        key == "originalLocation" ||
        key == "transferToUAO" ||
        key == "transferToUAE" ||
        key == "transferToKAO" ||
        key == "transferToKAE" ||
        key == "transferToLocation"
      ) {
        advancedSearch.value[key].value = [];
        advancedSearch.value[key].name = "";
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
      advancedSearch.value.billCode.value = null;
      advancedSearch.value.transformDateStart.value = null;
      advancedSearch.value.transformDateEnd.value = null;
      advancedSearch.value.transformReason.value = [];
      advancedSearch.value.transformReason.name = null;
      advancedSearch.value.originalUAO.value = [];
      advancedSearch.value.originalUAO.name = null;
      advancedSearch.value.originalUAE.value = [];
      advancedSearch.value.originalUAE.name = null;
      advancedSearch.value.originalKAO.value = [];
      advancedSearch.value.originalKAO.name = null;
      advancedSearch.value.originalKAE.value = [];
      advancedSearch.value.originalKAE.name = null;
      advancedSearch.value.originalLocation.value = [];
      advancedSearch.value.originalLocation.name = null;
      advancedSearch.value.transferToUAO.value = [];
      advancedSearch.value.transferToUAO.name = null;
      advancedSearch.value.transferToUAE.value = [];
      advancedSearch.value.transferToUAE.name = null;
      advancedSearch.value.transferToKAO.value = [];
      advancedSearch.value.transferToKAO.name = null;
      advancedSearch.value.transferToKAE.value = [];
      advancedSearch.value.transferToKAE.name = null;
      advancedSearch.value.transferToLocation.value = [];
      advancedSearch.value.transferToLocation.name = null;
    }

    function advancedInputConfirm(val) {
      advancedSearch.value[advancedInputKey.value].value = val;
    }

    function locationSelect(key) {
      // 存放位置
      only(eventNames.locationSelectBack, ({ ids, names }) => {
        advancedSearch.value[key].value = ids;
        advancedSearch.value[key].name = names;
      });
      const ids = advancedSearch.value[key].value;
      navigateTo(
        `pages/selector/asset/location?isLast=0&multiple=1&ids=${ids}`
      );
    }

    function corpDeptSelect(key) {
      // 公司/部门
      only(eventNames.deptSelectBack, ({ ids, names }) => {
        advancedSearch.value[key].value = ids;
        advancedSearch.value[key].name = names;
      });
      const ids = advancedSearch.value[key].value;
      navigateTo(`pages/selector/system/corpDept?multiple=1&ids=${ids}`);
    }

    function querySearch() {
      refreshList();
      conditionSearchPopup.value.close();
    }

    function IsEndChange({value,text}) {
      advancedSearch.value.transformReason.name = text;
      advancedSearch.value.transformReason.value = value;
    }

    async function search() {
      showLoading();
      try {
        const { PageCount, Items,TotalRecordQty } = await transformController.transformList({
          qst: qst.value,
          pageNo: currentPage,
          billCode: advancedSearch.value.billCode.value,
          transformDateStart: advancedSearch.value.transformDateStart.value,
          transformDateEnd: advancedSearch.value.transformDateEnd.value,
          transformReason: advancedSearch.value.transformReason.value,
          originalUAO: advancedSearch.value.originalUAO.value,
          originalUAE: advancedSearch.value.originalUAE.value,
          originalKAO: advancedSearch.value.originalKAO.value,
          originalKAE: advancedSearch.value.originalKAE.value,
          originalLocation: advancedSearch.value.originalLocation.value,
          transferToUAO: advancedSearch.value.transferToUAO.value,
          transferToUAE: advancedSearch.value.transferToUAE.value,
          transferToKAO: advancedSearch.value.transferToKAO.value,
          transferToKAE: advancedSearch.value.transferToKAE.value,
          transferToLocation: advancedSearch.value.transferToLocation.value,
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
      // 转移原因
      dictionaryController.dictionaryGetByCode("D018").then(({ Items }) => {
        advancedSearch.value.transformReason.options = Items.map((p) => {
          return {
            text: p.ItemText,
            value: p.ID,
          };
        });
      });
      search();
      only(eventNames.transformDetailBack, refreshList);
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
      navigateTo(`subcontract/asset/transform/detail?id=${id}&type=list`);
    }


    function personnelSelect(key) {
      // 选择人员
      only(eventNames.employeeSelectBack, ({ids,names}) => {
        advancedSearch.value[key].value = ids;
        advancedSearch.value[key].name = names;
      });
      const _id = advancedSearch.value[key].value;
      navigateTo(`pages/selector/system/employee?&multiple=1&ids=${_id}`);
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
      locationSelect,
      corpDeptSelect,
      conditionSearchPopup,
      applyDateTimeChange: ({ detail: { value } }, key) => {
        advancedSearch.value[key].value = value;
      },
      IsEndChange,
      querySearch,
      personnelSelect,
      billStatusColor,
      previewImg,
      getFileUrl,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
