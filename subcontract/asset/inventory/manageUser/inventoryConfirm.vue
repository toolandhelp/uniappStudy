<template>
  <!-- 盘点数量输入弹框 -->
  <uni-popup ref="inventoryQty" type="dialog">
    <uni-popup-dialog
      mode="input"
      title="盘点数量"
      :value="qty"
      placeholder="请输入盘点数量"
      @confirm="inventoryQtyConfirm"
    ></uni-popup-dialog>
  </uni-popup>
  <!-- 盘点说明输入弹框 -->
  <uni-popup ref="inventoryExplain" type="dialog">
    <uni-popup-dialog
      mode="input"
      title="盘点说明"
      :value="explain"
      placeholder="请输入盘点说明"
      @confirm="inventoryExplainConfirm"
    ></uni-popup-dialog>
  </uni-popup>
  <!-- 盘点确认说明输入弹框 -->
  <uni-popup ref="inventoryConfirmExplain" type="dialog">
    <uni-popup-dialog
      mode="input"
      title="盘点确认说明"
      :value="confirmExplain"
      placeholder="请输入盘点确认说明"
      @confirm="inventoryConfirmExplainConfirm"
    ></uni-popup-dialog>
  </uni-popup>
  <view class="content" :style="`height:${ assetInfo.Qty != 1 ? windowHeights - 300 : windowHeights - 255 }px`">
    <view
    class="asset-content"
    :style="`height:${assetInfo.Qty != 1 ? windowHeights - 310 : windowHeights - 265}px`"
  >
      <uni-section title="基本信息" type="line">
        <view class="list-column">
          <view class="list-item-title">资产名称：{{ assetInfo.Name }}</view>
          <view class="list-item-content">
            <view>资产编码：{{ assetInfo.Code }}</view>
            <view>原编码：{{ assetInfo.OriginalCode }}</view>
          </view>
          <view class="list-item-content">
            <view>设备序列号：{{ assetInfo.SN }}</view>
            <view>资产分类：{{ assetInfo.CategoryName }}</view>
          </view>
          <view class="list-item-content">
            <view>品牌：{{ assetInfo.Brand }}</view>
            <view>规格：{{ assetInfo.Spec }}</view>
          </view>
          <view class="list-item-content">
            <view>型号：{{ assetInfo.Model }}</view>
            <view>计量单位：{{ assetInfo.Unit }}</view>
          </view>
          <view class="list-item-content">
            <view
              >购置日期：{{
                assetInfo.DateOfPurchase ? assetInfo.DateOfPurchase.substring(0, 10) : ""
              }}</view
            >
            <view>资产用途：{{ assetInfo.AssetPurposeText }}</view>
          </view>
          <view class="list-item-content">
            <view>取得方式：{{ assetInfo.AcquireWayText }}</view>
            <view>资产性质：{{ assetInfo.AssetAttributeText }}</view>
          </view>
          <view class="list-item-content">
            <view>资产状态：{{ assetInfo.AssetStatusText }}</view>
            <view>供应商：{{ assetInfo.SupplierName }}</view>
          </view>
        </view>
      </uni-section>
      <uni-section title="使用信息" type="line">
        <view class="list-column">
          <view class="list-item-content">
            <view>使用情况：{{ assetInfo.AssetUsages }}</view>
            <view>管理部门：{{ assetInfo.KAOName }}</view>
          </view>
          <view class="list-item-content">
            <view>使用部门：{{ assetInfo.UAOName }}</view>
            <view>使用人员：{{ assetInfo.UAEName }}</view>
          </view>
          <view class="list-item-content">
            <view>存放位置：{{ assetInfo.LocationName }}</view>
            <view>领用日期：{{ assetInfo.DatetimeOfUse }}</view>
          </view>
          <view class="list-item-content">
            <view>过保日期：{{ assetInfo.ExpiredDateOfMaintenance?assetInfo.ExpiredDateOfMaintenance.substring(0,10):"" }}</view>
            <view>使用期至：{{ assetInfo.ExpiredDateOfUsage?assetInfo.ExpiredDateOfUsage.substring(0,10):"" }}</view>
          </view>
        </view>
      </uni-section>
      <uni-section title="财务信息" type="line">
        <view class="list-column">
          <view class="list-item-content">
            <view>发票号码：{{ assetInfo.InvoiceNumber }}</view>
            <view>开票日期：{{ assetInfo.DateOfInvoice?assetInfo.DateOfInvoice.substring(0,10):"" }}</view>
          </view>
        </view>
      </uni-section>
      <uni-section title="图片上传" type="line">
        <uni-file-picker
          ref="filePicker"
          :limit="5"
          file-mediatype="image"
          file-extname="jpg,jpeg,png"
          mode="grid"
          v-model="files"
          :auto-upload="false"
          @select="select"
          @delete="deletefile"
          v-if="isfiles"
          title="最多选择5个图片"
        >
        </uni-file-picker>
      </uni-section>
    </view>
  </view>
  <view class="footer">
    <view class="bill_header">
      <uni-list>
        <uni-list-item :disabled="data.Qty == 1">
          <template v-slot:header>
            <view class="bill_header_label">
              <text class="required">*</text>
              <text class="item_label_color">盘点数量：</text>
            </view>
          </template>
          <template v-slot:body>
            <text
              class="item_text_content"
              :class="qty ? 'content_effective' : ''"
              @click="data.Qty == 1 ? null : inventoryQty.open()"
              >{{ qty ? qty : "请输入盘点数量" }}</text
            >
          </template>
          <template v-slot:footer>
            <view class="info-flex">
              <view class="content_delete_icon">
                <view>
                  <uni-icons
                    v-if="qty"
                    v-show=" data.Qty == 1 ? false : true"
                    @click="removeInput('qty')"
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
              <text class="item_label_color ensp">盘点说明：</text>
            </view>
          </template>
          <template v-slot:body>
            <text 
            class="item_text_content" 
            :class="explain ? 'content_effective' : ''" 
            @click="inventoryExplain.open()">{{
              explain ? explain : "请输入盘点说明"
            }}</text>
          </template>
          <template v-slot:footer>
            <view class="info-flex">
              <view class="content_delete_icon">
                <view>
                  <uni-icons
                    v-if="explain"
                    @click="removeInput('explain')"
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
              <text class="item_label_color ensp">盘点确认说明：</text>
            </view>
          </template>
          <template v-slot:body>
            <text 
            class="item_text_content"
            :class="confirmExplain ? 'content_effective' : ''" 
            @click="inventoryConfirmExplain.open()">{{
              confirmExplain ? confirmExplain : "请输入盘点确认说明"
            }}</text>
          </template>
          <template v-slot:footer>
            <view class="info-flex">
              <view class="content_delete_icon">
                <view>
                  <uni-icons
                    v-if="confirmExplain"
                    @click="removeInput('confirmExplain')"
                    type="close"
                    size="16"
                  ></uni-icons>
                </view>
              </view>
            </view>
          </template>
        </uni-list-item>
        <uni-list-item v-if="data.Qty != 1" :disabled="!isCheck">
          <template v-slot:header>
            <view class="bill_header_label">
              <text class="required">*</text>
              <text class="item_label_color">盘点情况：</text>
            </view>
          </template>
          <template v-slot:body>
            <view class="item_text_content">
                <uni-data-picker
                  v-slot:default="{ data, error, options }"
                  :border="false"
                  :clear-icon="false"
                  @input="firmOfferChange"
                  :localdata="firmOfferOption"
                  v-model="firmOffer.value"
                  v-if="isCheck"
                >
                  <text 
                  class="item_text_content"
                  :class="firmOffer.text ? 'content_effective' : ''" 
                  >{{
                    firmOffer.text ? firmOffer.text : "请选择实盘情况"
                  }}</text>
                </uni-data-picker>
                <text 
                v-else 
                class="item_text_content"
                :class="firmOffer.text ? 'content_effective' : ''" 
                >{{
                  firmOffer.text ? firmOffer.text : "请选择实盘情况"
                }}</text>
            </view>
          </template>
          <template v-slot:footer>
            <view class="info-flex">
              <view class="content_delete_icon">
                <view>
                  <uni-icons
                    v-if="firmOffer.text"
                    @click="removeInput('firmOffer')"
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
    <view class="colum_confirm_cancel">
      <button type="primary" class="uni-icon-submit" @click="saveSubmit">
        <text style="color: #fff">提交</text>
      </button>
      <button  class="uni-icon-submit" @click="navigateBack()">
        <text>取消</text>
      </button>
    </view>
  </view>
