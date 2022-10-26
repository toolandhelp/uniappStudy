<template>
  <!-- 提交弹框 -->
  <uni-popup ref="submitDialog" class="submit-dialog" type="dialog">
    <uni-popup-dialog
      model="base"
      :before-close="true"
      type="info"
      cancelText="取消"
      confirmText="确认"
      content="确认借用资产?"
      @confirm="submitDialogConfirm"
      @close="submitDialogClose"
    ></uni-popup-dialog>
  </uni-popup>
  <!-- 可借用资产弹框 -->
  <uni-popup ref="assetDialog" type="dialog">
    <uni-popup-cancel-dialog title="选择资产" @close="assetDialogClose">
      <view class="retrieval" :style="`height:${windowHeights / 2}px`">
        <uni-list>
          <uni-list-item
            v-for="{
              ID,
              Code,
              AssetStatusText,
              Name,
              CategoryName,
              LocationName,
            } in assetDialogList"
            :key="ID"
            link
          >
            <template v-slot:body>
              <view class="retrieval_content">
                <view class="retrieval_item" @click="selectAsset(ID)">
                  <text class="retrieval_item_title"
                    >资产编码：{{ Code }}</text
                  >
                  <view class="retrieval_item_row">
                    <text>资产状态：{{ AssetStatusText }}</text>
                  </view>
                  <view class="retrieval_item_row">
                    <text>资产名称：{{ Name }}</text>
                  </view>
                  <view class="retrieval_item_row">
                    <text>资产分类：{{ CategoryName }}</text>
                  </view>
                  <view class="retrieval_item_row">
                    <text>存放位置：{{ LocationName }}</text>
                  </view>
                </view>
              </view>
            </template>
          </uni-list-item>
        </uni-list>
      </view>
    </uni-popup-cancel-dialog>
  </uni-popup>
  <view class="content">
    <view class="content_list" :style="`height:${windowHeights - 150}px`">
      <scroll-view :style="`height:${windowHeights - 150}px`" scroll-y>
        <uni-section title="资产信息" type="line"></uni-section>
        <view class="bill_header">
          <uni-list>
            <uni-list-item disabled>
              <template v-slot:header>
                <view class="bill_header_label">
                  <text class="item_label_color ensp">借用人员：</text>
                </view>
              </template>
              <template v-slot:body>
                <text class="item_text_content">
                  <text>{{ returnPersonnel.name }}</text>
                </text>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content_delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="bill_header_label">
                  <text class="required">*</text>
                  <text class="item_label_color">预计归还日期：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="item_text_content">
                  <picker
                    mode="date"
                    @change="returnDateChange"
                  >
                    <text class="item_text_content">
                      {{ returnDate.value ? returnDate.value : "请选择日期" }}
                    </text>
                  </picker>
                </view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content_delete_icon">
                    <view>
                      <uni-icons
                        v-if="returnDate.value"
                        @click="removeInput('returnDate')"
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
                  <text class="item_label_color">资产编码：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="item_text_content">
                  <text selectable>
                    {{ assetInfo.code?assetInfo.code:'请扫码查询' }}
                  </text>
                </view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content_delete_icon" v-if="assetInfo.code">
                    <view>
                      <uni-icons
                        @click="removeInput('code')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content_delete_icon" v-else>
                    <view>
                      <uni-icons
                        @click="retrievalAsset"
                        color="blue"
                        type="scan"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item disabled>
              <template v-slot:header>
                <view class="bill_header_label">
                  <text class="item_label_color ensp">资产名称：</text>
                </view>
              </template>
              <template v-slot:body>
                <text class="item_text_content">
                  <text selectable>{{ assetInfo.name }}</text>
                </text>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content_delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item disabled>
              <template v-slot:header>
                <view class="bill_header_label">
                  <text class="item_label_color ensp">资产分类：</text>
                </view>
              </template>
              <template v-slot:body>
                <text class="item_text_content">
                  <text>{{ assetInfo.categoryName }}</text>
                </text>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content_delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item disabled>
              <template v-slot:header>
                <view class="bill_header_label">
                  <text class="item_label_color ensp">存放位置：</text>
                </view>
              </template>
              <template v-slot:body>
                <text class="item_text_content">
                  <text>{{ assetInfo.locationName }}</text>
                </text>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content_delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item disabled>
              <template v-slot:header>
                <view class="bill_header_label">
                  <text class="item_label_color ensp">品牌：</text>
                </view>
              </template>
              <template v-slot:body>
                <text class="item_text_content">
                  <text>{{ assetInfo.brand }}</text>
                </text>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content_delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item disabled>
              <template v-slot:header>
                <view class="bill_header_label">
                  <text class="item_label_color ensp">规格：</text>
                </view>
              </template>
              <template v-slot:body>
                <text class="item_text_content">
                  <text>{{ assetInfo.spec }}</text>
                </text>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content_delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item disabled>
              <template v-slot:header>
                <view class="bill_header_label">
                  <text class="item_label_color ensp">型号：</text>
                </view>
              </template>
              <template v-slot:body>
                <text class="item_text_content">
                  <text>{{ assetInfo.model }}</text>
                </text>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content_delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
          </uni-list>
        </view>
        <uni-section title="资产图片" type="line">
          <uni-grid :column="3" :highlight="true">
            <uni-grid-item
              v-for="(item, index) in assetInfo.assetPics"
              :key="item.ID"
            >
              <image
                class="fill"
                :src="item.FileUrl"
                mode="scaleToFill"
                @click="previewImg(index)"
              />
            </uni-grid-item>
          </uni-grid>
        </uni-section>
      </scroll-view>
    </view>
    
  </view>
  <view class="colum_confirm_cancel">
    <button type="primary" @click="borrowSubmit">借用</button>
    <button @click="goBack">取消</button>
  </view>
