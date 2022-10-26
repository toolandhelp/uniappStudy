<template>
  <uni-popup ref="locationDialog" type="center">
    <uni-popup-dialog
      :before-close="true"
      mode="input"
      title="编辑存放位置"
      @confirm="editLocationConfirm"
      @close="editLocationClose"
    >
    <view class="edit-asset-info">
        <uni-list class="inputDialog">
          <uni-list-item>
            <template v-slot:header>
              <view class="location">
                <text class="slot-box">存放位置：</text>
              </view>
            </template>
            <template v-slot:body>
              <view 
              class="location-body" 
              :class="location.value?'checked':'unchecked'"
              @click="locationSelect"
              >
                <text class="location-text">{{ location.value?location.text:'请选择存放位置' }}</text>
              </view>
            </template>
          </uni-list-item>
        </uni-list>
    </view>
    </uni-popup-dialog>
  </uni-popup>
  <uni-section title="基本信息" type="line">
    <view class="row">
      <view class="col">
        <view>资产编码：</view>
        <view><text selectable>{{ asset.Code }}</text></view>
      </view>
      <view class="col">
        <view>原编码：</view>
        <view><text selectable>{{ asset.OriginalCode }}</text></view>
      </view>
    </view>
    <view class="row">
      <view class="col">
        <view>设备序列号：</view>
        <view><text selectable>{{ asset.SN }}</text></view>
      </view>
      <view class="col">
        <view>资产名称：</view>
        <view>{{ asset.Name }}</view>
      </view>
    </view>
    <view class="row">
      <view class="col">
        <view>资产分类：</view>
        <view>{{ asset.CategoryName }}</view>
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
    <view class="row">
      <view class="col">
        <view>数量：</view>
        <view>{{ asset.Qty }}</view>
      </view>
      <view class="col">
        <view>计量单位：</view>
        <view>{{ asset.Unit }}</view>
      </view>
    </view>
    <view class="row">
      <view class="col">
        <view>是否盘点：</view>
        <view>{{ asset.IsRequiredStockChecking ? "是" : "否" }}</view>
      </view>
      <view class="col">
        <view>购置日期：</view>
        <view>{{ timeConvertDate(asset.DateOfPurchase) }}</view>
      </view>
    </view>
    <view class="row">
      <view class="col">
        <view>资产用途：</view>
        <view>{{ asset.AssetPurposeText }}</view>
      </view>
      <view class="col">
        <view>取得方式：</view>
        <view>{{ asset.AcquireWayText }}</view>
      </view>
    </view>
    <view class="row">
      <view class="col">
        <view>资产性质：</view>
        <view>{{ asset.AssetAttributeText }}</view>
      </view>
      <view class="col">
        <view>资产状态：</view>
        <view>{{ asset.AssetStatusText }}</view>
      </view>
    </view>
    <!-- <view class="row">
      <view class="col">
        <view>供应商：</view>
        <view>{{ asset.SupplierName }}</view>
      </view>
      <view class="col">
        <view>原值：</view>
        <view>{{ asset.OriginalAmount }}</view>
      </view>
    </view> -->
    <view class="row">
      <view class="col">
        <view>资产描述：</view>
        <view>{{ asset.AssetDesc }}</view>
      </view>
    </view>
    <view class="row">
      <view class="col">
        <view>备注：</view>
        <view>{{ asset.Remark }}</view>
      </view>
    </view>
  </uni-section>
  <uni-section title="使用信息" type="line">
    <view class="row">
      <view class="col">
        <view>所属公司：</view>
        <view>{{ asset.CorpName }}</view>
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
    </view>
    <view class="row">
      <view class="col">
        <view>详细地址：</view>
        <view>{{ asset.DetailAddress }}</view>
      </view>
    </view>
    <view class="row">
      <view class="col">
        <view>领用日期：</view>
        <view>{{ timeConvertDate(asset.DatetimeOfUse) }}</view>
      </view>
      <view class="col">
        <view>过保日期：</view>
        <view>{{ timeConvertDate(asset.ExpiredDateOfMaintenance) }}</view>
      </view>
      
    </view>
    <view class="row">
      <view class="col">
        <view>下次保养日期：</view>
        <view>{{ timeConvertDate(asset.NextMaintenanceDate) }}</view>
      </view>
      <view class="col">
        <view>使用期至：</view>
        <view>{{ timeConvertDate(asset.ExpiredDateOfUsage) }}</view>
      </view>
      
    </view>
    <view class="row">
      <view class="col">
        <view>登记日期：</view>
        <view>{{ timeConvertDate(asset.RegisterDatetime) }}</view>
      </view>
      <view class="col">
        <view>首次领用日期：</view>
        <view>{{ timeConvertDate(asset.FirstDrawDate) }}</view>
      </view>
      
    </view>
    <view class="row">
      <view class="col">
        <view>报废日期：</view>
        <view>{{ timeConvertDate(asset.RequestDiscardDate) }}</view>
      </view>
      <view class="col">
        <view>使用情况：</view>
        <view v-for="(item, index) in asset.AssetUsage">
          <span v-if="index == asset.AssetUsage.length - 1">
            {{ item.UsageText }}
          </span>
          <span v-else> {{ item.UsageText }}, </span>
        </view>
      </view>
    </view>
  </uni-section>
  <uni-section title="数据来源" type="line">
    <view class="row">
      <view class="col">
        <view>来源渠道：</view>
        <view>{{ asset.SourceChannel }}</view>
      </view>
      <view class="col">
        <view>来源单号：</view>
        <view>{{ asset.SourceCode }}</view>
      </view>
    </view>
  </uni-section>
  <!-- <uni-section title="财务信息" type="line">
    <view class="row">
      <view class="col">
        <view>发票号码：</view>
        <view>{{ asset.InvoiceNumber }}</view>
      </view>
      <view class="col">
        <view>开票日期：</view>
        <view>{{ timeConvertDate(asset.DateOfInvoice) }}</view>
      </view>
    </view>
    <view class="row">
      <view class="col">
        <view>收货日期：</view>
        <view>{{ timeConvertDate(asset.xxxx) }}</view>
      </view>
    </view>
    <view class="row">
      <view class="col">
        <view>成本中心名称：</view>
        <view>{{ asset.CostCenterName }}</view>
      </view>
      <view class="col">
        <view>成本中心编码：</view>
        <view>{{ asset.CostCenterCode }}</view>
      </view>
    </view>
    <view class="row">
      <view class="col">
        <view>SAP公司名称：</view>
        <view>{{ asset.SapCorpName }}</view>
      </view>
      <view class="col">
        <view>SAP公司编码：</view>
        <view>{{ asset.SapCorpCode }}</view>
      </view>
    </view>
  </uni-section> -->
  <uni-section title="资产图片" type="line">
    <text class="noimg" v-if="imgs.length === 0">无图片</text>
    <uni-grid :column="2">
      <uni-grid-item v-for="(img, i) in imgs">
        <image
          class="fill"
          mode="scaleToFill"
          @click="imgClick(i)"
          :src="img"
        />
      </uni-grid-item>
    </uni-grid>
  </uni-section>
  <uni-fab
    ref="fab"
    v-if="handle == 1"
    :content="content"
    horizontal="right"
    @trigger="trigger"
  />
