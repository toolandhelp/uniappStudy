"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../common/vendor.js");
var components_uniFilePicker_components_uniFilePicker_chooseAndUploadFile = require("./uni-file-picker/components/uni-file-picker/choose-and-upload-file.js");
var components_uniFilePicker_components_uniFilePicker_utils = require("./uni-file-picker/components/uni-file-picker/utils.js");
const _sfc_main$3 = {
  inheritAttrs: false,
  name: "UniSection",
  emits: ["click"],
  props: {
    type: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#333"
    },
    subTitle: {
      type: String,
      default: ""
    },
    padding: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  watch: {
    title(newVal) {
      if (common_vendor.index.report && newVal !== "") {
        common_vendor.index.report("title", newVal);
      }
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.type
  }, $props.type ? {
    b: common_vendor.n($props.type)
  } : {}, {
    c: common_vendor.t($props.title),
    d: !$props.subTitle ? 1 : "",
    e: $props.color,
    f: $props.subTitle
  }, $props.subTitle ? {
    g: common_vendor.t($props.subTitle)
  } : {}, {
    h: $props.padding ? "10px" : ""
  });
}
var Component$3 = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-5584ec96"], ["__file", "D:/gitPro/C8_UI/platformApp/components/uni-section/uni-section.vue"]]);
const closeEmit = "close";
const _sfc_main$2 = {
  props: {
    title: String
  },
  emits: [closeEmit],
  setup(props, context) {
    function close(e) {
      context.emit(closeEmit, e);
    }
    return { close };
  }
};
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  _easycom_uni_popup_dialog2();
}
const _easycom_uni_popup_dialog = () => "../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
if (!Math) {
  _easycom_uni_popup_dialog();
}
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($setup.close),
    b: common_vendor.p({
      type: "info",
      ["before-close"]: true,
      cancelText: "\u53D6\u6D88",
      confirmText: "",
      title: $props.title
    })
  };
}
var Component$2 = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "D:/gitPro/C8_UI/platformApp/components/uni-popup-cancel-dialog/uni-popup-cancel-dialog.vue"]]);
const _sfc_main$1 = {
  name: "u-icon",
  props: {
    name: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: ""
    },
    size: {
      type: [Number, String],
      default: "inherit"
    },
    bold: {
      type: Boolean,
      default: false
    },
    index: {
      type: [Number, String],
      default: ""
    },
    hoverClass: {
      type: String,
      default: ""
    },
    customPrefix: {
      type: String,
      default: "uicon"
    },
    label: {
      type: [String, Number],
      default: ""
    },
    labelPos: {
      type: String,
      default: "right"
    },
    labelSize: {
      type: [String, Number],
      default: "28"
    },
    labelColor: {
      type: String,
      default: "#606266"
    },
    marginLeft: {
      type: [String, Number],
      default: "6"
    },
    marginTop: {
      type: [String, Number],
      default: "6"
    },
    marginRight: {
      type: [String, Number],
      default: "6"
    },
    marginBottom: {
      type: [String, Number],
      default: "6"
    },
    imgMode: {
      type: String,
      default: "widthFix"
    },
    customStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    width: {
      type: [String, Number],
      default: ""
    },
    height: {
      type: [String, Number],
      default: ""
    },
    top: {
      type: [String, Number],
      default: 0
    },
    showDecimalIcon: {
      type: Boolean,
      default: false
    },
    inactiveColor: {
      type: String,
      default: "#ececec"
    },
    percent: {
      type: [Number, String],
      default: "50"
    }
  },
  computed: {
    customClass() {
      let classes = [];
      classes.push(this.customPrefix + "-" + this.name);
      if (this.customPrefix == "uicon") {
        classes.push("u-iconfont");
      } else {
        classes.push(this.customPrefix);
      }
      if (this.showDecimalIcon && this.inactiveColor) {
        classes.push("u-icon__icon--" + this.inactiveColor);
      }
      classes = classes.join(" ");
      return classes;
    },
    iconStyle() {
      let style = {};
      style = {
        fontSize: this.size == "inherit" ? "inherit" : this.size,
        fontWeight: this.bold ? "bold" : "normal",
        top: this.top
      };
      if (this.showDecimalIcon && this.inactiveColor) {
        style.color = this.inactiveColor;
      } else if (this.color)
        style.color = this.color;
      return style;
    },
    isImg() {
      return this.name.indexOf("/") !== -1;
    },
    imgStyle() {
      let style = {};
      style.width = this.width ? this.width : this.size;
      style.height = this.height ? this.height : this.size;
      return style;
    },
    decimalIconStyle() {
      let style = {};
      style = {
        fontSize: this.size == "inherit" ? "inherit" : this.size,
        fontWeight: this.bold ? "bold" : "normal",
        top: this.top,
        width: this.percent + "%"
      };
      if (this.color)
        style.color = this.color;
      return style;
    },
    decimalIconClass() {
      let classes = [];
      classes.push(this.customPrefix + "-" + this.name);
      if (this.customPrefix == "uicon") {
        classes.push("u-iconfont");
      } else {
        classes.push(this.customPrefix);
      }
      if (this.color)
        classes.push("u-icon__icon--" + this.color);
      else
        classes.push("u-icon__icon--primary");
      classes = classes.join(" ");
      return classes;
    }
  },
  methods: {
    click() {
      this.$emit("click", this.index);
    },
    touchstart() {
      this.$emit("touchstart", this.index);
    }
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.isImg
  }, $options.isImg ? {
    b: $props.name,
    c: $props.imgMode,
    d: common_vendor.s($options.imgStyle)
  } : common_vendor.e({
    e: $props.showDecimalIcon
  }, $props.showDecimalIcon ? {
    f: common_vendor.s($options.decimalIconStyle),
    g: common_vendor.n($options.decimalIconClass),
    h: $props.hoverClass
  } : {}, {
    i: common_vendor.n($options.customClass),
    j: common_vendor.s($options.iconStyle),
    k: $props.hoverClass,
    l: common_vendor.o((...args) => $options.touchstart && $options.touchstart(...args))
  }), {
    m: $props.label !== ""
  }, $props.label !== "" ? {
    n: common_vendor.t($props.label),
    o: $props.labelColor,
    p: $props.labelSize,
    q: $props.labelPos == "right" ? $props.marginLeft : 0,
    r: $props.labelPos == "bottom" ? $props.marginTop : 0,
    s: $props.labelPos == "left" ? $props.marginRight : 0,
    t: $props.labelPos == "top" ? $props.marginBottom : 0
  } : {}, {
    v: common_vendor.s($props.customStyle),
    w: common_vendor.o((...args) => $options.click && $options.click(...args)),
    x: common_vendor.n("u-icon--" + $props.labelPos)
  });
}
var Component$1 = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-76fb4324"], ["__file", "D:/gitPro/C8_UI/platformApp/components/u-icon/u-icon.vue"]]);
const uploadImage = () => "./uni-file-picker/components/uni-file-picker/upload-image.js";
const uploadFile = () => "./uni-file-picker/components/uni-file-picker/upload-file.js";
const _sfc_main = {
  components: {
    uploadImage,
    uploadFile
  },
  emits: [
    "select",
    "success",
    "fail",
    "progress",
    "delete",
    "update:modelValue",
    "input"
  ],
  props: {
    modelValue: {
      type: [Array, Object],
      default() {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disablePreview: {
      type: Boolean,
      default: false
    },
    delIcon: {
      type: Boolean,
      default: true
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    limit: {
      type: [Number, String],
      default: 9
    },
    mode: {
      type: String,
      default: "grid"
    },
    fileMediatype: {
      type: String,
      default: "image"
    },
    fileExtname: {
      type: [Array, String],
      default() {
        return [];
      }
    },
    title: {
      type: String,
      default: ""
    },
    listStyles: {
      type: Object,
      default() {
        return {
          border: true,
          dividline: true,
          borderStyle: {}
        };
      }
    },
    imageStyles: {
      type: Object,
      default() {
        return {
          width: "auto",
          height: "auto"
        };
      }
    },
    readonly: {
      type: Boolean,
      default: false
    },
    returnType: {
      type: String,
      default: "array"
    },
    sizeType: {
      type: Array,
      default() {
        return ["original", "compressed"];
      }
    }
  },
  data() {
    return {
      files: [],
      localValue: []
    };
  },
  watch: {
    modelValue: {
      handler(newVal, oldVal) {
        this.setValue(newVal, oldVal);
      },
      immediate: true
    }
  },
  computed: {
    filesList() {
      let files = [];
      this.files.forEach((v) => {
        files.push(v);
      });
      return files;
    },
    showType() {
      if (this.fileMediatype === "image") {
        return this.mode;
      }
      return "list";
    },
    limitLength() {
      if (this.returnType === "object") {
        return 1;
      }
      if (!this.limit) {
        return 1;
      }
      return this.limit;
    }
  },
  created() {
    if (!(common_vendor.rn.config && common_vendor.rn.config.provider)) {
      this.noSpace = true;
      common_vendor.rn.chooseAndUploadFile = components_uniFilePicker_components_uniFilePicker_chooseAndUploadFile.chooseAndUploadFile;
    }
    this.form = this.getForm("uniForms");
    this.formItem = this.getForm("uniFormsItem");
    if (this.form && this.formItem) {
      if (this.formItem.name) {
        this.rename = this.formItem.name;
        this.form.inputChildrens.push(this);
      }
    }
  },
  methods: {
    clearFiles(index) {
      if (index !== 0 && !index) {
        this.files = [];
        this.$nextTick(() => {
          this.setEmit();
        });
      } else {
        this.files.splice(index, 1);
      }
      this.$nextTick(() => {
        this.setEmit();
      });
    },
    upload() {
      let files = [];
      this.files.forEach((v, index) => {
        if (v.status === "ready" || v.status === "error") {
          files.push(Object.assign({}, v));
        }
      });
      this.uploadFiles(files);
    },
    async setValue(newVal, oldVal) {
      const newData = async (v) => {
        const reg = /cloud:\/\/([\w.]+\/?)\S*/;
        let url = "";
        if (v.fileID) {
          url = v.fileID;
        } else {
          url = v.url;
        }
        if (reg.test(url)) {
          v.fileID = url;
          v.url = await this.getTempFileURL(url);
        }
        if (v.url)
          v.path = v.url;
        return v;
      };
      if (this.returnType === "object") {
        if (newVal) {
          await newData(newVal);
        } else {
          newVal = {};
        }
      } else {
        if (!newVal)
          newVal = [];
        for (let i = 0; i < newVal.length; i++) {
          let v = newVal[i];
          await newData(v);
        }
      }
      this.localValue = newVal;
      if (this.form && this.formItem && !this.is_reset) {
        this.is_reset = false;
        this.formItem.setValue(this.localValue);
      }
      let filesData = Object.keys(newVal).length > 0 ? newVal : [];
      this.files = [].concat(filesData);
    },
    choose() {
      if (this.disabled)
        return;
      if (this.files.length >= Number(this.limitLength) && this.showType !== "grid" && this.returnType === "array") {
        common_vendor.index.showToast({
          title: `\u60A8\u6700\u591A\u9009\u62E9 ${this.limitLength} \u4E2A\u6587\u4EF6`,
          icon: "none"
        });
        return;
      }
      this.chooseFiles();
    },
    chooseFiles() {
      const _extname = components_uniFilePicker_components_uniFilePicker_utils.get_extname(this.fileExtname);
      if (this.fileMediatype === "image") {
        common_vendor.index.chooseImage({
          count: this.limit,
          extension: _extname,
          success: (res) => {
            this.chooseFileCallback(res).catch((e) => console.error(e));
          },
          fail: (err) => {
            console.log("\u9009\u62E9\u5931\u8D25", err);
          },
          complete: () => {
          }
        });
        return;
      }
      if (this.fileMediatype === "video") {
        common_vendor.index.chooseVideo({
          count: this.limit,
          extension: _extname,
          success: (res) => {
            this.chooseFileCallback(res).catch((e) => console.error(e));
          },
          fail: (err) => {
            console.log("\u9009\u62E9\u5931\u8D25", err);
          },
          complete: () => {
          }
        });
        return;
      }
      common_vendor.index.showToast({ title: "\u5F53\u524D\u5E73\u53F0\u4EC5\u652F\u6301\u4E0A\u4F20\u56FE\u7247", icon: "none" });
      common_vendor.index.chooseImage({
        count: this.limit,
        extension: _extname,
        success: (res) => {
          this.chooseFileCallback(res).catch((e) => console.error(e));
        },
        fail: (err) => {
          console.log("\u9009\u62E9\u5931\u8D25", err);
        },
        complete: () => {
        }
      });
    },
    async chooseFileCallback(res) {
      const _extname = components_uniFilePicker_components_uniFilePicker_utils.get_extname(this.fileExtname);
      const is_one = Number(this.limitLength) === 1 && this.disablePreview && !this.disabled || this.returnType === "object";
      if (is_one) {
        this.files = [];
      }
      let { filePaths, files } = components_uniFilePicker_components_uniFilePicker_utils.get_files_and_is_max(res, _extname);
      if (!(_extname && _extname.length > 0)) {
        filePaths = res.tempFilePaths;
        files = res.tempFiles;
      }
      let currentData = [];
      for (let i = 0; i < files.length; i++) {
        if (this.limitLength - this.files.length <= 0)
          break;
        files[i].uuid = Date.now();
        let filedata = await components_uniFilePicker_components_uniFilePicker_utils.get_file_data(files[i], this.fileMediatype);
        filedata.progress = 0;
        filedata.status = "ready";
        this.files.push(filedata);
        currentData.push(__spreadProps(__spreadValues({}, filedata), {
          file: files[i]
        }));
      }
      this.$emit("select", {
        tempFiles: currentData,
        tempFilePaths: filePaths
      });
      res.tempFiles = files;
      if (!this.autoUpload || this.noSpace) {
        res.tempFiles = [];
      }
    },
    uploadFiles(files) {
      files = [].concat(files);
      components_uniFilePicker_components_uniFilePicker_chooseAndUploadFile.uploadCloudFiles.call(this, files, 5, (res) => {
        this.setProgress(res, res.index, true);
      }).then((result) => {
        this.setSuccessAndError(result);
      }).catch((err) => {
        console.log(err);
      });
    },
    async setSuccessAndError(res, fn) {
      let successData = [];
      let errorData = [];
      let tempFilePath = [];
      let errorTempFilePath = [];
      for (let i = 0; i < res.length; i++) {
        const item = res[i];
        const index = item.uuid ? this.files.findIndex((p) => p.uuid === item.uuid) : item.index;
        if (index === -1 || !this.files)
          break;
        if (item.errMsg === "request:fail") {
          this.files[index].url = item.path;
          this.files[index].status = "error";
          this.files[index].errMsg = item.errMsg;
          errorData.push(this.files[index]);
          errorTempFilePath.push(this.files[index].url);
        } else {
          this.files[index].errMsg = "";
          this.files[index].fileID = item.url;
          const reg = /cloud:\/\/([\w.]+\/?)\S*/;
          if (reg.test(item.url)) {
            this.files[index].url = await this.getTempFileURL(item.url);
          } else {
            this.files[index].url = item.url;
          }
          this.files[index].status = "success";
          this.files[index].progress += 1;
          successData.push(this.files[index]);
          tempFilePath.push(this.files[index].fileID);
        }
      }
      if (successData.length > 0) {
        this.setEmit();
        this.$emit("success", {
          tempFiles: this.backObject(successData),
          tempFilePaths: tempFilePath
        });
      }
      if (errorData.length > 0) {
        this.$emit("fail", {
          tempFiles: this.backObject(errorData),
          tempFilePaths: errorTempFilePath
        });
      }
    },
    setProgress(progressEvent, index, type) {
      this.files.length;
      const percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
      let idx = index;
      if (!type) {
        idx = this.files.findIndex((p) => p.uuid === progressEvent.tempFile.uuid);
      }
      if (idx === -1 || !this.files[idx])
        return;
      this.files[idx].progress = percentCompleted - 1;
      this.$emit("progress", {
        index: idx,
        progress: parseInt(percentCompleted),
        tempFile: this.files[idx]
      });
    },
    delFile(index) {
      this.$emit("delete", {
        tempFile: this.files[index],
        tempFilePath: this.files[index].url
      });
      this.files.splice(index, 1);
      this.$nextTick(() => {
        this.setEmit();
      });
    },
    getFileExt(name) {
      const last_len = name.lastIndexOf(".");
      const len = name.length;
      return {
        name: name.substring(0, last_len),
        ext: name.substring(last_len + 1, len)
      };
    },
    setEmit() {
      let data = [];
      if (this.returnType === "object") {
        data = this.backObject(this.files)[0];
        this.localValue = data ? data : null;
      } else {
        data = this.backObject(this.files);
        if (!this.localValue) {
          this.localValue = [];
        }
        this.localValue = [...data];
      }
      this.$emit("update:modelValue", this.localValue);
    },
    backObject(files) {
      let newFilesData = [];
      files.forEach((v) => {
        newFilesData.push({
          extname: v.extname,
          fileType: v.fileType,
          image: v.image,
          name: v.name,
          path: v.path,
          size: v.size,
          fileID: v.fileID,
          url: v.url
        });
      });
      return newFilesData;
    },
    async getTempFileURL(fileList) {
      fileList = {
        fileList: [].concat(fileList)
      };
      const urls = await common_vendor.rn.getTempFileURL(fileList);
      return urls.fileList[0].tempFileURL || "";
    },
    getForm(name = "uniForms") {
      let parent = this.$parent;
      let parentName = parent.$options.name;
      while (parentName !== name) {
        parent = parent.$parent;
        if (!parent)
          return false;
        parentName = parent.$options.name;
      }
      return parent;
    }
  }
};
if (!Array) {
  const _component_upload_image = common_vendor.resolveComponent("upload-image");
  const _component_upload_file = common_vendor.resolveComponent("upload-file");
  (_component_upload_image + _component_upload_file)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.title
  }, $props.title ? {
    b: common_vendor.t($props.title),
    c: common_vendor.t($options.filesList.length),
    d: common_vendor.t($options.limitLength)
  } : {}, {
    e: $props.fileMediatype === "image" && $options.showType === "grid"
  }, $props.fileMediatype === "image" && $options.showType === "grid" ? {
    f: common_vendor.o($options.uploadFiles),
    g: common_vendor.o($options.choose),
    h: common_vendor.o($options.delFile),
    i: common_vendor.p({
      readonly: $props.readonly,
      ["image-styles"]: $props.imageStyles,
      ["files-list"]: $options.filesList,
      limit: $options.limitLength,
      disablePreview: $props.disablePreview,
      delIcon: $props.delIcon
    })
  } : {}, {
    j: $props.fileMediatype !== "image" || $options.showType !== "grid"
  }, $props.fileMediatype !== "image" || $options.showType !== "grid" ? {
    k: common_vendor.o($options.uploadFiles),
    l: common_vendor.o($options.choose),
    m: common_vendor.o($options.delFile),
    n: common_vendor.p({
      readonly: $props.readonly,
      ["list-styles"]: $props.listStyles,
      ["files-list"]: $options.filesList,
      showType: $options.showType,
      delIcon: $props.delIcon
    })
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/components/uni-file-picker/components/uni-file-picker/uni-file-picker.vue"]]);
var components = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  UniSection: Component$3,
  UniPopupCancelDialog: Component$2,
  uIcon: Component$1,
  UniFilePicker: Component
});
exports.Component = Component$1;
exports.Component$1 = Component$3;
exports.Component$2 = Component;
exports.Component$3 = Component$2;
exports.components = components;
