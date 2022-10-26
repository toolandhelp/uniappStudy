<template>
  <view class="menu" :style="`height:${windowHeights - 10 }px`" v-show="flag == 1">
    <!-- 轮播图 -->
    <view class="nav-swiper">
      <SwiperDot />
    </view>
    <view class="contents" :style="`height:${windowHeights - 250 }px`">
      <scroll-view :style="`height:${windowHeights - 250}px`" :scroll-y="true">
          <uni-section title="通用操作" type="line" v-if="commonMenu.length"></uni-section>
          <uni-grid
            :column="4"
            :borderColor="'#fff'"
            :highlight="true"
          >
            <template 
            v-for="({ name, icon, iconColor, iconPath, url, show,code }, index) in commonMenu"
            :index="index"
            :key="url"
            >
              <uni-grid-item v-if="show">
                    <view class="grid-item-box">
                      <template v-if="code == 'Employee/WaitingApproval'||code == 'Employee/ApprovalHistory'">
                          <uni-badge 
                          :text="code == 'Employee/WaitingApproval' ? todoCount : doneCount"
                          :type="code == 'Employee/WaitingApproval' ? 'error' : 'primary'" 
                          absolute="rightTop" 
                          size="normal">
                            <view class="uni-fab__item" @click="commonlyChange(url)">
                              <image
                                :src="iconPath"
                                class="uni-fab__item-image"
                                mode="aspectFit"
                              />
                            </view>
                          </uni-badge>
                      </template>
                      <template v-else>
                            <view class="uni-fab__item" @click="commonlyChange(url)">
                              <image
                                :src="iconPath"
                                class="uni-fab__item-image"
                                mode="aspectFit"
                              />
                            </view>
                      </template>
                      <text class="text">{{ name }}</text>
                    </view>
              </uni-grid-item>
            </template>
          </uni-grid>

          <uni-section title="资产管理" type="line" v-if="assetMenu.length && getStorage('UserType') == 1" />
          
          <uni-grid
            :column="4"
            :borderColor="'#fff'"
            :highlight="true"
          >
            <template 
            v-for="({ name, icon, iconColor, iconPath, url, show }, index) in assetMenu"
            :index="index"
            :key="url"
            >
              <uni-grid-item v-if="show">
                <view class="grid-item-box">
                  <view class="uni-fab__item" @click="assetMenuChange(url)">
                    <image
                      :src="iconPath"
                      class="uni-fab__item-image"
                      mode="aspectFit"
                    />
                  </view>
                  <text class="text">{{ name }}</text>
                </view>
              </uni-grid-item>
            </template>
          </uni-grid>

          <uni-section
            title="易耗品管理"
            type="line"
            v-if="consumableMenu.length && getStorage('UserType') == 1"
          />
          <uni-grid
            :column="4"
            :borderColor="'#fff'"
            :highlight="true"
          >
            <template 
            v-for="({ name, icon, iconColor, iconPath, url, show }, index) in consumableMenu"
            :index="index"
            :key="url"
            >
              <uni-grid-item v-if="show">
                <view class="grid-item-box">
                  <view class="uni-fab__item" @click="consumableChange(url)">
                    <image
                      :src="iconPath"
                      class="uni-fab__item-image"
                      mode="aspectFit"
                    />
                  </view>
                  <text class="text">{{ name }}</text>
                </view>
              </uni-grid-item>
            </template>
          </uni-grid>
      </scroll-view>
      
    </view>
  </view>
  <view v-show="flag == 2" :style="`height:${windowHeights - 10 }px`" class="mine">
    <view class="top">
      <view class="top_top">
        <view class="top_top_left">
          <image :src="headPhoto" class="top_top_image" mode="aspectFit" @click="logout" />
        </view>
        <view class="top_top_right">
          <view class="top_top_right_text bigtext">{{ userName }}</view>
        </view>
      </view>
    </view>
    <view class="content" :style="`height:${windowHeights - 230 }px`">
      <view class="content_top">
        <uni-list>
          <uni-list-item
          v-for="{ icon, lable, text, click } in contentDatas"
          :title="lable"
          :thumb="icon"
          :rightText="text"
          
        />
        </uni-list>
        
      </view>
      <view class="content_top">
          <uni-list>
            <uni-list-item
              v-for="{ icon, lable, subLable, click } in contentOperations"
              :title="lable"
              :thumb="icon"
              :rightText="subLable"
              @click="click({ subLable })"
              showArrow
              clickable
            />
          </uni-list>
      </view>

      <view class="signOut" v-if="!isMP" @click="logout">
        退出登录
      </view>
      
    </view>
  </view>

  <view class="tableboxpage">
    <view class="footerShells">
      <view
        v-for="(item, index) in list"
        :key="index"
        :class="{ Selection: flag == item.id }"
        @click="flag = item.id"
      >
        <uni-icons
          v-if="flag == item.id"
          :type="item.icon1"
          :color="item.color1"
          size="25"
        ></uni-icons>
        <uni-icons
          v-else
          :type="item.icon1"
          :color="item.color2"
          size="25"
        ></uni-icons>
        <view class="footText">{{ item.name }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { currentPlatform, isMP } from "../../share/util/platform";
import platformEnum from "../../service/enumeration/platformEnum";
import { navigateTo, reLaunch } from "../../share/redirect/index";
import { getStorage, setStorage, clearStorage } from "../../share/util/storage";
import {
  openConfirm,
  showErrorToast,
  showLoading,
  clearLoading,
} from "../../share/util/message";
import userController from "../../service/controller/system/userController";
import assetController from "../../service/controller/asset/assetController";
import todoController from "../../service/controller/myWork/todoController";
import doneController from "../../service/controller/myWork/doneController";
import { ref, reactive } from "vue";
import { getFileUrl } from "../../share/http/serveUrl";
import { getScanCode, getMenuByCode,getMenuCode } from "../../share/util/index";
import { setMenus } from "./menu";
import SwiperDot from "../../components/swiper-dot/swiper-dot.vue";
import { onShow, onLaunch, onLoad } from "@dcloudio/uni-app";
export default {
  components:{
    SwiperDot
  },
  setup() {
    const todoCount = ref("");
    const doneCount = ref("");
    // const commonMenu = reactive(commonMenus);
    // const assetMenu = reactive(assetMenus);
    // const consumableMenu = reactive(consumableMenus);
    const { commonMenus, assetMenus, consumableMenus } = setMenus();
    const commonMenu = commonMenus;
    const assetMenu = assetMenus;
    const consumableMenu = consumableMenus;
    // const assetMenuList = ref([]);
    // const consumableMenuList = ref([]);

    // userController.getEmployeekinds().then(({ Products }) => {
    //   for (const menu of commonMenu) {
    //     if (menu.code && menu.name == "") {
    //       const _menu = getMenuByCode(menu.code, Products);
    //       if (_menu === false) continue;
    //       menu.name = _menu.Name;
    //     }
    //   }
    // });

    {
      getMenuPermissions();
    }

   async function getMenuPermissions(){
      let permissions = getStorage("UserType") == 1?JSON.parse(getStorage("kinds")):JSON.parse(getStorage("Employeekinds"));
      for (const menu of commonMenu) {
        if (menu.code && menu.name == "") {
          const _menu = getMenuCode(menu.code, JSON.parse(getStorage("Employeekinds")));
          if (_menu === false) continue;
          menu.name = _menu.Name;
          menu.show = true;
        }
      }

      for (const menu of assetMenu) {
        if (menu.code && menu.name == "") {
          const _menu = getMenuCode(menu.code, permissions);
          if (_menu === false) continue;
          menu.name = _menu.Name;
          menu.show = true;
        }
      }
  
      for (const menu of consumableMenu) {
        if (menu.code && menu.name == "") {
          const _menu = getMenuCode(menu.code, permissions);
          if (_menu === false) continue;
          menu.name = _menu.Name;
          menu.show = true;
        }
      }
    }
  // async function getMenuPermissions(){
  //     const { Products } = await userController.getkinds();
  //     for (const menu of assetMenu) {
  //         console.log(menu)
  //         console.log(menu.code && menu.name == "")
  //         if (menu.code && menu.name == "") {
  //           console.log(menu.code)
  //           const _menu = getMenuByCode(menu.code, Products);
  //           console.log(_menu)
  //           if (_menu === false) continue;
  //           menu.name = _menu.Name;
  //           menu.show = true;
  //         }
  //       }
    
  //       for (const menu of consumableMenu) {
  //         if (menu.code && menu.name == "") {
  //           const _menu = getMenuByCode(menu.code, Products);
  //           if (_menu === false) continue;
  //           menu.name = _menu.Name;
  //           menu.show = true;
  //         }
  //       }
  //   }
    

    function commonlyChange(url) {
      navigateTo(url);
    }
    function assetMenuChange(url) {
      if (url == "subcontract/asset/assetInfo/scanCode") {
        scan();
        return;
      }
      navigateTo(url);
    }
    function consumableChange(url) {
      navigateTo(url);
    }
    const flag = ref(1);
    const list = [
      {
        id: "1",
        url: "pages/home/home",
        name: "首页",
        icon1: "home-filled",
        color1: "#ff5402",
        icon2: "home-filled",
        color2: "#666",
      },
      {
        id: "2",
        url: "subcontract/mine/index/index",
        name: "我的",
        icon1: "person-filled",
        color1: "#ff5402",
        icon2: "person-filled",
        color2: "#666",
      },
    ];

    const userName = getStorage("UserName");
    const headPhoto = "/static/images/touxiang.png";
    const contentDatas = [
      {
        lable: "工号",
        text: getStorage("UserCode"),
        icon: "/static/icon/yuangong.png",
        subLable:"",
      },
      {
        lable: "所属部门",
        text: getStorage("OrgName"),
        icon: "/static/icon/bumen.png",
        subLable:"",
      },
      {
        lable: "所属公司",
        text: getStorage("CorpName"),
        icon: "/static/icon/gongsi.png",
        subLable:"",
      },
    ];

    let contentOperations = [
      {
        icon: "/static/icon/xgmm.png",
        lable: "修改密码",
        subLable: "",
        click: () => navigateTo("subcontract/mine/changePassword/index"),
      },
      {
        icon: "/static/icon/print.png",
        lable: "蓝牙打印",
        subLable: "",
        click: () => navigateTo("subcontract/mine/printer/index"),
      },
      {
        icon: "/static/icon/wtjd.png",
        lable: "帮助",
        subLable: "",
        click: () => navigateTo("subcontract/mine/help/index"),
      },
      {
        icon: "/static/icon/bzzx.png",
        lable: "服务热线",
        subLable: "400-1878-996",
        click: ({ subLable }) => uni.makePhoneCall({ phoneNumber: subLable }),
      },
      {
        icon: "/static/icon/logo.png",
        lable: "关于",
        subLable: "",
        click: () => navigateTo("subcontract/mine/aboutSystem/index"),
      },
    ];

    //判断是否为APP，才添加蓝牙打印，否则移除
    if (currentPlatform !== platformEnum.app) {
      const tmpPrint = contentOperations.splice(1, 1);
      contentOperations = contentOperations.filter((item) => item !== tmpPrint);
    }

    function logout() {
      openConfirm("确定要退出登录吗？").then(() => {
        clearStorage();
        reLaunch("pages/login/login");
      });
    }

    // 扫码查询
    function scan() {
      uni.scanCode({
        scanType: ["barCode", "qrCode"],
        success: ({ result }) => {
          result = getScanCode(result);
          showLoading();
          assetController
            .scanQuery(result)
            .then(({ Items }) => {
              if (!Items.length) {
                showErrorToast("未查询到资产信息");
                return;
              }
              navigateTo(
                `subcontract/asset/assetInfo/assetView?id=${Items[0].ID}&handle=1`
              );
            })
            .finally(() => clearLoading());
        },
      });
    }

    {
      todoDone();
    }

    function todoDone(){
      // 待办事宜数量
      todoController.todoWaitingApprovalBillList(getStorage("EmployeeID"),1,1).then(({ TotalRecordQty }) => {
          todoCount.value = TotalRecordQty?TotalRecordQty:null
      })
      // 已办事宜数量
      doneController.Done(getStorage("EmployeeID"),1,1).then(({ TotalRecordQty }) => {
          doneCount.value = TotalRecordQty?TotalRecordQty:null
      })
    }

    onShow(() => {
      todoDone();
    });

    const windowHeights = ref(0);

    uni.getSystemInfo({
      success: (result) => {
        windowHeights.value = result.windowHeight;
      },
    });

    return {
      todoCount,
      doneCount,
      commonMenu,
      assetMenu,
      consumableMenu,
      // assetMenuList,
      // consumableMenuList,
      commonlyChange,
      assetMenuChange,
      consumableChange,
      // tabbar
      flag,
      list,
      // 我的
      // 名字
      userName,
      // 下面的内容
      contentDatas,
      // 头像
      headPhoto,
      logout,
      isMP,
      contentOperations,
      scan,
      windowHeights,
      getStorage,
    };
  },
};
</script>
<style lang="scss" scoped>
.menu{
  background: #f2f1f6;
  width: calc(100% - 10px);
  padding: 5px;
}
.nav-swiper{
  margin-bottom: 5px;
}
.contents {
  background: #fff;
  border-radius: 8px;
  padding: 10px 5px;
  overflow: hidden;
  -webkit-backface-visibility: hidden; //钉钉ios兼容
	-webkit-transform: translate3d(0, 0, 0);
}
.text {
  font-size: 12px;
  margin-top: 5px;
  color: rgb(129, 130, 135);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.uni-fab__item {
  width: 100rpx;
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.24);
}
.fab__item_edit {
  width: 1rem;
  height: 1rem;
}
.uni-fab__item-image {
  width: 100rpx;
  height: 100rpx;
}
.grid-item-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  background-color: #fff;
}
.contentsitemimage {
  width: 100%;
  height: 40px;
  margin-left: 10rpx;
  // padding: 0 10px;
}

