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
                  <text class="slot-box">发放单号：</text>
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
                      : "发放单号"
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
                  <text class="slot-box">发放日期起：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="condition_item_text">
                  <picker
                    mode="date"
                    @change="
                      (data) => applyDateTimeChange(data, 'drawBeginDate')
                    "
                  >
                    <text
                      class="condition_item_text"
                      :class="
                        advancedSearch.drawBeginDate.value
                          ? 'content_effective'
                          : ''
                      "
                    >
                      {{
                        advancedSearch.drawBeginDate.value
                          ? advancedSearch.drawBeginDate.value
                          : "发放日期起"
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
                          v-if="advancedSearch.drawBeginDate.value"
                          @click="removeAdvancedInput('drawBeginDate')"
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
                  <text class="slot-box">发放日期止：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="condition_item_text">
                  <picker
                    mode="date"
                    @change="(data) => applyDateTimeChange(data, 'drawEndDate')"
                  >
                    <text
                      class="condition_item_text"
                      :class="
                        advancedSearch.drawEndDate.value
                          ? 'content_effective'
                          : ''
                      "
                    >
                      {{
                        advancedSearch.drawEndDate.value
                          ? advancedSearch.drawEndDate.value
                          : "发放日期止"
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
                          v-if="advancedSearch.drawEndDate.value"
                          @click="removeAdvancedInput('drawEndDate')"
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
                  <text class="slot-box">发放部门：</text>
                </view>
              </template>
              <template v-slot:body>
                <scroll-view style="width: calc(100% - 130px)" scroll-x>
                  <view
                    class="selector-content_text"
                    :class="
                      advancedSearch.drawAssetOrg.value.length > 0
                        ? 'content_effective'
                        : ''
                    "
                    @click.stop="corpDeptSelect('drawAssetOrg')"
                  >
                    {{
                      advancedSearch.drawAssetOrg.value.length > 0
                        ? advancedSearch.drawAssetOrg.name
                        : "发放部门"
                    }}
                  </view>
                </scroll-view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                    <view class="content-delete_icon">
                      <view>
                        <uni-icons
                          v-if="advancedSearch.drawAssetOrg.value.length > 0"
                          @click="removeAdvancedInput('drawAssetOrg')"
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
                  <text class="slot-box">发放人员：</text>
                </view>
              </template>
              <template v-slot:body>
                <scroll-view style="width: calc(100% - 130px)" scroll-x>
                  <view
                    class="selector-content_text"
                    :class="
                      advancedSearch.drawAssetEmployee.value.length > 0
                        ? 'content_effective'
                        : ''
                    "
                    @click="personnelSelect('drawAssetEmployee')"
                  >
                    {{
                      advancedSearch.drawAssetEmployee.value.length > 0
                        ? advancedSearch.drawAssetEmployee.name
                        : "发放人员"
                    }}
                  </view>
                </scroll-view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.drawAssetEmployee.value.length > 0"
                        @click="removeAdvancedInput('drawAssetEmployee')"
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
                  <text class="slot-box">资产编码：</text>
                </view>
              </template>
              <template v-slot:body>
                <text
                  class="condition_item_text"
                  :class="
                    advancedSearch.assetCode.value ? 'content_effective' : ''
                  "
                  @click="openAdvancedInputDialog('assetCode')"
                  >{{
                    advancedSearch.assetCode.value
                      ? advancedSearch.assetCode.value
                      : "资产编码"
                  }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                    <view class="content-delete_icon">
                      <view>
                        <uni-icons
                          v-if="advancedSearch.assetCode.value"
                          @click="removeAdvancedInput('assetCode')"
                          type="close"
                          size="16"
                        ></uni-icons>
                      </view>
                    </view>
                    <view class="content-delete_icon">
                      <view>
                        <uni-icons
                          @click="scanInput('assetCode')"
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
                  :class="
                    advancedSearch.assetName.value ? 'content_effective' : ''
                  "
                  @click="openAdvancedInputDialog('assetName')"
                  >{{
                    advancedSearch.assetName.value
                      ? advancedSearch.assetName.value
                      : "资产名称"
                  }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                    <view class="content-delete_icon">
                      <view>
                        <uni-icons
                          v-if="advancedSearch.assetName.value"
                          @click="removeAdvancedInput('assetName')"
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
                      advancedSearch.assetCategory.value.length > 0
                        ? 'content_effective'
                        : ''
                    "
                    @click.stop="categorySelect('assetCategory')"
                  >
                    {{
                      advancedSearch.assetCategory.value.length > 0
                        ? advancedSearch.assetCategory.name
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
                        v-if="advancedSearch.assetCategory.value.length > 0"
                        @click="removeAdvancedInput('assetCategory')"
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
                DrawAssetDate,
                DrawAssetOrgName,
                BillCode,
                BillDatetime,
                BillerEmployeeName,
                DrawAssetEmployeeName,
                ID,
                Remark,
                SignPictureUrl,
              } in list"
              :key="ID"
               @click="itemClick(ID)">
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
                <text>发放日期：{{ DrawAssetDate?DrawAssetDate.substring(0,10):"" }}</text>
              </div>
            </view>
            <view class="list-item-col">
              <text>发放部门：{{ DrawAssetOrgName }}</text>
              <text>发放人员：{{ DrawAssetEmployeeName }}</text>
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
import drawController from "../../../service/controller/asset/drawController";
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
      billCode: {
        hint: "发放单号",
        value: null,
      },
      drawBeginDate: {
        hint: "发放日期起",
        value: null,
      },
      drawEndDate: {
        hint: "申领日期止",
        value: null,
      },
      drawAssetOrg: {
        hint: "发放部门",
        name: "",
        value: [],
      },
      drawAssetEmployee: {
        hint: "发放人员",
        name: "",
        value: [],
      },
      assetCode: {
        hint: "资产编码",
        value: null,
      },
      assetName: {
        hint: "资产名称",
        value: null,
      },
      assetCategory: {
        hint: "资产分类",
        value: [],
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
        key == "drawAssetOrg" ||
        key == "drawAssetEmployee" ||
        key == "assetCategory"
      ) {
        advancedSearch.value[key].name = null;
        advancedSearch.value[key].value = [];
        return;
      } else {
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
      advancedSearch.value.billCode.value = null;
      advancedSearch.value.drawBeginDate.value = null;
      advancedSearch.value.drawEndDate.value = null;
      advancedSearch.value.drawAssetOrg.value = [];
      advancedSearch.value.drawAssetEmployee.value = [];
      advancedSearch.value.assetCode.value = null;
      advancedSearch.value.assetName.value = null;
      advancedSearch.value.assetCategory.value = [];
      advancedSearch.value.brand.value = null;
      advancedSearch.value.spec.value = null;
      advancedSearch.value.model.value = null;
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
        const { PageCount, Items,TotalRecordQty } = await drawController.drawList({
          qst: qst.value,
          pageNo: currentPage,
          billCode: advancedSearch.value.billCode.value,
          drawBeginDate: advancedSearch.value.drawBeginDate.value,
          drawEndDate: advancedSearch.value.drawEndDate.value,
          drawAssetOrgIDs: advancedSearch.value.drawAssetOrg.value,
          drawAssetEmployeeIDs: advancedSearch.value.drawAssetEmployee.value,
          assetCode: advancedSearch.value.assetCode.value,
          assetName: advancedSearch.value.assetName.value,
          assetCategory: advancedSearch.value.assetCategory.value,
          brand: advancedSearch.value.brand.value,
          spec: advancedSearch.value.spec.value,
          model: advancedSearch.value.model.value,
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

    function corpDeptSelect(key) {
      // 公司/部门
      only(eventNames.deptSelectBack, ({ ids, names }) => {
        advancedSearch.value[key].value = ids;
        advancedSearch.value[key].name = names;
      });
      const ids = advancedSearch.value[key].value;
      navigateTo(`pages/selector/system/corpDept?multiple=1&ids=${ids}`);
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

    function categorySelect(key) {
      // 资产分类
      only(eventNames.assetCategorySelectBack, ({ ids, names }) => {
        advancedSearch.value[key].value = ids;
        advancedSearch.value[key].name = names;
      });
      const ids = advancedSearch.value[key].value;
      navigateTo(
        `pages/selector/asset/category?isLast=0&multiple=1&ids=${ids}`
      );
    }

    {
      search();
      only(eventNames.drawDetailBack, refreshList);
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
      navigateTo(`subcontract/asset/draw/drawDetail?id=${id}&type=list`);
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
      corpDeptSelect,
      personnelSelect,
      categorySelect,
      billStatusColor,
      previewImg,
      getFileUrl,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
