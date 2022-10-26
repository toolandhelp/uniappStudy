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
  <uni-popup ref="goodsDialog" type="dialog">
    <uni-popup-dialog
      title="选择易耗品"
      type="info"
      :before-close="true"
      @close="goodsDialog.close()"
      @confirm="goodsDialogConfirm"
    >
      <view class="retrieval" :style="`height:${windowHeights / 2}px`">
        <uni-list>
          <uni-list-item
            v-for="{
              ConsumableID,
              ConsumableName,
              Code,
              CategoryName,
              Brand,
              Spec,
              Model,
              checked,
            } in serachConsumableList"
            :key="ConsumableID"
          >
            <template v-slot:body>
              <view class="retrieval_content">
                <view class="retrieval_item">
                  <text class="retrieval_item_title">{{
                    ConsumableName
                  }}</text>
                  <view class="retrieval_item_row">
                    <text>易耗品编码：{{ Code }}</text>
                  </view>
                  <view class="retrieval_item_row">
                    <text>易耗品分类：{{ CategoryName }}</text>
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
                <checkbox-group @change="checkBoxChange($event, ConsumableID)">
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
                  <text class="item_text_content">{{ rowDetail.consumableName }}</text>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item disabled>
              <template v-slot:header>
                <view class="detail_item_label">
                  <text class="detail_label_color">品牌：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="detail_item_body">
                  <text class="item_text_content">{{ rowDetail.brand }}</text>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item disabled>
              <template v-slot:header>
                <view class="detail_item_label">
                  <text class="detail_label_color">规格：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="detail_item_body">
                  <text class="item_text_content">{{ rowDetail.spec }}</text>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item disabled>
              <template v-slot:header>
                <view class="detail_item_label">
                  <text class="detail_label_color">型号：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="detail_item_body">
                  <text class="item_text_content">{{ rowDetail.model }}</text>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="detail_item_label">
                  <text class="detail_label_color">数量：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="detail_item_body">
                  <uni-easyinput
                    :border="false"
                    maxlength="10"
                    type="number"
                    v-model="rowDetail.qty"
                    placeholder="请输入数量"
                  />
                  <text class="required">*</text>
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
              <text class="item_label_color">申领日期：</text>
            </view>
          </template>
          <template v-slot:body>
            <view class="item_text_content" :class="bill.applyDateTime.value ? 'content_effective' : ''">
              <picker v-if="!nonEditable" mode="date" @change="applyDateTimeChange">
                <text
                >
                  {{
                    bill.applyDateTime.value
                      ? bill.applyDateTime.value
                      : "请选择日期"
                  }}
                </text>
              </picker>
              <text
                v-else
                >
                  {{
                    bill.applyDateTime.value
                  }}
                </text>
            </view>
          </template>
          <template v-slot:footer>
            <view class="info-flex">
              <view class="content_delete_icon" v-if="!nonEditable">
                <view>
                  <uni-icons
                    v-if="nonEditable ? false : bill.applyDateTime.value"
                    @click="removeInput('applyDateTime')"
                    type="close"
                    size="16"
                  ></uni-icons>
                </view>
              </view>
            </view>
          </template>
        </uni-list-item>
        <uni-list-item :disabled="nonEditable || getStorage('UserType') == 2">
          <template v-slot:header>
            <view class="bill_header_label">
              <text class="required">*</text>
              <text class="item_label_color">申领人员：</text>
            </view>
          </template>
          <template v-slot:body>
            <view class="item_text_content" :class="bill.applyPersonnel.value ? 'content_effective' : ''">
              <text
                v-if="!nonEditable"
                @click="personnelSelect('applyPersonnel')"
                >{{
                  bill.applyPersonnel.value
                    ? bill.applyPersonnel.text
                    : "请选择人员"
                }}</text
              >
              <text
                v-else
                >{{
                    bill.applyPersonnel.text
                }}</text
              >
            </view>
            
          </template>
          <template v-slot:footer>
            <view class="info-flex">
              <view class="content_delete_icon" v-if="!nonEditable">
                <view>
                  <uni-icons
                    v-if="getStorage('UserType') == 2 ? false : (nonEditable ? false : bill.applyPersonnel.value)"
                    @click="removeInput('applyPersonnel')"
                    type="close"
                    size="16"
                  ></uni-icons>
                </view>
              </view>
            </view>
          </template>
        </uni-list-item>
        <uni-list-item :disabled="nonEditable">
          <template v-slot:header>
            <view class="bill_header_label">
              <text class="required">*</text>
              <text class="item_label_color">申领原因：</text>
            </view>
          </template>
          <template v-slot:body>
            <view class="item_text_content" :class="bill.applyReason.value ? 'content_effective' : ''">
              <uni-data-picker
                v-slot:default="{ data, error, options }"
                placeholder="请选择申领原因"
                :border="false"
                :clear-icon="false"
                :localdata="applyReasonOption"
                @input="applyReasonHandle"
                v-model="bill.applyReason.value"
                v-if="!nonEditable"
              >
                <text
                  >{{
                    bill.applyReason.value
                      ? bill.applyReason.text
                      : "请选择申领原因"
                  }}</text
                >
              </uni-data-picker>
              <text v-else>{{
                bill.applyReason.text
              }}</text>
            </view>
          </template>
          <template v-slot:footer>
            <view class="info-flex">
              <view class="content_delete_icon" v-if="!nonEditable">
                <view>
                  <uni-icons
                    v-if="nonEditable ? false : bill.applyReason.value"
                    @click="removeInput('applyReason')"
                    type="close"
                    size="16"
                  ></uni-icons>
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
            <view class="item_text_content" :class="bill.remark ? 'content_effective' : ''">
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
                  <uni-icons
                    v-if="nonEditable ? false : bill.remark"
                    @click="removeInput('remark')"
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
            :key="item.ConsumableID"
            @click="uniSwipeClick($event, index)"
          >
                <view class="detail_content_item"
                :style="(index + 1) == billDetail.length ?'margin-bottom:0px':''"  
                :class="nonEditable?'disabled_color':''" 
                >
                  <view class="content_item_title">
                    <view>
                      <text>易耗品名称：{{ item.ConsumableName }}</text>
                    </view>
                    <uni-icons v-if="!nonEditable" type="compose" size="30" color="#444" @click="editBillDetail(index)"></uni-icons>
                  </view>
                  <view class="content_item_row">
                    <text>易耗品编码：</text>
                    <text selectable>{{ item.Code }}</text>
                  </view>
                  <view class="content_item_row">
                    <text>易耗品分类：</text>
                    <text>{{ item.CategoryName }}</text>
                  </view>
                  <view class="content_item_col">
                    <text>品牌：{{ item.Brand }}</text>
                    <text>规格：{{ item.Spec }}</text>
                  </view>
                  <view class="content_item_col">
                    <text>型号：{{ item.Model }}</text>
                    <text>数量：{{ item.Qty }}</text>
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
  :consumable="true" 
  :type="type"
  :billType="'RequestDraw'"
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
  :scanInputDialogTitle="'易耗品搜索'"
  />
