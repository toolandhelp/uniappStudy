<template>
    <DrawerAdvancedSearch
    ref="conditionSearchPopup"
    mode="right"
    :mask-click="true"
    :width="windowWidths"
  >
  <!-- 输入类型弹框 -->
  <uni-popup ref="advancedInputDialog" type="dialog">
    <uni-popup-keyword
      ref="inputClose"
      mode="input"
      title="录入检索信息"
      :value="advancedInputVal"
      placeholder="请输入检索信息"
      @confirm="advancedInputConfirm"
    ></uni-popup-keyword>
  </uni-popup>
    <view class="advanced-search">
      <uni-section title="高级搜索" type="line"></uni-section>
      <scroll-view :style="`height:${(windowHeights - bottomHeight)}px`" :scroll-y="true">
        <view class="advanced-condition_content">
          <uni-list>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">资产名称：</text>
                </view>
              </template>
              <template v-slot:body>
                <text
                  class="condition_item_text"
                  :class="
                    advancedSearch.name.value ? 'content_effective' : ''
                  "
                  @click="openAdvancedInputDialog('name')"
                  >{{
                    advancedSearch.name.value
                      ? advancedSearch.name.value
                      : "请输入资产名称"
                  }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.name.value"
                        @click="removeAdvancedInput('name')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">资产编码：</text>
                </view>
              </template>
              <template v-slot:body>
                <text
                  class="condition_item_text"
                  :class="
                    advancedSearch.code.value ? 'content_effective' : ''
                  "
                  @click="openAdvancedInputDialog('code')"
                  >{{
                    advancedSearch.code.value
                      ? advancedSearch.code.value
                      : "请扫描/输入资产编码"
                  }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.code.value"
                        @click="removeAdvancedInput('code')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        @click="scanInput('code')"
                        type="scan"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">原编码：</text>
                </view>
              </template>
              <template v-slot:body>
                <text
                  class="condition_item_text"
                  :class="
                    advancedSearch.originalCode.value ? 'content_effective' : ''
                  "
                  @click="openAdvancedInputDialog('originalCode')"
                  >{{
                    advancedSearch.originalCode.value
                      ? advancedSearch.originalCode.value
                      : "请扫描/输入原编码"
                  }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.originalCode.value"
                        @click="removeAdvancedInput('originalCode')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        @click="scanInput('originalCode')"
                        type="scan"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">序列号：</text>
                </view>
              </template>
              <template v-slot:body>
                <text
                  class="condition_item_text"
                  :class="
                    advancedSearch.sn.value ? 'content_effective' : ''
                  "
                  @click="openAdvancedInputDialog('sn')"
                  >{{
                    advancedSearch.sn.value
                      ? advancedSearch.sn.value
                      : "请扫描/输入序列号"
                  }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.sn.value"
                        @click="removeAdvancedInput('sn')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        @click="scanInput('sn')"
                        type="scan"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">品牌：</text>
                </view>
              </template>
              <template v-slot:body>
                <text
                  class="condition_item_text"
                  :class="
                    advancedSearch.brand.value ? 'content_effective' : ''
                  "
                  @click="openAdvancedInputDialog('brand')"
                  >{{
                    advancedSearch.brand.value
                      ? advancedSearch.brand.value
                      : "请输入品牌"
                  }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.brand.value"
                        @click="removeAdvancedInput('brand')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">规格：</text>
                </view>
              </template>
              <template v-slot:body>
                <text
                  class="condition_item_text"
                  :class="
                    advancedSearch.spec.value ? 'content_effective' : ''
                  "
                  @click="openAdvancedInputDialog('spec')"
                  >{{
                    advancedSearch.spec.value
                      ? advancedSearch.spec.value
                      : "请输入规格"
                  }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.spec.value"
                        @click="removeAdvancedInput('spec')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">型号：</text>
                </view>
              </template>
              <template v-slot:body>
                <text
                  class="condition_item_text"
                  :class="
                    advancedSearch.model.value ? 'content_effective' : ''
                  "
                  @click="openAdvancedInputDialog('model')"
                  >{{
                    advancedSearch.model.value
                      ? advancedSearch.model.value
                      : "请输入型号"
                  }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.model.value"
                        @click="removeAdvancedInput('model')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">资产分类：</text>
                </view>
              </template>
              <template v-slot:body>
                <scroll-view style="width: calc(100% - 130px)" scroll-x>
                  <view
                    class="selector-content_text"
                    :class="
                      advancedSearch.category.value.length > 0
                        ? 'content_effective'
                        : ''
                    "
                    @click.stop="categorySelect('category')"
                  >
                    {{
                      advancedSearch.category.value.length > 0
                        ? advancedSearch.category.name
                        : "请输入资产分类"
                    }}
                  </view>
                </scroll-view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.category.value.length > 0"
                        @click="removeAdvancedInput('category')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">资产性质：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="condition_item_text">
                  <multiple-popup-select
                    :options="advancedSearch.assetAttribute.options"
                    @change="(val)=>inputChange(val,'assetAttribute')"
                    :value="advancedSearch.assetAttribute.value"
                  >
                    <text
                      class="condition_item_text"
                      :class="
                        advancedSearch.assetAttribute.value.length ? 'content_effective' : ''
                      "
                      >{{
                        advancedSearch.assetAttribute.value.length 
                          ? advancedSearch.assetAttribute.name
                          : "请输入资产性质"
                      }}</text
                    >
                  </multiple-popup-select>
                </view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.assetAttribute.value.length"
                        @click="removeAdvancedInput('assetAttribute')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">供应商：</text>
                </view>
              </template>
              <template v-slot:body>
                <scroll-view style="width: calc(100% - 116px)" scroll-x>
                  <view
                    class="selector-content_text"
                    :class="
                      advancedSearch.supplier.value.length > 0
                        ? 'content_effective'
                        : ''
                    "
                    @click.stop="supplierSelect('supplier')"
                  >
                    {{
                      advancedSearch.supplier.value.length > 0
                        ? advancedSearch.supplier.name
                        : "请输入供应商"
                    }}
                  </view>
                </scroll-view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.supplier.value.length > 0"
                        @click="removeAdvancedInput('supplier')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">取得方式：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="condition_item_text">
                  <multiple-popup-select
                    :options="advancedSearch.acquireWay.options"
                    @change="(val)=>inputChange(val,'acquireWay')"
                    :value="advancedSearch.acquireWay.value"
                  >
                    <text
                      class="condition_item_text"
                      :class="
                        advancedSearch.acquireWay.value.length ? 'content_effective' : ''
                      "
                      >{{
                        advancedSearch.acquireWay.value.length
                          ? advancedSearch.acquireWay.name
                          : "请输入取得方式"
                      }}</text
                    >
                  </multiple-popup-select>
                </view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.acquireWay.value.length"
                        @click="removeAdvancedInput('acquireWay')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">购置日期(开始)：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="condition_item_text">
                  <picker
                    mode="date"
                    @change="
                      (data) => dateTimeChange(data, 'dateOfPurchaseStart')
                    "
                  >
                    <text
                      class="condition_item_text"
                      :class="
                        advancedSearch.dateOfPurchaseStart.value
                          ? 'content_effective'
                          : ''
                      "
                    >
                      {{
                        advancedSearch.dateOfPurchaseStart.value
                          ? advancedSearch.dateOfPurchaseStart.value
                          : "请输入购置日期(开始)"
                      }}
                    </text>
                  </picker>
                </view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.dateOfPurchaseStart.value"
                        @click="removeAdvancedInput('dateOfPurchaseStart')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">购置日期(结束)：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="condition_item_text">
                  <picker
                    mode="date"
                    @change="
                      (data) => dateTimeChange(data, 'dateOfPurchaseEnd')
                    "
                  >
                    <text
                      class="condition_item_text"
                      :class="
                        advancedSearch.dateOfPurchaseEnd.value
                          ? 'content_effective'
                          : ''
                      "
                    >
                      {{
                        advancedSearch.dateOfPurchaseEnd.value
                          ? advancedSearch.dateOfPurchaseEnd.value
                          : "请输入购置日期(结束)"
                      }}
                    </text>
                  </picker>
                </view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.dateOfPurchaseEnd.value"
                        @click="removeAdvancedInput('dateOfPurchaseEnd')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">登记日期(开始)：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="condition_item_text">
                  <picker
                    mode="date"
                    @change="
                      (data) => dateTimeChange(data, 'registerDateStart')
                    "
                  >
                    <text
                      class="condition_item_text"
                      :class="
                        advancedSearch.registerDateStart.value
                          ? 'content_effective'
                          : ''
                      "
                    >
                      {{
                        advancedSearch.registerDateStart.value
                          ? advancedSearch.registerDateStart.value
                          : "请输入登记日期(开始)"
                      }}
                    </text>
                  </picker>
                </view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.registerDateStart.value"
                        @click="removeAdvancedInput('registerDateStart')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">登记日期(结束)：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="condition_item_text">
                  <picker
                    mode="date"
                    @change="
                      (data) => dateTimeChange(data, 'registerDateEnd')
                    "
                  >
                    <text
                      class="condition_item_text"
                      :class="
                        advancedSearch.registerDateEnd.value
                          ? 'content_effective'
                          : ''
                      "
                    >
                      {{
                        advancedSearch.registerDateEnd.value
                          ? advancedSearch.registerDateEnd.value
                          : "请输入登记日期(结束)"
                      }}
                    </text>
                  </picker>
                </view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.registerDateEnd.value"
                        @click="removeAdvancedInput('registerDateEnd')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">管理部门：</text>
                </view>
              </template>
              <template v-slot:body>
                <scroll-view style="width: calc(100% - 130px)" scroll-x>
                  <view
                    class="selector-content_text"
                    :class="
                      advancedSearch.kAO.value.length > 0
                        ? 'content_effective'
                        : ''
                    "
                    @click.stop="corpDeptSelect('kAO')"
                  >
                    {{
                      advancedSearch.kAO.value.length > 0
                        ? advancedSearch.kAO.name
                        : "请输入管理部门"
                    }}
                  </view>
                </scroll-view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.kAO.value.length > 0"
                        @click="removeAdvancedInput('kAO')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">管理人员：</text>
                </view>
              </template>
              <template v-slot:body>
                <scroll-view style="width: calc(100% - 130px)" scroll-x>
                  <view
                    class="selector-content_text"
                    :class="
                      advancedSearch.kAE.value.length > 0
                        ? 'content_effective'
                        : ''
                    "
                    @click.stop="personnelSelect('kAE')"
                  >
                    {{
                      advancedSearch.kAE.value.length > 0
                        ? advancedSearch.kAE.name
                        : "请输入管理人员"
                    }}
                  </view>
                </scroll-view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.kAE.value.length > 0"
                        @click="removeAdvancedInput('kAE')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">使用部门：</text>
                </view>
              </template>
              <template v-slot:body>
                <scroll-view style="width: calc(100% - 130px)" scroll-x>
                  <view
                    class="selector-content_text"
                    :class="
                      advancedSearch.uAO.value.length > 0
                        ? 'content_effective'
                        : ''
                    "
                    @click.stop="corpDeptSelect('uAO')"
                  >
                    {{
                      advancedSearch.uAO.value.length > 0
                        ? advancedSearch.uAO.name
                        : "请输入使用部门"
                    }}
                  </view>
                </scroll-view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.uAO.value.length > 0"
                        @click="removeAdvancedInput('uAO')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">使用人员：</text>
                </view>
              </template>
              <template v-slot:body>
                <scroll-view style="width: calc(100% - 130px)" scroll-x>
                  <view
                    class="selector-content_text"
                    :class="
                      advancedSearch.uAE.value.length > 0
                        ? 'content_effective'
                        : ''
                    "
                    @click.stop="personnelSelect('uAE')"
                  >
                    {{
                      advancedSearch.uAE.value.length > 0
                        ? advancedSearch.uAE.name
                        : "请输入使用人员"
                    }}
                  </view>
                </scroll-view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.uAE.value.length > 0"
                        @click="removeAdvancedInput('uAE')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">存放位置：</text>
                </view>
              </template>
              <template v-slot:body>
                <scroll-view style="width: calc(100% - 130px)" scroll-x>
                  <view
                    class="selector-content_text"
                    :class="
                      advancedSearch.location.value.length > 0
                        ? 'content_effective'
                        : ''
                    "
                    @click.stop="locationSelect('location')"
                  >
                    {{
                      advancedSearch.location.value.length > 0
                        ? advancedSearch.location.name
                        : "请输入存放位置"
                    }}
                  </view>
                </scroll-view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.location.value.length > 0"
                        @click="removeAdvancedInput('location')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">所属公司：</text>
                </view>
              </template>
              <template v-slot:body>
                <scroll-view style="width: calc(100% - 130px)" scroll-x>
                  <view
                    class="selector-content_text"
                    :class="
                      advancedSearch.corp.value.length > 0
                        ? 'content_effective'
                        : ''
                    "
                    @click.stop="corpDeptSelect('corp')"
                  >
                    {{
                      advancedSearch.corp.value.length > 0
                        ? advancedSearch.corp.name
                        : "请输入所属公司"
                    }}
                  </view>
                </scroll-view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.corp.value.length > 0"
                        @click="removeAdvancedInput('corp')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">使用情况：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="condition_item_text">
                  <multiple-popup-select
                    :options="advancedSearch.usage.options"
                     @change="(val)=>inputChange(val,'usage')"
                    :value="advancedSearch.usage.value"
                  >
                    <text
                      class="condition_item_text"
                      :class="
                        advancedSearch.usage.value.length ? 'content_effective' : ''
                      "
                      >{{
                        advancedSearch.usage.value.length
                          ? advancedSearch.usage.name
                          : "使用情况"
                      }}</text
                    >
                  </multiple-popup-select>
                </view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.usage.value.length"
                        @click="removeAdvancedInput('usage')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">资产状态：</text>
                </view>
              </template>
              <template v-slot:body>
                <view class="condition_item_text">
                  <multiple-popup-select
                    :options="advancedSearch.status.options"
                    @change="(val)=>inputChange(val,'status')"
                    :value="advancedSearch.status.value"
                  >
                    <text
                      class="condition_item_text"
                      :class="
                        advancedSearch.status.value.length ? 'content_effective' : ''
                      "
                      >{{
                        advancedSearch.status.value.length
                          ? advancedSearch.status.name
                          : "请输入资产状态"
                      }}</text
                    >
                  </multiple-popup-select>
                </view>
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.status.value.length"
                        @click="removeAdvancedInput('status')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">管理人员名称：</text>
                </view>
              </template>
              <template v-slot:body>
                <text
                  class="condition_item_text"
                  :class="
                    advancedSearch.kAEName.value ? 'content_effective' : ''
                  "
                  @click="openAdvancedInputDialog('kAEName')"
                  >{{
                    advancedSearch.kAEName.value
                      ? advancedSearch.kAEName.value
                      : "请输入名称"
                  }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.kAEName.value"
                        @click="removeAdvancedInput('kAEName')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
            <uni-list-item>
              <template v-slot:header>
                <view class="align-item-center_label">
                  <text class="slot-box">使用人员名称：</text>
                </view>
              </template>
              <template v-slot:body>
                <text
                  class="condition_item_text"
                  :class="
                    advancedSearch.uAEName.value ? 'content_effective' : ''
                  "
                  @click="openAdvancedInputDialog('uAEName')"
                  >{{
                    advancedSearch.uAEName.value
                      ? advancedSearch.uAEName.value
                      : "请输入名称"
                  }}</text
                >
              </template>
              <template v-slot:footer>
                <view class="info-flex">
                  <view class="content-delete_icon">
                    <view>
                      <uni-icons
                        v-if="advancedSearch.uAEName.value"
                        @click="removeAdvancedInput('uAEName')"
                        type="close"
                        size="16"
                      ></uni-icons>
                    </view>
                  </view>
                  <view class="content-delete_icon">
                    <view></view>
                  </view>
                </view>
              </template>
            </uni-list-item>
          </uni-list>
        </view>
      </scroll-view>
      <view class="advanced-search_button">
        <button @click="querySearch" type="primary">查询</button>
        <button @click="conditionReset">重置</button>
        <button @click="close">关闭</button>
      </view>
    </view>
  </DrawerAdvancedSearch>
</template>
<script>
import { ref,watch,onMounted } from "vue";
import { only } from "../../share/util/uniEvent";
import eventNames from "../../service/enumeration/eventNames";
import { navigateTo } from "../../share/redirect/index";
import DrawerAdvancedSearch from "../../components/uni-drawer/components/uni-drawer/uni-drawer.vue";
import assetController from "../../service/controller/asset/assetController";
import { currentPlatform, isMP } from "../../share/util/platform";
import platformEnum from "../../service/enumeration/platformEnum";
import UniPopupKeyword from "../../components/uni-popup-keyword/components/uni-popup-dialog/uni-popup-dialog.vue";
import multiplePopupSelect from "../../components/multiplePopupSelect/select.vue";

export default {
    emits:['closeDialog','confirm'],
    components: { 
        DrawerAdvancedSearch,
        UniPopupKeyword,
        multiplePopupSelect
    },
    props:{
      show:{
        type:Boolean,
        default:false
      }
    },
    setup(props,ctx) {
        const conditionSearchPopup = ref(null);

        const advancedInputDialog = ref(null);

        const advancedInputVal = ref("");

        const advancedInputKey = ref("");

        const advancedSearch = ref({
                name: {
                hint: "资产名称",
                value: null,
                },
                code: {
                hint: "资产编码",
                value: null,
                },
                originalCode: {
                hint: "原编码",
                value: null,
                },
                sn: {
                hint: "序列号",
                value: null,
                },
                brand: {
                hint: "品牌",
                value: null,
                },
                spec: {
                hint: "规格",
                value: null,
                },
                model: {
                hint: "型号",
                value: null,
                },
                category: {
                hint: "资产分类",
                name: null,
                value: [],
                },
                assetAttribute: {
                hint: "资产性质",
                name: null,
                value: [],
                options:[],
                },
                supplier: {
                hint: "供应商",
                name: null,
                value: [],
                },
                acquireWay: {
                hint: "取得方式",
                name: null,
                value: [],
                options:[],
                },
                dateOfPurchaseStart: {
                hint: "购置日期(开始)",
                value: null,
                },
                dateOfPurchaseEnd: {
                hint: "购置日期(结束)",
                value: null,
                },
                registerDateStart: {
                hint: "登记日期(开始)",
                value: null,
                },
                registerDateEnd: {
                hint: "登记日期(结束)",
                value: null,
                },
                kAO: {
                hint: "管理部门",
                name: null,
                value: [],
                },
                kAE: {
                hint: "管理人员",
                name: null,
                value: [],
                },
                uAO: {
                hint: "使用部门",
                name: null,
                value: [],
                },
                uAE: {
                hint: "使用人员",
                name: null,
                value: [],
                },
                location: {
                hint: "存放位置",
                name: null,
                value: [],
                },
                corp:{
                hint:'所属公司',
                name:null,
                value:[],
                },
                usage: {
                hint: "使用情况",
                name: null,
                value: [],
                options:[]
                },
                status: {
                hint: "资产状态",
                name: '闲置,在用',
                value: [1,2],
                options:[]
                },
                kAEName: {
                hint: "管理人员姓名",
                value: null,
                },
                uAEName: {
                hint: "使用人员姓名",
                value: null,
                },
            })

        const windowHeights = ref(null);
        
        const bottomHeight = ref("");
        bottomHeight.value=(currentPlatform==platformEnum.app?185:105);

        function advancedInputConfirm(val){
          advancedSearch.value[advancedInputKey.value].value = val.trim();
        }

        function openAdvancedInputDialog(key){
            advancedInputVal.value = advancedSearch.value[key].value;
            advancedInputKey.value = key;
            advancedInputDialog.value.open();
        }

        function removeAdvancedInput(key){
            if(key == 'category'||
            key == 'supplier'||
            key == 'corp'||
            key == 'kAO'||
            key == 'kAE'||
            key == 'uAO'||
            key == 'uAE'||
            key == 'corp'||
            key == 'location'){
                advancedSearch.value[key].value = [];
                advancedSearch.value[key].name = null;
            }else if(
            key == 'assetAttribute'||
            key == 'acquireWay'||
            key == 'usage'||
            key == 'status'){
                advancedSearch.value[key].value = [];
                advancedSearch.value[key].name = null;
            }else{
                advancedSearch.value[key].value = null;
            }
        }

        function inputChange({value,text},key){
          advancedSearch.value[key].value = value;
          advancedSearch.value[key].name = text;
        }

        function conditionReset() {
          const data = advancedSearch.value;
          data.name.value = null;
          data.code.value = null;
          data.originalCode.value = null;
          data.sn.value = null;
          data.brand.value = null;
          data.spec.value = null;
          data.model.value = null;
          data.category.name = null;
          data.category.value = [];
          data.assetAttribute.value = [];
          data.supplier.name = null;
          data.supplier.value = [];
          data.acquireWay.name = null;
          data.acquireWay.value = [];
          data.dateOfPurchaseStart.value = null;
          data.dateOfPurchaseEnd.value = null;
          data.registerDateStart.value = null;
          data.registerDateEnd.value = null;
          data.kAO.name = null;
          data.kAO.value = [];
          data.kAE.name = null;
          data.kAE.value = [];
          data.uAO.name = null;
          data.uAO.value = [];
          data.uAE.name = null;
          data.uAE.value = [];
          data.location.name = null;
          data.location.value = [];
          data.corp.name = null;
          data.corp.value = [];
          data.usage.name = null;
          data.usage.value = [];
          data.status.name = '闲置,在用';
          data.status.value = [1,2];
          data.kAEName.value = null;
          data.uAEName.value = null;
        }

         function categorySelect(key) {
            // 资产分类
            only(eventNames.assetCategorySelectBack, ({ ids, names }) => {
              advancedSearch.value[key].value = ids;
              advancedSearch.value[key].name = names;
            });
            const ids = advancedSearch.value[key].value;
            navigateTo(
              `pages/selector/asset/category?isLast=0&multiple=1&ids=${ids}`
            );
          }

          function supplierSelect(key) {
            // 资产分类
            only(eventNames.supplierSelectBack, ({ ids, names }) => {
              advancedSearch.value[key].value = ids;
              advancedSearch.value[key].name = names;
            });
            const ids = advancedSearch.value[key].value;
            navigateTo(
              `pages/selector/asset/supplier?isLast=0&multiple=1&ids=${ids}`
            );
          }

          function locationSelect(){
              only(eventNames.locationSelectBack,({ids,names})=>{
                  advancedSearch.value.location.value = ids;
                  advancedSearch.value.location.name = names;
              });
              const ids = advancedSearch.value.location.value;
              navigateTo(`pages/selector/asset/location?isLast=0&multiple=1&ids=${ids}`);
          }

          function corpDeptSelect(key) {
            // 公司/部门
            only(eventNames.deptSelectBack, ({ ids, names }) => {
              advancedSearch.value[key].value = ids;
              advancedSearch.value[key].name = names;
            });
            const ids = advancedSearch.value[key].value;
            navigateTo(`pages/selector/system/corpDept?multiple=1&type=${key == 'corp' ? 2 : null}&ids=${ids}`);
          }

          function personnelSelect(key) {
            // 选择人员
            only(eventNames.employeeSelectBack, ({ids,names}) => {
              advancedSearch.value[key].value = ids;
              advancedSearch.value[key].name = names;
            });
            const _id = advancedSearch.value[key].value;
            navigateTo(`pages/selector/system/employee?&multiple=1&ids=${_id}`);
          }

        function close(){
          ctx.emit("closeDialog");
        }

        function querySearch(){
          const obj = advancedSearch.value;
          let conditions = [],KAENameText = "",UAENameText = "";
          for( let i in obj){
            if(obj[i].value && obj[i].value.constructor == Array && obj[i].value.length > 0){
                const val = obj[i].value.map((p)=>{
                  return {
                    Value:p
                  }
                })
                conditions.push({
                  AssetPropertyCode:keyValue(i),
                  Operator: 7,
                  Values:val
                });
            }else if(obj[i].value && obj[i].value.constructor != Array){
                if(i == 'dateOfPurchaseStart' || i == 'registerDateStart'){
                  conditions.push({
                    AssetPropertyCode:keyValue(i),
                    Operator: 4,
                    Values:[{Value:obj[i].value}]
                  });
                }else if(i == 'dateOfPurchaseEnd' || i == 'registerDateEnd'){
                  conditions.push({
                    AssetPropertyCode:keyValue(i),
                    Operator: 6,
                    Values:[{Value:obj[i].value}]
                  });
                }else if(i == 'kAEName' || i == 'uAEName'){
                  if(i == 'kAEName'){
                    KAENameText = obj[i].value;
                  }else{
                    UAENameText = obj[i].value;
                  }
                }else{
                  conditions.push({
                    AssetPropertyCode:keyValue(i),
                    Operator: 7,
                    Values:[{Value:obj[i].value}]
                  });
                }
            }
          }
          ctx.emit("confirm",conditions,KAENameText,UAENameText);
        }

        function keyValue(key){
          let str = "";
          switch(key){
            case 'name':
              str = 'Name'
            break;
            case 'code':
              str = 'Code'
            break;
            case 'originalCode':
              str = 'OriginalCode'
            break;
            case 'sn':
              str = 'SN'
            break;
            case 'brand':
              str = 'Brand'
            break;
            case 'spec':
              str = 'Spec'
            break;
            case 'model':
              str = 'Model'
            break;
            case 'category':
              str = 'AssetCategoryID'
            break;
            case 'assetAttribute':
              str = 'AssetAttributeID'
            break;
            case 'supplier':
              str = 'SupplierID'
            break;
            case 'acquireWay':
              str = 'AcquireWayID'
            break;
            case 'dateOfPurchaseStart':
              str = 'DateOfPurchase'
            break;
            case 'dateOfPurchaseEnd':
              str = 'DateOfPurchase'
            break;
            case 'registerDateStart':
              str = 'RegisterDatetime'
            break;
            case 'registerDateEnd':
              str = 'RegisterDatetime'
            break;
            case 'kAO':
              str = 'KAOID'
            break;
            case 'kAE':
              str = 'KAEID'
            break;
            case 'uAO':
              str = 'UAOID'
            break;
            case 'uAE':
              str = 'UAEID'
            break;
            case 'location':
              str = 'LocationID'
            break;
            case 'corp':
              str = 'CorpID'
            break;
            case 'usage':
              str = 'AssetUsage'
            break;
            case 'status':
              str = 'AssetStatus'
            break;
            case 'kAENameText':
              str = 'KAENameText'
            break;
            case 'uAENameText':
              str = 'UAENameText'
            break;
            default:
              break;
          }
          return str;
        }

        function scanInput(key){
            uni.scanCode({
              scanType: ["barCode", "qrCode"],
              success: ({ result }) => {
                  advancedSearch.value[key].value = result;
              },
            });
        }

        {
            // 获取屏幕高度
            uni.getSystemInfo({
                success: (result) => {
                windowHeights.value = result.windowHeight;
                },
            });
            assetController.assetGetOptions().then(({AssetEnums}) => {
                const {AcquireWay,AssetAttribute,AssetStatuses,AssetUsage} = AssetEnums;
                advancedSearch.value.acquireWay.options = AcquireWay.map(p=>{return {text:p.Value,value:p.Key}})
                advancedSearch.value.assetAttribute.options = AssetAttribute.map(p=>{ return {text:p.Value,value:p.Key}})
                advancedSearch.value.status.options = AssetStatuses.map(p=>{return {text:p.Value,value:p.Key}})
                advancedSearch.value.usage.options = AssetUsage.map(p=>{return {text:p.Value,value:p.Key}})
            })
        }
        watch(()=>props.show,(newVal)=>{
            if(newVal){
              conditionSearchPopup.value.open();
            }else{
              conditionSearchPopup.value.close();
            }
        })
        return {
            windowHeights,
            bottomHeight,
            conditionSearchPopup,
            advancedSearch,
            openAdvancedInputDialog,
            removeAdvancedInput,
            categorySelect,
            corpDeptSelect,
            locationSelect,
            personnelSelect,
            supplierSelect,
            advancedInputVal,
            advancedInputKey,
            advancedInputDialog,
            advancedInputConfirm,
            conditionReset,
            inputChange,
            close,
            dateTimeChange: ({ detail: { value } }, key) => {
              advancedSearch.value[key].value = value;
            },
            querySearch,
            scanInput,
        }
    },
}
</script>
<style lang="scss" scoped>
</style>
