import { isPromise } from "./index";
const events = new Map();


/**
 * 触发事件
 * @param {String} eventName 事件名
 * @param  {...any} s 触发事件携带的附加参数
 */
function emit(eventName, ...s) {
    if (events.has(eventName)) {
        return events.get(eventName)(...s);
    }
}

/**
 * 触发事件,必然会返回一个Promise
 * @param {String} eventName 事件名
 * @param  {...any} s 触发事件携带的附加参数
 * @return {Promise}
 */
function emitPromise(eventName, ...s) {
    const res = emit(eventName, ...s);
    if (isPromise(res)) return res;
    console.warn("触发了异步事件，但返回值非Promise。已兼容处理：创建了一个空Promise");
    return Promise.resolve();
}

/**
 * 监听事件。（不会重复监听）
 * @param {String} eventName 事件名
 * @param {Function} callback 事件的回调函数
 */
function only(eventName, callback) {
    events.set(eventName, callback);
}

export { emit, only, emitPromise };