</template>
<script>
import UniFilePicker from "../../../../components/uni-file-picker/components/uni-file-picker/uni-file-picker.vue";
import {
  showOkToast,
  showErrorToast,
  showLoading,
  clearLoading,
} from "../../../../share/util/message";
import assetController from "../../../../service/controller/asset/assetController";
import inventoryController from "../../../../service/controller/asset/inventoryController";
import { getFileUrl } from "../../../../share/http/serveUrl";
import { emitPromise } from "../../../../share/util/uniEvent";
import eventNames from "../../../../service/enumeration/eventNames";
import { navigateTo, navigateBack } from "../../../../share/redirect";
import { reactive, ref, nextTick, computed } from "vue";
import { useStore } from "vuex";
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
  },
  setup({ id }) {
    const store = useStore();
    const files = ref([]);
    const isfiles = ref(true);
    const data = store.state.inventory.manageUser.item;
    console.log(data);
    const assetInfo = data.Asset;
    const qty = ref(data.ActualQty ? data.ActualQty : data.Qty);
    const explain = ref("");
    const confirmExplain = ref("");
    const inventoryQty = ref(null);
    const inventoryExplain = ref(null);
    const inventoryConfirmExplain = ref(null);
    const firmOffer = ref({
      text: "",
      value: null,
    });
    const firmOfferOption = ref([
      {
        text: "转移",
        value: 3,
      },
      {
        text: "盘盈(转移)",
        value: 4,
      },
      {
        text: "盘盈(资产登记)",
        value: 5,
      },
    ]);
    function firmOfferChange(val) {
      firmOffer.value.text = firmOfferOption.value.filter((p) => p.value == val)[0].text;
      firmOffer.value.value = val;
    }
    // 上传图片
    function select({ tempFilePaths }) {
      showLoading();
      assetController
        .uploadImage(tempFilePaths)
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

    function inventoryQtyConfirm(val) {
      const reg = /^([0]|[1-9][0-9]*)$/;
      if (val == "") {
        showErrorToast("请输入数量");
        return;
      }
      if (!reg.test(val)) {
        showErrorToast("数量格式不正确");
        return;
      }
      qty.value = val;
    }
    function inventoryExplainConfirm(val) {
      explain.value = val;
    }
    function inventoryConfirmExplainConfirm(val) {
      confirmExplain.value = val;
    }
    let isCheck = computed(() => {
      if (assetInfo.Qty != qty.value) {
        return true;
      } else {
        firmOffer.value = {
          text: "",
          value: null,
        };
        return false;
      }
    });

    function saveSubmit() {
      if (!qty.value) {
        showErrorToast("请输入盘点数量");
        return;
      }
      if (!firmOffer.value.value && qty.value != data.Qty) {
        showErrorToast("请选择实盘情况");
        return;
      }
      showLoading();
      const stockStatus =
        qty.value == data.Qty ? "1" : qty.value < data.Qty ? "6" : firmOffer.value.value;
      inventoryController
        .pDAInventorySubmitCheckAsset(
          assetInfo.ID,
          files.value,
          data.ID,
          qty.value,
          explain.value,
          confirmExplain.value,
          stockStatus,
          id
        )
        .then(() => {
          showOkToast("盘点成功");
          emitPromise(eventNames.inventoryConfirmDetailBack).then(() => navigateBack());
        })
        .finally(() => clearLoading());
    }

    function removeInput(key) {
      if (key == "firmOffer") {
        firmOffer.value.value = null;
        firmOffer.value.text = null;
        return;
      }
      if(key == 'qty'){
        qty.value = null;
        return
      }
      if(key == 'explain'){
        explain.value = null;
        return
      }
      if(key == 'confirmExplain'){
        confirmExplain.value = null;
        return
      }
    }

    // 获取屏幕高度
    const windowHeights = ref("");
    uni.getSystemInfo({
      success: (result) => {
        windowHeights.value = result.windowHeight;
      },
    });
    console.log(assetInfo);
    return {
      data,
      assetInfo,
      files,
      isfiles,
      select,
      deletefile,
      qty,
      explain,
      confirmExplain,
      inventoryQty,
      inventoryExplain,
      inventoryConfirmExplain,
      inventoryQtyConfirm,
      inventoryExplainConfirm,
      inventoryConfirmExplainConfirm,
      firmOffer,
      firmOfferOption,
      firmOfferChange,
      isCheck,
      saveSubmit,
      removeInput,
      navigateBack,
      windowHeights,
    };
  },
};
</script>
<style lang="scss" scoped>
.content{
  width: calc(100% - 10px);
  padding:5px;
  background: #f2f1f6;
  .asset-content{
    padding: 5px;
    overflow: hidden;
    border-radius: 10px;
    background: #fff;
    overflow-y: auto;
  }
}
.checka {
  display: flex;
  align-items: center;
  color: red;
  width: 10px;
  margin-left: 5px;
  text-align: center;
}
.ensp {
  margin-left: 16px;
}
.list-column {
  margin: 0px 15px;
}
.list-item-title {
  overflow: hidden;
  font-size: 12px;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 5px 0;
}
.list-item-content {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  font-size: 12px;
  color: #444;
  padding: 5px 0;
  view {
    width: 50%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
