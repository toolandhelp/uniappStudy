<template>
  <!-- 金额输入弹框 -->
  <uni-popup ref="inputAmountDialog" type="dialog">
    <uni-popup-dialog
      type="info"
      title="输入金额"
      @confirm="dialogAmountInputConfirm"
    >
    <uni-easyinput
      focus 
      :border="false"
      maxlength="17"
      type="digit"
      v-model="amountVal"
      placeholder="请输入金额"
    />
    </uni-popup-dialog>
  </uni-popup>  
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
                  <text class="detail_label_color">处置方式：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="detail_item_body">
                  <uni-data-picker
                    v-slot:default="{ data, error, options }"
                    class="data-picker-request-draw"
                    placeholder="请选择处置方式"
                    :border="false"
                    :clear-icon="false"
                    :localdata="disposalType"
                    @input="disposalTypeChange"
                    v-model="rowDetail.disposalVal"
                  >
                    <text class="item_text_content" :class="rowDetail.disposalVal?'info-item-color':''">{{
                      rowDetail.disposalVal ? rowDetail.disposalText : "请选择处置方式"
                    }}</text>
                  </uni-data-picker>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="detail_item_label">
                  <text class="detail_label_color">处置说明：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="detail_item_body">
                  <uni-easyinput
                    :border="false"
                    maxlength="10"
                    type="text"
                    v-model="rowDetail.remarks"
                    placeholder="请输入处置说明"
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
              <text v-else selectable>{{
              bill.code
            }}</text>
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
            <view class="item_text_content" :class="bill.discardDatetime.value?'content_effective':''">
              <picker
                v-if="!nonEditable"
                mode="date"
                @change="applyDateTimeChange"
              >
                <text>
                  {{
                    bill.discardDatetime.value
                      ? bill.discardDatetime.value
                      : "请选择日期"
                  }}
                </text>
              </picker>
              <text v-else>
                  {{
                    bill.discardDatetime.value
                  }}
                </text>
            </view>
          </template>
          <template v-slot:footer>
            <view class="info-flex">
                <view class="content_delete_icon" v-if="!nonEditable">
                  <view>
                      <uni-icons v-if="nonEditable?false:bill.discardDatetime.value" @click="removeInput('discardDatetime')" type="close" size="16"></uni-icons>
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
            <view class="item_text_content" :class="bill.handlerEmployee.value?'content_effective':''">
              <text v-if="!nonEditable" @click="personnelSelect('handlerEmployee')">{{ bill.handlerEmployee.value ? bill.handlerEmployee.text : "请选择人员" }}</text>
              <text v-else>{{ bill.handlerEmployee.text }}</text>
            </view>
          </template>
          <template v-slot:footer>
            <view class="info-flex">
                <view class="content_delete_icon" v-if="!nonEditable">
                  <view>
                      <uni-icons v-if="getStorage('UserType') == 2 ? false :(nonEditable ? false : bill.handlerEmployee.value)" @click="removeInput('handlerEmployee')" type="close" size="16"></uni-icons>
                  </view>
                </view>
            </view>
          </template>
        </uni-list-item>
        <uni-list-item :disabled="nonEditable">
          <template v-slot:header>
            <view class="bill_header_label">
              <text class="required">*</text>
              <text class="item_label_color">处置成本：</text>
            </view>
          </template>
          <template v-slot:body>
            <view class="item_text_content" :class="bill.cost.value?'content_effective':''">
                <text
                  v-if="!nonEditable"
                  @click="openAmountDialog('cost')"
                  >{{ bill.cost.value ? bill.cost.value : "请输入处置成本" }}</text
                >
                <text
                  v-else
                  >{{ bill.cost.value }}</text
                >
            </view>
          </template>
          <template v-slot:footer>
            <view class="info-flex">
              <view class="content_delete_icon" v-if="!nonEditable">
                <view>
                    <uni-icons v-if="nonEditable?false:bill.cost.value" @click="removeInput('cost')" type="close" size="16"></uni-icons>
                </view>
              </view>
            </view> 
          </template>
        </uni-list-item>
        <uni-list-item :disabled="nonEditable">
          <template v-slot:header>
            <view class="bill_header_label">
              <text class="required">*</text>
              <text class="item_label_color">处置收入：</text>
            </view>
          </template>
          <template v-slot:body>
            <view class="item_text_content" :class="bill.income.value?'content_effective':''">
              <text
                v-if="!nonEditable"
                @click="openAmountDialog('income')"
                >{{ bill.income.value ? bill.income.value : "请输入处置收入" }}</text
              >
              <text
                v-else
              >{{ bill.income.value }}</text
            >
            </view>
          </template>
          <template v-slot:footer>
            <view class="info-flex">
              <view class="content_delete_icon" v-if="!nonEditable">
                <view>
                    <uni-icons v-if="nonEditable?false:bill.income.value" @click="removeInput('income')" type="close" size="16"></uni-icons>
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
            :key="item.index"
            @click="uniSwipeClick($event, index)"
          >
                <view 
                class="detail_content_item"
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
                    <text>处置方式：{{ item.DiscardModeName }}</text>
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
                    <text>处置说明：</text>
                    <text>{{ item.DiscardDesc }}</text>
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
  :billType="'Discard'"
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
import discardController from "../../../service/controller/asset/discardController.js";
import dictionaryController from "../../../service/controller/system/dictionaryController.js";
import { reactive, ref, computed,nextTick,getCurrentInstance } from "vue";
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
import { priceCheck } from "../../../share/util/checkCompliance";
import { only } from "../../../share/util/uniEvent";
import { getFileUrl } from "../../../share/http/serveUrl";
import BillFooterBtn from "../../../components/billFooterBtn/billFooterBtn.vue";
import {uniSwipeActionItemRightOptions} from "../../../share/util/billBasicConfig";
import BillEnclosure from "../../../components/billEnclosure/billEnclosure.vue";

