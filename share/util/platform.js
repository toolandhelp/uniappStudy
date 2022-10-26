import platformEnum from "../../service/enumeration/platformEnum";

/**
 * 当前平台
 */
let currentPlatform;

// #ifdef APP-PLUS
currentPlatform = platformEnum.app;
// #endif

// #ifdef MP-WEIXIN
currentPlatform = platformEnum.wx;
// #endif

// #ifdef MP-ALIPAY
currentPlatform = platformEnum.dd;
// #endif

// #ifdef H5
currentPlatform = platformEnum.h5;
// #endif

/**
 * 仅出现在 platform 平台下的代码
 * @param {*} platform 平台枚举
 * @returns bool
 */
function ifdef(platform) {
    return platform === currentPlatform;
}

/**
 * 除了 platform 平台，其它平台均存在的代码
 * @param {*} platform 平台枚举
 * @returns bool
 */
function ifndef(platform) {
    return platform !== currentPlatform;
}

/**
 * 在 platforms 平台存在的代码
 * @param {Array} platform 平台枚举
 * @returns bool
 */
function ifdefs(...platforms) {
    if (platforms == undefined) return false;
    for (const platform of platforms) {
        if (ifdef(platform)) return true;
    }
    return false;
}

/**
 * 是否小程序（微信小程序/支付宝小程序/百度小程序/字节跳动小程序/飞书小程序/QQ小程序/360小程序）
 */
let isMP = false;
// #ifdef MP
isMP = true;
// #endif

export {
    currentPlatform,
    ifdef,
    ifndef,
    ifdefs,
    isMP,
};