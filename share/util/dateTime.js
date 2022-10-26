import { stringIsNull } from "./index";

/**
 * 获取当前日期
 * 
 */
function getCurrentDate() {
     let date = new Date();
     let y = date.getFullYear();
     let MM = date.getMonth() + 1;
     MM = MM < 10 ? ('0' + MM) : MM;
     let d = date.getDate();
     d = d < 10 ? ('0' + d) : d;
     let h = date.getHours();
     h = h < 10 ? ('0' + h) : h;
     let m = date.getMinutes();
     m = m < 10 ? ('0' + m) : m;
     let s = date.getSeconds();
     s = s < 10 ? ('0' + s) : s;
     return y + '-' + MM + '-' + d;
}

function getDate(type) {
            const date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            if (type === 'start') {
                year = year - 60;
            } else if (type === 'end') {
                year = year + 2;
            }
            month = month > 9 ? month : '0' + month;
            day = day > 9 ? day : '0' + day;
            return `${year}-${month}-${day}`;
}

/**
 * 时间转日期
 * @param {string} tiem 时间字符串
 * @returns 日期
 */
function timeConvertDate(tiem) {
     if (stringIsNull(tiem)) return "";
     if (tiem.length <= 10) return tiem;
     return tiem.substr(0, 10);
}

export { getCurrentDate, timeConvertDate,getDate};