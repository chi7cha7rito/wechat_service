/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：豪客微信站
 2. 文件名称：static/jssrc/personal/coupon.js --> (个人中心/消费记录)
 3. 作者：RyanLu
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function CouponController () {
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  继承于Controller基类
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  Controller.call(this)

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  定义pageSize
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.pageSize = 10

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  初始化滚动加载更多
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

  this.initPage()
}

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
初始化页面
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
CouponController.prototype.initPage = function () {
  var classSelf = this

  classSelf.request(classSelf.apiUrl.coupon.get, {
    'pageIndex': 1,
    'pageSize': classSelf.pageSize
  }, {
    'showLoadingTips': true,
    'process': function (data) {
      classSelf.renderList(data)
      classSelf.initPullLoad()
    }
  })
}

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
初始化滚动加载更多
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
CouponController.prototype.initPullLoad = function () {
  var classSelf = this
  require(['components/pullload.js'], function () {
    $('.balance-list').pullload({
      apiUrl: classSelf.apiUrl.coupon.get,
      threshold: 15,
      crossDoman: false,
      pageSize: classSelf.pageSize,
      countKey: 'data.count',
      callback: function (resp) {
        classSelf.renderList(resp.data, true)
      }
    })
  })
}

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
渲染列表
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
CouponController.prototype.renderList = function (data, isAppend) {
  var classSelf = this
  var $recordsList = $('.coupon-list')

  if (!isAppend) {
    $recordsList.empty()
    if (!data.count) {
      var html = '<div class="weui-loadmore weui-loadmore_line">'
      html += '<span class="weui-loadmore__tips">暂无数据</span>'
      html += '</div>'
      $recordsList.append(html)
    }
  }

  $.each(data.rows, function (i, oRow) {
    $recordsList.append(classSelf.getItem(oRow))
  })
}
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
绘制item dom 
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
CouponController.prototype.getItem = function (data) {
  var classSelf = this

  //   1:未使用,2:已使用,3:已作废
  var statusStr,statusClass

  if (data.status == '2') {
    statusStr = '已使用'
    statusClass = 'used'
  }else if (data.status == '3') {
    statusStr = '已作废'
    statusClass = 'used'
    statusClass = 'aborted'
  }else {
    statusStr = '未使用'
    statusClass = 'unused'
  }

  var htmlTpl = ''
  htmlTpl += '<div class="weui-form-preview">'
  htmlTpl += '<div class="weui-form-preview__hd">'
  htmlTpl += '<div class="weui-form-preview__item">'
  htmlTpl += '<label class="weui-form-preview__label">类型</label>'
  htmlTpl += '<em class="weui-form-preview__value">' + data.type.name + '</em>'
  htmlTpl += '</div>'
  htmlTpl += '</div>'
  htmlTpl += '<div class="weui-form-preview__bd">'
  htmlTpl += '<div class="weui-form-preview__item">'
  htmlTpl += '<label class="weui-form-preview__label">用途</label>'
  htmlTpl += '<span class="weui-form-preview__value status">' + data.subType.name + '</span>'
  htmlTpl += '</div>'
  htmlTpl += '<div class="weui-form-preview__item">'
  htmlTpl += '<label class="weui-form-preview__label">来源</label>'
  htmlTpl += '<span class="weui-form-preview__value">' + data.source.name + '</span>'
  htmlTpl += '</div>'
  htmlTpl += '<div class="weui-form-preview__item">'
  htmlTpl += '<label class="weui-form-preview__label">状态</label>'
  htmlTpl += '<span class="weui-form-preview__value ' + statusClass + '">' + statusStr + '</span>'
  htmlTpl += '</div>'
  htmlTpl += '</div>'
  htmlTpl += '</div>'
  return $(htmlTpl)
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
类的初始化
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(function () {
  new CouponController()
})
