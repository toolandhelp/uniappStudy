<template>
  <!-- SAP错误编码弹框 -->
  <uni-popup ref="sapErrorMsg" type="dialog">
    <uni-popup-cancel-dialog title="SAP错误消息" @close="sapErrorMsgClose">
      <view
        class="sapErrorMsg assetDialogList"
        :style="`height:${windowHeights / 2}px`"
      >
        <uni-list>
          <uni-list-item v-for="(item, index) in sapErrorMsgList" :key="index">
            <template v-slot:body>
              <view class="list-item-error-msg">
                <view class="list-item-column-row">
                  <text selectable>SAP公司编码：{{ item.SapCorpCode }}</text>
                </view>
                <view class="list-item-column-row">
                  <text selectable>SAP资产编码：{{ item.OriginalCode }}</text>
                </view>
                <view class="list-item-column-msg">
                  <text>SAP回传错误消息：{{ item.SapErrMsg }}</text>
                </view>
              </view>
            </template>
          </uni-list-item>
        </uni-list>
        <!-- <uni-list>
          <uni-list-item
            v-for="{
              ID,
              Code,
              AssertStatusText,
              Name,
              AssetCategoryName,
              LocationName,
            } in assetDialogList"
            :key="ID"
            link
          >
            <template v-slot:body>
              <view class="asset-dialog-list">
                <view class="list-item" @click="selectAsset(ID)">
                  <text class="list-item-column-title">资产编码：{{ Code }}</text>
                  <view class="list-item-column-list">
                    <text>资产状态：{{ AssertStatusText }}</text>
                  </view>
                  <view class="list-item-column-list">
                    <text>资产名称：{{ Name }}</text>
                  </view>
                  <view class="list-item-column-list">
                    <text>资产分类：{{ AssetCategoryName }}</text>
                  </view>
                  <view class="list-item-column-list">
                    <text>存放位置：{{ LocationName }}</text>
                  </view>
                </view>
              </view>
            </template>
          </uni-list-item>
        </uni-list> -->
      </view>
    </uni-popup-cancel-dialog>
  </uni-popup>
  <!-- 启动审批流 -->
  <uni-popup ref="approveStartUpDialog" type="dialog">
    <uni-popup-dialog
      type="info"
      :before-close="true"
      cancelText="取消"
      confirmText="确认"
      title="启动审批流"
      @confirm="approveStartConfirm"
      @close="approveStartClose"
    >
      <view class="approve">
        <view class="approve-type">
          <text>下个节点：</text>
          <text>
            {{ approvalProcessData.nextActivityName }}
          </text>
        </view>
        <view class="approve-type">
          <text>审批人员：</text>
          <uni-data-select
            :clear="false"
            v-model="approvalProcessData.employeeID"
            :localdata="approverOption"
            @change="approverChange"
            v-if="approverOption.length > 1"
          />
          <text v-else>
            {{ approvalProcessData.employeeName }}
          </text>
        </view>
      </view>
    </uni-popup-dialog>
  </uni-popup>
  <!-- 审批弹框 -->
  <uni-popup ref="approveDialog" type="dialog">
    <uni-popup-dialog
      type="info"
      :before-close="true"
      cancelText="取消"
      confirmText="确认"
      title="单据审批"
      @confirm="approveConfirm"
      @close="approvalClose"
    >
      <view class="approve">
        <view class="approve-type">
          <text>审批结果：</text>
          <text>
            <uni-data-checkbox
              v-model="approvalProcessData.approvalType"
              :localdata="approvalProcessData.approvalTypeOption"
            />
          </text>
        </view>
        <view class="approve-type" v-if="approvalProcessData.approvalType != 1">
          <text v-if="approvalProcessData.supportedStrategies.length">
            处理方式：
          </text>
          <text>
            <uni-data-checkbox
              v-model="approvalProcessData.refuseType"
              :localdata="approvalProcessData.supportedStrategies"
            />
          </text>
        </view>
        <view class="approve-opinion approve-type">
          <text>审批意见：</text>
          <text>
            <uni-easyinput
              type="textarea"
              v-model="approvalProcessData.remark"
              placeholder="请输入内容"
            />
          </text>
        </view>
        <view
          class="approve-footer approve-type"
          v-if="approvalProcessData.approvalType == 1"
        >
          <text>下个节点：</text>
          <text>
            {{ approvalProcessData.nextActivityName }}
          </text>
        </view>
      </view>
    </uni-popup-dialog>
  </uni-popup>
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
  <!-- 删除单据弹框 -->
  <uni-popup ref="deleteDialog" class="deleteDialog" type="dialog">
    <uni-popup-dialog
      model="base"
      type="error"
      cancelText="取消"
      confirmText="确认"
      title="删除收货单"
      @confirm="deleteDialogConfirm"
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
  <!-- 编辑明细弹框 -->
  <uni-popup ref="inputDialog" type="center">
    <uni-popup-dialog
      ref="inputClose"
      :before-close="true"
      mode="input"
      :title="editInfoTitle"
      @confirm="editDetailConfirm"
      @close="editDetailClose"
    >
      <uni-list class="inputDialog">
        <uni-list-item>
          <template v-slot:header>
            <view class="align-item-center">
              <text class="slot-box">资产名称：</text>
            </view>
          </template>
          <template v-slot:footer>
            <text class="info-item-text">{{ rowDetail.name }}</text>
          </template>
        </uni-list-item>
        <uni-list-item>
          <template v-slot:header>
            <view class="align-item-center">
              <text class="slot-box">资产分类：</text>
            </view>
          </template>
          <template v-slot:footer>
            <text class="info-item-text">{{
              rowDetail.assetCategoryName
            }}</text>
          </template>
        </uni-list-item>
        <uni-list-item>
          <template v-slot:header>
            <view class="align-item-center">
              <text class="slot-box">公司：</text>
            </view>
          </template>
          <template v-slot:footer>
            <text class="info-item-text">{{ rowDetail.sapCorpName }}</text>
          </template>
        </uni-list-item>
        <uni-list-item>
          <template v-slot:header>
            <view class="align-item-center">
              <text class="slot-box">应收数量：</text>
            </view>
          </template>
          <template v-slot:footer>
            <text class="info-item-text">{{ rowDetail.receivableQty }}</text>
          </template>
        </uni-list-item>
        <uni-list-item>
          <template v-slot:header>
            <view class="align-item-center">
              <text class="slot-box">收货数量：</text>
            </view>
          </template>
          <template v-slot:body>
            <view class="input-dialog-body">
              <uni-easyinput
                :border="false"
                :focus="true"
                maxlength="10"
                ref="receivedQty"
                type="digit"
                v-model="rowDetail.receivedQty"
                placeholder="请输入数量"
              />
              <text class="checka">*</text>
            </view>
          </template>
        </uni-list-item>
      </uni-list>
    </uni-popup-dialog>
  </uni-popup>
  <!-- 新增明细弹框 -->
  <uni-popup ref="assetDialog" class="assetDialog" type="dialog">
    <uni-popup-dialog
      title="选择资产"
      type="info"
      :before-close="true"
      @close="assetDialogClose"
      @confirm="assetDialogConfirm"
    >
      <view class="assetDialogList" :style="`height:${windowHeights / 2}px`">
        <uni-list>
          <uni-list-item
            v-for="{
              WaitAssetID,
              OrderCode,
              OrderDate,
              Name,
              AssetCategoryName,
              SapCorpName,
              OriginalCode,
              ReceivableQty,
              checked,
            } in assetDialogList"
            :key="WaitAssetID"
            @click="jumpRepair(WaitAssetID)"
          >
            <template v-slot:body>
              <view class="asset-dialog-list">
                <view class="list-item">
                  <text class="list-item-column-title"
                    >资产名称：{{ Name }}</text
                  >
                  <view class="list-item-column-list">
                    <text
                      >订单日期：{{
                        OrderDate ? OrderDate.substring(0, 10) : ""
                      }}</text
                    >
                  </view>
                  <view class="list-item-column-list">
                    <text>订单号：{{ OrderCode }}</text>
                  </view>
                  <view class="list-item-column-list">
                    <text>资产分类：{{ AssetCategoryName }}</text>
                  </view>
                  <view class="list-item-column-list">
                    <text>公司：{{ SapCorpName }}</text>
                  </view>
                  <view class="list-item-column-list">
                    <text>SPA资产编码：{{ OriginalCode }}</text>
                  </view>
                  <view class="list-item-column-list">
                    <text>收货数量：{{ ReceivableQty }}</text>
                  </view>
                </view>
              </view>
            </template>
            <template v-slot:footer>
              <text class="take-delivery-checkbox">
                <checkbox-group @change="checkBoxChange($event, WaitAssetID)">
                  <label>
                    <checkbox color="#ff5e00" :checked="checked" />
                  </label>
                </checkbox-group>
              </text>
            </template>
          </uni-list-item>
        </uni-list>
      </view>
    </uni-popup-dialog>
  </uni-popup>
  <!-- 单据头 -->
  <scroll-view :style="`height:${IsScroll.header}px`" scroll-y>
    <view class="uni_list">
      <uni-list>
        <uni-list-item :disabled="true">
          <template v-slot:header>
            <view class="align-item-center">
              <text class="slot-box ensp">单号</text>
            </view>
          </template>
          <template v-slot:footer>
            <text class="info-item-text" selectable>{{
              bill.code ? bill.code : "自动生成"
            }}</text>
          </template>
        </uni-list-item>
        <uni-list-item :disabled="nonEditable">
          <template v-slot:header>
            <view class="align-item-center">
              <text class="checka">*</text>
              <text class="slot-box">收货日期：</text>
            </view>
          </template>
          <template v-slot:footer>
            <view class="info-item">
              <text
                @click="nonEditable ? null : dataTimePickerChange()"
                class="info-item-text"
                >{{
                  bill.receiptDateTime.value
                    ? bill.receiptDateTime.value
                    : "请选择日期"
                }}</text
              >
            </view>
          </template>
        </uni-list-item>
        <uni-list-item :disabled="true">
          <template v-slot:header>
            <view class="align-item-center">
              <text class="checka">*</text>
              <text class="slot-box">收货人员：</text>
            </view>
          </template>
          <template v-slot:footer>
            <text class="info-item-text">{{ bill.receiptPersonnel.text }}</text>
          </template>
        </uni-list-item>
        <uni-list-item :disabled="true">
          <template v-slot:header>
            <view class="align-item-center">
              <text class="checka">*</text>
              <text class="slot-box">收货部门：</text>
            </view>
          </template>
          <template v-slot:footer>
            <text class="info-item-text">{{ bill.receiptCorp.text }}</text>
          </template>
        </uni-list-item>
        <uni-list-item :disabled="nonEditable">
          <template v-slot:header>
            <view class="align-item-center">
              <text class="slot-box ensp">备注：</text>
            </view>
          </template>
          <template v-slot:footer>
            <text
              class="info-item-text"
              @click="nonEditable ? null : openRemarkDialog()"
              >{{ bill.remark ? bill.remark : "请输入备注信息" }}</text
            >
          </template>
        </uni-list-item>
      </uni-list>
    </view>
  </scroll-view>

  <!-- 单据详情 -->
  <scroll-view
    class="bill-list-take-delivery-draw"
    :style="`height:${IsScroll.content}px`"
    @scroll="detailScroll"
    :scroll-into-view="toIndex"
    :scroll-with-animation="true"
    scroll-y
  >
    <view id="listDetail"></view>
    <uni-section title="明细列表" type="line">
      <view class="bill-detail-take-delivery-draw">
        <uni-swipe-action>
          <uni-swipe-action-item
            :disabled="nonEditable"
            :right-options="deleteOperationBtn"
            :show="isOpened"
            :auto-close="false"
            @change="uniSwipeChange(index)"
            v-for="(
              {
                Name,
                OrderCode,
                OrderDate,
                SapCorpName,
                OriginalCode,
                AssetCategoryName,
                ReceivableQty,
                ReceivedQty,
                PurchaserName,
                Brand,
                Spec,
                Model,
                Unit,
                isOpened,
              },
              index
            ) in billDetail"
            :key="index"
            @click="uniSwipeClick($event, index)"
          >
            <uni-list-item>
              <template v-slot:body>
                <view
                  class="list-item-detail"
                  @click.stop="editBillDetail(index)"
                >
                  <text class="list-item-title" selectable
                    >资产名称：{{ Name }}</text
                  >
                  <view class="list-item-column">
                    <text>订单号：{{ OrderCode }}</text>
                    <text
                      >订单日期：{{
                        OrderDate ? OrderDate.substring(0, 10) : ""
                      }}</text
                    >
                  </view>
                  <view class="list-item-column">
                    <text selectable>公司：{{ SapCorpName }}</text>
                    <text selectable>SAP资产编码：{{ OriginalCode }}</text>
                  </view>
                  <view class="list-item-column">
                    <text>资产分类：{{ AssetCategoryName }}</text>
                    <text>采购人：{{ PurchaserName }}</text>
                  </view>
                  <view class="list-item-column">
                    <text>应收数量：{{ ReceivableQty }}</text>
                    <text>收货数量：{{ ReceivedQty }}</text>
                  </view>
                  <view class="list-item-column">
                    <text>品牌：{{ Brand }}</text>
                    <text>规格：{{ Spec }}</text>
                  </view>
                  <view class="list-item-column">
                    <text>计量单位：{{ Unit }}</text>
                  </view>
                </view>
              </template>
            </uni-list-item>
          </uni-swipe-action-item>
        </uni-swipe-action>
      </view>
    </uni-section>
    <view id="example"></view>
    <uni-section title="附件" type="line">
      <uni-file-picker
        ref="filePicker"
        :limit="9"
        :disabled="nonEditable"
        :del-icon="!nonEditable"
        file-mediatype="all"
        :file-extname="fileExtType.all"
        mode="grid"
        v-model="files"
        :auto-upload="false"
        @select="select"
        @delete="deletefile"
        v-if="isfiles"
        title="最多选择9个附件"
      ></uni-file-picker>
    </uni-section>
  </scroll-view>
  <!-- 单据操作 -->
  <view class="bill-footer-take-delivery-draw">
    <text>
      <uni-icons
        v-if="!type"
        type="bars"
        size="40"
        color="#2979ff"
        @click="jumpList"
      ></uni-icons>
    </text>
    <view>
      <button @click="handleSaveDraft">保存</button>
    </view>
    <!-- </match-media> -->
    <!-- <view>
      <button
        @click="sapErrorMsg.open()"
        v-if="sapErrorMsgList != null && sapErrorMsgList.length > 0"
      >
        SAP错误消息
      </button>
      <button
        @click="handleSaveDraft(0)"
        v-if="
          systemShow('AssetDicSettings', 'ReceiptBill_EnabledDraft') &&
          getpermission(permissionData,'Bill') &&
          (bill.status == 1 || bill.id == null) &&
          (bill.biller.value == getStorage('UserID') || getStorage('isAdmin') || getpermission(permissionData,'ManageBill'))
        "
      >
        保存草稿
      </button>
      <button
        v-if="
          bill.status == 1 &&
          getpermission(permissionData,'Bill') &&
          (bill.biller.value == getStorage('UserID') || getStorage('isAdmin') || getpermission(permissionData,'ManageBill'))
        "
        @click="billDelete"
      >
        <text class="uni-icon-delete">删除草稿</text>
      </button>
      <button
        @click="handleSaveDraft(1)"
        type="primary"
        class="uni-icon-submit"
        v-if="
          bill.id != null &&
          bill.status == 1 &&
          getpermission(permissionData,'Bill') &&
          (bill.biller.value == getStorage('UserID') || getStorage('isAdmin') || getpermission(permissionData,'ManageBill'))
        "
      >
        <text style="color: #fff">提交</text>
      </button>
      <button v-if="bill.IsApproval" @click="approvalShow">审批</button>
      <button v-if="bill.IsStart && bill.startFlow" @click="enablingApprovalShow">
        启动审批流
      </button>
    </view> -->
  </view>

  <!-- 新增明细 -->
  <view class="bill-detail-add" v-if="!nonEditable">
    <uni-icons
      type="scan"
      size="50"
      color="#5589f4"
      @click="queryAdd"
    ></uni-icons>
  </view>

  <view class="toIndex">
    <view @click="anchorPoint('listDetail')"
      ><uni-icons type="arrow-up" color="#fff" size="30"></uni-icons><br
    /></view>
    <view @click="anchorPoint('example')"
      ><uni-icons type="arrow-down" color="#fff" size="30"></uni-icons><br
    /></view>
  </view>
