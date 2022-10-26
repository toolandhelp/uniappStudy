<template>
  <!-- 单据备注输入弹框 -->
  <uni-popup ref="inputRemarkDialog" type="dialog">
    <uni-popup-dialog
      mode="input"
      title="单据备注"
      :value="remarkVal"
      placeholder="请输入备注信息"
      @confirm="dialogRemarkInputConfirm"
    ></uni-popup-dialog>
  </uni-popup>
  <!-- 关联申请单号弹框 -->
  <uni-popup ref="inputRequestBillCodeDialog" type="dialog">
    <uni-popup-dialog
      mode="input"
      title="申领单号"
      value=""
      placeholder="单号/申领人员"
      @confirm="dialogRequestBillCodeInputConfirm"
    ></uni-popup-dialog>
  </uni-popup>
 
  <!-- 选择申领单号 -->
  <uni-popup
    ref="requestBillCodeListDialog"
    type="dialog"
  >
    <uni-popup-cancel-dialog
      title="选择申领单号"
      type="info"
      :before-close="true"
      @close="requestBillCodeListDialog.close()"
    >
    <view class="retrieval" :style="`height:${windowHeights / 2}px`">
      <uni-list>
          <uni-list-item
            v-for="item in requestBillCodeList"
            :key="ID"
            link
            @click="selectRequisitionNo(item)"
          >
            <template v-slot:body>
              <view class="retrieval_content">
                <view class="retrieval_item">
                  <text class="retrieval_item_title">{{ item.BillCode }}</text>
                  <view class="retrieval_item_row">
                    <text>申领日期：{{ item.RequestDate }}</text>
                  </view>
                  <view class="retrieval_item_row">
                    <text>申领部门：{{ item.RequestOrgName }}</text>
                  </view>
                  <view class="retrieval_item_row">
                    <text>申领人员：{{ item.RequesterEmployeeName }}</text>
                  </view>
                  <view class="retrieval_item_row">
                    <text>申领原因：{{ item.RequestReasonText }}</text>
                  </view>
                  <view class="retrieval_item_row">
                    <text>是否结束：{{ item.IsClosedText }}</text>
                  </view>
                  <view class="retrieval_item_row">
                    <text>制单人：{{ item.BillerEmployeeName }}</text>
                  </view>
                  <view class="retrieval_item_row">
                    <text>制单时间：{{ item.BillDateTime }}</text>
                  </view>
                </view>
              </view>
            </template>
          </uni-list-item>
        </uni-list>
    </view>
    </uni-popup-cancel-dialog>
  </uni-popup>
  <!-- 选择资产新增明细 -->
  <uni-popup ref="assetDialog" type="dialog">
    <uni-popup-dialog
      title="选择资产"
      type="info"
      :before-close="true"
      @close="assetDialog.close()"
      @confirm="assetDialogConfirm"
    >
      <view class="retrieval" :style="`height:${windowHeights / 2}px`">
        <uni-list>
          <uni-list-item
            v-for="{
              ID,
              Name,
              Code,
              AssetCategoryName,
              Brand,
              Spec,
              Model,
              checked,
            } in searchAssetList"
            :key="ID"
          >
            <template v-slot:body>
              <view class="retrieval_content">
                <view class="retrieval_item">
                  <text class="retrieval_item_title">{{ Name }}</text>
                  <view class="retrieval_item_row">
                    <text>资料编码：{{ Code }}</text>
                  </view>
                  <view class="retrieval_item_row">
                    <text>资产分类：{{ AssetCategoryName }}</text>
                  </view>
                  <view class="retrieval_item_row">
                    <text>品牌：{{ Brand }}</text>
                  </view>
                  <view class="retrieval_item_row">
                    <text>规格：{{ Spec }}</text>
                  </view>
                  <view class="retrieval_item_row">
                    <text>型号：{{ Model }}</text>
                  </view>
                </view>
              </view>
            </template>
            <template v-slot:footer>
              <view class="retrieval_checkbox">
                <checkbox-group @change="checkBoxChange($event, ID)">
                  <label>
                    <checkbox color="#ff5e00" :checked="checked" />
                  </label>
                </checkbox-group>
              </view>
            </template>
          </uni-list-item>
        </uni-list>
      </view>
    </uni-popup-dialog>
  </uni-popup>
  <!-- 提交弹框 -->
  <uni-popup ref="submitDialog" class="submitDialog" type="dialog">
    <uni-popup-dialog
      model="base"
      :before-close="true"
      :type="submitMsgType.type"
      :cancelText="submitMsgType.cancel"
      :confirmText="submitMsgType.confirm"
      :title="submitMsgType.title"
      @confirm="submitDialogConfirm"
      @close="submitDialogClose"
    ></uni-popup-dialog>
  </uni-popup>

  <!-- 新增编辑明细 -->
  <uni-popup ref="inputDialog" type="center">
    <uni-popup-dialog
      ref="inputClose"
      :before-close="true"
      mode="input"
      :title="editInfoTitle"
      @confirm="editDetailConfirm"
      @close="editDetailClose"
    >
      <view class="bill_header billheader_clear_padding" style="width:100%">
          <uni-list>
            <uni-list-item>
              <template v-slot:header>
                <view class="bill_header_label">
                  <text class="required">*</text>
                  <text class="item_label_color">管理部门：</text>
                </view>
              </template>
              <template v-slot:body>
                <text
                  class="item_text_content"
                  :class="rowDetail.kAO.value ? 'content_effective' : ''"
                  @click.stop="corpDeptSelect('kAO')"
                  >{{ rowDetail.kAO.value ? rowDetail.kAO.name : "请选择" }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content_delete_icon">
                    <view>
                      <uni-icons
                        v-if="rowDetail.kAO.value"
                        @click="removeEditDetailInputInfo('kAO')"
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
                <view class="bill_header_label">
                  <text class="item_label_color ensp">管理人员：</text>
                </view>
              </template>
              <template v-slot:body>
                <text
                  class="item_text_content"
                  :class="rowDetail.kAE.value ? 'content_effective' : ''"
                  @click="personnelSelect('kAE')"
                  >{{ rowDetail.kAE.value ? rowDetail.kAE.name : "请选择" }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                    <view class="content_delete_icon">
                      <view>
                        <uni-icons
                          v-if="rowDetail.kAE.value"
                          @click="removeEditDetailInputInfo('kAE')"
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
                <view class="bill_header_label">
                  <text class="required">*</text>
                  <text class="item_label_color">存放位置：</text>
                </view>
              </template>
              <template v-slot:body>
                <text
                  class="item_text_content"
                  :class="rowDetail.location.value ? 'content_effective' : ''"
                  @click.stop="locationSelect('location')"
                  >{{
                    rowDetail.location.value ? rowDetail.location.name : "请选择"
                  }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content_delete_icon">
                    <view>
                      <uni-icons
                        v-if="rowDetail.location.value"
                        @click="removeEditDetailInputInfo('location')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item
              :show-switch="true"
              :switchChecked="rowDetail.isPublicAsset.value"
              @switchChange="isPublicAssetSwitchChange"
            >
              <template v-slot:header>
                <view class="bill_header_label">
                  <text class="required">*</text>
                  <text class="item_label_color">是否公共资产：</text>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="bill_header_label">
                  <text class="item_label_color ensp">使用部门：</text>
                </view>
              </template>
              <template v-slot:body>
                <text
                  class="item_text_content"
                  :class="rowDetail.uAO.value ? 'content_effective' : ''"
                  @click.stop="corpDeptSelect('uAO')"
                  >{{ rowDetail.uAO.value ? rowDetail.uAO.name : "请选择" }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content_delete_icon">
                    <view>
                      <uni-icons
                        v-if="rowDetail.uAO.value"
                        @click="removeEditDetailInputInfo('uAO')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item :disabled="rowDetail.isPublicAsset.value">
              <template v-slot:header>
                <view class="bill_header_label">
                  <text class="item_label_color ensp">使用人员：</text>
                </view>
              </template>
              <template v-slot:body>
                <text
                  class="item_text_content"
                  :class="rowDetail.uAE.value ? 'content_effective' : ''"
                  @click="personnelSelect('uAE')"
                  >{{ rowDetail.uAE.value ? rowDetail.uAE.name : "请选择" }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content_delete_icon">
                    <view>
                      <uni-icons
                        v-if="rowDetail.uAE.value"
                        @click="removeEditDetailInputInfo('uAE')"
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
      
    </uni-popup-dialog>
  </uni-popup>

  <!-- 单据头 -->
  <scroll-view :style="`height:${IsScroll.header}px`" scroll-y>
    <view class="bill_header">
      <uni-list>
        <uni-list-item disabled>
          <template v-slot:header>
            <view class="bill_header_label">
              <text class="item_label_color ensp">单号</text>
            </view>
          </template>
          <template v-slot:body>
            <view class="item_text_content">
                <text v-if="!nonEditable" selectable>{{
                  bill.code ? bill.code : "自动生成"
                }}</text>
                <text v-else selectable>
                  {{bill.code}}
                </text>
            </view>
          </template>
          <template v-slot:footer>
            <view class="info-flex">
              <view class="content_delete_icon" v-for="s in 2" v-if="!nonEditable">
                <view></view>
              </view>
            </view>
          </template>
        </uni-list-item>
        <uni-list-item :disabled="nonEditable">
          <template v-slot:header>
            <view class="bill_header_label">
              <text class="required">*</text>
              <text class="item_label_color">发放日期：</text>
            </view>
          </template>
          <template v-slot:body>
            <view
              class="item_text_content"
              :class="bill.drawAssetDate.value ? 'content_effective' : ''"
            >
              <picker v-if="!nonEditable" mode="date" @change="drawAssetDateChange">
                <text>
                  {{
                    bill.drawAssetDate.value
                      ? bill.drawAssetDate.value
                      : "请选择日期"
                  }}
                </text>
              </picker>
              <text v-else>
                {{
                  bill.drawAssetDate.value
                }}
              </text>
            </view>
          </template>
          <template v-slot:footer>
            <view class="info-flex">
              <view class="content_delete_icon" v-if="!nonEditable">
                <view>
                  <uni-icons
                    v-if="nonEditable ? false : bill.drawAssetDate.value"
                    @click="removeInput('drawAssetDate')"
                    type="close"
                    size="16"
                  ></uni-icons>
                </view>
              </view>
              <view class="content_delete_icon" v-if="!nonEditable">
                <view></view>
              </view>
            </view>
          </template>
        </uni-list-item>
        <uni-list-item :disabled="nonEditable || getStorage('UserType') == 2">
          <template v-slot:header>
            <view class="bill_header_label">
              <text class="required">*</text>
              <text class="item_label_color">发放人员：</text>
            </view>
          </template>
          <template v-slot:body>
            <view class="item_text_content" :class="bill.drawAssetEmployee.value ? 'content_effective' : ''">
              <text
                v-if="!nonEditable"
                @click="personnelSelect('drawAssetEmployee')"
                >{{
                  bill.drawAssetEmployee.value
                    ? bill.drawAssetEmployee.text
                    : "请选择人员"
                }}</text
              >
              <text
                v-else
                >
                {{bill.drawAssetEmployee.text}}
              </text>
            </view>
          </template>
          <template v-slot:footer>
            <view class="info-flex">
              <view class="content_delete_icon" v-if="!nonEditable">
                <view>
                  <uni-icons
                    v-if="getStorage('UserType') == 2 ? false : (nonEditable ? false : bill.drawAssetEmployee.value)"
                    @click="removeInput('drawAssetEmployee')"
                    type="close"
                    size="16"
                  ></uni-icons>
                </view>
              </view>
              <view class="content_delete_icon" v-if="!nonEditable">
                <view></view>
              </view>
            </view>
          </template>
        </uni-list-item>
        <uni-list-item :disabled="nonEditable">
          <template v-slot:header>
            <view class="bill_header_label">
              <text class="item_label_color ensp">关联申请单号：</text>
            </view>
          </template>
          <template v-slot:body>
            <view class="item_text_content" :class="bill.requestDrawBillCode.value ? 'content_effective' : ''">
                <text
                  v-if="!nonEditable"
                  @click="openRequestBillCodeDialog()"
                  >{{
                    bill.requestDrawBillCode.value
                      ? bill.requestDrawBillCode.code
                      : "关联申请单号"
                  }}</text
                >
                <text
                  v-else
                  >{{
                    bill.requestDrawBillCode.code
                  }}</text
                >
            </view>
          </template>
          <template v-slot:footer>
            <view class="info-flex">
              <view class="content_delete_icon" v-if="!nonEditable">
                <view>
                  <uni-icons
                    v-if="nonEditable ? false : bill.requestDrawBillCode.value"
                    @click="removeInput('requestDrawBillCode')"
                    type="close"
                    size="16"
                  ></uni-icons>
                </view>
              </view>
              <view class="content_delete_icon" v-if="!nonEditable">
                <view>
                  <uni-icons
                    @click="scanInput('requestDrawBillCode')"
                    type="scan"
                    size="16"
                  ></uni-icons>
                </view>
              </view>
            </view>
          </template>
        </uni-list-item>
        <uni-list-item
          :show-switch="true"
          :switchChecked="bill.isClosedRequestDraw.value"
          @switchChange="switchChange"
          :disabled="nonEditable"
        >
          <template v-slot:header>
            <view class="bill_header_label">
              <text class="item_label_color ensp">结束申领：</text>
            </view>
          </template>
        </uni-list-item>
        <uni-list-item :disabled="nonEditable">
          <template v-slot:header>
            <view class="bill_header_label">
              <text class="item_label_color ensp">备注：</text>
            </view>
          </template>
          <template v-slot:body>
            <view class="item_text_content" :class="bill.remark ? 'content_effective' : ''">
              <text
                v-if="!nonEditable"
                @click="openRemarkDialog()"
                >{{ bill.remark ? bill.remark : "请输入备注信息" }}</text
              >
              <text
                v-else
                >{{ bill.remark}}</text
              >
            </view>
          </template>
          <template v-slot:footer>
            <view class="info-flex">
              <view class="content_delete_icon" v-if="!nonEditable">
                <view>
                  <uni-icons
                    v-if="nonEditable ? false : bill.remark"
                    @click="removeInput('remark')"
                    type="close"
                    size="16"
                  ></uni-icons>
                </view>
              </view>
              <view class="content_delete_icon" v-if="!nonEditable">
                <view></view>
              </view>
            </view>
          </template>
        </uni-list-item>
      </uni-list>
    </view>
  </scroll-view>
  <!-- 单据详情 -->
  <scroll-view
    class="bill_detail_scroll"
    :style="`height:${IsScroll.content}px`"
    @scroll="toIndex = ''"
    :scroll-into-view="toIndex"
    :scroll-with-animation="true"
    scroll-y
  >
    <view id="listDetail"></view>
    <uni-section title="明细列表" :rTitle="`数量：${billDetailNumber}`" type="line">
      <view class="bill_detail_content">
        <uni-swipe-action>
          <uni-swipe-action-item
            :disabled="nonEditable"
            :right-options="uniSwipeActionItemRightOptions"
            :show="isOpened"
            :auto-close="false"
            @change="uniSwipeChange(index)"
            v-for="(
              {
                Code,
                Name,
                CategoryName,
                OriginalCode,
                OriginalAmount,
                NewKAOName,
                NewKAEName,
                NewUAOName,
                NewUAEName,
                NewLocationName,
                IsPublicAsset,
                Brand,
                Spec,
                Model,
                Qty,
                isOpened,
                AssetID,
              },
              index
            ) in billDetail"
            :key="AssetID"
            @click="uniSwipeClick($event, index)"
          >
                <view class="detail_content_item"
                :style="(index + 1) == billDetail.length ?'margin-bottom:0px':''"  
                :class="nonEditable?'disabled_color':''" 
                >
                  <view class="content_item_title">
                    <view>
                      <text>资产名称：{{ Name }}</text>
                    </view>
                    <uni-icons v-if="!nonEditable" type="compose" size="30" color="#444" @click="editBillDetail(index)"></uni-icons>
                  </view>
                  <view class="content_item_col">
                    <text selectable>资产编码：{{ Code }}</text>
                    <text selectable>原编码：{{ OriginalCode }}</text>
                  </view>
                  <view class="content_item_col">
                    <text>原值：{{ OriginalAmount }}</text>
                    <text>是否公共资产：{{ IsPublicAsset ? "是" : "否" }}</text>
                  </view>
                  <view class="content_item_col">
                    <text>品牌：{{ Brand }}</text>
                    <text>规格：{{ Spec }}</text>
                  </view>
                  <view class="content_item_col">
                    <text>型号：{{ Model }}</text>
                    <text>数量：{{ Qty }}</text>
                  </view>
                  <view class="content_item_col">
                    <text>管理部门：{{ NewKAOName }}</text>
                    <text>管理人员：{{ NewKAEName }}</text>
                  </view>
                  <view class="content_item_col">
                    <text>使用部门：{{ NewUAOName }}</text>
                    <text>使用人员：{{ NewUAEName }}</text>
                  </view>
                  <view class="content_item_row">
                    <text>资产分类：</text>
                    <text>{{ CategoryName }}</text>
                  </view>
                  <view class="content_item_row">
                    <text>存放位置：</text>
                    <text>{{ NewLocationName }}</text>
                  </view>
                </view>
          </uni-swipe-action-item>
        </uni-swipe-action>
        <view class="nothing" :style="`height:100%`" v-if="billDetail.length < 1">
            暂 无 数 据
        </view>
      </view>
    </uni-section>
    <view id="example"></view>
    <BillEnclosure
    :option="files"
    @change="filesChange"
    :nonEditable="nonEditable"
    />
  </scroll-view>

  <!-- 单据操作 -->
  <BillFooterBtn 
  :type="type"
  :billType="'Draw'"
  :bill="bill"
  :nonEditable="nonEditable"
  :autoStart="autoStart"
  @jumpList="jumpList" 
  @save="handleSaveDraft"
  @delete="deleteDialogConfirm"
  @scrollToTop="toIndex = 'listDetail'"
  @scrollToFooter="toIndex = 'example'"
  @scan="scan()"
  @keyword="dialogsearchCodeValConfirm"
  @getById="(id)=>editGetByID(id)"
  :scanInputDialogTitle="'资产搜索'"
  :scanInputDialogHint="'编码/原编码/名称'"  
  />
</template>

<script>
import drawController from "../../../service/controller/asset/drawController";
import requestDrawController from "../../../service/controller/asset/requestDrawController.js";
import { reactive, ref,nextTick, computed, getCurrentInstance } from "vue";
import { getStorage } from "../../../share/util/storage";
import {
  showOkToast,
  showErrorToast,
  showLoading,
  clearLoading,
} from "../../../share/util/message";
import {
  redirectTo,
  navigateTo,
  navigateBack,
} from "../../../share/redirect/index";
import { getCurrentDate } from "../../../share/util/dateTime";
import { emitPromise } from "../../../share/util/uniEvent";
import eventNames from "../../../service/enumeration/eventNames";
import { awaitDelay, getScanCode } from "../../../share/util/index";
import { only } from "../../../share/util/uniEvent";
import { getFileUrl } from "../../../share/http/serveUrl";
import BillFooterBtn from "../../../components/billFooterBtn/billFooterBtn.vue";
import {uniSwipeActionItemRightOptions} from "../../../share/util/billBasicConfig";
import BillEnclosure from "../../../components/billEnclosure/billEnclosure.vue";

export default {
  components: {
    BillEnclosure,
    BillFooterBtn
  },
  props: {
    id: String,
    type: String,
  },
  onNavigationBarButtonTap(e) {
    // 跳转发放单列表
    navigateTo("/subcontract/asset/requestDraw/requestDrawList");
  },
  setup({ id, type }) {
    // 单据头信息
    const bill = ref({
      id: null,
      status: null,
      isSubmit: null,
      // 编码
      code: "",
      // 发放人员
      drawAssetEmployee: {
        text: getStorage("UserName"),
        value: getStorage("EmployeeID"),
      },
      // 发放部门
      drawAssetOrg: {
        text: getStorage("OrgName"),
        value: getStorage("OrgID"),
      },
      // 发放日期
      drawAssetDate: {
        hint: "请选择发放日期",
        value: getCurrentDate(),
      },
      //  关联申请单号
      requestDrawBillCode: {
        hint: "关联申请单号",
        code: "",
        value: "",
      },
      isClosedRequestDraw: {
        hint: "结束申领",
        value: false,
      },
      // 单据备注
      remark: "",
      //启动审批
      IsStart: false,
      startFlow: true,
      // 流程轨迹
      FlowPath: false,
      // 审批按钮
      IsApproval: false,
      // 启用批准
      enablingApproval: false,
    });

    const rowDetail = ref({
      name: "",
      brand: "",
      spec: "",
      model: "",
      qty: 0,
      kAO: {
        hint: "管理部门",
        name: "",
        value: null,
      },
      kAE: {
        hint: "管理人员",
        name: "",
        value: null,
      },
      location: {
        hint: "存放位置",
        name: "",
        value: null,
      },
      isPublicAsset: {
        hint: "是否公共资产",
        value: false,
      },
      uAO: {
        hint: "使用部门",
        name: "",
        value: null,
      },
      uAE: {
        hint: "使用人员",
        name: "",
        value: null,
      },
    });

    // 单据明细信息
    const billDetail = ref([]);

    const inputDialog = ref(null);

    const editInfoTitle = ref(""); //编辑明细弹框标题

    const isOpened = ref("none"); //滑动删除

    const detailIndex = ref(null);

    const remarkVal = ref("");

    const inputRemarkDialog = ref(null);

    const requestBillCodeList = ref([]); //申请单检索列表

    const requestBillCodeListDialog = ref(null);

    const inputRequestBillCodeDialog = ref(null);

    const assetDialog = ref(null);

    const searchAssetList = ref([]);

    // 提交弹框信息
    const submitMsgType = reactive({
      type: "info",
      cancel: "取消",
      confirm: "确认",
      title: "确认提交?",
    });

    const submitDialog = ref(null); //提交弹框

    const nonEditable = ref(false); //不可编辑

    const autoStart = ref(false);

    const toIndex = ref(""); //锚点链接

    const files = ref([]);

    // 获取屏幕高度
    const windowHeights = ref("");

    function uniSwipeChange(e, index) {
      billDetail.value.isOpened = e;
    }

    function uniSwipeClick(e, index) {
      if (e.index == 1) {
        billDetail.value.splice(index, 1);
        showOkToast("移除成功");
      }
    }

    function openEditDetailDalog(type) {
      editInfoTitle.value = type ? "新增" : "编辑";
      inputDialog.value.open();
    }

    function openRemarkDialog() {
      remarkVal.value = bill.value.remark;
      inputRemarkDialog.value.open();
    }

    function dialogRemarkInputConfirm(val) {
      bill.value.remark = val.trim();
    }

    function editDetailConfirm(val) {
      if (!rowDetail.value.kAO.value) {
        showErrorToast("管理部门不能为空");
        return;
      }
      if (!rowDetail.value.location.value) {
        showErrorToast("存放位置不能为空");
        return;
      }
      billDetail.value[detailIndex.value].NewKAOID = rowDetail.value.kAO.value;
      billDetail.value[detailIndex.value].NewKAOName = rowDetail.value.kAO.name;
      billDetail.value[detailIndex.value].NewKAONameCN =
        rowDetail.value.kAO.name;
      billDetail.value[detailIndex.value].NewKAONameEN =
        rowDetail.value.kAO.name;
      billDetail.value[detailIndex.value].NewKAEID = rowDetail.value.kAE.value;
      billDetail.value[detailIndex.value].NewKAEName = rowDetail.value.kAE.name;
      billDetail.value[detailIndex.value].NewLocationID =
        rowDetail.value.location.value;
      billDetail.value[detailIndex.value].NewLocationName =
        rowDetail.value.location.name;
      billDetail.value[detailIndex.value].NewLocationNameCN =
        rowDetail.value.location.name;
      billDetail.value[detailIndex.value].NewLocationNameEN =
        rowDetail.value.location.name;
      billDetail.value[detailIndex.value].IsPublicAsset =
        rowDetail.value.isPublicAsset.value;
      billDetail.value[detailIndex.value].NewUAOID = rowDetail.value.uAO.value;
      billDetail.value[detailIndex.value].NewUAOName = rowDetail.value.uAO.name;
      billDetail.value[detailIndex.value].NewUAONameCN =
        rowDetail.value.uAO.name;
      billDetail.value[detailIndex.value].NewUAONameEN =
        rowDetail.value.uAO.name;
      billDetail.value[detailIndex.value].NewUAEID = rowDetail.value.uAE.value;
      billDetail.value[detailIndex.value].NewUAEName = rowDetail.value.uAE.name;
      resetInputDialog();
    }

    function editDetailClose() {
      resetInputDialog();
    }

    function resetInputDialog() {
      rowDetail.value.kAO.value = null;
      rowDetail.value.kAO.name = null;
      rowDetail.value.kAE.value = null;
      rowDetail.value.kAE.name = null;
      rowDetail.value.location.value = null;
      rowDetail.value.location.name = null;
      rowDetail.value.isPublicAsset.value = false;
      rowDetail.value.uAO.value = null;
      rowDetail.value.uAO.name = null;
      rowDetail.value.uAE.value = null;
      rowDetail.value.uAE.name = null;
      detailIndex.value = null;
      inputDialog.value.close();
    }

    function editBillDetail(index) {
      if (nonEditable && bill.value.status !== null && bill.value.status != 1) {
        return;
      }
      detailIndex.value = index;
      const {
        NewKAOID,
        NewKAOName,
        NewKAEID,
        NewKAEName,
        NewLocationID,
        NewLocationName,
        IsPublicAsset,
        NewUAOID,
        NewUAOName,
        NewUAEID,
        NewUAEName,
      } = billDetail.value[index];

      rowDetail.value.kAO.value = NewKAOID;
      rowDetail.value.kAO.name = NewKAOName;
      rowDetail.value.kAE.value = NewKAEID;
      rowDetail.value.kAE.name = NewKAEName;
      rowDetail.value.location.value = NewLocationID;
      rowDetail.value.location.name = NewLocationName;
      rowDetail.value.isPublicAsset.value = IsPublicAsset;
      rowDetail.value.uAO.value = NewUAOID;
      rowDetail.value.uAO.name = NewUAOName;
      rowDetail.value.uAE.value = NewUAEID;
      rowDetail.value.uAE.name = NewUAEName;
      openEditDetailDalog(0);
    }

    function deleteDialogConfirm() {
      showLoading();
      drawController
        .drawDelete(bill.value.id)
        .then(() => {
          emitPromise(eventNames.drawDetailBack).then(() =>
            navigateBack()
          );
        })
        .finally(() => clearLoading());
    }

    // 保存提交
    function handleSaveDraft(IsSubmit) {
      bill.value.isSubmit = IsSubmit;
      if (!bill.value.drawAssetDate.value) {
        showErrorToast("请选择发放日期");
        return;
      }
      if (!bill.value.drawAssetEmployee.value) {
        showErrorToast("请选择发放人员");
        return;
      }
      if (billDetail.value.length < 1) {
        toIndex.value = 'listDetail';
        showErrorToast("请添加资产信息");
        return;
      }
      if (!bill.value.isSubmit) {
        submitDialogConfirm();
        return;
      }
      submitDialog.value.open();
    }

    function submitDialogClose() {
      submitDialog.value.close();
    }

    function submitDialogConfirm() {
      let obj = {};
      obj.ID = bill.value.id;
      obj.BillCode = bill.value.code;
      obj.CommitType = bill.value.id ? 1 : 0;
      obj.IsSubmit = bill.value.isSubmit ? true : false;
      obj.DrawAssetDate = bill.value.drawAssetDate.value;
      obj.DrawAssetEmployeeID = bill.value.drawAssetEmployee.value;
      obj.DrawAssetEmployeeName = bill.value.drawAssetEmployee.text;
      obj.DrawAssetOrgID = bill.value.drawAssetOrg.value;
      obj.DrawAssetOrgNameCN = bill.value.drawAssetOrg.text;
      obj.DrawAssetOrgNameEN = bill.value.drawAssetOrg.text;
      obj.RequestDrawID = bill.value.requestDrawBillCode.value;
      obj.RequestDrawCode = bill.value.requestDrawBillCode.code;
      obj.IsClosedRequestDraw = bill.value.isClosedRequestDraw.value;
      obj.Remark = bill.value.remark;
      obj.Details = billDetail.value.map((item, index) => {
        let row = item;
        row.Sequence = index + 1;
        return row;
      });
      obj.Attachments = files.value.map((item, index) => {
        item.Sequence = index + 1;
        return item;
      });
      showLoading();
      drawController
        .drawSaveDraft(obj)
        .then(({ Code, ID }) => {
          editGetByID(ID).then(() => {
            if (bill.value.IsStart) {
              // 启动审批流
              autoStart.value = true;
            }
          });
          submitDialogClose();
        })
        .finally(() => clearLoading());
    }

    function editGetByID(id) {
      showLoading();
      return drawController
        .drawGetByID(id)
        .then(
          ({
            ID,
            Status,
            BillCode,
            DrawAssetDate,
            DrawAssetEmployeeID,
            DrawAssetEmployeeName,
            DrawAssetOrgID,
            DrawAssetOrgNameCN,
            RequestDrawID,
            RequestDrawCode,
            IsClosedRequestDraw,
            Remark,
            Details,
            Attachments,
            FlowInfo,
          }) => {
            bill.value.id = ID;
            bill.value.status = Status;
            bill.value.code = BillCode;
            bill.value.drawAssetDate.value = DrawAssetDate
              ? DrawAssetDate.substring(0, 10)
              : "";
            bill.value.drawAssetEmployee.value = DrawAssetEmployeeID;
            bill.value.drawAssetEmployee.text = DrawAssetEmployeeName;
            bill.value.drawAssetOrg.value = DrawAssetOrgID;
            bill.value.drawAssetOrg.text = DrawAssetOrgNameCN;
            bill.value.requestDrawBillCode.value = RequestDrawID;
            bill.value.requestDrawBillCode.code = RequestDrawCode;
            bill.value.isClosedRequestDraw.value = IsClosedRequestDraw;
            bill.value.remark = Remark;
            billDetail.value = Details;
            files.value = Attachments.map((p) => {
              p.name = p.FileName;
              p.url = getFileUrl(p.FileUrl);
              return p;
            });
            nonEditable.value =
              bill.value.status != 1 && bill.value.status != null;
            // 审批按钮
            bill.value.IsApproval = FlowInfo.IsApproval;
            // 启动审批流
            bill.value.IsStart =
              Status != 1 && !FlowInfo.IsStart && FlowInfo.IsEnabledFlow;
            // 流程轨迹
            bill.value.FlowPath =
              (Status != 1 && FlowInfo.IsStart && FlowInfo.IsEnabledFlow) ||
              FlowInfo.IsSendBack;
            autoStart.value = false;
            if (type && type == 'mywork' && !bill.value.IsApproval) {
              emitPromise(eventNames.billDetailBack).then(() => navigateBack());
            }
          }
        )
        .finally(() => clearLoading());
    }

    // 跳转列表
    function jumpList() {
      navigateTo("/subcontract/asset/draw/drawList");
    }

    let billDetailNumber = computed(() => {
      let num = 0;
      for (let i = 0,len = billDetail.value.length; i < len; i++) {
        if(billDetail.value[i].Qty){
          num += parseInt(Number(billDetail.value[i].Qty));
        }
      }
      return num;
    });

    {
      if (id) {
        editGetByID(id);
      }
      uni.getSystemInfo({
        success: (result) => {
          windowHeights.value = result.windowHeight;
        },
      });
    }

    function removeInput(key) {
      if (key == "drawAssetDate") {
        bill.value[key].value = null;
        bill.value[key].text = null;
        return;
      }
      if (key == "drawAssetEmployee") {
        bill.value[key].value = null;
        bill.value[key].text = null;
        bill.value.drawAssetOrg.value = null;
        bill.value.drawAssetOrg.text = null;
        return;
      }
      if (key == "requestDrawBillCode") {
        bill.value[key].value = null;
        bill.value[key].code = null;
      }
      if (key == "remark") {
        bill.value[key] = "";
        return;
      }
    }

    function removeEditDetailInputInfo(key) {
      rowDetail.value[key].value = null;
      rowDetail.value[key].name = null;
    }

    function requestBillCode(qst) {
      showLoading();
      requestDrawController
        .requestDrawList({ qst, pageNo: 1, pageSize: 5 })
        .then(({ Items }) => {
          if (Items && Items.length < 1) {
            showErrorToast("未检索到可用数据");
            return;
          }
          if (Items && Items.length == 1) {
            bill.value.requestDrawBillCode.code = Items[0].BillCode;
            bill.value.requestDrawBillCode.value = Items[0].ID;
            return;
          }
          requestBillCodeList.value = Items;
          requestBillCodeListDialog.value.open();
        })
        .finally(() => clearLoading());
    }

    function selectRequisitionNo({ ID, BillCode }) {
      bill.value.requestDrawBillCode.code = BillCode;
      bill.value.requestDrawBillCode.value = ID;
      requestBillCodeListDialog.value.close();
    }

    function openRequestBillCodeDialog() {
      inputRequestBillCodeDialog.value.open();
    }

    function dialogRequestBillCodeInputConfirm(val) {
      if (val.trim() == "") {
        showErrorToast("无效的检索条件");
        return;
      }
      requestBillCode(val);
    }

    function scanInput(key) {
      uni.scanCode({
        scanType: ["barCode", "qrCode"],
        success: ({ result }) => {
          requestBillCode(getScanCode(result));
        },
      });
    }

    // 扫码查询
    function scan() {
      uni.scanCode({
        scanType: ["barCode", "qrCode"],
        success: ({ result }) => {
          addQuery(getScanCode(result));
        },
      });
    }

    // 检索数据
    function addQuery(keyWorld) {
      showLoading();
      drawController
        .assetListQueryByBillType(keyWorld)
        .then(({ Items }) => {
          searchAssetList.value = Items.map((p) => {
            p.checked = false;
            return p;
          });
          if (searchAssetList.value.length < 1) {
            showErrorToast("未查询到可用资产资料");
            return;
          }
          assetDialog.value.open();
        })
        .finally(() => clearLoading());
    }

    // 选中资产资料
    function checkBoxChange(e, Id) {
      let values = e.detail.value,
        items = searchAssetList.value;
      if (values.length > 0) {
        for (let i = 0, len = items.length; i < len; i++) {
          if (items[i].ID == Id) {
            items[i].checked = true;
            break;
          }
        }
      } else {
        for (let i = 0, len = items.length; i < len; i++) {
          if (items[i].ID == Id) {
            items[i].checked = false;
            break;
          }
        }
      }
    }

    function assetDialogConfirm() {
      let items = searchAssetList.value;
      let arr = items.filter((p) => p.checked);
      if (arr.length < 1) {
        showErrorToast("请勾选一条数据");
        return;
      }
      let timer = true;
      for (let i = 0, len = arr.length; i < len; i++) {
        let check = billDetail.value.filter((p) => p.AssetID == arr[i].ID);
        if (check.length < 1) {
          console.log(arr[i]);
          let obj = {};
          obj.ID = null;
          obj.AssetID = arr[i].ID;
          obj.Name = arr[i].Name;
          obj.AssetInfo = [
            { ID: arr[i].ID, Code: arr[i].Code, Name: arr[i].Name },
          ];
          obj.Code = arr[i].Code;
          obj.OriginalCode = arr[i].OriginalCode;
          obj.OriginalAmount = arr[i].OriginalAmount;
          obj.OriginalKAOID = arr[i].KAOID; //原管理部门
          obj.OriginalLocationID = arr[i].LocationID; //原存放位置
          obj.NewKAOID = arr[i].KAOID;
          obj.NewKAOName = arr[i].KAOName;
          obj.NewKAONameCN = arr[i].KAONameCN;
          obj.NewKAONameEN = arr[i].KAONameEN; //管理部门
          obj.NewKAEID = arr[i].KAEID;
          obj.NewKAEName = arr[i].KAEName;
          // obj.KAEPersonnelInfo = arr[i].KAEInfo;//管理人员
          obj.NewLocationID = arr[i].LocationID;
          obj.NewLocationName = arr[i].LocationName;
          obj.NewLocationNameCN = arr[i].LocationName;
          obj.NewLocationNameEN = arr[i].LocationName; //存放位置
          obj.IsPublicAsset = false;
          obj.NewUAOID = arr[i].UAOID;
          obj.NewUAOName = arr[i].UAOName;
          obj.NewUAONameCN = arr[i].UAOName;
          obj.NewUAONameEN = arr[i].UAOName; //使用部门
          obj.NewUAEID = arr[i].UAEID;
          obj.NewUAEName = arr[i].UAEName; //使用人员
          obj.CategoryID = arr[i].AssetCategoryID;
          obj.CategoryName = arr[i].CategoryName;
          obj.CategoryNameCN = arr[i].CategoryNameCN;
          obj.CategoryNameEN = arr[i].CategoryNameEN; //资产分类
          obj.Brand = arr[i].Brand;
          obj.Spec = arr[i].Spec;
          obj.Model = arr[i].Model;
          obj.Qty = arr[i].Qty;
          obj.isOpened = "none";
          billDetail.value.push(obj);
        } else {
          if (timer) {
            showErrorToast("请勿添加重复资产");
            timer = false;
            const setTimer = setTimeout(() => {
              timer = true;
              clearTimeout(setTimer);
            }, 3000);
          }
        }
      }
      assetDialog.value.close();
      searchAssetList.value = [];
    }

    function dialogsearchCodeValConfirm(val) {
      if (val.trim() == "") {
        showErrorToast("无效的检索条件");
        return;
      }
      addQuery(val);
    }

    function locationSelect(key) {
      only(eventNames.locationSelectBack, ({ id, label }) => {
        rowDetail.value[key].value = id;
        rowDetail.value[key].name = label;
      });
      const id = rowDetail.value[key].value;
      navigateTo(`pages/selector/asset/location?isLast=1&multiple=0&ids=${id}`);
    }

    function corpDeptSelect(key) {
      // 公司/部门
      only(eventNames.deptSelectBack, ({ id, label }) => {
        rowDetail.value[key].value = id;
        rowDetail.value[key].name = label;
      });
      const id = rowDetail.value[key].value;
      navigateTo(`pages/selector/system/corpDept?multiple=0&ids=${id}`);
    }

    function personnelSelect(key) {
      if(nonEditable.value)return
      if(key == 'drawAssetEmployee' && getStorage('UserType') == 2){
        return
      }
      if(key == 'kAE' && !rowDetail.value.kAO.value){
        showErrorToast('请先选择管理部门');
        return
      }
      if(key == 'uAE' && !rowDetail.value.uAO.value){
        showErrorToast('请先选择使用部门');
        return
      }
      // 选择人员
      only(eventNames.employeeSelectBack, ({ ID, Name, OrgID, OrgName }) => {
        if(key == 'drawAssetEmployee'){
          bill.value[key].value = ID;
          bill.value[key].text = Name;
          bill.value.drawAssetOrg.value = OrgID;
          bill.value.drawAssetOrg.text = OrgName;
        }else{
          rowDetail.value[key].value = ID;
          rowDetail.value[key].name = Name;
        }
      });
      let _id = null;
      if(key == 'drawAssetEmployee'){
        _id = bill.value[key].value;
      }else{
        _id = rowDetail.value[key].value;
      }
      let corpId = "";
      if(key == 'kAE'){
        corpId = rowDetail.value.kAO.value;
      }else if(key == 'uAE'){
        corpId = rowDetail.value.uAO.value;
      }
      navigateTo(`pages/selector/system/employee?&multiple=0&corpID=${corpId}&ids=${_id}`);
    }

    function isPublicAssetSwitchChange(e) {
      rowDetail.value.isPublicAsset.value = e.value;
      if (e.value) {
        rowDetail.value.uAE.value = null;
        rowDetail.value.uAE.name = "";
      }
    }

    function switchChange(e) {
      bill.value.isClosedRequestDraw.value = e.value;
    }

    function filesChange(val){
      files.value = val;
    }


    // 屏幕可视区域是否需要滚动处理
    let IsScroll = computed(() => {
      let header, content;
      if ((windowHeights.value - 60) / 2 > 270) {
        header = 270;
        content = windowHeights.value - 330;
      } else {
        header = content = (windowHeights.value - 60) / 2;
      }
      return { header, content };
    });

    return {
      getStorage,
      type,
      IsScroll,
      bill, //单据头信息
      billDetail, //单据明细
      rowDetail, //编辑明细
      uniSwipeActionItemRightOptions, //删除操作按钮
      isOpened, //滑动删除
      uniSwipeChange, //滑动事件
      uniSwipeClick, //删除事件
      inputDialog, //新增弹框
      openEditDetailDalog, //新增明细
      remarkVal,
      dialogRemarkInputConfirm, //备注弹框
      inputRemarkDialog, //备注框
      openRemarkDialog, //备注弹框事件
      editDetailConfirm, //编辑确认
      editDetailClose, //编辑取消
      editBillDetail, //编辑明细
      deleteDialogConfirm, //删除弹框
      resetInputDialog, //关闭弹框
      handleSaveDraft, //提交数据
      submitDialog, //提交弹框
      submitMsgType, //提交弹框信息
      submitDialogConfirm, //确认提交
      submitDialogClose, //取消提交
      editInfoTitle, //标题
      billDetailNumber, //明细数量
      editGetByID, //获取数据
      nonEditable, //不可编辑
      jumpList, //跳转列表
      windowHeights, //屏幕高度
      drawAssetDateChange: ({ detail: { value } }) => {
        if (nonEditable.value) return;
        bill.value.drawAssetDate.value = value;
      },
      removeInput, //删除输入类数据
      removeEditDetailInputInfo,
      scanInput, //扫码输入
      requestBillCode, //申请单号
      requestBillCodeList, //申请单号列表
      inputRequestBillCodeDialog, //
      openRequestBillCodeDialog,
      dialogRequestBillCodeInputConfirm,
      requestBillCodeListDialog,
      selectRequisitionNo, //选择申领单号
      scan, //扫码检索
      addQuery, //新增查询
      dialogsearchCodeValConfirm,
      searchAssetList, //资产数据列表
      assetDialog, //资产弹框
      checkBoxChange,
      assetDialogConfirm,
      isPublicAssetSwitchChange,
      switchChange,
      locationSelect,
      corpDeptSelect,
      personnelSelect,
      files,
      filesChange,
      toIndex,
      autoStart,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
