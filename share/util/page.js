/**
 * 获取所有页面
 * @returns {Array} 所有页面对象
 */
function getPages() {
    return getCurrentPages();
}

/**
 * 当前页面对象
 * @returns {page} 页面
 */
function getCurrentPage() {
    const pages = getPages();
    return pages[pages.length - 1];
}

/**
 * 获取当前页面路由
 * @returns {string} 当前页面路由
 */
function getThisPagePath() {
    return getCurrentPage().route;
}

/**
 * 获取前第几个界面
 * @param {number} beforeNum 前几个页面
 * @returns {page} 页面
 */
function getBeforePage(beforeNum) {
    ++beforeNum;
    const pages = getPages();
    const { length } = pages;
    if (length >= beforeNum) {
        return pages[length - beforeNum];
    }
    return pages[length - 1];
}

/**
 * 获取上一个页面
 * @returns {page} 页面
 */
function getPrevPage() {
    return getBeforePage(1);
}

/**
 * 获取上一个页面路由
 * @returns {string} 当前页面路由
 */
function getPrevPagePath() {
    return getPrevPage().route;
}

export { getCurrentPage, getThisPagePath, getBeforePage, getPrevPage, getPrevPagePath };