/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：豪客微信站
 2. 文件名称：static/jssrc/match/list.js --> (赛事/赛事列表)
 3. 作者：RyanLu
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function MatchController () {
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
MatchController.prototype.initPage = function () {
  var classSelf = this

  classSelf.request(classSelf.apiUrl.match.getAll, {
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
MatchController.prototype.initPullLoad = function () {
  var classSelf = this
  require(['components/pullload.js'], function () {
    $('.match-list').pullload({
      apiUrl: classSelf.apiUrl.match.getAll,
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
MatchController.prototype.renderList = function (data, isAppend) {
  var classSelf = this
  var $recordsList = $('.match-list')

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
MatchController.prototype.getItem = function (data) {
  var classSelf = this
  var price = {}
  var memberLevelId = $('#memberLevelId').val().toString()
  $.each(data.matchConfig.matchPrices, function (index, item) {
    if (item.Type.id.toString() === memberLevelId) price = {id: item.id, price: item.price}
  })
  var htmlTpl = ''
  htmlTpl += '<div class="weui-form-preview">'
  htmlTpl += '<div class="weui-form-preview__hd">'
  htmlTpl += '<div class="weui-form-preview__item">'
  htmlTpl += '<label class="weui-form-preview__label">赛事名称</label>'
  htmlTpl += '<em class="weui-form-preview__value name">' + data.matchConfig.name + '</em>'
  htmlTpl += '</div>'
  htmlTpl += '</div>'
  htmlTpl += '<div class="weui-form-preview__bd">'
  htmlTpl += '<div class="weui-form-preview__item">'
  htmlTpl += '<label class="weui-form-preview__label">类型</label>'
  htmlTpl += '<span class="weui-form-preview__value">' + data.matchConfig.Type.name + '【' + data.matchConfig.subType.name + '】' + '</span>'
  htmlTpl += '</div>'
  htmlTpl += '<div class="weui-form-preview__item">'
  htmlTpl += '<label class="weui-form-preview__label">举办方</label>'
  htmlTpl += '<span class="weui-form-preview__value">' + data.matchConfig.holder + '</span>'
  htmlTpl += '</div>'
  htmlTpl += '<div class="weui-form-preview__item">'
  htmlTpl += '<label class="weui-form-preview__label">门票费用</label>'
  htmlTpl += '<span class="weui-form-preview__value price">¥' + price.price + '</span>'
  htmlTpl += '</div>'
  htmlTpl += '<div class="weui-form-preview__item">'
  htmlTpl += '<label class="weui-form-preview__label">报名截止</label>'
  htmlTpl += '<span class="weui-form-preview__value">' + classSelf.utcToLocal(data.closingDatetime) + '</span>'
  htmlTpl += '</div>'
  htmlTpl += '<div class="weui-form-preview__item">'
  htmlTpl += '<label class="weui-form-preview__label">比赛时间</label>'
  htmlTpl += '<span class="weui-form-preview__value">' + classSelf.utcToLocal(data.openingDatetime) + '</span>'
  htmlTpl += '</div>'
  htmlTpl += '<div class="weui-form-preview__item">'
  htmlTpl += '<label class="weui-form-preview__label">当前参赛人数</label>'
  htmlTpl += '<span class="weui-form-preview__value">' + data.attendances.length + ' 人</span>'
  htmlTpl += '</div>'
  htmlTpl += '<div class="weui-form-preview__item">'
  htmlTpl += '<label class="weui-form-preview__label">赛事介绍</label>'
  htmlTpl += '<span class="weui-form-preview__value">' + data.matchConfig.description + '</span>'
  htmlTpl += '</div>'
  htmlTpl += '</div>'
  htmlTpl += '<div class="weui-form-preview__ft">'
  htmlTpl += '<a class="weui-form-preview__btn weui-form-preview__btn_primary" href="rewards?matchConfigId=' + data.matchConfigId + '&matchName=' + data.matchConfig.name + '">奖励</a>'
  htmlTpl += '</div>'
  htmlTpl += '</div>'
  return $(htmlTpl)
}
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
类的初始化
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(function () {
  new MatchController()
})
