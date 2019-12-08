/* 
自定义全局事件总线对象模块
*/

  /**
   *  eventBus:{
   *    add: [
   *      callback1,
   *      callback3,  
   *    ],
   *    delete: [callback2],
   *  }
   */

  (function (window) {
    const eventBus = {}
    let listenerContainer = {}
  
    // 1). on(eventName, listener): 绑定事件监听
    eventBus.on =function (eventName,listener) {
      let listeners = listenerContainer[eventName]
      if (!listeners) {
        listeners=[]
        listenerContainer[eventName] = listeners
      }
      listeners.push(listener)
  
    }
  
  
    // 2). emit(eventName, data): 分发事件
    eventBus.emit =function (eventName,data) {
      let listeners = listenerContainer[eventName]
      if (listeners) {
        listeners.forEach(listener => listener(data))
      }
    }
  
  
    // 3). off(eventName): 移除事件监听
    eventBus.off = function (eventName) {
      if (eventName===undefined) {
        listenerContainer={}
      } else if (eventName) {
        delete listenerContainer[eventName]
      }
      
    }
  
    window.eventBus = eventBus
  })(window)