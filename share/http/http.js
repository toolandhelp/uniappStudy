import fileTypeEnum from "../../service/enumeration/fileTypeEnum";

const requestMethod = {
    post: "post",
    get: "get",
    put: "put",
    delete: "delete"
};

function httpRequest(url, header, method, data) {
    if (!requestMethod.hasOwnProperty(method)) throw `无效的请求类型-${method}`;
    return new Promise(function (resolve, reject) {
        uni.request({
            url,
            header,
            method,
            data,
            success: (res) => {
                if (res.statusCode !== 200) {
                    reject(res);
                    return;
                }
                resolve(res);
            },
            fail: (res) => reject(res)
        });
    });
}

function httpUploadFile(url, header, fileType, filePath) {
    if (!fileTypeEnum.hasOwnProperty(fileType)) throw `无效的文件类型-${fileType}`;
    return new Promise(function (resolve, reject) {
        // #ifndef MP-ALIPAY
        uni.uploadFile({
            url,
            filePath,
            fileType,
            header,
			name:"file",
            success: (res) => {
                res.data = JSON.parse(res.data);
                if (res.statusCode !== 200) {
                    reject(res);
                    return;
                }
                resolve(res);
            },
            fail: (res) => reject(res)
        });
        // #endif
        // #ifdef MP-ALIPAY
        dd.uploadFile({
            url,
            fileType,
            fileName: "ddfile",
            header,
            filePath,
            success: (res) => {
                res.data = JSON.parse(res.data);
                if (res.statusCode !== 200 || res.success !== true) {
                    reject(res);
                    return;
                }
                resolve(res);
            },
            fail: (res) => reject(res)
        });
        // #endif
    });
}

export { requestMethod, httpRequest, httpUploadFile };