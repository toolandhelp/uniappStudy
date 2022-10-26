<template>
  <!-- 单据备注输入弹框 -->
  <uni-popup ref="inputRemarkDialog" type="dialog">
    <uni-popup-dialog
      ref="inputClose"
      mode="input"
      title="单据备注"
      :value="remarkVal"
      placeholder="请输入备注信息"
      @confirm="dialogRemarkInputConfirm"
    ></uni-popup-dialog>
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
  <uni-popup ref="assetsDialog" class="assetsDialog" type="dialog">
    <uni-popup-dialog
      title="选择资产"
      type="info"
      :before-close="true"
      @close="assetsDialog.close()"
      @confirm="assetsDialogConfirm"
    >
      <view class="retrieval" :style="`height:${windowHeights / 2}px`">
        <uni-list>
          <uni-list-item
            v-for="{
              ID,
              Name,
              Code,
              CategoryName,
              Brand,
              Spec,
              Model,
              checked,
            } in serachAssetList"
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
                    <text>资产分类：{{ CategoryName }}</text>
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
  <uni-popup ref="inputDialog" type="center">
    <uni-popup-dialog
      ref="inputClose"
      :before-close="true"
      mode="input"
      :title="editInfoTitle"
      @confirm="editDetailConfirm"
      @close="editDetailClose"
    >
        <view class="edit_detail_content">
            <uni-list>
              <uni-list-item disabled>
                <template v-slot:header>
                  <view class="detail_item_label">
                    <text class="detail_label_color">编码：</text>
                  </view>
                </template>
                <template v-slot:body>
                  <view class="detail_item_body">
                    <text class="item_text_content">{{ rowDetail.code }}</text>
                  </view>
                </template>
              </uni-list-item>
              <uni-list-item disabled>
                <template v-slot:header>
                  <view class="detail_item_label">
                    <text class="detail_label_color">名称：</text>
                  </view>
                </template>
                <template v-slot:body>
                  <view class="detail_item_body">
                    <text class="item_text_content">{{ rowDetail.name }}</text>
                  </view>
                </template>
              </uni-list-item>
              <uni-list-item>
                <template v-slot:header>
                  <view class="detail_item_label">
                    <text class="detail_label_color">报废原因：</text>
                  </view>
                </template>
                <template v-slot:body>
                  <view class="detail_item_body">
                    <uni-data-picker
                      v-slot:default="{ data, error, options }"
                      class="data-picker-request-draw"
                      placeholder="请选择报废原因"
                      :border="false"
                      :clear-icon="false"
                      :localdata="scrappingReason"
                      @input="scrappingReasonChange"
                      v-model="rowDetail.reasonVal"
                    >
                      <text class="item_text_content">{{
                        rowDetail.reasonVal ? rowDetail.reasonText : "请选择报废原因"
                      }}</text>
                    </uni-data-picker>
                  </view>
                </template>
              </uni-list-item>
              <uni-list-item>
                <template v-slot:header>
                  <view class="detail_item_label">
                    <text class="detail_label_color">报废说明：</text>
                  </view>
                </template>
                <template v-slot:body>
                  <view class="detail_item_body">
                    <uni-easyinput
                      :border="false"
                      maxlength="10"
                      type="text"
                      v-model="rowDetail.remarks"
                      placeholder="请输入报废说明"
                    />
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
        <uni-list-item :disabled="true">
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
              <view class="content_delete_icon" v-if="!nonEditable">
                <view></view>
              </view>
            </view>
          </template>
        </uni-list-item>
        <uni-list-item :disabled="nonEditable">
          <template v-slot:header>
            <view class="bill_header_label">
              <text class="required">*</text>
              <text class="item_label_color">报废日期：</text>
            </view>
          </template>
          <template v-slot:body>
            <view class="item_text_content" :class="bill.requestDiscardDatetime.value?'content_effective':''">
              <picker
                v-if="!nonEditable"
                mode="date"
                @change="applyDateTimeChange"
              >
                <text>
                  {{
                    bill.requestDiscardDatetime.value
                      ? bill.requestDiscardDatetime.value
                      : "请选择日期"
                  }}
                </text>
              </picker>
              <text
                v-else
                >
                  {{
                    bill.requestDiscardDatetime.value
                  }}
                </text>
            </view>
          </template>
          <template v-slot:footer>
            <view class="info-flex">
                <view class="content_delete_icon" v-if="!nonEditable">
                  <view>
                      <uni-icons v-if="nonEditable?false:bill.requestDiscardDatetime.value" @click="removeInput('requestDiscardDatetime')" type="close" size="16"></uni-icons>
                  </view>
                </view>
            </view>
          </template>
        </uni-list-item>
        <uni-list-item :disabled="nonEditable || getStorage('UserType') == 2">
          <template v-slot:header>
            <view class="bill_header_label">
              <text class="required">*</text>
              <text class="item_label_color">经办人：</text>
            </view>
          </template>
          <template v-slot:body>
            <view class="item_text_content" :class="bill.handlerEmployee.value?'content_effective':''" >
              <text 
              v-if="!nonEditable"
              @click="personnelSelect('handlerEmployee')"
              >
                {{ bill.handlerEmployee.value ? bill.handlerEmployee.text : "请选择人员" }}
              </text>
              <text v-else>
                {{ bill.handlerEmployee.text }}
            </text>
            </view>
            
          </template>
          <template v-slot:footer>
            <view class="info-flex">
                <view class="content_delete_icon" v-if="!nonEditable">
                  <view>
                      <uni-icons v-if="getStorage('UserType') == 2 ? false : (nonEditable ? false : bill.handlerEmployee.value)" @click="removeInput('handlerEmployee')" type="close" size="16"></uni-icons>
                  </view>
                </view>
            </view>
          </template>
        </uni-list-item>
        <uni-list-item :disabled="nonEditable">
          <template v-slot:header>
            <view class="bill_header_label">
              <text class="item_label_color ensp">报废后存放位置：</text>
            </view>
          </template>
          <template v-slot:body>
            <view class="item_text_content" :class="bill.NewLocation.value?'content_effective':''">
              <text v-if="!nonEditable" @click="locationSelect('NewLocation')">{{ bill.NewLocation.value?bill.NewLocation.text:'请选择存放位置' }}</text>
              <text v-else>{{bill.NewLocation.text}}</text>
            </view>
          </template>
          <template v-slot:footer>
            <view class="info-flex">
                <view class="content_delete_icon" v-if="!nonEditable">
                  <view>
                      <uni-icons v-if="nonEditable?false:bill.NewLocation.value" @click="removeInput('NewLocation')" type="close" size="16"></uni-icons>
                  </view>
                </view>
            </view> 
          </template>
        </uni-list-item>
        <uni-list-item :disabled="nonEditable">
          <template v-slot:header>
            <view class="bill_header_label">
              <text class="item_label_color ensp">报废后管理部门：</text>
            </view>
          </template>
          <template v-slot:body>
            <view class="item_text_content" :class="bill.NewKAO.value?'content_effective':''">
              <text v-if="!nonEditable"  @click="corpDeptSelect('NewKAO')">{{ bill.NewKAO.value?bill.NewKAO.text:'请选择管理部门' }}</text>
              <text v-else>{{ bill.NewKAO.text }}</text>
            </view>
            
          </template>
          <template v-slot:footer>
            <view class="info-flex">
              <view class="content_delete_icon" v-if="!nonEditable">
                <view>
                    <uni-icons v-if="nonEditable?false:bill.NewKAO.value" @click="removeInput('NewKAO')" type="close" size="16"></uni-icons>
                </view>
              </view>
            </view>
          </template>
        </uni-list-item>
        <uni-list-item :disabled="nonEditable">
          <template v-slot:header>
            <view class="bill_header_label">
              <text class="item_label_color ensp">报废后管理人员：</text>
            </view>
          </template>
          <template v-slot:body>
            <view class="item_text_content" :class="bill.NewKAE.value?'content_effective':''">
              <text v-if="!nonEditable" @click="personnelSelect('NewKAE')">{{ bill.NewKAE.value?bill.NewKAE.text:'请选择管理人员' }}</text>
              <text v-else>{{ bill.NewKAE.text }}</text>
            </view>
          </template>
          <template v-slot:footer>
            <view class="info-flex">
              <view class="content_delete_icon" v-if="!nonEditable">
                <view>
                    <uni-icons v-if="nonEditable?false:bill.NewKAE.value" @click="removeInput('NewKAE')" type="close" size="16"></uni-icons>
                </view>
              </view>
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
            <view class="item_text_content" :class="bill.remark?'content_effective':''">
              <text
                v-if="!nonEditable"
                @click="openRemarkDialog()"
                >{{ bill.remark ? bill.remark : "请输入备注信息" }}</text
              >
              <text
                v-else
                >{{ bill.remark }}</text
              >
            </view>
          </template>
          <template v-slot:footer>
            <view class="info-flex">
              <view class="content_delete_icon" v-if="!nonEditable">
                <view>
                    <uni-icons v-if="nonEditable?false:bill.remark" @click="removeInput('remark')" type="close" size="16"></uni-icons>
                </view>
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
            :show="item.isOpened"
            :auto-close="false"
            @change="uniSwipeChange(index)"
            v-for="(item, index) in billDetail"
            :key="item.AssetID"
            @click="uniSwipeClick($event, index)"
          >
                <view class="detail_content_item"
                :style="(index + 1) == billDetail.length ?'margin-bottom:0px':''"  
                :class="nonEditable?'disabled_color':''" 
                >
                  <view class="content_item_title">
                    <view>
                      <text>资产名称：{{ item.Name }}</text>
                    </view>
                    <uni-icons v-if="!nonEditable" type="compose" size="30" color="#444" @click="editBillDetail(index)"></uni-icons>
                  </view>
                  <view class="content_item_col">
                    <text selectable>资产编码：{{ item.Code }}</text>
                    <text selectable>原编码：{{ item.OriginalCode }}</text>
                  </view>
                  <view class="content_item_col">
                    <text>原值：{{ item.OriginalAmount }}</text>
                    <text>报废原因：{{ item.DiscardReasonName }}</text>
                  </view>
                  <view class="content_item_col">
                    <text>品牌：{{ item.Brand }}</text>
                    <text>规格：{{ item.Spec }}</text>
                  </view>
                  <view class="content_item_col">
                    <text>型号：{{ item.Model }}</text>
                    <text>数量：{{ item.Qty }}</text>
                  </view>
                  <view class="content_item_row">
                    <text>资产分类：</text>
                    <text>{{ item.CategoryName }}</text>
                  </view>
                  <view class="content_item_row">
                    <text>报废说明：</text>
                    <text>{{ item.RequestDesc }}</text>
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
  :billType="'RequestDiscard'"
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
import requestDiscardController from "../../../service/controller/asset/requestDiscardController.js";
import dictionaryController from "../../../service/controller/system/dictionaryController.js";
import { reactive, ref, computed,nextTick, getCurrentInstance } from "vue";
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
import { awaitDelay,getScanCode } from "../../../share/util/index";
import { only } from "../../../share/util/uniEvent";
import { getFileUrl } from "../../../share/http/serveUrl";
import BillFooterBtn from "../../../components/billFooterBtn/billFooterBtn.vue";
import {uniSwipeActionItemRightOptions} from "../../../share/util/billBasicConfig";
import BillEnclosure from "../../../components/billEnclosure/billEnclosure.vue";

