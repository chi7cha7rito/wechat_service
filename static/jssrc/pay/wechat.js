/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：豪客微信站
 2. 文件名称：static/jssrc/pay/wechat --> (个人中心/充值)
 3. 作者：KingsleyYu
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function WechatPayController () {
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  继承于Controller基类
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  Controller.call(this)

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  事件绑定定义
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.bindEvents()
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
事件绑定定义
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
WechatPayController.prototype.bindEvents = function () {
  var classSelf = this

  $('.weui-flex__item').on('click', function () {
    var _this = $(this)

    var name = _this.attr('data-name')
    var price = _this.attr('data-price')

    var requestData = {
      'name': name,
      'price': price
    }

    classSelf.getPrePayInfo(requestData, function (payargs) {
      WeixinJSBridge.invoke('getBrandWCPayRequest', payargs, function (resp) {
        if (resp.err_msg == 'get_brand_wcpay_request:ok') {
          window.location.href = classSelf.redirectUrl.pay.success
        }else if(resp.err_msg == 'get_brand_wcpay_request:fail') {         
           window.location.href=classSelf.redirectUrl.pay.error;
        }
      })
    })
  })
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
获取统一下单接口，获取前端调用的支付信息
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
WechatPayController.prototype.getPrePayInfo = function (data, callback) {
  var classSelf = this

  classSelf.request(classSelf.apiUrl.wechat.getPrePayInfo, data, {
    'type': 'POST',
    'process': function (data) {
      if (data) {
        callback && callback(data)
      }
    }
  })
}

function onBridgeReady () {
  $(function () {
    new WechatPayController()
  })
}

if (typeof WeixinJSBridge == 'undefined') {
  if (document.addEventListener) {
    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
  }else if (document.attachEvent) {
    document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
  }
}else {
  onBridgeReady()
}
