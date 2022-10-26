let Socket = ''
let setIntervalWesocketPush = null
import  {getToken} from '../token/index'

 import  ServiceUrl from '../http/serveUrl'

/**
 * 建立websocket连接
 * @param {string} url ws地址
 */
export const createSocket = url => {
	let token=getToken();
	console.log(token)
  if(!url){
	  console.log(ServiceUrl.ws)
     url=ServiceUrl.ws;
  }
   
  if (!Socket) {
    console.log('建立websocket连接')
    console.log(token);
    if(!token){
      return;
    }
	console.log(1)
    Socket =  uni.connectSocket({
	 url: url + "?token=" + token + "&type=1", //仅为示例，并非真实接口地址。
	 complete: ()=> {}
   });
    uni.onSocketOpen(onSocketOpen)
    uni.onSocketMessage(onSocketMessage)
    // Socket.sendSocketMessage(sendSocketMessage)
	uni.onSocketError(onSocketError)
    uni.onSocketClose(onSocketClose)
  } else {
    console.log('websocket已连接')
  }
}

function onSocketOpen(e){
	
}
function onSocketMessage(e){
	
}
function onSocketError(e){
}
function onSocketClose(e){
	
}

export function sendSocketMessage(obj){
	Socket.sendSocketMessage(obj);
}

