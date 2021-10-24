import BitCodeWebSocket from 'bitcode_web_socket/dist/bitcodeWebSocket'

export default class BitcodeMdcWebsocket {
  static conenctionEstablished = false
  static websocket

  static performWebsocketAction(action) {
    if (!BitcodeMdcWebsocket.websocket || BitcodeMdcWebsocket.websocket === undefined) {
      BitcodeMdcWebsocket.websocket = new BitCodeWebSocket(
        'http://127.0.0.1:9091/web-socket/connect',
        'dd',
      )
      BitcodeMdcWebsocket.websocket.connect({
        success: () => {
          action()
        },
        fail: () => {},
      })
    } else {
      action()
    }
  }

  static subscribeAutomateOrder(onMessageReceived) {
    BitcodeMdcWebsocket.performWebsocketAction(() => {
      BitcodeMdcWebsocket.websocket.stompClient.subscribe('/topic/public', (rawResponse) => {
        onMessageReceived(rawResponse)
      })
    })
  }
}
