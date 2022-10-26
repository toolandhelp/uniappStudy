<template>
  <!-- 高级搜索 -->
  <DrawerAdvancedSearch ref="conditionSearchPopup" mode="right" :mask-click="true" :width="windowWidths">
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
                      <text class="slot-box">报废单号：</text>
                    </view>
                  </template>
                  <template v-slot:body>
                    <text
                      class="condition_item_text"
                      :class="advancedSearch.code.value?'content_effective':''"
                      @click="openAdvancedInputDialog('code')"
                      >{{ advancedSearch.code.value ? advancedSearch.code.value : "报废单号" }}</text
                    >
                  </template>
                  <template v-slot:footer>
                    <view class="info-flex">
                        <view class="content-delete_icon">
                          <view>
                              <uni-icons v-if="advancedSearch.code.value" @click="removeAdvancedInput('code')" type="close" size="16"></uni-icons>
                          </view>
                        </view>
                        <view class="content-delete_icon">
                          <view>
                              <uni-icons @click="scanInput('code')" type="scan" size="16"></uni-icons>
                          </view>
                        </view>
                    </view>
                  </template>
                </uni-list-item>
                <uni-list-item>
                  <template v-slot:header>
                    <view class="align-item-center_label">
                      <text class="slot-box">经办人：</text>
                    </view>
                  </template>
                  <template v-slot:body>
                    <scroll-view style="width: calc(100% - 96px)" scroll-x>
                      <view
                        class="selector-content_text"
                        :class="
                          advancedSearch.handlerEmployee.value.length > 0
                            ? 'content_effective'
                            : ''
                        "
                         @click.stop="personnelSelect('handlerEmployee')"
                      >
                        {{
                          advancedSearch.handlerEmployee.value.length > 0
                            ? advancedSearch.handlerEmployee.name
                            : "选择人员"
                        }}
                      </view>
                    </scroll-view>
                  </template>
                  <template v-slot:footer>
                    <view class="info-flex">
                      <view class="content-delete_icon">
                        <view>
                            <uni-icons v-if="advancedSearch.handlerEmployee.value.length > 0" @click="removeAdvancedInput('handlerEmployee')" type="close" size="16"></uni-icons>
                        </view>
                      </view>
                      <view class="content-delete_icon">
                        <view>
                            <uni-icons color="red" type="scan" size="16" style="opacity: 0;"></uni-icons>
                        </view>
                      </view>
                    </view>
                  </template>
                </uni-list-item>
                <uni-list-item>
                  <template v-slot:header>
                    <view class="align-item-center_label">
                      <text class="slot-box">报废日期起：</text>
                    </view>
                  </template>
                  <template v-slot:body>
                    <view class="condition_item_text">
                      <picker
                          mode="date"
                          @change="(data)=>applyDateTimeChange(data,'requestDiscardBeginDate')"
                        >
                          <text class="condition_item_text" 
                          :class="advancedSearch.requestDiscardBeginDate.value?'content_effective':''">
                            {{
                              advancedSearch.requestDiscardBeginDate.value
                                ? advancedSearch.requestDiscardBeginDate.value
                                : "报废日期起"
                            }}
                          </text>
                        </picker>
                    </view>
                  </template>
                  <template v-slot:footer>
                     <view class="info-flex">
                       <view class="content-delete_icon">
                          <view>
                              <uni-icons v-if="advancedSearch.requestDiscardBeginDate.value" @click="removeAdvancedInput('requestDiscardBeginDate')" type="close" size="16"></uni-icons>
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
                      <text class="slot-box">报废日期起：</text>
                    </view>
                  </template>
                  <template v-slot:body>
                    <view class="condition_item_text">
                      <picker
                          mode="date"
                          @change="(data)=>applyDateTimeChange(data,'requestDiscardEndDate')"
                        >
                          <text class="condition_item_text" 
                          :class="advancedSearch.requestDiscardEndDate.value?'content_effective':''">
                            {{
                              advancedSearch.requestDiscardEndDate.value
                                ? advancedSearch.requestDiscardEndDate.value
                                : "报废日期起"
                            }}
                          </text>
                        </picker>
                    </view>
                  </template>
                  <template v-slot:footer>
                     <view class="info-flex">
                       <view class="content-delete_icon">
                        <view>
                            <uni-icons v-if="advancedSearch.requestDiscardEndDate.value" @click="removeAdvancedInput('requestDiscardEndDate')" type="close" size="16"></uni-icons>
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
                  <text class="slot-box">报废原因：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="condition_item_text">
                  <multiple-popup-select
                    :options="advancedSearch.discardReason.options"
                    @change="discardReasonChange"
                    :value="advancedSearch.discardReason.value"
                  >
                    <text
                      class="condition_item_text"
                      :class="
                        advancedSearch.discardReason.value.length ? 'content_effective' : ''
                      "
                      >{{
                        advancedSearch.discardReason.value.length
                          ? advancedSearch.discardReason.name
                          : "报废原因"
                      }}</text
                    >
                  </multiple-popup-select>
                </view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.discardReason.value.length"
                        @click="removeAdvancedInput('discardReason')"
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
                StatusTxt,
                BillCode,
                BillDatetime,
                BillerEmployeeName,
                RequestDiscardDatetime,
                NewLocationName,
                NewKAOName,
                NewKAEName,
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
                <text>报废日期：{{ RequestDiscardDatetime?RequestDiscardDatetime.substring(0,10):"" }}</text>
              </div>
            </view>
            <view class="list-item-col">
              <text>报废后管理部门：{{ NewKAOName }}</text>
              <text>报废后管理人员：{{ NewKAEName }}</text>
            </view>
            <view class="list-item-row">
              <text>报废后存放位置：</text>
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
import requestDiscardController from "../../../service/controller/asset/requestDiscardController.js";
import dictionaryController from "../../../service/controller/system/dictionaryController.js";
import {
  showErrorToast,
  showLoading,
  clearLoading,
} from "../../../share/util/message";
import { navigateTo, redirectTo } from "../../../share/redirect/index";
import { reactive, ref } from "vue";
import {
  onPullDownRefresh,
  onReachBottom,
} from "@dcloudio/uni-app";
import { only } from "../../../share/util/uniEvent";
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
        code:{
          hint:'报废单号',
          value:null,
        },
        handlerEmployee:{
          hint:'经办人',
          name:'',
          value:[],
        },
        requestDiscardBeginDate:{
          hint:'报废日期起',
          value:null,
        },
        requestDiscardEndDate:{
          hint:'报废日期止',
          value:null,
        },
        discardReason:{
          hint:'报废原因',
          name:'',
          value:[],
          options:[],
        }
    })
    // 条件搜索弹框
    const conditionSearchPopup = ref(null);

    // 获取屏幕高度
    const windowWidths = ref("");
    const windowHeights = ref("");

    function openAdvancedInputDialog(key){
      advancedInputVal.value = advancedSearch.value[key].value;
      advancedInputKey.value = key;
      advancedInputDialog.value.open();
    }

    function removeAdvancedInput(key){
      if(key == 'discardReason'){
        advancedSearch.value[key].value = [];
        advancedSearch.value[key].text = null;
        return
      }
      if(key == 'handlerEmployee'){
        advancedSearch.value[key].value = [];
        advancedSearch.value[key].text = null;
      }else{
        advancedSearch.value[key].value = null;
      }
    }

    function scanInput(key){
        uni.scanCode({
          scanType: ["barCode", "qrCode"],
          success: ({ result }) => {
              advancedSearch.value[key].value = result;
          },
        });
    }

    function conditionReset(){
      advancedSearch.value.code.value = null;
      advancedSearch.value.handlerEmployee.name = null;
      advancedSearch.value.handlerEmployee.value = [];
      advancedSearch.value.requestDiscardBeginDate.value = null;
      advancedSearch.value.requestDiscardEndDate.value = null;
      advancedSearch.value.discardReason.value = [];
      advancedSearch.value.discardReason.name = null;
    }

    function advancedInputConfirm(val){
      advancedSearch.value[advancedInputKey.value].value = val;
    }
    
    function querySearch(){
      refreshList();
      conditionSearchPopup.value.close();
    }

  async  function search() {
      showLoading();
      try{
        const {PageCount,Items,TotalRecordQty} = await requestDiscardController.requestDiscardList({
          qst:qst.value, 
          pageNo:currentPage,
          billCode:advancedSearch.value.code.value,
          requestDiscardAssetEmployeeIDs:advancedSearch.value.handlerEmployee.value,
          requestDiscardBeginDate:advancedSearch.value.requestDiscardBeginDate.value,
          requestDiscardEndDate:advancedSearch.value.requestDiscardEndDate.value,
          discardReasonIDs:advancedSearch.value.discardReason.value,
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
      }finally{
        clearLoading();
      }
      
    }

    {
      //报废原因
      dictionaryController.dictionaryGetByCode("D004").then(({ Items }) => {
        advancedSearch.value.discardReason.options = Items.map((p) => {
          return {
            text: p.ItemText,
            value: p.ID,
          };
        });
      });
      search();
      only(eventNames.requestDiscardDetailBack, refreshList);
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
      navigateTo(`/subcontract/asset/requestDiscard/detail?id=${id}&type=list`);
    }

    function discardReasonChange({value,text}) {
      advancedSearch.value.discardReason.name = text;
      advancedSearch.value.discardReason.value = value;
    }

    function personnelSelect(key) {
      // 人员
      only(eventNames.employeeSelectBack, ({ ids, names }) => {
        advancedSearch.value[key].value = ids;
        advancedSearch.value[key].name = names;
      });
      const ids = advancedSearch.value[key].value;
      navigateTo(`pages/selector/system/employee?multiple=1&ids=${ids}`);
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
      applyDateTimeChange: ({ detail: { value } },key) => {
        advancedSearch.value[key].value = value;
      },
      querySearch,
      personnelSelect,
      discardReasonChange,
      billStatusColor,
      previewImg,
      getFileUrl,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
