<template>
  <!-- 输入弹框 -->
  <uni-popup ref="inputDialog" type="dialog">
    <uni-popup-dialog
      mode="input"
      :title="`请输入${title}`"
      :value="editVal"
      placeholder="请输入信息"
      :before-close="true"
      @confirm="dialogInputConfirm"
      @close="inputDialog.close()"
    ></uni-popup-dialog>
  </uni-popup>
  <!-- 提交弹框 -->
  <uni-popup ref="submitDialog" class="submit-dialog" type="dialog">
    <uni-popup-dialog
      model="base"
      :before-close="true"
      type="info"
      cancelText="取消"
      confirmText="确认"
      content="确认登记资产信息？"
      @confirm="submitDialogConfirm"
      @close="submitDialog.close()"
    ></uni-popup-dialog>
  </uni-popup>
  <view class="uni_list">
    <uni-list>
      <uni-list-item v-for="(item, index) in registerList">
        <template v-slot:header>
          <view class="align-item-center">
            <text v-if="index == 0 || index == 7" class="checka">*</text>
            <text v-if="index == 0 || index == 7" class="slot-box"
              >{{ item.text }}：</text
            >
            <text
              v-else
              :class="index == 0 || index == 7 ? 'slot-box' : 'slot-box ensp'"
              >{{ item.text }}：</text
            >
          </view>
        </template>
        <template v-slot:footer>
          <view class="align-item-footer">
            <text class="info-item-text" @click="editInfo(index)">{{
              item.value ? item.value : item.placeholder
            }}</text>
            <view class="san-code">
              <uni-icons
                @click="scanCode"
                v-if="index == 2"
                type="scan"
                size="15"
                style="margin-left: 10px"
              ></uni-icons>
            </view>
          </view>
        </template>
      </uni-list-item>
    </uni-list>
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
        title=""
      >
      </uni-file-picker>
    </uni-section>
  </view>
  <view class="submit-button">
    <button type="primary" class="uni-icon-submit" @click="saveSubmit">
      <text style="color: #fff">提交</text>
    </button>
    <button @click="cancel">
      <text style="color: #444">取消</text>
    </button>
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
import { navigateTo, navigateBack } from "../../../../share/redirect";
import { getFileUrl } from "../../../../share/http/serveUrl";
import { getStorage } from "../../../../share/util/storage";
import { reactive, ref, nextTick, computed } from "vue";
import { emitPromise } from "../../../../share/util/uniEvent";
import { getScanCode } from "../../../../share/util/index";
import eventNames from "../../../../service/enumeration/eventNames";
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
    checkstatus: String,
  },
  setup({ id, checkstatus }) {
    const files = ref([]);
    const isfiles = ref(true);
    const registerList = ref([
      {
        text: "资产名称",
        placeholder: "请输入资产名称",
        value: "",
      },
      {
        text: "资产编码",
        placeholder: "请输入资产编码",
        value: "",
      },
      {
        text: "原编码",
        placeholder: "请扫描/输入原编码",
        value: "",
      },
      {
        text: "品牌",
        placeholder: "请输入品牌",
        value: "",
      },
      {
        text: "规格",
        placeholder: "请输入规格",
        value: "",
      },
      {
        text: "型号",
        placeholder: "请输入型号",
        value: "",
      },
      {
        text: "数量",
        placeholder: "请输入数量",
        value: "",
      },
      {
        text: "盘点说明",
        placeholder: "请输入盘点说明",
        value: "",
      },
    ]);
    const editVal = ref("");

    const toIndex = ref(0);

    const title = ref("");

    const inputDialog = ref(null);

    const submitDialog = ref(null);

    function editInfo(index) {
      toIndex.value = index;
      if (registerList.value[index].value) {
        editVal.value = registerList.value[index].value;
      }
      title.value = registerList.value[index].text;
      inputDialog.value.open();
    }

    function dialogInputConfirm(val) {
      // if (!val) {
      //   showErrorToast("请输入" + title.value);
      //   return;
      // }
      if (toIndex.value == 6) {
        const reg = /^\+?[1-9][0-9]*$/;
        if (!reg.test(val)) {
          showErrorToast("请输入正确的数量");
          return;
        }
      }
      registerList.value[toIndex.value].value = val;
      editVal.value = "";
      inputDialog.value.close();
    }

    function scanCode() {
      uni.scanCode({
        scanType: ["barCode", "qrCode"],
        success: ({ result }) => {
          registerList.value[2].value = getScanCode(result);
        },
      });
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

    function saveSubmit() {
      if (!registerList.value[0].value) {
        showErrorToast("请输入资产名称");
        return;
      }
      if (!registerList.value[7].value) {
        showErrorToast("请输入盘点说明");
        return;
      }
      submitDialog.value.open();
    }
    
    function submitDialogConfirm() {
      showLoading();
      inventoryController
        .pDAInventoryAssetRegister(
          files.value,
          getStorage("CorpID"),
          id,
          registerList.value[0].value,
          registerList.value[1].value,
          registerList.value[2].value,
          registerList.value[3].value,
          registerList.value[4].value,
          registerList.value[5].value,
          registerList.value[6].value,
          registerList.value[7].value
        )
        .then((res) => {
          submitDialog.value.close();
          showOkToast("登记成功");
          emitPromise(eventNames.registerDetailBack).then(() => navigateBack());
        })
        .finally(() => clearLoading());
    }

    function cancel() {
      navigateBack();
    }

    return {
      files,
      isfiles,
      select,
      deletefile,
      registerList,
      inputDialog,
      editInfo,
      editVal,
      title,
      dialogInputConfirm,
      submitDialogConfirm,
      scanCode,
      saveSubmit,
      submitDialog,
      cancel,
    };
  },
};
</script>
<style lang="scss" scoped>
.san-code {
  width: 25px;
  text-align: center;
}
.align-item-center {
  display: flex;
  align-items: center;
}
.slot-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  color: #333;
  white-space: nowrap;
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
.info-item-text {
  font-size: 14px;
  color: rgb(125, 125, 125);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.submit-button {
  padding: 10px 5px;
  height: 100px;
}
.uni-icon-submit {
  margin-bottom: 5px;
}
.align-item-footer {
  display: flex;
  align-items: center;
}
.uni_list {
  height: calc(100% - 120px);
  overflow-y: auto;
}
.uni_list ::v-deep .uni-list-item__container {
  height: 21px;
}
</style>
