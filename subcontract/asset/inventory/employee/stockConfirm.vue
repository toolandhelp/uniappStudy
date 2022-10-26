<template>
  <view class="content" :style="`height:${windowHeights - 10}px`">
    <view class="content_region">
      <scroll-view :style="`height:${windowHeights - 140}px`" :scroll-y="true">
          <uni-section title="基本信息" type="line">
            <view class="row">
              <view class="col">
                <view>资产编码：</view>
                <view>{{ asset.Code }}</view>
              </view>
              <view class="col">
                <view>资产名称：</view>
                <view>{{ asset.Name }}</view>
              </view>
            </view>
            <view class="row">
              <view class="col">
                <view>原编码：</view>
                <view>{{ asset.OriginalCode }}</view>
              </view>
              <view class="col">
                <view>数量：</view>
                <view>{{ asset.Qty }}</view>
              </view>
            </view>
            <view class="row">
              <view class="col">
                <view>管理部门：</view>
                <view>{{ asset.KAOName }}</view>
              </view>
              <view class="col">
                <view>管理人员：</view>
                <view>{{ asset.KAEName }}</view>
              </view>
            </view>
            <view class="row">
              <view class="col">
                <view>使用部门：</view>
                <view>{{ asset.UAOName }}</view>
              </view>
              <view class="col">
                <view>使用人员：</view>
                <view>{{ asset.UAEName }}</view>
              </view>
            </view>
            <view class="row">
              <view class="col">
                <view>存放位置：</view>
                <view>{{ asset.LocationName }}</view>
              </view>
              <view class="col">
                <view>品牌：</view>
                <view>{{ asset.Brand }}</view>
              </view>
            </view>
            <view class="row">
              <view class="col">
                <view>规格：</view>
                <view>{{ asset.Spec }}</view>
              </view>
              <view class="col">
                <view>型号：</view>
                <view>{{ asset.Model }}</view>
              </view>
            </view>
          </uni-section>
          <uni-section title="实盘确认" type="line">
            <uni-forms ref="form" :modelValue="formData" :rules="rules">
              <view class="form">
                <uni-forms-item label="盘点数量" :required="true" name="actualQty">
                  <uni-easyinput
                    type="number"
                    :focus="true"
                    v-model="formData.actualQty"
                    placeholder="请输入盘点数量"
                    :maxlength="6"
                  />
                </uni-forms-item>
                <uni-forms-item label="盘点说明" name="stockCheckDesc">
                  <uni-easyinput
                    type="textarea"
                    v-model="formData.stockCheckDesc"
                    placeholder="请输入盘点说明"
                    :maxlength="200"
                    trim="both"
                  />
                </uni-forms-item>
              </view>
            </uni-forms>
          </uni-section>
          <uni-section title="资产图片" type="line">
                <uni-file-picker
                ref="filePicker"
                :limit="9"
                file-mediatype="image"
                file-extname="jpg,jpeg,png"
                mode="grid"
                v-model="files"
                :auto-upload="false"
                @select="select"
                @delete="deletefile"
                >
                </uni-file-picker>
          </uni-section>
      </scroll-view>
       </view>
  </view>
  
  <view class="colum_confirm_cancel">
    <button @click="save" type="primary">确 定</button>
    <button @click="cancel">取 消</button>
  </view>
</template>

<script>
import { useStore } from "vuex";
import { navigateBack } from "../../../../share/redirect/index";
import { reactive, ref, nextTick } from "vue";
import { getPrevPage } from "../../../../share/util/page";
import { emit } from "../../../../share/util/uniEvent";
import eventNames from "../../../../service/enumeration/eventNames";
import assetController from "../../../../service/controller/asset/assetController";
import UniFilePicker from "../../../../components/uni-file-picker/components/uni-file-picker/uni-file-picker.vue";
import { getFileUrl } from "../../../../share/http/serveUrl";
import {
  showOkToast,
  showErrorToast,
  showLoading,
  clearLoading,
} from "../../../../share/util/message";
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
  setup() {
    const store = useStore();
    const detailItem = store.state.inventory.employee.item;
    const formData = reactive({
      actualQty: detailItem.ActualQty ?? detailItem.Qty,
      stockCheckDesc: detailItem.StockCheckDesc,
    });
    const form = ref(null);
    const rules = reactive({
      actualQty: {
        rules: [
          {
            required: true,
            errorMessage: "盘点数量必填",
          },
        ],
      },
    });
    const files = ref(detailItem.AssetPics.map(p=>{
      p.name = p.FileName;
      p.url = getFileUrl(p.FileUrl);
      return p;
    }));
    const isfiles = ref(true);

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
          }).finally(() => clearLoading());
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

    function cancel() {
      navigateBack();
    }

    function save() {
      console.log(files.value);
      form.value.validate().then(() => {
        emit(
          eventNames.employeeStockConfirmBack,
          detailItem,
          Number.parseInt(formData.actualQty),
          formData.stockCheckDesc,
          files.value,
        );
        navigateBack();
      });
    }

    const windowHeights = ref(0);
    // 获取屏幕高度
    uni.getSystemInfo({
      success: (result) => {
        windowHeights.value = result.windowHeight;
      },
    })

    return {
      asset: detailItem,
      cancel,
      save,
      formData,
      form,
      rules,
      files,
      isfiles,
      select,
      deletefile,
      windowHeights,
    };
  },
};
</script>

<style lang="scss" scoped>
.content{
  background:#f2f1f6;
  padding: 5px;;
  .content_region{
    padding:5px;
    background: #fff;
    overflow: hidden;
    border-radius: 10px;
  }
}
.row {
  display: flex;
  padding-bottom: 15px;
  .col {
    flex: 1;
    display: flex;
    word-break: break-word;
    font-size: 12px;
    & > view:nth-child(1) {
      flex-basis: 100px;
      min-width: 100px;
      text-align: right;
    }
  }
}
.form {
  padding: 5px 10px;
}
</style>
