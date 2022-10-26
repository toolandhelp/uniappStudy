"use strict";
var common_vendor = require("../../common/vendor.js");
var share_token_index = require("../token/index.js");
var share_http_serveUrl = require("../http/serveUrl.js");
let Socket = "";
const createSocket = (url) => {
  let token = share_token_index.getToken();
  console.log(token);
  if (!url) {
    console.log(share_http_serveUrl.ServiceUrl.ws);
    url = share_http_serveUrl.ServiceUrl.ws;
  }
  if (!Socket) {
    console.log("\u5EFA\u7ACBwebsocket\u8FDE\u63A5");
    console.log(token);
    if (!token) {
      return;
    }
    console.log(1);
    Socket = common_vendor.index.connectSocket({
      url: url + "?token=" + token + "&type=1",
      complete: () => {
      }
    });
    common_vendor.index.onSocketOpen(onSocketOpen);
    common_vendor.index.onSocketMessage(onSocketMessage);
    common_vendor.index.onSocketError(onSocketError);
    common_vendor.index.onSocketClose(onSocketClose);
  } else {
    console.log("websocket\u5DF2\u8FDE\u63A5");
  }
};
function onSocketOpen(e) {
}
function onSocketMessage(e) {
}
function onSocketError(e) {
}
function onSocketClose(e) {
}
exports.createSocket = createSocket;