</template>

<script>
import requestDrawController from "../../../service/controller/consumable/requestDrawController.js";
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
import { awaitDelay, getScanCode } from "../../../share/util/index";
import { only } from "../../../share/util/uniEvent";
import { getFileUrl } from "../../../share/http/serveUrl";
import BillFooterBtn from "../../../components/billFooterBtn/billFooterBtn.vue";
import {uniSwipeActionItemRightOptions} from "../../../share/util/billBasicConfig";
import BillEnclosure from "../../../components/billEnclosure/billEnclosure.vue";

export default {
  components: {
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
      // 申领人员
      applyPersonnel: {
        text: getStorage("UserName"),
        value: getStorage("EmployeeID"),
      },
      // 申领部门
      applyCorp: {
        text: getStorage("OrgName"),
        value: getStorage("OrgID"),
      },
      // 申领日期
      applyDateTime: {
        hint: "请选择申领日期",
        value: getCurrentDate(),
      },
      // 申领原因
      applyReason: {
        hint: "请选择申领原因",
        text: "",
        value: null,
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
      code:"",
      consumableName: "",
      brand: "",
      spec: "",
      model: "",
      qty: 1,
    });
    // 申领原因数据
    const applyReasonOption = ref([]);
    // 单据明细信息
    const billDetail = ref([]);

    let serachConsumableList = ref([]);

    // 易耗品弹窗
    const goodsDialog = ref(null);

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

    const toIndex = ref(""); //锚点链接

    const autoStart = ref(false);

    const files = ref([]);

    const nonEditable = ref(false); //不可编辑


    const windowHeights = ref("");

    // 检索数据
    function addQuery(keyWorld) {
      showLoading();
      requestDrawController
        .consumableFuzzyQuery(keyWorld)
        .then((Items) => {
          serachConsumableList.value = Items.map((p) => {
            p.checked = false;
            return p;
          });
          if (serachConsumableList.value.length < 1) {
            showErrorToast("无匹配资产资料");
            return;
          }
          goodsDialog.value.open();
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
    function applyReasonHandle(val) {
      bill.value.applyReason.text = applyReasonOption.value.filter(
        (p) => p.value == val
      )[0].text;
      bill.value.applyReason.value = val;
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
      if (!rowDetail.value.qty) {
        showErrorToast("请输入数量");
        return;
      } else {
        const reg = /^\+?[1-9][0-9]*$/;
        if (!reg.test(rowDetail.value.qty)) {
          showErrorToast("请输入正确的数量");
          return;
        }
      }
      if (detailIndex.value != null) {
        billDetail.value[detailIndex.value].Qty = parseInt(rowDetail.value.qty);
      }
      resetInputDialog();
    }
    function editDetailClose() {
      resetInputDialog();
    }
    function resetInputDialog() {
      rowDetail.value.code = "";
      rowDetail.value.consumableName = "";
      rowDetail.value.brand = "";
      rowDetail.value.spec = "";
      rowDetail.value.model = "";
      rowDetail.value.qty = 1;
      detailIndex.value = null;
      inputDialog.value.close();
    }

    function editBillDetail(index) {
      if (nonEditable && bill.value.status !== null && bill.value.status != 1) {
        return;
      }
      detailIndex.value = index;
      const { Code,ConsumableName, Brand, Spec, Model, Qty } =
        billDetail.value[index];
      rowDetail.value.code = Code;
      rowDetail.value.consumableName = ConsumableName;
      rowDetail.value.brand = Brand;
      rowDetail.value.spec = Spec;
      rowDetail.value.model = Model;
      rowDetail.value.qty = Qty;
      openEditDetailDalog(0);
    }

    function deleteDialogConfirm() {
      showLoading();
      requestDrawController
        .requestDrawDelete(bill.value.id)
        .then(() => {
          emitPromise(eventNames.requestDrawDetailBack).then(() =>
            navigateBack()
          );
        })
        .finally(() => clearLoading());
    }

    // 保存提交
    function handleSaveDraft(IsSubmit) {
      bill.value.isSubmit = IsSubmit;
      if (!bill.value.applyDateTime.value) {
        showErrorToast("请选择申领日期");
        return;
      }
      if (!bill.value.applyReason.value) {
        showErrorToast("请选择申领原因");
        return;
      }
      if (billDetail.value.length < 1) {
        toIndex.value = 'listDetail';
        showErrorToast("请添加易耗品信息");
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
      obj.AddOrEdit = bill.value.id ? 2 : 1;
      obj.IsSubmit = bill.value.isSubmit ? true : false;
      obj.RequestDate = bill.value.applyDateTime.value;
      obj.RequestDrawReason = bill.value.applyReason.value;
      obj.RequesterEmployeeID = bill.value.applyPersonnel.value;
      obj.RequesterEmployeeName = bill.value.applyPersonnel.text;
      obj.RequesterOrgID = bill.value.applyCorp.value;
      obj.RequesterOrgName = bill.value.applyCorp.text;
      obj.RequesterOrgNameCN = bill.value.applyCorp.text;
      obj.RequesterOrgNameEN = bill.value.applyCorp.text;
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
      requestDrawController
        .requestDrawSaveDraft(obj)
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
      return requestDrawController
        .requestDrawGetByID(id)
        .then(
          ({
            BillID,
            Status,
            Code,
            RequestDate,
            RequesterEmployeeID,
            RequesterEmployeeName,
            RequesterOrgID,
            RequesterOrgNameCN,
            RequestDrawReason,
            RequestDrawReasonText,
            Remark,
            Details,
            Attachments,
            FlowInfo,
          }) => {
            bill.value.id = BillID;
            bill.value.status = Status;
            bill.value.code = Code;
            bill.value.applyDateTime.value = RequestDate
              ? RequestDate.substring(0, 10)
              : "";
            bill.value.applyPersonnel.value = RequesterEmployeeID;
            bill.value.applyPersonnel.text = RequesterEmployeeName;
            bill.value.applyCorp.value = RequesterOrgID;
            bill.value.applyCorp.text = RequesterOrgNameCN;
            bill.value.applyReason.value = RequestDrawReason;
            bill.value.applyReason.text = RequestDrawReasonText;
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
      navigateTo("/subcontract/consumable/requestDraw/requestDrawList");
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
      dictionaryController.dictionaryGetByCode("D006").then(({ Items }) => {
        applyReasonOption.value = Items.map((p) => {
          return {
            text: p.ItemText,
            value: p.ID,
          };
        });
        const { ItemText,ID } = Items.filter(p=>p.IsDefaultItem)[0];
        bill.value.applyReason.value = ID;
        bill.value.applyReason.text = ItemText;
      });
      if (id) {
        editGetByID(id);
      }
      only(eventNames.signBack, () => editGetByID(bill.value.id));
      // 获取屏幕高度
      uni.getSystemInfo({
        success: (result) => {
          windowHeights.value = result.windowHeight;
        },
      });
    }

    // 选中易耗品资料
    function checkBoxChange(e, Id) {
      let values = e.detail.value,
        items = serachConsumableList.value;
      if (values.length > 0) {
        for (let i = 0, len = items.length; i < len; i++) {
          if (items[i].ConsumableID == Id) {
            items[i].checked = true;
            break;
          }
        }
      } else {
        for (let i = 0, len = items.length; i < len; i++) {
          if (items[i].ConsumableID == Id) {
            items[i].checked = false;
            break;
          }
        }
      }
    }

    function goodsDialogConfirm() {
      let items = serachConsumableList.value;
      let arr = items.filter((p) => p.checked);
      if (arr.length < 1) {
        showErrorToast("请勾选一条数据");
        return;
      }
      let timer = true;
      for (let i = 0, len = arr.length; i < len; i++) {
        let check = billDetail.value.filter(
          (p) => p.ConsumableID == arr[i].ConsumableID
        );
        if (check.length < 1) {
          let obj = {};
          obj.ID = null;
          obj.BillID = arr[i].BillID;
          obj.DetailID = arr[i].DetailID;
          obj.Code = arr[i].Code;
          obj.ConsumableID = arr[i].ConsumableID;
          obj.ConsumableName = arr[i].ConsumableName;
          obj.CategoryName = arr[i].CategoryName;
          obj.Brand = arr[i].Brand;
          obj.Spec = arr[i].Spec;
          obj.Model = arr[i].Model;
          obj.ConsumableInfo = [{
														label: arr[i].ConsumableName,
														value: arr[i].ConsumableID,
														Code: arr[i].Code
													}];
          obj.isOpened = "none";
          obj.Qty = 1;
          billDetail.value.push(obj);
        } else {
          if (timer) {
            showErrorToast("请勿添加重复易耗品");
            timer = false;
            const setTimer = setTimeout(() => {
              timer = true;
              clearTimeout(setTimer);
            }, 3000);
          }
        }
      }
      goodsDialog.value.close();
      serachConsumableList.value = [];
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

    function removeInput(key) {
      if (key == "applyDateTime") {
        bill.value.applyDateTime.value = "";
        return;
      }
      if (key == "applyPersonnel") {
        bill.value.applyPersonnel.text = "";
        bill.value.applyPersonnel.value = null;
        bill.value.applyCorp.text = "";
        bill.value.applyCorp.value = null;
        return;
      }
      if (key == "applyReason") {
        bill.value.applyReason.text = "";
        bill.value.applyReason.value = null;
        return;
      }
      if (key == "remark") {
        bill.value.remark = "";
        return;
      }
    }
    
    function personnelSelect(key) {
      if(getStorage('UserType') == 2){
        return
      }
      // 选择人员
      only(eventNames.employeeSelectBack, ({ ID, Name, OrgID, OrgName }) => {
        bill.value[key].value = ID;
        bill.value[key].text = Name;
        bill.value.applyCorp.value = OrgID;
        bill.value.applyCorp.text = OrgName;
      });
      const _id = bill.value[key].value;
      navigateTo(`pages/selector/system/employee?&multiple=0&ids=${_id}`);
    }

    function filesChange(val){
      files.value = val;
    }

    // 屏幕可视区域是否需要滚动处理
    let IsScroll = computed(() => {
      let header, content;
      if ((windowHeights.value - 60) / 2 > 225) {
        header = 225;
        content = windowHeights.value - 285;
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
      applyReasonOption, //申领原因数据
      applyReasonHandle, //申领原因
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
      serachConsumableList, //检索易耗品数据
      goodsDialog, //易耗品弹框
      goodsDialogConfirm, //选择确认
      checkBoxChange, //选中数据
      scan,
      applyDateTimeChange: ({ detail: { value } }) => {
        if (nonEditable.value) return;
        bill.value.applyDateTime.value = value;
      },
      removeInput,
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