</template>

<script>
import { ref } from "vue";
import { getStorage } from "../../../../share/util/storage";
import { navigateBack } from "../../../../share/redirect/index";
import { previewImgs } from "../../../../share/util/image";
import borrowReturnController from "../../../../service/controller/asset/borrowReturnController";
import assetController from "../../../../service/controller/asset/assetController";
import {
  showOkToast,
  showErrorToast,
  showLoading,
  clearLoading,
} from "../../../../share/util/message";
import { getFileUrl } from "../../../../share/http/serveUrl";
import { emitPromise } from "../../../../share/util/uniEvent";
import { getScanCode } from "../../../../share/util/index";
import eventNames from "../../../../service/enumeration/eventNames";
export default {
  props: {
    id: String,
  },
  setup({ id }) {
    // 借用人员
    const returnPersonnel = ref({
      name: getStorage("UserName"),
      value: getStorage("EmployeeID"),
    });
    // 归还日期
    const returnDate = ref({
      hint: "请选择归还日期",
      value: "",
    });
    // 检索字资产
    function retrievalAsset() {
      // availableAssetInfo("G2209000068");
      uni.scanCode({
        success(res) {
          var content = getScanCode(res.result);
          availableAssetInfo(content);
        },
        fail() {
          return;
        },
      });
    }
    // 资产弹框
    const assetDialog = ref(null);
    const assetDialogList = ref([]);
    // 可用资产信息
    function availableAssetInfo(keyWord) {
      if (!keyWord) {
        showErrorToast("无效数据,请重新检索");
        return;
      }
      showLoading();
      borrowReturnController
        .borrowListByCode(keyWord)
        .then(({ Items }) => {
          assetDialogList.value = Items;
          if (assetDialogList.value.length < 1) {
            showErrorToast("暂未查询到可用资产");
            return;
          }
          assetDialog.value.open();
        })
        .finally(() => clearLoading());
    }
    // 取消选择
    function assetDialogClose() {
      assetDialog.value.close();
    }
    const assetInfo = ref({
      id: null,
      code: "",
      name: "",
      categoryName: "",
      locationName: "",
      brand: "",
      spec: "",
      model: "",
      assetPics: [],
    });
    // 选择资产
    function selectAsset(id) {
      showLoading();
      assetController
        .getById(id)
        .then(({ Asset, AssetPics }) => {
          const {
            ID,
            Code,
            Name,
            CategoryName,
            LocationName,
            Brand,
            Spec,
            Model,
          } = Asset;
          assetInfo.value.id = ID;
          assetInfo.value.code = Code;
          assetInfo.value.name = Name;
          assetInfo.value.categoryName = CategoryName;
          assetInfo.value.locationName = LocationName;
          assetInfo.value.brand = Brand;
          assetInfo.value.spec = Spec;
          assetInfo.value.model = Model;
          assetInfo.value.assetPics = AssetPics;
          if (AssetPics != null && AssetPics.length > 0) {
            assetInfo.value.assetPics = assetInfo.value.assetPics.map(
              (item, index) => {
                item.FileUrl = getFileUrl(item.FileUrl);
                return item;
              }
            );
          } else {
            assetInfo.value.assetPics = [{ FileUrl: "/static/images/zw.png" }];
          }
        })
        .finally(() => clearLoading());
      assetDialogClose();
    }
    // 借用提交
    function borrowSubmit() {
      if (!returnDate.value.value) {
        showErrorToast("请选择归还日期");
        return;
      }
      if (!assetInfo.value.id) {
        showErrorToast("请检索借用资产");
        return;
      }
      submitDialog.value.open();
    }
    // 提交确认弹框
    const submitDialog = ref(null);
    function submitDialogConfirm() {
      showLoading();
      borrowReturnController
        .borrowQuickly(
          assetInfo.value.id,
          returnPersonnel.value.value,
          returnDate.value.value
        )
        .then(() => {
          showOkToast("借用成功");
          assetInfo.value = {};
          returnDate.value.value = "";
          submitDialogClose();
          clearLoading();
          emitPromise(eventNames.borrowBack).then(() => navigateBack());
        })
        .finally(() => clearLoading());
    }
    function submitDialogClose() {
      submitDialog.value.close();
    }

    // 查看资产图片
    function previewImg(index) {
      if (
        !index &&
        assetInfo.value.assetPics[index].FileUrl == "/static/images/zw.png"
      )
        return;
      previewImgs(
        assetInfo.value.assetPics.map((p) => p.FileUrl),
        index
      );
    }
    // 返回上一页
    function goBack() {
      navigateBack();
    }

    function removeInput(key){
      if(key == 'returnDate'){
        returnDate.value.value = "";
      }else{
        assetInfo.value = {
            id: null,
            code: "",
            name: "",
            categoryName: "",
            locationName: "",
            brand: "",
            spec: "",
            model: "",
            assetPics: [],
          }
      }
    }

    // 获取屏幕高度
    const windowHeights = ref("");
    uni.getSystemInfo({
      success: (result) => {
        windowHeights.value = result.windowHeight;
      },
    });
    {
      if (id) {
        showLoading();
        assetController
          .getById(id)
          .then(({ Asset, AssetPics }) => {
            const {
              ID,
              Code,
              Name,
              CategoryName,
              LocationName,
              Brand,
              Spec,
              Model,
            } = Asset;
            assetInfo.value.id = ID;
            assetInfo.value.code = Code;
            assetInfo.value.name = Name;
            assetInfo.value.categoryName = CategoryName;
            assetInfo.value.locationName = LocationName;
            assetInfo.value.brand = Brand;
            assetInfo.value.spec = Spec;
            assetInfo.value.model = Model;
            if (AssetPics != null && AssetPics.length > 0) {
              assetInfo.value.assetPics = AssetPics.map((item, index) => {
                item.FileUrl = getFileUrl(item.FileUrl);
                return item;
              });
            } else {
              assetInfo.value.assetPics = [
                { FileUrl: "/static/images/zw.png" },
              ];
            }
          })
          .finally(() => clearLoading());
      }
    }
    return {
      returnPersonnel,
      returnDate,
      retrievalAsset,
      availableAssetInfo,
      assetDialog,
      assetDialogList,
      assetDialogClose,
      windowHeights,
      selectAsset,
      assetInfo,
      borrowSubmit,
      submitDialog,
      submitDialogConfirm,
      submitDialogClose,
      goBack,
      previewImg,
      removeInput,
      returnDateChange: ({ detail: { value } }) => {
        returnDate.value.value = value;
      },
    };
  },
};
</script>

<style lang="scss" scoped>

.content{
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  padding:5px;
  background: #f2f1f6;
  >.content_list{
    border-radius: 10px;
    overflow: hidden;
    padding:10px 10px;
    background: #fff;
  }
}
</style>
