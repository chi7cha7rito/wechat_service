/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：豪客微信站
 2. 文件名称：static/jssrc/personal/credits.js --> (个人中心/积分记录)
 3. 作者：KingsleyYu
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function CreditsController () {
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
CreditsController.prototype.initPage = function () {
  var classSelf = this

  classSelf.request(classSelf.apiUrl.credits.get, {
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
CreditsController.prototype.initPullLoad = function () {
  var classSelf = this
  require(['components/pullload.js'], function () {
    $('.credits-list').pullload({
      apiUrl: classSelf.apiUrl.credits.get,
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
CreditsController.prototype.renderList = function (data, isAppend) {
  var classSelf = this
  var $recordsList = $('.credits-list')

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
CreditsController.prototype.getItem = function (data) {
  var classSelf = this

  var htmlTpl = ''

  var sourceStr = '充值返现'; // 1:充值返现,2:比赛奖励,3:店内消费,4:商城消费,5:手工调整
  var valueClass = 'positive'

  if (!data.isPositive) {
    valueClass = 'negative'
  }

  htmlTpl += '<dl class="item">'
  htmlTpl += '<dt>'
  htmlTpl += '<h1>' + data.source.name + '</h1>'
  htmlTpl += '<p>' + this.utcToLocal(data.createdAt) + '</p>'
  htmlTpl += '</dt>'

  htmlTpl += '<dd class="' + valueClass + '">' + data.points + '</dd>'

  htmlTpl += '</dl>'

  return $(htmlTpl)
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
类的初始化
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(function () {
  new CreditsController()
})
