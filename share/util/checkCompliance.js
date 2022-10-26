import { showErrorToast } from "../../share/util/message";
const amount= /(^[1-9]([0-9]*)(\.[0-9]+)?$)|(^[0-9]{1}(\.[0-9]+)?$)/;//金额格式校验
const seat= /^\d{0,14}(\.\d{1,2})?$/;//小数位前14位小数位后2位

function priceCheck(val){
    if(val){
        if(!amount.test(val)){
          showErrorToast('数据格式错误请重新输入');
          return false;
        }
        if(!seat.test(val)){
          showErrorToast('仅支持小数位前最多14位后最多2位');
          return false;
        }
    }
    return true;
}

export {
    priceCheck,
}