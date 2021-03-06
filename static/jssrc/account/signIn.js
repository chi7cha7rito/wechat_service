/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：豪客微信站
 2. 文件名称：static/jssrc/account/signIn.js --> (个人中心/在线签到)
 3. 作者：KingsleyYu
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function SignInController () {
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   继承于Controller基类
   -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  Controller.call(this)

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  绑定事件
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.bindEvents()
}

SignInController.prototype.bindEvents = function () {
  var classSelf = this

  $('.weui-btn_primary').on('click', function () {
    var _this = $(this)
    var txtContent = $.trim($('.weui-textarea').val())

    if (_this.hasClass('disabled')) {
      return false
    }

    _this.addClass('disabled')

    classSelf.request(classSelf.apiUrl.account.signIn, {
      comment: txtContent
    }, {
      'type': 'POST',
      'process': function (data) {
        if (data) {
          $.toast('签到成功')
          _this.removeClass('disabled');
        }
      },
      'onExceptionInterface': function () {
        _this.removeClass('disabled')
      },
      'onErrorInterface': function () {
        _this.removeClass('disabled')
      }
    })
  })
}

$(function () {
  new SignInController()
})