export default {
  components:{
    BillEnclosure,
    BillFooterBtn,
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
      discardDatetime: {
        hint: "请选择报废日期",
        value: getCurrentDate(),
      },
      // 处置成本
      cost:{
        hint:'处置成本',
        value:null
      },
      // 处置收入
      income:{
        hint:'处置收入',
        value:null
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

    const amountVal = ref(null);

    const amountInputKey = ref(null);

    const inputAmountDialog = ref(null);//金额类弹框

    const rowDetail = ref({
      name: "",
      code: "",
      disposalVal: "",
      disposalText: "",
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

    //处置方式
    const scrappingReasonVal = ref(null);

    const scrappingReasonText = ref(null);
    // 处置方式数据源
    const disposalType = ref([]);

    const toIndex = ref(""); //锚点链接

    const files = ref([]);

    const nonEditable = ref(false); //不可编辑

    const autoStart = ref(false);

    const windowHeights = ref("");
 
    // 检索数据
    function addQuery(keyWorld) {
      showLoading();
      discardController
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

    function openAmountDialog(key) {
      amountVal.value = bill.value[key].value;
      amountInputKey.value = key;
      inputAmountDialog.value.open();
    }

    function dialogAmountInputConfirm(){
      if(!amountVal.value){
        showErrorToast('请输入金额');
        return
      }
      if(priceCheck(amountVal.value)){
        const number = parseFloat(Number(amountVal.value).toFixed(2));
        bill.value[amountInputKey.value].value = number.toString();
      }
    }

    // 编码检索确认
    function dialogRemarkInputConfirm(val) {
      bill.value.remark = val.trim();
      remarkVal.value = val.trim();
    }
    function editDetailConfirm(val) {
        billDetail.value[detailIndex.value].DiscardModeID = rowDetail.value.disposalVal;
        billDetail.value[detailIndex.value].DiscardModeName = rowDetail.value.disposalText;
        billDetail.value[detailIndex.value].DiscardModeNameCN = rowDetail.value.disposalText;
        billDetail.value[detailIndex.value].DiscardModeNameEN = rowDetail.value.disposalText;
        billDetail.value[detailIndex.value].DiscardDesc = rowDetail.value.remarks;
        resetInputDialog();
    }
    function editDetailClose() {
      resetInputDialog();
    }
    function resetInputDialog() {
      rowDetail.value.name = null;
      rowDetail.value.code = null;
      rowDetail.value.disposalVal = null;
      rowDetail.value.disposalText = null;
      rowDetail.value.remarks = null;
      detailIndex.value = null;
      inputDialog.value.close();
    }
    
    function editBillDetail(index) {
      if (nonEditable && bill.value.status !== null && bill.value.status != 1) {
        return;
      }
      detailIndex.value = index;
      const { Name,Code, DiscardModeID, DiscardModeName, DiscardDesc } = billDetail.value[index];
      rowDetail.value.name = Name;
      rowDetail.value.code = Code;
      rowDetail.value.disposalVal = DiscardModeID;
      rowDetail.value.disposalText = DiscardModeName;
      rowDetail.value.remarks = DiscardDesc;
      openEditDetailDalog(0);
    }

    // 处置方式编辑
    function disposalTypeChange(val) {
      const {value,text} = disposalType.value.filter((p) => p.value == val)[0];
      rowDetail.value.disposalVal = value;
      rowDetail.value.disposalText =  text;
    }

    function deleteDialogConfirm() {
      showLoading();
      discardController
        .discardDelete(bill.value.id)
        .then(() => {
          emitPromise(eventNames.discardDetailBack).then(() =>
            navigateBack()
          );
        })
        .finally(() => clearLoading());
    }
    
    // 保存提交
    function handleSaveDraft(IsSubmit) {
      bill.value.isSubmit = IsSubmit;
      if (!bill.value.discardDatetime.value) {
        showErrorToast("请选择报废日期");
        return;
      }
      if (!bill.value.handlerEmployee.value) {
        showErrorToast("请选择经办人");
        return;
      }
      if (!bill.value.cost.value) {
        showErrorToast("请输入处置成本");
        return;
      }
      if (!bill.value.income.value) {
        showErrorToast("请输入处置收入");
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
      obj.DiscardDatetime = bill.value.discardDatetime.value;
      obj.HandlerEmployeeID = bill.value.handlerEmployee.value;
      obj.HandlerEmployeeName = bill.value.handlerEmployee.text;
      obj.HandlerOrgID = bill.value.handlerOrgID.value;
      obj.HandlerOrgNameCN = bill.value.handlerOrgID.text;
      obj.HandlerOrgNameEN = bill.value.handlerOrgID.text;
      obj.DiscardCost = bill.value.cost.value;
      obj.DiscardIncome = bill.value.income.value;

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
      discardController
        .discardSaveDraft(obj)
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
      return discardController
        .discardGetByID(id)
        .then(
          ({
            ID,
            Status,
            BillCode,
            DiscardDatetime,
            HandlerEmployeeID,
            HandlerEmployeeName,
            HandlerOrgID,
            HandlerOrgNameCN,
            DiscardCost,
            DiscardIncome,
            Remark,
            Details,
            Attachments,
            FlowInfo,
          }) => {
            bill.value.id = ID;
            bill.value.status = Status;
            bill.value.code = BillCode;
            bill.value.discardDatetime.value = DiscardDatetime
              ? DiscardDatetime.substring(0, 10)
              : "";
            bill.value.handlerEmployee.value = HandlerEmployeeID;
            bill.value.handlerEmployee.text = HandlerEmployeeName;
            bill.value.handlerOrgID.value = HandlerOrgID;
            bill.value.handlerOrgID.text = HandlerOrgNameCN;
            bill.value.cost.value = DiscardCost;
            bill.value.income.value = DiscardIncome;
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
      navigateTo("/subcontract/asset/discard/list");
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
      //处置方式
      dictionaryController.dictionaryGetByCode("D005").then(({ Items }) => {
        disposalType.value = Items.map((p) => {
          return {
            text: p.ItemText,
            value: p.ID,
          };
        });
        const {ID,ItemText} = Items.filter(p=>p.IsDefaultItem)[0];
        scrappingReasonVal.value = ID;
        scrappingReasonText.value = ItemText;
        console.log(scrappingReasonVal.value)
        console.log(scrappingReasonText.value)
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
          obj.DiscardModeID = scrappingReasonVal.value;
          obj.DiscardModeName = scrappingReasonText.value;
          obj.DiscardModeNameCN = scrappingReasonText.value;
          obj.DiscardModeNameEN = scrappingReasonText.value;
          obj.OriginalAmount = arr[i].OriginalAmount;
          obj.OriginalCode = arr[i].OriginalCode;
          obj.Brand = arr[i].Brand;
          obj.Spec = arr[i].Spec;
          obj.Model = arr[i].Model;
          obj.Qty = arr[i].Qty;
          obj.DiscardDesc = null;

          obj.isOpened = "none";
          obj.Qty = 1;
          billDetail.value.push(obj);
          console.log(billDetail.value);
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
        if(key == 'discardDatetime'|| 
        key == 'cost' || 
        key == 'income'){
          bill.value[key].value = null;
          return
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
        bill.value.discardDatetime.value = value;
      },
      removeInput,
      locationSelect,
      corpDeptSelect,
      personnelSelect,
      disposalType,//处置方式
      scrappingReasonVal,
      disposalTypeChange,
      inputAmountDialog,
      amountVal,
      amountInputKey,
      openAmountDialog,
      dialogAmountInputConfirm,
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
