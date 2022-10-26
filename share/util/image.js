/**
 * 预览图片集合
 * @param {string[]} urls 图片列表
 * @param {number} i 当前图片下标
 */
function previewImgs(urls, i) {
    uni.previewImage({
        current: urls[i],
        urls: urls
    });
}

/**
 * 预览图片集合
 * @param {string} url 当前图片地址
 */
function previewImg(url) {
    uni.previewImage({
        urls: [url]
    });
}



export {
    previewImgs,
    previewImg
};