</template>

<script>
import { useStore } from "vuex";
// import takeDeliveryController from "../../../service/controller/asset/takeDeliveryController";
import assetController from "../../../service/controller/asset/assetController";
import fileExtType from "../../../service/enumeration/fileExtType";
import { reactive, ref, computed, nextTick, watch } from "vue";
import { getStorage } from "../../../share/util/storage";
import {
  showOkToast,
  showErrorToast,
  showLoading,
  clearLoading,
} from "../../../share/util/message";
import {
  systemShow,
  getJurisdiction,
  getpermission,
} from "../../../share/util/index";
import {
  redirectTo,
  navigateTo,
  navigateBack,
} from "../../../share/redirect/index";
import { getCurrentDate } from "../../../share/util/dateTime";
import { getFileUrl } from "../../../share/http/serveUrl";
import UniFilePicker from "../../../components/uni-file-picker/components/uni-file-picker/uni-file-picker.vue";
import { emitPromise } from "../../../share/util/uniEvent";
import eventNames from "../../../service/enumeration/eventNames";
import { awaitDelay } from "../../../share/util/index";

function picturesConvertUni(pictures) {
  return pictures.map((p) => {
    const name = p.FileName;
    const i = name.lastIndexOf(".");
    //组装uniapp上传组件需要的数据
    return {
      ...p,
      name: name,
      url: getFileUrl(p.FileUrl),
      extname: name.substr(i + 1),
    };
  });
}
export default {
  components: {
    UniFilePicker,
  },
  props: {
    id: String,
    ids: String,
    type: String,
  },
  onNavigationBarButtonTap(e) {
    // 跳转收货单列表
    navigateTo("/subcontract/asset/takeDelivery/takeDeliveryList");
  },
  setup({ id, ids, type }) {
    const filePicker = ref(null);
    const files = ref([]);
    const isfiles = ref(true);
    const remarkVal = ref("");

    // const permissionList = JSON.parse(getStorage('kinds'))
    // 获取权限
    // const { permissionData, index } = getJurisdiction(
    //   permissionList,
    //   '/Asset/ReceivingManagement/AssetReceiptLsit'
    // );
    // console.log(permissionData)

    // 单据头信息
    const bill = ref({
      id: null,
      status: null,
      isSubmit: null,
      // 编码
      code: "",
      // 制单人
      biller: {
        text: getStorage("UserName"),
        value: getStorage("UserID"),
      },
      // 收货人员
      receiptPersonnel: {
        text: getStorage("UserName"),
        value: getStorage("EmployeeID"),
      },
      // 收货部门
      receiptCorp: {
        text: getStorage("OrgName"),
        value: getStorage("OrgID"),
      },
      // 收货日期
      receiptDateTime: {
        hint: "请选择收货日期",
        value: getCurrentDate(),
      },
      // 单据备注
      remark: "",
      //启动审批
      IsStart: false,
      startFlow: true,
      // 审批按钮
      IsApproval: false,
      // 启用批准
      enablingApproval: false,
    });
    const rowDetail = ref({
      name: "",
      assetCategoryName: "",
      sapCorpName: "",
      receivableQty: "",
      receivedQty: 0,
    });
    const sapErrorMsg = ref(null);
    const sapErrorMsgList = ref([]);
    // 单据明细信息
    const billDetail = ref([]);
    // 明细删除操作按钮
    const deleteOperationBtn = reactive([
      { text: "取消", style: { backgroundColor: "#007aff" } },
      { text: "删除", style: { backgroundColor: "#F56C6C" } },
    ]);
    const isOpened = ref("none"); //滑动删除
    function uniSwipeChange(e, index) {
      billDetail.value.isOpened = e;
    }
    function uniSwipeClick(e, index) {
      if (e.index == 1) {
        billDetail.value.splice(index, 1);
        showOkToast("移除成功");
      }
    }

    const inputDialog = ref(null);
    const editInfoTitle = ref(""); //编辑明细弹框标题
    function openEditDetailDalog() {
      editInfoTitle.value = "编辑";
      inputDialog.value.open();
    }
    const inputRemarkDialog = ref(null);
    function openRemarkDialog() {
      remarkVal.value = bill.value.remark;
      inputRemarkDialog.value.open();
    }
    function dialogRemarkInputConfirm(val) {
      bill.value.remark = val;
    }
    function editDetailConfirm(val) {
      if (!rowDetail.value.receivedQty) {
        showErrorToast("请输入正确的收货数量");
        return;
      } else {
        const reg = /^\+?[1-9][0-9]*$/;
        if (!reg.test(rowDetail.value.receivedQty)) {
          showErrorToast("请输入正确的收货数量");
          return;
        }
      }
      if (rowDetail.value.receivedQty > rowDetail.value.receivableQty) {
        showErrorToast("收货数量不能大于应收数量");
        return;
      }
      billDetail.value[detailIndex.value].ReceivedQty =
        rowDetail.value.receivedQty;
      resetInputDialog();
    }
    function editDetailClose() {
      resetInputDialog();
    }
    function resetInputDialog() {
      rowDetail.value.name = "";
      rowDetail.value.assetCategoryName = "";
      rowDetail.value.sapCorpName = "";
      rowDetail.value.receivableQty = "";
      rowDetail.value.receivedQty = 0;
      detailIndex.value = null;
      inputDialog.value.close();
    }
    const detailIndex = ref(null);
    function editBillDetail(index) {
      if (nonEditable && bill.value.status !== null && bill.value.status != 1) {
        return;
      }
      detailIndex.value = index;
      const {
        Name,
        AssetCategoryName,
        SapCorpName,
        ReceivableQty,
        ReceivedQty,
      } = billDetail.value[index];
      rowDetail.value.name = Name;
      rowDetail.value.assetCategoryName = AssetCategoryName;
      rowDetail.value.sapCorpName = SapCorpName;
      rowDetail.value.receivableQty = ReceivableQty;
      rowDetail.value.receivedQty = ReceivedQty;
      openEditDetailDalog(0);
    }
    const deleteDialog = ref(null);

    function billDelete() {
      deleteDialog.value.open();
    }
    function deleteDialogConfirm() {
      // showLoading();
      // takeDeliveryController
      //   .receiptDelete(bill.value.id)
      //   .then(() => {
      //     emitPromise(eventNames.takeDeliveryDetailBack).then(() => navigateBack());
      //   })
      //   .finally(() => clearLoading());
    }
    // 提交弹框信息
    const submitMsgType = reactive({
      type: "info",
      cancel: "取消",
      confirm: "确认",
      title: "确认提交?",
    });
    const submitDialog = ref(null); //提交弹框
    // 保存提交
    function handleSaveDraft(IsSubmit) {
      let obj = {};
      let Attachments = files.value.map((item, index) => {
        item.Sequence = index + 1;
        return item;
      });
      console.log(Attachments);
      return;
      bill.value.isSubmit = IsSubmit;
      if (!bill.value.receiptDateTime.value) {
        showErrorToast("请选择收货日期");
        return;
      }
      if (billDetail.value.length < 1) {
        showErrorToast("请添加资产信息");
        toIndex.value = "listDetail";
        return;
      }
      for (let i = 0, len = billDetail.value.length; i < len; i++) {
        if (billDetail.value[i].ReceivedQty == 0) {
          showErrorToast("请填写正确的收货数量");
          return;
        }
      }
      if (files.value.length < 1 && IsSubmit) {
        showErrorToast("请上传附件");
        toIndex.value = "example";
        return;
      }
      if (!IsSubmit) {
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
      obj.ReceiptDatetime = bill.value.receiptDateTime.value;
      obj.ReceiptEmployeeID = bill.value.receiptPersonnel.value;
      obj.ReceiptEmployeeName = bill.value.receiptPersonnel.text;
      obj.ReceiptOrgID = bill.value.receiptCorp.value;
      obj.ReceiptOrgName = bill.value.receiptCorp.text;
      obj.ReceiptOrgNameCN = bill.value.receiptCorp.text;
      obj.ReceiptOrgNameEN = bill.value.receiptCorp.text;
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
      // showLoading();
      // takeDeliveryController
      //   .receiptSaveDraft(obj)
      //   .then(({ ID }) => {
      //     editGetByID(ID,obj.IsSubmit).then(() => {
      //       if(obj.IsSubmit && ids){
      //         emitPromise(eventNames.takeDeliveryDetailBack);
      //       }
      //       if (bill.value.IsStart) {
      //         // 启动审批流
      //         enablingApprovalShow();
      //       }
      //     });
      //     submitDialogClose();
      //   })
      //   .finally(() => clearLoading());
    }
    let nonEditable = ref(false); //不可编辑
    function editGetByID(id, isSubmit) {
      // showLoading();
      // return takeDeliveryController
      //   .receiptGetByID(id)
      //   .then(
      //     ({
      //       BillID,
      //       BillStatus,
      //       BillCode,
      //       ReceiptDatetime,
      //       ReceiptEmployeeID,
      //       ReceiptEmployeeName,
      //       ReceiptOrgID,
      //       ReceiptOrgNameCN,
      //       Remark,
      //       Details,
      //       FlowInfo,
      //       Attachments,
      //       BillerUserID,
      //       SapErrorMsgs,
      //     }) => {
      //       bill.value.id = BillID;
      //       bill.value.status = BillStatus;
      //       bill.value.code = BillCode;
      //       bill.value.receiptDateTime.value = ReceiptDatetime
      //         ? ReceiptDatetime.substring(0, 10)
      //         : "";
      //       bill.value.receiptPersonnel.value = ReceiptEmployeeID;
      //       bill.value.receiptPersonnel.text = ReceiptEmployeeName;
      //       // 制单人id
      //       bill.value.biller.value = BillerUserID;
      //       bill.value.receiptCorp.value = ReceiptOrgID;
      //       bill.value.receiptCorp.text = ReceiptOrgNameCN;
      //       bill.value.remark = Remark;
      //       billDetail.value = Details;
      //       files.value = Attachments.map((p) => {
      //         p.name = p.FileName;
      //         p.url = getFileUrl(p.FileUrl);
      //         return p;
      //       });
      //       sapErrorMsgList.value = SapErrorMsgs;
      //       if(isSubmit && SapErrorMsgs!=null && SapErrorMsgs.length > 0){
      //         sapErrorMsg.value.open();
      //       }
      //       nonEditable.value = bill.value.status != 1 && bill.value.status != null;
      //       // 审批按钮
      //       bill.value.IsApproval = FlowInfo.IsApproval;
      //       // 启动审批流
      //       bill.value.IsStart =
      //         BillStatus != 1 && !FlowInfo.IsStart && FlowInfo.IsEnabledFlow;
      //       if (type && type == 'mywork' && !bill.value.IsApproval) {
      //         emitPromise(eventNames.billDetailBack).then(() => navigateBack());
      //       }
      //     }
      //   )
      //   .finally(() => clearLoading());
    }
    let billDetailNumber = computed(() => {
      let num = 0;
      for (let i = 0; i < billDetail.value.length; i++) {
        num += parseInt(billDetail.value[i].qty);
      }
      return num;
    });

    // 资产弹窗
    const assetDialog = ref(null);
    // 资产数据
    const assetDialogList = ref([]);
    // 取消选择
    function assetDialogClose() {
      assetDialog.value.close();
    }
    function assetDialogConfirm() {
      let items = assetDialogList.value;
      let arr = items.filter((p) => p.checked);
      if (arr.length < 1) {
        showErrorToast("请勾选资产进行操作");
        return;
      }
      let timer = true;
      for (let i = 0, len = arr.length; i < len; i++) {
        let check = billDetail.value.filter((p) => p.ID == arr[i].ID);
        if (check.length < 1) {
          arr[i].isOpened = "none";
          arr[i].ReceivedQty = arr[i].ReceivableQty - arr[i].ReceivedQty;
          billDetail.value.push(arr[i]);
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
      assetDialogClose();
    }
    // 查询新增明细
    function queryAdd() {
      // serachAssetInfo("94");
      uni.scanCode({
        success(res) {
          var content = res.result;
          if (
            res.result.substring(0, 7).toLowerCase() == "http://" ||
            res.result.substring(0, 8).toLowerCase() == "https://"
          ) {
            serachAssetInfo(content);
          } else {
            serachAssetInfo(content);
          }
        },
        fail() {
          return;
        },
      });
    }
    function serachAssetInfo(code) {
      if (!code) {
        showErrorToast("无效数据,请重新检索");
        return;
      }
      // showLoading();
      // takeDeliveryController
      //   .receivingManagementWaitReceivingAssetList(code, bill.value.receiptCorp.value)
      //   .then(({ Items }) => {
      //     assetDialogList.value =
      //       Items != null
      //         ? Items.map((p) => {
      //             p.checked = false;
      //             p.WaitAssetID = p.ID;
      //             p.BillDetailID = null;
      //             return p;
      //           })
      //         : [];
      //     if (assetDialogList.value.length < 1) {
      //       showErrorToast("暂未查询到可用资产");
      //       return;
      //     }
      //     assetDialog.value.open();
      //   })
      //   .finally(() => clearLoading());
    }
    // 选中资产
    function checkBoxChange(e, Id) {
      let values = e.detail.value,
        items = assetDialogList.value;
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
    // 跳转列表
    function jumpList() {
      // 跳转收货单列表
      navigateTo("/subcontract/asset/takeDelivery/takeDeliveryList");
    }
    // 上传图片
    function select({ tempFilePaths }) {
      showLoading();
      assetController
        .uploadAttachment(tempFilePaths)
        .then((res) => {
          isfiles.value = false;
          const _files = picturesConvertUni(res);
          files.value.push(..._files);
          nextTick(() => {
            isfiles.value = true;
          });
        })
        .finally(() => clearLoading());
    }
    // 删除附件
    function deletefile({ tempFile }) {
      const i = files.value.findIndex((p) => p === tempFile);
      files.value.splice(i, 1);
      isfiles.value = false;
      nextTick(() => {
        isfiles.value = true;
      });
    }
    const toIndex = ref(""); //锚点链接
    function anchorPoint(type) {
      toIndex.value = type;
    }
    function detailScroll() {
      toIndex.value = "";
    }
    // 重置审批流程数据
    function resetApprovalProcessData() {
      approvalProcessData.value = {
        activityID: null,
        activityName: "",
        activityType: "",
        nextActivityID: null,
        nextActivityName: "",
        nextActivityType: "",
        employeeID: null,
        employeeName: "",
        nextActivityCandidaters: [],
        refuseType: null, //拒绝方式
        supportedStrategies: [], //审批不通过处理方式
        approvalType: 1, //审批结果
        approvalTypeOption: [
          {
            text: "通过",
            value: 1,
          },
          {
            text: "不通过",
            value: 0,
          },
        ], //审批类型
        remark: "",
      };
    }
    const approveDialog = ref(null);
    // 审批按钮
    function approvalShow() {
      // showLoading();
      // bill.value.enablingApproval = true;
      // takeDeliveryController
      //   .prevApproval(bill.value.id)
      //   .then((dataInfo) => {
      //     const {
      //       ActivityID, //审批节点ID
      //       ActivityName, //审批节点名称
      //       ActivityType, //审批节点类型
      //       NextActivityID, //下个审批节点ID
      //       NextActivityName, //下个审批节点名称
      //       NextActivityType, //下个审批节点类型
      //       NextActivityCandidaters, //下个审批人信息{Array}
      //       SupportedStrategies, //审批不通过的处理方式
      //     } = dataInfo[0];
      //     approvalProcessData.value.activityID = ActivityID;
      //     approvalProcessData.value.activityName = ActivityName;
      //     approvalProcessData.value.activityType = ActivityType;
      //     approvalProcessData.value.nextActivityID = NextActivityID;
      //     approvalProcessData.value.nextActivityName = NextActivityName;
      //     approvalProcessData.value.nextActivityType = NextActivityType;
      //     const { EmployeeID, EmployeeName } =
      //       NextActivityCandidaters != null ? NextActivityCandidaters[0] : [];
      //     approvalProcessData.value.employeeID =
      //       NextActivityCandidaters != null ? EmployeeID : ""; //下个节点审批人ID
      //     approvalProcessData.value.employeeName =
      //       NextActivityCandidaters != null ? EmployeeName : ""; //下个几点审批人名称
      //     approvalProcessData.value.approvalType = 1; //审批结果
      //     approvalProcessData.value.refuseType =SupportedStrategies!=null && SupportedStrategies.length>0?SupportedStrategies[0]:null; //拒绝审批结果
      //     approvalProcessData.value.remark = ""; //审批意见
      //     approvalProcessData.value.nextActivityCandidaters = NextActivityCandidaters;
      //     approvalProcessData.value.supportedStrategies =
      //       SupportedStrategies != null
      //         ? SupportedStrategies.map((item) => {
      //             return {
      //               text: item == 1 ? "打回" : "拒绝",
      //               value: item,
      //             };
      //           })
      //         : [];
      //     approveDialog.value.open();
      //   })
      //   .finally(() => clearLoading());
    }
    // 审批确认
    function approveConfirm() {
      if (
        !approvalProcessData.value.approvalType &&
        !approvalProcessData.value.refuseType &&
        approvalProcessData.value.supportedStrategies.length != 0
      ) {
        showErrorToast("请选择处理方式");
        return;
      }
      if (
        !approvalProcessData.value.approvalType &&
        !approvalProcessData.value.remark
      ) {
        showErrorToast("请输入审批意见");
        return;
      }
      // if(bill.value.enablingApproval){
      //     approveStartConfirm();
      // }else{
      submitApproval();
      // }
    }
    function submitApproval() {
      // showLoading();
      // const obj = {
      //   ID: bill.value.id,
      //   IsPass: approvalProcessData.value.approvalType, //审批结果
      //   Remark: approvalProcessData.value.remark, //审批意见
      //   SupportedStrategies: approvalProcessData.value.refuseType, //审批不通过结果
      //   IsAdditionalApproval: false, //是否加签(功能暂未开发)
      //   AdditionalApprovalEmployeeId: null, //加签人员(功能暂未开发)
      //   ActivityName: approvalProcessData.value.activityName,
      //   ActivityID: approvalProcessData.value.activityID,
      //   ActivityType: approvalProcessData.value.activityType,
      //   NextActivityName: approvalProcessData.value.nextActivityName,
      //   NextActivityID: approvalProcessData.value.nextActivityID,
      //   NextActivityType: approvalProcessData.value.nextActivityType,
      //   CandidateApprovers: approvalProcessData.value.nextActivityCandidaters,
      // };
      // takeDeliveryController
      //   .submitApproval(obj)
      //   .then(({ ID }) => {
      //     bill.value.startFlow = false;
      //     let timer = setTimeout(() => {
      //       resetApprovalProcessData(); //重置数据
      //       editGetByID(ID)
      //         .then(() => {
      //           approvalClose();
      //         })
      //         .finally(() => clearLoading());
      //       clearTimeout(timer);
      //     }, 3000);
      //   })
      //   .catch(() => clearLoading());
    }
    // 审批取消
    function approvalClose() {
      approveDialog.value.close();
    }
    // 启动审批流
    const approveStartUpDialog = ref(null);

    // 审批人信息
    const approverOption = ref([]);

    // 启动审批弹框信息
    const approvalProcessData = ref({
      activityID: null,
      activityName: "",
      activityType: "",
      nextActivityID: null,
      nextActivityName: "",
      nextActivityType: "",
      employeeID: null,
      employeeName: "",
      nextActivityCandidaters: [],
      refuseType: null, //拒绝方式
      supportedStrategies: [], //审批不通过处理方式
      approvalType: 1, //审批结果
      approvalTypeOption: [
        {
          text: "通过",
          value: 1,
        },
        {
          text: "不通过",
          value: 0,
        },
      ], //审批类型
      remark: "",
    });

    function approverChange(val) {
      approvalProcessData.value.nextActivityCandidaters =
        approverOption.value.filter((p) => p.EmployeeID == val);
    }

    // 启动审批流按钮
    function enablingApprovalShow() {
      // showLoading();
      // bill.value.enablingApproval = false;
      // takeDeliveryController
      //   .preStartFlow(bill.value.id)
      //   .then(
      //     ({
      //       ActivityID, //审批节点ID
      //       ActivityName, //审批节点名称
      //       ActivityType, //审批节点类型
      //       NextActivityID, //下个审批节点ID
      //       NextActivityName, //下个审批节点名称
      //       NextActivityType, //下个审批节点类型
      //       NextActivityCandidaters, //下个审批人信息{Array}
      //     }) => {
      //       approvalProcessData.value.activityID = ActivityID;
      //       approvalProcessData.value.activityName = ActivityName;
      //       approvalProcessData.value.activityType = ActivityType;
      //       approvalProcessData.value.nextActivityID = NextActivityID;
      //       approvalProcessData.value.nextActivityName = NextActivityName;
      //       approvalProcessData.value.nextActivityType = NextActivityType;
      //       if (NextActivityCandidaters.length != 1 && NextActivityCandidaters != null) {
      //         approvalProcessData.value.employeeID = null;
      //         approvalProcessData.value.employeeName = "";
      //       } else {
      //         const { EmployeeID, EmployeeName } = NextActivityCandidaters[0];
      //         approvalProcessData.value.employeeID = EmployeeID ? EmployeeID : null; //下个节点审批人ID
      //         approvalProcessData.value.employeeName = EmployeeName ? EmployeeName : ""; //下个几点审批人名称
      //       }
      //       approvalProcessData.value.nextActivityCandidaters = NextActivityCandidaters;
      //       approverOption.value = NextActivityCandidaters.map((p) => {
      //         p.text = p.EmployeeName;
      //         p.value = p.EmployeeID;
      //         return p;
      //       });
      //       approveStartUpDialog.value.open(); //启动审批流弹框
      //       // 启动审批流
      //       if (
      //         (NextActivityCandidaters.length == 1 && bill.value.IsStart) ||
      //         (NextActivityType == 2 && bill.value.IsStart)
      //       ) {
      //         approveStartConfirm();
      //       } else {
      //         clearLoading();
      //       }
      //     }
      //   )
      //   .catch(() => clearLoading());
    }
    // 启动审批
    function approveStartConfirm() {
      // if (approverOption.value.length > 1 && !approvalProcessData.value.employeeID) {
      //   showErrorToast("请选择审批人");
      //   return;
      // }
      // showLoading();
      // const approveData = {
      //   ID: bill.value.id,
      //   ActivityName: approvalProcessData.value.activityName,
      //   ActivityID: approvalProcessData.value.activityID,
      //   ActivityType: approvalProcessData.value.activityType,
      //   NextActivityName: approvalProcessData.value.nextActivityName,
      //   NextActivityID: approvalProcessData.value.nextActivityID,
      //   NextActivityType: approvalProcessData.value.nextActivityType,
      //   CandidateApprovers: approvalProcessData.value.nextActivityCandidaters,
      // };
      // takeDeliveryController
      //   .startFlow(approveData)
      //   .then(async ({ ID }) => {
      //     bill.value.startFlow = false;
      //     await awaitDelay(3000);
      //     resetApprovalProcessData(); //重置数据
      //     await editGetByID(ID);
      //     approveStartClose();
      //   })
      //   .catch(() => clearLoading());
    }
    // 取消启动审批流
    function approveStartClose() {
      approveStartUpDialog.value.close();
    }
    function sapErrorMsgClose() {
      sapErrorMsg.value.close();
    }
    const windowHeights = ref("");
    {
      // 获取屏幕高度
      uni.getSystemInfo({
        success: (result) => {
          windowHeights.value = result.windowHeight;
        },
      });

      if (id) {
        editGetByID(id);
      }

      if (ids) {
        // showLoading();
        // takeDeliveryController
        //   .receivingManagementWaitReceivingAssetGetListByIDs(JSON.parse(ids))
        //   .then(({ Items }) => {
        //     billDetail.value =
        //       Items != null
        //         ? Items.map((p) => {
        //             p.checked = false;
        //             p.WaitAssetID = p.ID;
        //             p.BillDetailID = null;
        //             p.ReceivedQty = p.ReceivableQty - p.ReceivedQty;
        //             return p;
        //           })
        //         : [];
        //   })
        //   .finally(() => clearLoading());
      }
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

    function dataTimePickerChange(e) {
      uni.datePicker({
        format: "yyyy-MM-dd",
        success: (res) => {
          bill.value.receiptDateTime.value = res.date;
        },
      });
    }
    return {
      getStorage, //获取缓存
      systemShow, // 是否可以保存草稿
      type,
      IsScroll,
      toIndex, //锚点链接
      anchorPoint, //锚定定位
      detailScroll, //锚点
      bill, //单据头信息
      billDetail, //单据明细
      rowDetail, //编辑明细
      deleteOperationBtn, //删除操作按钮
      isOpened, //滑动删除
      uniSwipeChange, //滑动事件
      uniSwipeClick, //删除事件
      inputDialog, //编辑明细弹框
      openEditDetailDalog, //新增明细
      queryAdd, //查询新增明细
      serachAssetInfo, //查询资产信息
      checkBoxChange, //选中资产
      assetDialog, //新增数据弹框
      assetDialogList, //新增数据
      assetDialogClose, //取消新增
      assetDialogConfirm, //确认新增
      dialogRemarkInputConfirm, //备注弹框
      inputRemarkDialog, //备注框
      openRemarkDialog, //备注弹框事件
      editDetailConfirm, //编辑确认
      editDetailClose, //编辑取消
      editBillDetail, //编辑明细
      deleteDialog, //删除弹框
      billDelete, //单据删除
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
      approvalShow, //审批事件
      approveDialog, //审批弹框
      approveConfirm, //审批确认
      submitApproval, //审批提交
      approvalClose, //审批取消
      approveStartUpDialog, //启动审批流弹框
      approvalProcessData, //审批流程数据
      approverOption, //审批人
      approverChange,
      enablingApprovalShow, //启动审批流按钮
      approveStartConfirm, //启动审批
      approveStartClose, //取消审批
      resetApprovalProcessData, //重置审批流程数据
      filePicker,
      select,
      files,
      isfiles,
      deletefile,
      remarkVal,
      dataTimePickerChange,
      windowHeights, //屏幕高度
      jumpList, //跳转列表
      windowHeights, //屏幕高度
      // permissionData,//有哪些按钮权限
      // getpermission,//判断按钮权限
      sapErrorMsg,
      sapErrorMsgClose,
      sapErrorMsgList,
      fileExtType,
    };
  },
};
</script>

<style lang="scss" scoped>
.uni-icon-delete {
  color: #dd524d;
}
.uni-icon-submit {
  background: #4a74e7;
  color: #fff;
}
.checka {
  display: flex;
  align-items: center;
  color: red;
  margin: 0 5px;
}
.ensp {
  margin-left: 16px;
}
.list-icon {
  width: 5px;
  height: 15px;
  background: blue;
  margin: 0 5px;
  border-radius: 2px;
}
.uni-date__x-input {
  height: auto;
}
.info-item {
  width: 50%;
  text-align: right;
}
.info-item-text {
  font-size: 14px;
  color: rgb(125, 125, 125);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.slot-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  color: #333;
  white-space: nowrap;
}
.align-item-center {
  display: flex;
  align-items: center;
}
.list-item-detail {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.list-item-title {
  font-weight: 600;
  overflow: hidden;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 2px 0;
}
.approve {
  width: 100%;
}
.approve-type {
  font-size: 14px;
  color: #4444;
  display: flex;
  padding: 5px 0;
}
.approve-type text:nth-child(1) {
  width: 30%;
  display: flex;
  align-items: center;
  color: #444;
  text-align: right;
  .checka {
    color: red;
  }
}
.approve-type text:nth-child(2) {
  width: 70%;
  color: #444;
}
.approve-type ::v-deep .uni-stat__select {
  padding: 0;
}

.approve-type ::v-deep .uni-select__input-box {
  width: 150px;
}
.list-item-column {
  color: #444;
  font-size: 12px;
  width: 100%;
  padding: 2px 0;
}
.list-item-column-row ::v-deep text {
  font-size: 14px;
  color: #999;
  width: 100%;
  display: inline-block;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list-item-column-msg ::v-deep text {
  font-size: 14px;
  color: #999;
  width: 100%;
  display: inline-block;
  text-align: left;
  word-break: break-all;
}
.list-item-column ::v-deep text {
  width: 50%;
  display: inline-block;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bill-detail-delete {
  position: absolute;
  right: 0;
}
.bill-detail-add {
  position: fixed;
  right: 20px;
  bottom: 200px;
  opacity: 0.6;
  padding: 5px;
  border-radius: 50%;
  background: #ededed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
}
.input-dialog-body {
  display: flex;
}
.bill-list-take-delivery-draw {
  // height: calc(100% - 315px);
}
.bill-list-take-delivery-draw ::v-deep .uni-list-item {
  width: 100%;
}
.bill-detail-take-delivery-draw {
  height: 100%;
  overflow-y: auto;
}
.bill-footer-take-delivery-draw {
  padding: 10px 0;
  width: 100%;
  height: 40px;
  background: #eeeeee;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  touch-action: none;
  > text {
    // color: #444;
    // font-size: 12px;
    // width: 50px;
    // text-align: left;
    // margin-left: 5px;
    // white-space: nowrap;
  }
  view:last-child {
    display: flex;
    // justify-content: space-around;
    justify-content: flex-end;
    touch-action: none;
    width: calc(100% - 50px) !important;
    text-align: right;
    button {
      touch-action: none;
      width: 100px;
      font-size: 14px;
      font-weight: bold;
      white-space: nowrap;
      color: #444;
      margin: 0 5px;
      border-radius: 5px;
    }
  }
}
.assetDialogList {
  width: 100%;
  overflow-y: auto;
}
.asset-dialog-list {
  // overflow-y:auto;
}
.take-delivery-checkbox {
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  top: calc(50% - 12px);
}
.list-item {
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 190px;
}
.list-item-error-msg {
  display: flex;
  width: 100%;
  flex-direction: column;
}
.list-item-column-title {
  width: 100%;
  font-weight: 600;
  font-size: 14px;
  color: #000;
  padding: 5px 0;
}
.list-item-column-list {
  font-size: 14px;
  color: #999;
  display: flex;
  padding: 5px 0;
  text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }
}
.uni_list ::v-deep .uni-list-item__container {
  height: 21px;
}
.toIndex {
  position: fixed;
  right: 30px;
  bottom: 80px;
  view {
    font-size: 14px;
    color: #000;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    opacity: 0.6;
    .uni-icons {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #d0d0d0;
      line-height: 40px;
    }
  }
}
.toIndex ::v-deep .uni-icons {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #d0d0d0;
  line-height: 40px;
}
@media screen and (max-width: 360px) {
  .bill-footer-take-delivery-draw > view:last-child {
    width: 100%;
    .uni-icon-delete,
    uni-button {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.date-time-take-delivery-draw ::v-deep .uni-date__x-input {
  line-height: 14px;
  height: 14px;
}
.date-time-take-delivery-draw ::v-deep .uni-icons {
  display: none;
}
// .bill-detail-take-delivery-draw ::v-deep .button-group--right{
//   padding:16px 0;
// }
.bill-detail-take-delivery-draw ::v-deep .uni-card__header-extra {
  width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
}
.bill-detail-take-delivery-draw ::v-deep .uni-card__header-extra-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bill-list-take-delivery-draw ::v-deep .uni-section {
  height: 100%;
}
.bill-list-take-delivery-draw ::v-deep .uni-section > view:last-child {
  height: calc(100% - 45px);
}
.deleteDialog .uni-border-left ::v-deep .uni-button-color {
  color: #dd524d;
}
</style>