export default {
  components:{
    BillEnclosure,
    BillFooterBtn
  },
  props: {
    id: String,
    type: String,
  },
  setup({ id, type }) {
    const remarkVal = ref("");
    // 单据头信息
    const bill = ref({
      id: null,
      status: null,
      isSubmit: null,
      // 编码
      code: "",
      // 经办人
      handlerEmployee: {
        text: getStorage("UserName"),
        value: getStorage("EmployeeID"),
      },
      // 经办部门
      handlerOrgID: {
        text: getStorage("OrgName"),
        value: getStorage("OrgID"),
      },
      // 报废日期
      requestDiscardDatetime: {
        hint: "请选择报废日期",
        value: getCurrentDate(),
      },
      //  报废后存放位置
      NewLocation: {
        hint: "存放位置",
        text: "",
        value: null,
      },
      // 报废后管理部门
      NewKAO: {
        hint: "管理部门",
        text: "",
        value: null,
      },
      //  报废后管理人员
      NewKAE: {
        hint: "管理人员",
        text: "",
        value: null,
      },
      // 单据备注
      remark: "",
      //启动审批
      IsStart: false,
      startFlow: true,
      // 流程轨迹
      FlowPath:false,
      // 审批按钮
      IsApproval: false,
      // 启用批准
      enablingApproval: false,
	 
    });
    const rowDetail = ref({
      name: "",
      code: "",
      reasonVal: "",
      reasonText: "",
      remarks: "",
    });
    // 单据明细信息
    const billDetail = ref([]);
  
    let serachAssetList = ref([]);
	
    // 资产弹窗
    const assetsDialog = ref(null);

    const isOpened = ref("none"); //滑动删除

    const inputDialog = ref(null);

    const editInfoTitle = ref(""); //编辑明细弹框标题

    const inputRemarkDialog = ref(null);

    const detailIndex = ref(null);

    // 提交弹框信息
    const submitMsgType = reactive({
      type: "info",
      cancel: "取消",
      confirm: "确认",
      title: "确认提交?",
    });

    const submitDialog = ref(null); //提交弹框

    //报废原因
    const scrappingReasonVal = ref(null);

    const scrappingReasonText = ref(null);
    // 报废原因数据源
    const scrappingReason = ref([]);

    const toIndex = ref(""); //锚点链接

    const autoStart = ref(false);

    const files = ref([]);

    const windowHeights = ref("");
 
    // 检索数据
    function addQuery(keyWorld) {
      showLoading();
      requestDiscardController
        .assetListQueryByBillType(keyWorld)
        .then(({ Items }) => {
          serachAssetList.value = Items.map((p) => {
            p.checked = false;
            return p;
          });
          if (serachAssetList.value.length < 1) {
            showErrorToast("未查询到可用资产");
            return;
          }
          assetsDialog.value.open();
        })
        .finally(() => clearLoading());
    }

    function dialogsearchCodeValConfirm(val) {
      const str = val.trim();
      if (str == "" || str == null || str == undefined) {
        showErrorToast("无效的检索条件");
        return;
      }
      addQuery(str);
    }

    
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
    // 编码检索确认
    function dialogRemarkInputConfirm(val) {
      bill.value.remark = val.trim();
      remarkVal.value = val.trim();
    }
    function editDetailConfirm(val) {
        billDetail.value[detailIndex.value].DiscardReasonID = rowDetail.value.reasonVal;
        billDetail.value[detailIndex.value].DiscardReasonName = rowDetail.value.reasonText;
        billDetail.value[detailIndex.value].DiscardReasonNameCN = rowDetail.value.reasonText;
        billDetail.value[detailIndex.value].DiscardReasonNameEN = rowDetail.value.reasonText;
        billDetail.value[detailIndex.value].RequestDesc = rowDetail.value.remarks;
        resetInputDialog();
    }
    function editDetailClose() {
      resetInputDialog();
    }
    function resetInputDialog() {
      rowDetail.value.name = null;
      rowDetail.value.code = null;
      rowDetail.value.reasonVal = null;
      rowDetail.value.reasonText = null;
      rowDetail.value.remarks = null;
      detailIndex.value = null;
      inputDialog.value.close();
    }
    
    function editBillDetail(index) {
      if (nonEditable && bill.value.status !== null && bill.value.status != 1) {
        return;
      }
      detailIndex.value = index;
      const { Name,Code, DiscardReasonID, DiscardReasonName, RequestDesc } = billDetail.value[index];
      rowDetail.value.name = Name;
      rowDetail.value.code = Code;
      rowDetail.value.reasonVal = DiscardReasonID;
      rowDetail.value.reasonText = DiscardReasonName;
      rowDetail.value.remarks = RequestDesc;
      openEditDetailDalog(0);
    }

    // 报废原因编辑
    function scrappingReasonChange(val) {
      const {value,text} = scrappingReason.value.filter((p) => p.value == val)[0];
      rowDetail.value.reasonVal = value;
      rowDetail.value.reasonText =  text;
    }

    function deleteDialogConfirm() {
      showLoading();
      requestDiscardController
        .requestDiscardDelete(bill.value.id)
        .then(() => {
          emitPromise(eventNames.requestDiscardDetailBack).then(() =>
            navigateBack()
          );
        })
        .finally(() => clearLoading());
    }
    
    // 保存提交
    function handleSaveDraft(IsSubmit) {
      bill.value.isSubmit = IsSubmit;
      if (!bill.value.requestDiscardDatetime.value) {
        showErrorToast("请选择报废日期");
        return;
      }
      if (!bill.value.handlerEmployee.value) {
        showErrorToast("请选择经办人");
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
      obj.CommitType = bill.value.id ? 1 : 0;
      obj.IsSubmit = bill.value.isSubmit ? true : false;
      obj.RequestDiscardDatetime = bill.value.requestDiscardDatetime.value;
      obj.HandlerEmployeeID = bill.value.handlerEmployee.value;
      obj.HandlerEmployeeName = bill.value.handlerEmployee.text;
      obj.HandlerOrgID = bill.value.handlerOrgID.value;
      obj.HandlerOrgNameCN = bill.value.handlerOrgID.text;
      obj.HandlerOrgNameEN = bill.value.handlerOrgID.text;

      obj.NewLocationID = bill.value.NewLocation.value;
      obj.NewLocationNameCN = bill.value.NewLocation.text;
      obj.NewLocationNameEN = bill.value.NewLocation.text;

      obj.NewKAOID = bill.value.NewKAO.value;
      obj.NewKAONameCN = bill.value.NewKAO.text;
      obj.NewKAONameEN = bill.value.NewKAO.text;

      obj.NewKAEID = bill.value.NewKAE.value;
      obj.NewKAEName = bill.value.NewKAE.text;

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
      requestDiscardController
        .requestDiscardSaveDraft(obj)
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
    let nonEditable = ref(false); //不可编辑
    function editGetByID(id) {
      showLoading();
      return requestDiscardController
        .requestDiscardGetByID(id)
        .then(
          ({
            ID,
            Status,
            BillCode,
            RequestDiscardDatetime,
            HandlerEmployeeID,
            HandlerEmployeeName,
            HandlerOrgID,
            HandlerOrgNameCN,
            NewLocationID,
            NewLocationName,
            NewKAOID,
            NewKAOName,
            NewKAEID,
            NewKAEName,
            Remark,
            Details,
            Attachments,
            FlowInfo,
          }) => {
            bill.value.id = ID;
            bill.value.status = Status;
            bill.value.code = BillCode;
            bill.value.requestDiscardDatetime.value = RequestDiscardDatetime
              ? RequestDiscardDatetime.substring(0, 10)
              : "";
            bill.value.handlerEmployee.value = HandlerEmployeeID;
            bill.value.handlerEmployee.text = HandlerEmployeeName;
            bill.value.handlerOrgID.value = HandlerOrgID;
            bill.value.handlerOrgID.text = HandlerOrgNameCN;
            bill.value.NewLocation.value = NewLocationID;
            bill.value.NewLocation.text = NewLocationName;
            bill.value.NewKAO.value = NewKAOID;
            bill.value.NewKAO.text = NewKAOName;
            bill.value.NewKAE.value = NewKAEID;
            bill.value.NewKAE.text = NewKAEName;
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
            bill.value.FlowPath = (Status!=1&&FlowInfo.IsStart&&FlowInfo.IsEnabledFlow) || FlowInfo.IsSendBack;
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
      navigateTo("/subcontract/asset/requestDiscard/list");
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
      //报废原因
      dictionaryController.dictionaryGetByCode("D004").then(({ Items }) => {
        scrappingReason.value = Items.map((p) => {
          return {
            text: p.ItemText,
            value: p.ID,
          };
        });
        const {ID,ItemText} = Items.filter(p=>p.IsDefaultItem)[0];
        scrappingReasonVal.value = ID;
        scrappingReasonText.value = ItemText;
      });
      if (id) {
        editGetByID(id);
      }
      only(eventNames.signBack,()=> editGetByID(bill.value.id));
      // 获取屏幕高度
      uni.getSystemInfo({
        success: (result) => {
          windowHeights.value = result.windowHeight;
        },
      });
    }

    // 选中资产
    function checkBoxChange(e, Id) {
      let values = e.detail.value,
        items = serachAssetList.value;
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

    function assetsDialogConfirm() {
      let items = serachAssetList.value;
      let arr = items.filter((p) => p.checked);
      if (arr.length < 1) {
        showErrorToast("请勾选一条数据");
        return;
      }
      let timer = true;
      for (let i = 0, len = arr.length; i < len; i++) {
        let check = billDetail.value.filter((p) => p.AssetID == arr[i].ID);
        if (check.length < 1) {
          let obj = {};
          obj.AssetID = arr[i].ID;
          obj.ID = null;
          obj.BillID = null;
          obj.Name = arr[i].Name;
          obj.Code = arr[i].Code;
          obj.CategoryID = arr[i].CategoryID;
          obj.CategoryName = arr[i].CategoryName;
          obj.CategoryNameCN = arr[i].CategoryNameCN;
          obj.CategoryNameEN = arr[i].CategoryNameEN;
          obj.DiscardReasonID = scrappingReasonVal.value;
          obj.DiscardReasonName = scrappingReasonText.value;
          obj.DiscardReasonNameCN = scrappingReasonText.value;
          obj.DiscardReasonNameEN = scrappingReasonText.value;
          obj.OriginalAmount = arr[i].OriginalAmount;
          obj.OriginalCode = arr[i].OriginalCode;
          obj.Brand = arr[i].Brand;
          obj.Spec = arr[i].Spec;
          obj.Model = arr[i].Model;
          obj.Qty = arr[i].Qty;
          obj.RequestDesc = null;

          obj.isOpened = "none";
          obj.Qty = 1;
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
      assetsDialog.value.close();
      serachAssetList.value = [];
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

    function removeInput(key){
        if(key == 'requestDiscardDatetime'){
          bill.value.requestDiscardDatetime.value = "";
          return
        }
        if(key == 'NewLocation'||key == 'NewKAE'){
          bill.value[key].text = "";
          bill.value[key].value = null;
          return
        }
        if(key == 'NewKAO'){
          bill.value[key].text = "";
          bill.value[key].value = null;
          bill.value.NewKAE.text = "";
          bill.value.NewKAE.value = null;
        }
        if(key == 'handlerEmployee'){
          bill.value.handlerEmployee.text = "";
          bill.value.handlerEmployee.value = null;
          bill.value.handlerOrgID.text = "";
          bill.value.handlerOrgID.value = null;
          return
        }
        if(key == 'remark'){
          bill.value.remark = "";
          return
        }
    }

    function locationSelect(key){
      // 存放位置
        only(eventNames.locationSelectBack,({id,label})=>{
            bill.value[key].value = id;
            bill.value[key].text = label;
        });
      const _id = bill.value[key].value;
      navigateTo(`pages/selector/asset/location?isLast=1&multiple=0&ids=${_id}`);
    }

    function corpDeptSelect(key){
       // 公司/部门
        only(eventNames.deptSelectBack,({id,label})=>{
            bill.value[key].value = id;
            bill.value[key].text = label;
        });
      const _id = bill.value[key].value;
      navigateTo(`pages/selector/system/corpDept?multiple=0&type=${key == 'NewCorp'? 2 : 1 }&ids=${_id}`);
    }

    function personnelSelect(key){
      if(key == 'handlerEmployee' && getStorage('UserType') == 2){
        return
      }
      if(key == 'NewKAE' && !bill.value.NewKAO.value){
        showErrorToast('请先选择管理部门');
        return
      }
        // 选择人员
        only(eventNames.employeeSelectBack,({ID,Name,OrgID,OrgName})=>{
            bill.value[key].value = ID;
            bill.value[key].text = Name;
           if(key == 'handlerEmployee'){
              bill.value.handlerOrgID.value = OrgID;
              bill.value.handlerOrgID.text = OrgName;
           }
        });
      const _id = bill.value[key].value;
      navigateTo(`pages/selector/system/employee?&multiple=0&corpID=${key == 'NewKAE'?bill.value.NewKAO.value:''}&ids=${_id}`);
    }

    function filesChange(val){
      files.value = val;
    }

    // 屏幕可视区域是否需要滚动处理
    let IsScroll = computed(() => {
      let header, content;
      if ((windowHeights.value - 60) / 2 > 315) {
        header = 315;
        content = windowHeights.value - 375;
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
      remarkVal,
      rowDetail, //编辑明细
      uniSwipeActionItemRightOptions, //删除操作按钮
      isOpened, //滑动删除
      uniSwipeChange, //滑动事件
      uniSwipeClick, //删除事件
      inputDialog, //新增弹框
      openEditDetailDalog, //新增明细
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
      dialogsearchCodeValConfirm, //检索确认
      addQuery, //检索查询
      serachAssetList, //检索资产数据
      assetsDialog, //资产弹框
      assetsDialogConfirm, //选择确认
      checkBoxChange, //选中数据
      scan,
      applyDateTimeChange: ({ detail: { value } }) => {
        if (nonEditable.value) return;
        bill.value.requestDiscardDatetime.value = value;
      },
      removeInput,
      locationSelect,
      corpDeptSelect,
      personnelSelect,
      scrappingReason,//报废原因
      scrappingReasonVal,
      scrappingReasonChange,
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
