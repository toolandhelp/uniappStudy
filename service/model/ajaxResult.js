class AjaxResult {
	constructor({ Code, Message, Data }) {
		this.Code = Code;
		this.Message = Message;
		this.Data = Data;
	}

	/**
	 * 状态码
	 */
	Code;

	/**
	 * 后端提示消息
	 */
	Message;

	/**
	 * 后端数据
	 */
	Data;
}

export default AjaxResult;
