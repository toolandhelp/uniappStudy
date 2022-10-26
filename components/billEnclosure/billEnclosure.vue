<template>
    <uni-section title="附件" type="line">
      <view class="bill_detail_content">
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
            @change="viewAttachmentContent"
            :title="nonEditable?'':'最多选择9个附件'"
          >
          <view class="unload_attachment_button">
            <button type="primary" v-if="!nonEditable">上传附件</button>
          </view>
          </uni-file-picker>
          <view class="nothing" :style="`height:calc(100% - ${nonEditable ? 0 : 86 }px)`" v-if="files.length < 1">
            暂 无 数 据
          </view>
      </view>
    </uni-section>
</template>
<script>
import { reactive, ref, computed,nextTick, watch } from "vue";
import assetController from "../../service/controller/asset/assetController";
import { getFileUrl } from "../../share/http/serveUrl";
import { viewAttachmentContent } from "../../share/util/billBasicConfig";
import { showLoading,clearLoading } from "../../share/util/message";
import fileExtType from "../../service/enumeration/fileExtType";
import UniFilePicker from "../../components/uni-file-picker/components/uni-file-picker/uni-file-picker.vue";

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
    props:{
        nonEditable:{
            type:Boolean,
            default:false
        },
        option:{
            type:Array,
            default:()=>{
                return []
            }
        }
    },
    emits:['change',],
    setup(props,ctx) {
        const files = ref([]);

        const isfiles = ref(true);

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

        watch(files.value,(newVal)=>{
            ctx.emit("change",newVal)
        })

        watch(()=>props.option,(newVal)=>{
            files.value = props.option;
        })

        return {
            files,
            isfiles,
            select,
            deletefile,
            fileExtType,
            viewAttachmentContent 
        }
    },
}
</script>
