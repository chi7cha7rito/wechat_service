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
ResultController.prototype.getItem = function (data) {
  var classSelf = this
  var htmlTpl = ''
  if (data.result) {
    htmlTpl += '<div class="weui-form-preview">'
    htmlTpl += '<div class="weui-form-preview__hd">'
    htmlTpl += '<div class="weui-form-preview__item">'
    htmlTpl += '<label class="weui-form-preview__label">赛事名次</label>'
    htmlTpl += '<em class="weui-form-preview__value ranking">第' + data.result + '名</em>'
    htmlTpl += '</div>'
    htmlTpl += '</div>'
    htmlTpl += '<div class="weui-form-preview__bd">'
    htmlTpl += '<div class="weui-form-preview__item">'
    htmlTpl += '<label class="weui-form-preview__label">赛事名称</label>'
    htmlTpl += '<span class="weui-form-preview__value">' + data.match.matchConfig.name + '</span>'
    htmlTpl += '</div>'
    htmlTpl += '<div class="weui-form-preview__item">'
    htmlTpl += '<label class="weui-form-preview__label">奖励积分</label>'
    htmlTpl += '<span class="weui-form-preview__value">' + (data.rewards || 0) + ' 积分</span>'
    htmlTpl += '</div>'
    if (data.rewardsRemark && data.rewardsRemark.length) {
      htmlTpl += '<div class="weui-form-preview__item">'
      htmlTpl += '<label class="weui-form-preview__label">奖励说明</label>'
      htmlTpl += '<span class="weui-form-preview__value">' + data.rewardsRemark + '</span>'
      htmlTpl += '</div>'
    }
    htmlTpl += '</div>'
    htmlTpl += '</div>'
  }
  return $(htmlTpl)
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
类的初始化
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(function () {
  new ResultController()
})
