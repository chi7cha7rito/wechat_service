/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：豪客微信站
 2. 文件名称：static/jssrc/match/result.js --> (赛事/战绩)
 3. 作者：RyanLu
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function ResultController () {
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  继承于Controller基类
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  Controller.call(this)

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  定义pageSize
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.pageSize = 5

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  初始化滚动加载更多
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.initPage()
}

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
初始化页面
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
ResultController.prototype.initPage = function () {
  var classSelf = this

  classSelf.request(classSelf.apiUrl.match.result, {
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
ResultController.prototype.initPullLoad = function () {
  var classSelf = this
  require(['components/pullload.js'], function () {
    $('.result-list').pullload({
      apiUrl: classSelf.apiUrl.match.result,
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
ResultController.prototype.renderList = function (data, isAppend) {
  var classSelf = this
  var $recordsList = $('.result-list')

  if (!isAppend) {
    $recordsList.empty()
  }

  $.each(data.rows, function (i, oRow) {
    $recordsList.append(classSelf.getItem(oRow))
  })
}
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
绘制item dom 
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
ResultController.prototype.getItem = function (data) {
  var classSelf = this
  var price = data.matchPrices[0] && data.matchPrices[0].price || 0
  var htmlTpl = ''
  htmlTpl += '<div class="weui-form-preview">'
  htmlTpl += '<div class="weui-form-preview__hd">'
  htmlTpl += '<div class="weui-form-preview__item">'
  htmlTpl += '<label class="weui-form-preview__label">赛事名称</label>'
  htmlTpl += '<em class="weui-form-preview__value ranking">' + data.name + '</em>'
  htmlTpl += '</div>'
  htmlTpl += '</div>'
  htmlTpl += '<div class="weui-form-preview__bd">'
  htmlTpl += '<div class="weui-form-preview__item">'
  htmlTpl += '<label class="weui-form-preview__label">类型</label>'
  htmlTpl += '<span class="weui-form-preview__value">' + data.Type.name + '【' + (data.online ? '线上' : '线下') + '】' + '</span>'
  htmlTpl += '</div>'
  htmlTpl += '<div class="weui-form-preview__item">'
  htmlTpl += '<label class="weui-form-preview__label">举办方</label>'
  htmlTpl += '<span class="weui-form-preview__value">' + data.holder + '</span>'
  htmlTpl += '</div>'
  htmlTpl += '<div class="weui-form-preview__item">'
  htmlTpl += '<label class="weui-form-preview__label">门票费用</label>'
  htmlTpl += '<span class="weui-form-preview__value price">¥' + price + '</span>'
  htmlTpl += '</div>'
  htmlTpl += '<div class="weui-form-preview__item">'
  htmlTpl += '<label class="weui-form-preview__label">比赛时间</label>'
  htmlTpl += '<span class="weui-form-preview__value">' + classSelf.utcToLocal(data.opening) + '【' + data.SubType.name + '】' + '</span>'
  htmlTpl += '</div>'
  htmlTpl += '<div class="weui-form-preview__item">'
  htmlTpl += '<label class="weui-form-preview__label">状态</label>'
  if (data.status === 1) {
    htmlTpl += '<span class="weui-form-preview__value status">报名中</span>'
  } else {
    htmlTpl += '<span class="weui-form-preview__value status closed">已结束</span>'
  }
  htmlTpl += '</div>'
  htmlTpl += '<div class="weui-form-preview__item">'
  htmlTpl += '<label class="weui-form-preview__label">赛事介绍</label>'
  htmlTpl += '<span class="weui-form-preview__value">' + data.description + '</span>'
  htmlTpl += '</div>'
  htmlTpl += '</div>'
  htmlTpl += '<div class="weui-form-preview__ft">'
  htmlTpl += '<a class="weui-form-preview__btn weui-form-preview__btn_primary attend" data-id="' + data.id + '" data-price="' + price + '" href="javascript:">报名</a>'
  htmlTpl += '</div>'
  htmlTpl += '</div>'
  return $(htmlTpl)
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
类的初始化
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(function () {
  new ResultController()
})
