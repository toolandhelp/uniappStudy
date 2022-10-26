import { navigateTo } from "../../share/redirect/index";
import { getFileUrl } from "../../share/http/serveUrl";
import { previewImg } from "../../share/util/image";

const uniSwipeActionItemRightOptions = [
    { text: "取消", style: { backgroundColor: "#007aff" } },
    { text: "删除", style: { backgroundColor: "#F56C6C" } },
  ];

// 新增按钮颜色配置
const fabPattern = {
    color: "#7A7E83",
    backgroundColor: "#fff",
    selectedColor: "#007AFF",
    buttonColor: "#007AFF",
    iconColor: "#fff",
  };

// 新增按钮选项
const fabContent = [
    {
      iconPath: "/static/icon/sys.png",
      selectedIconPath: "/static/icon/sys.png",
      text: "扫码",
      active: false,
    },
    {
      iconPath: "/static/icon/edit.png",
      selectedIconPath: "/static/icon/edit.png",
      text: "检索",
      active: false,
    },
    {
      iconPath: "/static/icon/asset_mingxi.png",
      selectedIconPath: "/static/icon/asset_mingxi.png",
      text: "明细",
      active: false,
    },
    {
      iconPath: "/static/icon/asset_fujian.png",
      selectedIconPath: "/static/icon/asset_fujian.png",
      text: "附件",
      active: false,
    },
  ];

  function billStatusColor(v){
    let colorText = {
        "border-color":"rgba(0,0,0,.0)",
        "color":"rgba(0,0,0,.0)"
      }
    switch(v){
        // 草稿
      case 1:
        colorText['border-color'] = "#444";
        colorText.color = "#444";
        break;
        // 已提交
      case 2:
        colorText['border-color'] = "#ffc067";
        colorText.color = "#ffc067";
        break;
        // 待审批
      case 3:
        colorText['border-color'] = "#f06a70";
        colorText.color = "#f06a70";
        break;
        // 审批中
      case 4:
        colorText['border-color'] = "#ff5404";
        colorText.color = "#ff5404";
        break;
        // 审批不通过
      case 5:
        colorText['border-color'] = "red";
        colorText.color = "red";
        break;
        // 待确认
      case 7:
        colorText['border-color'] = "#00cffe";
        colorText.color = "#00cffe";
        break;
        // 已生效
      case 8:
        colorText['border-color'] = "#83ca1d";
        colorText.color = "#83ca1d";
        break;
    }
    return colorText;
  }



  function assetStatusColor(v){
    let colorText = {
        "border-color":"rgba(0,0,0,.0)",
        "color":"rgba(0,0,0,.0)"
      }
    switch(v){
        // 闲置
      case 1:
        colorText['border-color'] = "#c2c7ca";
        colorText.color = "#c2c7ca";
        break;
        // 在用
      case 2:
        colorText['border-color'] = "#00bc4b";
        colorText.color = "#00bc4b";
        break;
        // 报废
      case 3:
        colorText['border-color'] = "#feae4b";
        colorText.color = "#feae4b";
        break;
        // 处置
      case 4:
        colorText['border-color'] = "#ff5306";
        colorText.color = "#ff5306";
        break;
    }
    return colorText;
  }


  /**
   * 查看附件
   * @param {url}
   */
  function viewAttachmentContent({url}) {
    const format = url.slice(url.lastIndexOf('.') + 1);
    if(format == 'jpg' || format == 'png' || format == 'jpeg'){
    previewImg(getFileUrl(url));
    return
    }
    if(format == 'pdf'){
    navigateTo(`/subcontract/mine/help/onlinePDF?filePath=${url}`);
    }
  }

export {uniSwipeActionItemRightOptions,fabPattern,fabContent,billStatusColor,assetStatusColor,viewAttachmentContent};