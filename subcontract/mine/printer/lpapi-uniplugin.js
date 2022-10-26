const api = uni.requireNativePlugin("DothanTech-LPAPI");

function request(action, data, callback) {
	console.log(`### Request: action = ${action}`);
	console.log(data ? JSON.stringify(data) : data);
	return new Promise((resolve) => {
		if (api && api[action]) {
			api[action](data || {}, (result) => {
				console.log(`### Response:`);
				console.log(JSON.stringify(data));
				if (result && result.code === 0) {
					resolve(result.data || true);
				} else {
					resolve(undefined);
					console.log(result.data);
				}
				if (typeof callback === "function") {
					callback(result.code === 0 ? result.data : null);
				}
			});
		} else {
			if (api) {
				resolve(undefined);
				console.log("LPAPI插件加载失败");
			} else {
				resolve(undefined);
				console.log("未检测到该方法:" + action);
			}
		}
	});
}

const lpapi = {
	/**
	 * 获取指定型号的所有打印机；
	 * @param { string | {name?: string} } data 参数；
	 * @returns { {name: string, macAddress?: string}[] } 获取打印机列表；
	 */
	getPrinters(data) {
		if (typeof data === "string") {
			data = { name: data };
		}
		return request("getPrinters", data);
	},
	/**
	 * 获取指定型号的一台打印机；
	 * @param { string | {name?: string} } data 参数；
	 * @returns { {name: string, macAddress?: string} } 获取检测到的第一台打印机；
	 */
	getFirstPrinter(data) {
		if (typeof data === "string") {
			data = { name: data };
		}
		return request("getFirstPrinter", data);
	},
	/**
	 *
	 * @param { string | {name?: string}} data 参数；
	 */
	openPrinter(data, callback) {
		if (typeof data === "string") {
			data = { name: data };
		}
		return request("openPrinter", typeof data === "object" ? data : {}, callback);
	},
	/**
	 * 获取当前已连接打印机名称；
	 */
	getPrinterName() {
		return request("getPrinterName", {});
	},
	/**
	 * 获取当前已连接打印机信息；
	 * 调用该接口前要确保打印机已连接；
	 */
	getPrinterInfo() {
		return request("getPrinterInfo", {});
	},
	// /**
	//  * 获取当前打印机的连接状态；
	//  */
	// getPrinterState() {
	// 	return request('getPrinterState', {});
	// },
	/**
	 * 当前打印机是否已经打开；
	 */
	isPrinterOpened() {
		return request("isPrinterOpened", {});
	},
	/**
	 *
	 * @param { string | {}} data 参数；
	 * @param {string} data.name
	 * @param {string} data.model
	 * @returns
	 */
	isPrinterSupported(data) {
		data =
			typeof data === "object"
				? data
				: {
						name: arguments[0],
						model: arguments[1],
				  };
		return request("isPrinterSupported", data || {});
	},
	// /**
	//  * 取消当前打印任务；
	//  */
	// cancel() {
	// 	return request('cancel', {});
	// },
	/**
	 * 关闭打印机；
	 */
	closePrinter() {
		return request("closePrinter", {});
	},
	/**
	 * 打印BASE64图片；
	 * @param {{}} data
	 * @param {string} data.image
	 * @param {number} data.PRINT_DENSITY
	 * @param {number} data.PRINT_SPEED
	 * @param {number} data.PRINT_COPIES
	 */
	printImage(data) {
		return request("printImage", data);
	},
	/**
	 * 开始打印任务；
	 * @param {{}} data 参数；
	 * @param {number} data.width
	 * @param {number} data.height
	 * @param {number} data.orientation
	 */
	startJob(data) {
		console.log(JSON.stringify(data))
		return request("startJob", data);
	},
	// /**
	//  * 终止打印任务；
	//  */
	// abortJob() {
	// 	return request('abortJob', {});
	// },
	/**
	 * 提交打印任务；
	 * @param {{}} data 参数；
	 * @param {number} data.PRINT_DENSITY
	 * @param {number} data.PRINT_SPEED
	 * @param {number} data.PRINT_COPIES
	 */
	commitJob(data) {
		return request("commitJob", data);
	},
	// /**
	//  * 开始打印页面；
	//  */
	// startPage() {
	// 	return request('startPage', {});
	// },
	// /**
	//  * 结束打印页面；
	//  */
	// endPage() {
	// 	return request('endPage', {});
	// },
	/**
	 * 结束打印任务；
	 */
	endJob() {
		return request("endJob", {});
	},
	/**
	 * 获取当前的打印任务；
	 */
	getJobPages() {
		return request("getJobPages", {});
	},
	//
	/**
	 * 设置后续绘制参数，譬如字体名称，二维码纠错级别等等；
	 * @param {{}} data 参数
	 * @param {string} name
	 * @param value
	 */
	setDrawParam(data) {
		return request("setDrawParam", data);
	},
	// /**
	//  * 获取当前内容的旋转角度；
	//  */
	// getItemOrientation() {
	// 	return request('getItemOrientation', {});
	// },
	/**
	 * 设置后续内容的旋转方向；
	 * @param { number | { orientation: [0, 90, 180, 270]}} data 参数；
	 */
	setItemOrientation(data) {
		data = typeof data === "object" ? data : { orientation: data };
		return request("setItemOrientation", data);
	},
	// /**
	//  * 获取当前的水平对齐方式；
	//  */
	// getItemHorizontalAlignment() {
	// 	return request('getItemHorizontalAlignment', {});
	// },
	/**
	 * 设置水平对齐方式；
	 * @param { number | { alignment: [0, 1, 2]}} data 参数；
	 */
	setItemHorizontalAlignment(data) {
		data = typeof data === "object" ? data : { alignment: data };
		return request("setItemHorizontalAlignment", data);
	},
	// /**
	//  * 获取当前的垂直对齐方式；
	//  */
	// getItemVerticalAlignment() {
	// 	return request('getItemVerticalAlignment', {});
	// },
	/**
	 * 设置垂直对齐方式；
	 * @param { number | { alignment: [0, 1, 2]}} data 参数；
	 */
	setItemVerticalAlignment(data) {
		data = typeof data === "object" ? data : { alignment: data };
		return request("setItemVerticalAlignment", data);
	},
	/**
	 * 设置背景色；
	 * 默认白色底色：0xFFFFFFFF；
	 * 如需透明色，可设置：0x00000000；
	 * @param { number | {color: number} } data 参数；
	 */
	setBackground(data) {
		data = typeof data === "object" ? data : { color: data };
		return request("setBackground", data);
	},

	// ***************************************************
	// * 打印相关图形对象。
	// ***************************************************

	/**
	 * 绘制字符串；
	 *
	 * @param {{}} data 				 字符串绘制参数；
	 * @param {string} data.text		 待打印的字符串名称；
	 * @param {number} data.x			 字符串显示的X轴坐标位置(单位毫米)；
	 * @param {number} data.y			 字符串显示的Y轴坐标位置(单位毫米)；
	 * @param {number} data.width		 字符串显示区域宽度(单位毫米)；
	 * @param {number} data.height		 字符串显示区域高度(单位毫米)；
	 * @param {number} data.fontHeight	 字体大小(单位毫米);
	 * @param {number} data.fontStyle	 字体样式，默认位0；（0：常规，1：黑体，2：斜体，3：粗斜体）
	 * @param {string} data.fontName	 字体名称，默认位"黑体";
	 * @param {boolean} data.autoReturn	 字符串长度超过width之后，是否自动换行？默认位true;
	 */
	drawText(data) {
		return request("drawText", data);
	},
	/**
	 * 绘制一维码；
	 * @param {{}} data 一维码绘制参数；
	 * @param {string} data.text,			一维码内容
	 * @param {number} data.x,				一维码在坐标系X轴上的位置；
	 * @param {number} data.y,				一维码在坐标系中Y轴上的位置；
	 * @param {number} data.width,			一维码在坐标系中的宽度；
	 * @param {number} data.height,			一维码高度；
	 * @param {number} data.textHeight,		一维码下面显示的字符串高度，不需要的话可以设置位0；
	 * @param {number} data.type			一维码类型：{@link BarcodeType}
	 *
	 * @typedef {{
	 *	UPC_A: 20,
	 *	UPC_E: 21,
	 *	EAN13: 22,
	 *	EAN8: 23,
	 *	CODE39: 24,
	 *	ITF25: 25,
	 *	CODABAR: 26,
	 *	CODE93: 27,
	 *	CODE128: 28,
	 *	ISBN: 29,
	 *	ECODE39: 30,
	 *	AUTO: 60,
	 * }} BarcodeType 一维码类型
	 */
	draw1DBarcode(data) {
		return request("draw1DBarcode", data);
	},
	/**
	 * 绘制二维码；
	 * @param {{}} data
	 * @param {string} data.text			二维码内容
	 * @param {number} data.x				X轴坐标位置(单位毫米)
	 * @param {number} data.y				Y轴坐标位置
	 * @param {number} data.width			二维码大小(单位毫米)
	 */
	draw2DQRCode(data) {
		return request("draw2DQRCode", data);
	},
	/**
	 * 绘制PDF417码；
	 * @param {{}} data PDF417打印参数；
	 * @param {string} data.text 			打印内容
	 * @param {number} data.x				X轴坐标位置(单位毫米)
	 * @param {number} data.y				Y轴坐标位置(单位毫米)
	 * @param {number} data.width			绘制数据内容的宽度(单位毫米)
	 * @param {number} data.height			绘制数据内容的高度(单位毫米)
	 */
	// draw2DPdf417(data) {
	// 	return request("draw2DPdf417", data);
	// },
	/**
	 * 绘制矩形框；
	 * @param {{}} data
	 * @param {number} data.x				X轴坐标位置(单位毫米)
	 * @param {number} data.y				Y轴坐标位置(单位毫米)
	 * @param {number} data.width			绘制数据内容的宽度(单位毫米)
	 * @param {number} data.height			绘制数据内容的高度(单位毫米)
	 * @param {number} data.lineWidth		边框宽度(单位毫米)
	 */
	drawRectangle(data) {
		return request("drawRectangle", data);
	},
	/**
	 * 绘制填充矩形；
	 * @param {{}} data
	 * @param {number} data.x				X轴坐标位置(单位毫米)
	 * @param {number} data.y				Y轴坐标位置(单位毫米)
	 * @param {number} data.width			绘制数据内容的宽度(单位毫米)
	 * @param {number} data.height			绘制数据内容的高度(单位毫米)
	 *
	 */
	fillRectangle(data) {
		return request("fillRectangle", data);
	},
	/**
	 * 绘制圆角矩形框；
	 * @param {{}} data
	 * @param {number} data.x				X轴坐标位置(单位毫米)
	 * @param {number} data.y				Y轴坐标位置(单位毫米)
	 * @param {number} data.width			绘制数据内容的宽度(单位毫米)
	 * @param {number} data.height			绘制数据内容的高度(单位毫米)
	 * @param {number} data.cornerWidth		圆角半径(单位毫米)
	 * @param {number} data.cornerHeight	圆角半径(单位毫米)
	 * @param {number} data.lineWidth		边框宽度(单位毫米)
	 */
	drawRoundRectangle(data) {
		return request("drawRoundRectangle", data);
	},
	/**
	 * 填充圆角矩形；
	 * @param {{}} data
	 * @param {number} data.x				X轴坐标位置(单位毫米)
	 * @param {number} data.y				Y轴坐标位置(单位毫米)
	 * @param {number} data.width			绘制数据内容的宽度(单位毫米)
	 * @param {number} data.height			绘制数据内容的高度(单位毫米)
	 * @param {number} data.cornerWidth		圆角半径(单位毫米)
	 * @param {number} data.cornerHeight	圆角半径(单位毫米)
	 */
	fillRoundRectangle(data) {
		return request("fillRoundRectangle", data);
	},
	/**
	 * 绘制椭圆；
	 * @param {{}} data
	 * @param {number} data.x				X轴坐标位置(单位毫米)
	 * @param {number} data.y				Y轴坐标位置(单位毫米)
	 * @param {number} data.width			绘制数据内容的宽度(单位毫米)
	 * @param {number} data.height			绘制数据内容的高度(单位毫米)
	 * @param {number} data.lineWidth		边框宽度(单位毫米)
	 */
	drawEllipse(data) {
		return request("drawEllipse", data);
	},
	/**
	 * 填充椭圆；
	 * @param {{}} data
	 * @param {number} data.x				X轴坐标位置(单位毫米)
	 * @param {number} data.y				Y轴坐标位置(单位毫米)
	 * @param {number} data.width			绘制数据内容的宽度(单位毫米)
	 * @param {number} data.height			绘制数据内容的高度(单位毫米)
	 */
	fillEllipse(data) {
		return request("fillEllipse", data);
	},
	/**
	 * 绘制圆形；
	 * @param {{}} data
	 * @param {number} data.x				圆心X轴坐标位置(单位毫米)
	 * @param {number} data.y				圆心Y轴坐标位置(单位毫米)
	 * @param {number} data.radius			圆半径(单位毫米)
	 * @param {number} data.lineWidth		边框宽度(单位毫米)
	 */
	drawCircle(data) {
		return request("drawCircle", data);
	},
	/**
	 * 填充圆；
	 * @param {{}} data
	 * @param {number} data.x				圆心X轴坐标位置(单位毫米)
	 * @param {number} data.y				圆心Y轴坐标位置(单位毫米)
	 * @param {number} data.radius			圆半径(单位毫米)
	 */
	fillCircle(data) {
		return request("fillCircle", data);
	},
	/**
	 * 绘制直线；
	 * @param {{}} data
	 * @param {number} data.x1				起点X轴坐标位置(单位毫米)
	 * @param {number} data.y1				起点Y轴坐标位置(单位毫米)
	 * @param {number} data.x2				终点X轴坐标位置(单位毫米)
	 * @param {number} data.y2				终点Y轴坐标位置(单位毫米)
	 * @param {number} data.lineWidth		线条宽度(单位毫米)
	 */
	drawLine(data) {
		return request("drawLine", data);
	},
	/**
	 * 绘制虚线；
	 * @param {{}} data
	 * @param {number} data.x1				起点X轴坐标位置(单位毫米)
	 * @param {number} data.y1				起点Y轴坐标位置(单位毫米)
	 * @param {number} data.x2				终点X轴坐标位置(单位毫米)
	 * @param {number} data.y2				终点Y轴坐标位置(单位毫米)
	 * @param {number} data.dashLen[],		电话线线段长度数组(单位毫米)
	 * @param {number} data.lineWidth		线条宽度(单位毫米)
	 */
	drawDashLine(data) {
		return request("drawDashLine", data);
	},
	/**
	 * 绘制图片；
	 * @param {{}} data
	 * @param {string} data.image
	 * @param {number} data.x				X轴坐标位置(单位毫米)
	 * @param {number} data.y				Y轴坐标位置(单位毫米)
	 * @param {number} data.width			绘制数据内容的宽度(单位毫米)
	 * @param {number} data.height			绘制数据内容的高度(单位毫米)
	 * @param {number} data.threshold		黑白转换阈值，默认是192
	 */
	drawImage(data) {
		return request("drawImage", data);
	},
};

export default lpapi;
