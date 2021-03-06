/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：豪客微信站
 2. 文件名称：static/jssrc/account/register.js --> (个人中心/在线注册)
 3. 作者：KingsleyYu
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function RegisterController () {
  Controller.call(this)

  this.initPage()

  this.bindEvents()
}

RegisterController.prototype.initPage = function () {
  var classSelf = this

  classSelf.returnUrl = classSelf.getQueryString('returnUrl') || classSelf.redirectUrl.personal.list
}

RegisterController.prototype.bindEvents = function () {
  var classSelf = this

  // 点击图片刷新验证码
  $('.weui-vcode-img').on('click', function () {
    classSelf.refreshCode()
  })

  // 获取短信验证码
  $('#btnGetVerifyCode').on('click', function () {
    var _this = $(this)
    var time = 60
    var txtVerifyCode = $.trim($('#txtVerifyCode').val())
    var txtPhoneNo = $('#txtPhoneNo').val() || ''

    var requestData = {}

    if (_this.hasClass('span_disabled')) {
      return false
    }

    if (!txtVerifyCode.length) {
      $.toptip('验证码不能为空', 'error')
      return false
    }

    if (!txtPhoneNo.length) {
      $.toptip('手机号不能为空', 'error')
      return false
    }else {
      if (!classSelf.checkPhone(txtPhoneNo)) {
        $.toptip('手机号不合法', 'error')
        return false
      }
    }

    _this.addClass('span_disabled')

    requestData.verifyCode=txtVerifyCode;
    requestData.phoneNo=txtPhoneNo;

    classSelf.request(classSelf.apiUrl.common.getSmsCode, requestData, {
      type: 'POST',
      'process': function () {
        var t = window.setInterval(function () {
          time = time - 1
          _this.html('还有(' + time + 's)')
          if (time === 0) {
            _this.html('获取验证码')
            _this.removeClass('span_disabled')
            window.clearInterval(t)
          }
        }, 1000)
      },
      'onExceptionInterface': function () {
        _this.removeClass('span_disabled')
        classSelf.refreshCode()
      },
      'onErrorInterface': function () {
        _this.removeClass('span_disabled')
        classSelf.refreshCode()
      }
    })
  })

  // 提交
  $('.weui-btn_primary').on('click', function () {
    var _this = $(this)

    if (_this.hasClass('disabled')) {
      return false
    }
    var txtName = $('#txtName').val() || ''
    var txtIdCardNo = $('#txtIdCardNo').val() || ''
    var txtVerifyCode = $('#txtVerifyCode').val() || ''
    var txtPhoneNo = $('#txtPhoneNo').val() || ''
    var txtSmsCode = $('#txtSmsCode').val() || ''

    var requestData = {}

    if (!txtName.length) {
      $.toptip('姓名不能为空', 'error')
      return false
    }

    if (!txtIdCardNo.length) {
      $.toptip('身份证不能为空', 'error')
      return false
    }else {
      if (classSelf.IdCardValidate(txtIdCardNo)) {
        $.toptip('不合法的身份证号', 'error')
        return false
      }
    }

    if (!txtPhoneNo.length) {
      $.toptip('手机号不能为空', 'error')
      return false
    }else {
      if (!classSelf.checkPhone(txtPhoneNo)) {
        $.toptip('手机号不合法', 'error')
        return false
      }
    }

    if (!txtSmsCode.length) {
      $.toptip('短信验证码不能为空', 'error')
      return false
    }

    _this.addClass('disabled')

    requestData.name = txtName
    requestData.phoneNo = txtPhoneNo
    requestData.idCardNo = txtIdCardNo
    requestData.smsCode = txtSmsCode

    classSelf.request(classSelf.apiUrl.account.register, requestData, {
      'type': 'POST',
      'process': function (data) {
        window.location.href = classSelf.returnUrl
      },
      'onExceptionInterface': function () {
        _this.removeClass('disabled')
        classSelf.refreshCode()
      },
      'onErrorInterface': function () {
        _this.removeClass('disabled')
        classSelf.refreshCode()
      }
    })
  })
}

RegisterController.prototype.refreshCode = function () {
  var $img = $('.weui-vcode-img')

  $img.attr('src', $img.attr('data-src') + '?t=' + (new Date()).valueOf())
}

$(function () {
  new RegisterController()
})
