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
      apiUrl: requestUrl,
      threshold: 15,
      crossDoman: false,
      childrenSelector: '.record-item',
      pageSize: classSelf.pageSize,
      tipsClassName: 'loading-tips',
      requestpageIndexKey: 'page',
      countKey: 'total',
      callback: function (resp) {
        classSelf.renderList(resp.data)
      }
    })
  })
}

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
渲染列表
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
CreditsController.prototype.renderList = function (data,isAppend) {
  var classSelf = this
  var $recordsList = $('.credits-list')
  var htmlTpl = ''
  
  console.log(data);

  if(!isAppend){
      $recordsList.empty();
  }
  
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
类的初始化
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(function () {
  new CreditsController()
})