// tabbar
.tableboxpage {
  height: 120upx;
  width: 100%;
  flex: none;
  position: fixed;
  bottom: 0;
}
.footerShells {
  border-top: 1px solid #eee;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120upx;
  background: #fff;
  display: flex;
  flex-direction: row;
  z-index: 999;
}

.footerShells > view {
  display: flex;
  /* margin-top: 8upx; */
  flex: 1;
  height: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.footerShells .Selection {
  color: #ea4f6f;
}

.footerShells .Selection span {
  color: #ea4f6f;
}

.footerShells .Selection .footText {
  color: #ff5402;
}

.footerShells span {
  font-size: 36upx;
  text-align: center;
  color: #666;
}

.footText {
  text-align: center;
  font-size: 26upx;
  color: #666;
}

// 我的
.bigtext {
  font-size: larger;
  color: rgb(93, 93, 93);
  // font-weight: 600;
}

.top {
  background-color: #fff;
  margin-bottom: 10px;
  // width: 90%;
  height: 120px;
  // border: 1px solid black;
  padding: 10px;
  border-radius: 8px;
  .top_top {
    // width: 90%;
    height: 100%;
    display: flex;
    align-items: center;
    .top_top_left {
      width: 30%;
      height: 100%;
      display: flex;
      align-items: center;
    }
    .top_top_right {
      width: 60%;
      height: 100%;
      .top_top_right_text {
        height: 100%;
        display: flex;
        align-items: center;
      }
    }
  }
  .top_top_image {
    width: 120rpx;
    height: 120rpx;
    border-radius: 100%;
  }
}
.content {
  overflow-y: auto;
  .content_top {
    margin-bottom: 20rpx;
    background-color: #fff;
    padding: 10px;
    font-size: 11px;
    border-radius: 8px;
  }
  .content_list {
    width: 100%;
    height: 80rpx;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(215, 214, 214);
    &:last-child {
      border-bottom: none;
    }
    .content_list_left {
      width: 25%;
      display: flex;
      justify-content: flex-start;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
.content_top ::v-deep .uni-list--border-top{
  display: none;
}
.content_top ::v-deep .uni-list--border-bottom{
  display: none;
}
.signOut{
  width: 100%;
  height: 50px;
  background: #fff;
  font-size: 14px;
  color: #3b4144;
  border-radius: 8px;
  text-align: center;
  line-height: 50px;
}

.mine {
  background: #f2f1f6;
  width: calc(100% - 10px);
  padding: 5px;
}
</style>
