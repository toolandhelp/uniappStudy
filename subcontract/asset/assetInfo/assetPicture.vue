<template>
  <scroll-view class="top" :scroll-y="true">
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
    </uni-section>
    <uni-section title="资产图片" type="line">
      <uni-file-picker
        ref="filePicker"
        v-model="imgs"
        file-mediatype="image"
        file-extname="jpg,jpeg,png"
        mode="grid"
        @select="select"
        :auto-upload="false"
        :limit="30"
        v-if="isImg"
        @delete="deleteImg"
      />
    </uni-section>
  </scroll-view>
  <view class="below">
    <button class="button" @click="save" type="primary">保 存</button>
    <button class="button cancel" @click="cancel">取 消</button>
  </view>
</template>

<script>
import { useStore } from "vuex";
import { getFileUrl } from "../../../share/http/serveUrl";
import { navigateBack } from "../../../share/redirect/index";
import assetController from "../../../service/controller/asset/assetController";
import { reactive, ref, nextTick } from "vue";
import { showLoading, clearLoading } from "../../../share/util/message";
import { getPrevPage } from "../../../share/util/page";
import UniFilePicker from "../../../components/uni-file-picker/components/uni-file-picker/uni-file-picker.vue";
import { emitPromise } from "../../../share/util/uniEvent";
import eventNames from "../../../service/enumeration/eventNames";

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
    const filePicker = ref(null);
    const isImg = ref(true);
    const store = useStore();
    let { info, pictures } = store.state.asset;
    const id = info.ID;
    const imgs = reactive(picturesConvertUni(pictures));

    function cancel() {
      navigateBack();
    }

    function save() {
      showLoading();
      assetController
        .editPicture({
          Basic: { ID: id },
          EditType: 1,
          AssetPics: imgs,
        })
        .then((p) => {
          emitPromise(eventNames.assetPictureBack).then(() => navigateBack());
        })
        .finally(() => clearLoading());
    }

    function select({ tempFilePaths }) {
      showLoading();
      assetController
        .uploadImage(tempFilePaths)
        .then((p) => {
          isImg.value = false;
          const _imgs = picturesConvertUni(p);
          imgs.push(..._imgs);
          nextTick(() => {
            isImg.value = true;
          });
        })
        .finally(() => clearLoading());
    }

    function deleteImg({ tempFile }) {
      const i = imgs.findIndex((p) => p === tempFile);
      imgs.splice(i, 1);
      isImg.value = false;
      nextTick(() => {
        isImg.value = true;
      });
    }

    return {
      imgs,
      asset: info,
      cancel,
      save,
      select,
      filePicker,
      isImg,
      deleteImg,
    };
  },
};
</script>

<style lang="scss" scoped>
.top {
  display: block;
  height: calc(100% - 100px);
  min-height: calc(100% - 100px);
}
.below {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
  background-color: #eee;
  .button {
    width: 100%;
    height: 49px;
  }
  .cancel {
    background-color: #eee;
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
.noimg {
  padding-left: 35px;
}
</style>