</template>

<script>
import assetController from "../../../service/controller/asset/assetController";
import { navigateTo } from "../../../share/redirect/index";
import { ref, reactive } from "vue";
import { previewImgs } from "../../../share/util/image";
import { getFileUrl } from "../../../share/http/serveUrl";
import fastAssetBtn from "../../../service/enumeration/fastAssetBtn";
import { useStore } from "vuex";
import { timeConvertDate } from "../../../share/util/dateTime";
import {
  showLoading,
  showOkToast,
  showErrorToast,
  clearLoading,
  clearAll,
} from "../../../share/util/message";
import { only } from "../../../share/util/uniEvent";
import eventNames from "../../../service/enumeration/eventNames";
import { currentPlatform, isMP } from "../../../share/util/platform";
import platformEnum from "../../../service/enumeration/platformEnum";
import { getStorage, setStorage } from "../../../share/util/storage";
/* #ifdef APP-PLUS */
import api from "../../mine/printer/lpapi-uniplugin";
import x2js from "x2js";
let $x2js = new x2js();
/* #endif */

export default {
  inheritAttrs: false,
  props: {
    id: String,
    handle: String,
    setLocation:String,
  },
  setup({ id, handle,setLocation }) {
    const store = useStore();
    const asset = ref({});
    const imgs = ref([]);
    const fab = ref(null);
    let assetInfo = null;
    const locationDialog = ref(null);
    const location = ref({
      text:'',
      value:null
    })
    let content = reactive([
      {
        iconPath: "/static/icon/upload_picture_32.png",
        text: "图片",
        active: false,
        code: fastAssetBtn.img,
      },
      {
        iconPath: "/static/icon/repair_32.png",
        text: "报修",
        active: false,
        code: fastAssetBtn.repair,
      },
      {
        iconPath: "/static/icon/borrow_32.png",
        text: "借用",
        active: false,
        code: fastAssetBtn.borrow,
      },
    ]);
    if(setLocation){
      content.push({
          iconPath: "/static/icon/edit.png",
          text: "存放位置",
          active: false,
          code: fastAssetBtn.location,
      })
    }
    let GetWithinLimitsByType = ref({});
    //判断是否为APP，才添加打印
    if (currentPlatform === platformEnum.app) {
      content.push({
        iconPath: "/static/icon/printer_32.png",
        text: "打印",
        active: false,
        code: fastAssetBtn.printer,
      });
    }

    async function load() {
      showLoading();
      try {
        const data = await assetController.getById(id);
        const { Asset, AssetPics } = data;
        store.commit("asset/initAsset", data);
        asset.value = Asset;
        imgs.value = AssetPics.map((p) => getFileUrl(p.FileUrl));
      } finally {
        clearLoading();
      }
    }

    {
      load();
      only(eventNames.assetPictureBack, load);
      only(eventNames.repairRequestDetailBack, load);
      only(eventNames.borrowBack, load);
    }

    function imgClick(index) {
      previewImgs(imgs.value, index);
    }

    function trigger({ item: { code } }) {
      console.log(code);
      switch (code) {
        case fastAssetBtn.img:
          navigateTo(`subcontract/asset/assetInfo/assetPicture`);
          break;
        case fastAssetBtn.repair:
          navigateTo(
            `subcontract/asset/repair/request/repairRequestDetail?id=${id}`
          );
          break;
        case fastAssetBtn.borrow:
          navigateTo(
            `subcontract/asset/borrowReturn/quickBorrow/quickBorrow?id=${id}`
          );
          break;
        case fastAssetBtn.printer:
          printer();
          break;
        case fastAssetBtn.location:
          location.value.text = asset.value.LocationName;
          location.value.value = asset.value.LocationID;
          locationDialog.value.open();
          break;
        default:
          break;
      }
      fab.value.close();
    }
    // 修改存放位置
    function editLocationConfirm(){
      if(!location.value.value){
        showErrorToast('请选择存放位置');
        return
      }
      showLoading();
      assetController
        .assetChangeLocation(id,{
          id:location.value.value,
          name:location.value.text,
        })
        .then((res) => {
          locationDialog.value.close();
          load();
          location.value.text = null;
          location.value.value = null;
        })
        .finally(() => clearLoading());
    }
    function editLocationClose(){
      locationDialog.value.close();
      location.value.text = null;
      location.value.value = null;
    }
    //打印
    function printer() {
      /* #ifdef APP-PLUS */
      console.log("打印===>");
      showLoading();
      try {
        if (!getStorage("SelectLabelTemplate")) {
          console.log("请先选择标签模板[我的>蓝牙打印>标签模板]");
          showErrorToast("请先选择标签模板[我的>蓝牙打印>标签模板]");
          return;
        }
        //xml 转对象 存储
        GetWithinLimitsByType = $x2js.xml2js(
          getStorage("SelectLabelTemplate").Definexml
        );

        Promise.all([
          GetWithinLimitsByType,
          assetController
            .getAssetProperty()
            .then((rsp) => {
              console.log(
                "getAssetProperty------------Data>" + JSON.stringify(rsp)
              );
              debugger;
              let Properties = rsp.Properties.sort((n1, n2) => {
                return n1.AssetPropertyID - n2.AssetPropertyID;
              });
              Properties.unshift({ AssetPropertyCode: "url" });
              return Properties;
            })
            .catch((err) => {
              console.log("getAssetProperty==ERR>" + err);
              showErrorToast("getAssetProperty=" + err);
            }),
          assetController
            .getPrintAssets(id)
            .then((rsp) => {
              debugger;
              console.log(
                "getPrintAssets----------Data>" + JSON.stringify(rsp)
              );
              return rsp;
            })
            .catch((err) => {
              console.log("getAssetProperty==>" + err);
              showErrorToast("getPrintAssets=" + err);
            }),
          assetController
            .getLabelTemplate()
            .then((rsp) => {
              console.log(
                "getLabelTemplate-----------Data>" + JSON.stringify(rsp)
              );
              debugger;
              return rsp;
            })
            .catch((err) => {
              console.log("getAssetProperty==>" + err);
              showErrorToast("getLabelTemplate=" + err);
            }),
        ])
          .then(async (results) => {
            debugger;
            let xmlJson = results[0].KibonLabelDefine;
            console.log(
              "xml模板数据========------->" + JSON.stringify(xmlJson)
            );
            if (!xmlJson) {
              showErrorToast("请选择标签模板");
            }
            let Properties = results[1];
            let GetPrintAssets = results[2].PrintAssets[0];
            let AssetUrl = results[3].AssetUrl;
            function QRCode_Barcode(data, value) {
              debugger;
              if (data) {
                if (data[value] instanceof Array) {
                  data[value].map((item) => {
                    if (item.DataField != -1) {
                      if (item.DataField == 0) {
                        item.Content = `${AssetUrl}/#/AppAssetDetail?Code=${
                          GetPrintAssets["Code"]
                        }&TenantID=${localStorage.getItem("TenantID")}`;
                      } else {
                        item.Content =
                          GetPrintAssets[
                            Properties[item.DataField].AssetPropertyCode
                          ];
                      }
                    }
                  });
                } else {
                  let item = data[value];
                  if (item.DataField != -1) {
                    if (item.DataField == 0) {
                      item.Content = `${AssetUrl}/#/AppAssetDetail?Code=${
                        GetPrintAssets["Code"]
                      }&TenantID=${localStorage.getItem("TenantID")}`;
                    } else {
                      item.Content =
                        GetPrintAssets[
                          Properties[item.DataField].AssetPropertyCode
                        ];
                    }
                  }
                }
              }
            }
            if (xmlJson.TextList) {
              if (xmlJson.TextList.Text instanceof Array) {
                xmlJson.TextList.Text.map((item) => {
                  if (item.DataField != -1) {
                    if (item.DataField == 0) {
                      item.Content = `${AssetUrl}/#/AppAssetDetail?Code=${
                        GetPrintAssets["Code"]
                      }&TenantID=${getStorage("TenantID")}`;
                    } else {
                      item.Content =
                        GetPrintAssets[
                          Properties[item.DataField].AssetPropertyCode
                        ];
                    }
                  }
                });
              } else {
                let item = xmlJson.TextList.Text;
                if (item.DataField != -1) {
                  if (item.DataField == 0) {
                    item.Content = `${AssetUrl}/#/AppAssetDetail?Code=${
                      GetPrintAssets["Code"]
                    }&TenantID=${getStorage("TenantID")}`;
                  } else {
                    item.Content =
                      GetPrintAssets[
                        Properties[item.DataField].AssetPropertyCode
                      ];
                  }
                }
              }
            }
            QRCode_Barcode(xmlJson.QRCodeList, "QRCode");
            debugger;
            QRCode_Barcode(xmlJson.BarcodeList, "Barcode");
            QRCode_Barcode(xmlJson.Barcode2DList, "Barcode2D");
            if (await api.isPrinterOpened()) {
              const result = await printTemplate3(xmlJson);
              if (result) {
                showOkToast("打印成功");
              } else {
                showErrorToast("打印失败");
              }
            } else {
              //一般不会进！
              console.log("请先选择标签模板[我的>蓝牙打印>刷新]");
              showErrorToast("请先选择标签模板[我的>蓝牙打印>刷新]");
            }
            clearLoading();
            clearAll();
            //成功
          })
          .then((error) => {
            //失败
            console.log("打印错误=>" + error);
          });
      } finally {
        clearLoading();
      }
      /* #endif */
    }

    async function printTemplate3(data) {
      /* #ifdef APP-PLUS */
      console.log("1，打印相关数据" + JSON.stringify(data));
      let Data = data;
      // 标签纸的宽度；
      const width = Data.Label.Width;
      // 标签纸的高度；
      const height = Data.Label.Height;
      // 标签纸竖向打印，需要旋转90度；
      const orientation = 90;
      // 字体样式，0表示常规字体，1表示粗体，默认为0；
      const fontStyle = 0;
      //行间距
      const linespace = 0.5;
      // 第一步，开始打印任务，设置标签纸大小
      if (
        !(await api.startJob({
          width,
          height,
          orientation,
        }))
      ) {
        return false;
      }
      console.log("2，打印相关数据");
      // 第二部，打印相关数据
      // 2.1 打印资产信息
      if (Data.TextList) {
        let DataObj = Data.TextList.Text;
        if (DataObj instanceof Array) {
          DataObj.filter(async (item) => {
            if (item.Visible == "True") {
              await api.drawText({
                // 可以将多个字符串用'\n'拼接成一个字符串
                text: item.Content,
                x: item.Left,
                y: item.Top,
                // width: (width - qrcodeWidth - margin * 2),
                // height: (height - headerHeight - margin),
                fontHeight: item.Size,
                fontStyle: fontStyle,
                linespace: linespace,
              });
            }
          });
        } else {
          if (DataObj.Visible == "True") {
            await api.drawText({
              // 可以将多个字符串用'\n'拼接成一个字符串
              text: DataObj.Content,
              x: DataObj.Left,
              y: DataObj.Top,
              // width: (width - qrcodeWidth - margin * 2),
              // height: (height - headerHeight - margin),
              fontHeight: DataObj.Size,
              fontStyle: fontStyle,
              linespace: linespace,
            });
          }
        }
      }
      console.log("2.1，打印二维码");
      // 2.2 打印二维码
      if (Data.QRCodeList) {
        let DataObj = Data.QRCodeList.QRCode;
        if (DataObj instanceof Array) {
          DataObj.filter(async (item) => {
            if (item.Visible == "True") {
              await api.draw2DQRCode({
                text: item.Content,
                x: item.Left,
                y: item.Top,
                width: item.Height,
              });
            }
          });
        } else {
          if (DataObj.Visible == "True") {
            await api.draw2DQRCode({
              text: DataObj.Content,
              x: DataObj.Left,
              y: DataObj.Top,
              width: DataObj.Height,
            });
          }
        }
      }
      // 2.3 打印一维码
      console.log("2.3，打印一维码");
      if (Data.BarcodeList) {
        let DataObj = Data.BarcodeList.Barcode;
        if (DataObj instanceof Array) {
          DataObj.filter(async (item) => {
            if (item.Visible == "True") {
              await api.draw1DBarcode({
                text: item.Content,
                x: item.Left,
                y: item.Top,
                type: 28,
                width: item.Width,
                height: item.Height,
              });
            }
          });
        } else {
          if (DataObj.Visible == "True") {
            await api.draw1DBarcode({
              text: DataObj.Content,
              x: DataObj.Left,
              y: DataObj.Top,
              type: 28,
              width: DataObj.Width,
              height: DataObj.Height,
            });
          }
        }
      }
      console.log("2.4，打印条码");
      // 2.4 打印条码
      if (Data.Barcode2DList) {
        let DataObj = Data.Barcode2DList.Barcode2D;
        if (DataObj instanceof Array) {
          DataObj.filter(async (item) => {
            if (item.Visible == "True") {
              await api.draw1DBarcode({
                text: item.Content,
                x: item.Left,
                y: item.Top,
                width: item.Width,
                height: item.Height,
              });
            }
          });
        } else {
          if (DataObj.Visible == "True") {
            await api.draw1DBarcode({
              text: DataObj.Content,
              x: DataObj.Left,
              y: DataObj.Top,
              width: DataObj.Width,
              height: DataObj.Height,
            });
          }
        }
      }
      console.log("提交打印");
      // 提交任务，开始打印；
      return await api.commitJob();
      /* #endif */
    }

    function locationSelect(key){
      // 存放位置
        only(eventNames.locationSelectBack,({id,label})=>{
            location.value.value = id;
            location.value.text = label;
        });
      const _id = location.value.value;
      navigateTo(`pages/selector/asset/location?isLast=1&multiple=0&ids=${_id}`);
    }

    return {
      handle,
      asset,
      imgs,
      imgClick,
      content,
      trigger,
      timeConvertDate,
      GetWithinLimitsByType,
      locationDialog,
      fab,
      location,
      editLocationConfirm,
      editLocationClose,
      locationSelect,
    };
  },
};
</script>

<style lang="scss" scoped>
.checked {
  color: #333 !important;
  line-height: 22px;
}
.unchecked {
  color: #909399 !important;
  line-height: 22px;
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
.slot-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  height: 100%;
}
.location-body {
  width: 200px;
  overflow: hidden;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.location-text{
  display: flex;
  justify-content: flex-end;
}
.edit-asset-info ::v-deep .uni-list-item__container {
  justify-content: flex-end;
}
.location-body ::v-deep .uni-select__input-box {
  width: 150px;
}
</style>
