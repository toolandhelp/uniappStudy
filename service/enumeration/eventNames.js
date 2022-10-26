const eventNames = {
  /**
   * 资产上传图片返回
   */
  assetPictureBack: Symbol(),

  /**
   * 单据详情返回代办
   */
  billDetailBack: Symbol(),
  /**
   * 退库单详情返回
   */
  drawBackDetailBack: Symbol(),
  /**
   * 转移单详情返回
   */
  transformDetailBack: Symbol(),
  /**
   * 报修详情返回
   */
  repairRequestDetailBack: Symbol(),
  /**
   * 报修详情返回
   */
  borrowBackBack: Symbol(),
  /**
   * 申领单详情返回
   */
  requestDrawDetailBack: Symbol(),
  /**
  * 申领单详情返回
  */
  takeDeliveryDetailBack: Symbol(),
  /**
   * 员工自助盘点明细返回
   */
  employeeInvDetailBack: Symbol(),

  /**
   * 员工自助盘点实盘确认返回
   */
  employeeStockConfirmBack: Symbol(),
  /**
   * 资产盘点详情返回
   */
  inventoryConfirmDetailBack: Symbol(),
  /**
  * 资产登记详情返回
  */
  registerDetailBack: Symbol(),
  /**
   * 签字确认返回详情
   */
  signBack: Symbol(),
  /**
   * 存放位置选择器返回
   */
  locationSelectBack: Symbol(),
  /**
   * 公司部门选择器返回
   */
  deptSelectBack: Symbol(),
  /**
   * 资产分类选择器返回
   */
  assetCategorySelectBack: Symbol(),
  /**
   * 易耗品仓库选择器返回
   */
  consumableWarehouseBack: Symbol(),
  /**
   * 易耗品分类选择器返回
   */
  consumableCategoryBack: Symbol(),
  /**
   * 人员选择器返回
   */
  employeeSelectBack: Symbol(),
  /**
   * 供应商选择器返回
   */
   supplierSelectBack: Symbol(),
  
  consumableAllocateConditionBack: Symbol(),
  
  consumableAllocateEditBill: Symbol(),
  consumableOrderBack:Symbol(),
  consumableInwarehouseConditionBack:Symbol(),
   consumableInwarehouseEditBill: Symbol(),
   //出库单  申领单选择器 回调
   consumableOutwarehouseBillRequestDrawSelectorBack:Symbol(),
   
    conditionBack:Symbol(),
	refreshBack:Symbol()
};

export default eventNames;