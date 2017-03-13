/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：豪客微信站
 2. 文件名称：static/jssrc/account/register.js --> (个人中心/在线注册)
 3. 作者：KingsleyYu
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function RegisterController () {
  Controller.call(this)

  this.bindEvents()
}

RegisterController.prototype.bindEvents = function () {
  var classSelf = this

  // 获取验证码的事件绑定
  $('#btnGetVerifyCode').on('click', function () {
    var _this = $(this)
    $.modal({
      autoClose: true,
      text: '<input type="text" class="weui-input weui-prompt-input" id="weui-prompt-username" value="" placeholder="输入用户名" /><img class="weui-vcode-img" src="./images/vcode.jpg">',
      buttons: [
        { text: '确认', onClick: function () { alert('11');$.closeModal();} }
      ]
    })
  })
}

$(function () {
  new RegisterController()
})
