/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：悟空找房SASS系统前端MVC框架
 2. 页面名称：Controller (每个页面的类都继承于这个控制器基类)
 3. 作者：tangxuyang@lifang.com
 4. 备注：对api的依赖：jQuery
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function Controller () {
  /*-----------------------------------------------------------------------------------------------------------
  根据当前的访问域名返回系统环境
  -----------------------------------------------------------------------------------------------------------*/
  this.getEnv = function () {
    var env = 'dev'
    var domain = document.domain
    switch (domain) {
      case 'yun2.test.wkzf':
        env = 'test'
        break
      case 'yun2.sim.wkzf':
        env = 'sim'
        break
      case 'yun2.wkzf.com':
        env = 'prod'
        break
      default:
        env = 'dev'
        break
    }

    return env
  }
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  对环境的定义：
  @dev : 开发环境，对应静态资源域名为：dev01.fe.wkzf - dev10.fe.wkzf
  @test：测试环境，对应静态资源域名为：test01.fe.wkzf - test10.fe.wkzf
  @beta：beta环境，对应静态资源域名为：beta01.fe.wkzf - beta10.fe.wkzf
  @sim：sim环境，对应静态资源域名为：sim01.fe.wkzf - sim10.fe.wkzf.com
  @prod ：生产环境，对应静态资源域名为：cdn01.wkzf.com - cdn10.wkzf.com
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  // this.environment = "dev" ; //环境定义
  this.environment = this.getEnv()
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  一些关于cookie参数的配置
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.cookieDomain = (this.environment === 'sim' || this.environment === 'prod') ? '.wkzf.com' : '.wkzf.cn'; // cookie域名设置
  this.cookieExpires = 60; // 整个应用cookie的生存周期，单位为分钟
  this.cookieKeyPrefix = 'WKY_'; // cookie的key值前缀，用来区分哪个应用的cookie，比如M_表示M站，O_表示Offical website(官网)，JDY表示筋斗云管理系统
  this.cookieKeyConf = {

  }
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  根据环境决定static资源域名
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.staticDomain = '//dev01.fe.wkzf'
  if (this.environment === 'test') this.staticDomain = '//test01.fe.wkzf'
  else if (this.environment === 'sim') this.staticDomain = '//sim01.fe.wkzf'
  else if (this.environment === 'prod') this.staticDomain = '//cdn01.wkzf.com'
  // this.staticDomain = "//yun2.test.wkzf/fe"
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  工具库路径及应用的控制器路径
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.bootstrapStaticPrefix = this.staticDomain + '/fe_public_library/bootstrap'
  this.utilStaticPrefix = this.staticDomain + '/fe_public_library/wkzf/js/util'
  this.appStaticPrefix = this.staticDomain + '/financial2_fe/js'
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  一些关于dialog | tips | confirm 参数的配置
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.tipsDialogId = 'wkzf-tips'; // 整个应用通用的tips框的id值
  this.confirmDialogId = 'wkzf-confirm'; // 整个应用通用的confirm框的id值
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  整个应用Ajax请求的时候的数据类型统一为json
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.apiDataType = 'jsonp'
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  接口的地址，把整个应用的所有接口地址写在这里，方便统一维护    
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.financeApiPrefix = (this.environment == 'dev') ? '/api/' : '/financial2node/api/'; // 新房财务Api请求接口前缀
  this.financePrefix = (this.environment == 'dev') ? '/' : '/financial2node/'
  this.frameApiPrefix = (this.environment == 'dev') ? '//gary.sso.wkzf/' : '/'; // 框架组接口前缀

  // 架构组接口地址前缀,sso要单独判断
  this.frameApiPrefix = '//yun2.dev.wkzf/'
  if (this.environment === 'test') this.frameApiPrefix = '//yun2.test.wkzf/'
  else if (this.environment === 'sim') this.frameApiPrefix = '//yun2.sim.wkzf/'
  else if (this.environment === 'prod') this.frameApiPrefix = '//yun2.wkzf.com/'

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  系统各个模块API地址
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.apiUrl = {
    employ: { // 请佣
      getDevelopersList: this.financeApiPrefix + 'signedReceivables/getDevelopersList', // 开发商列表接口
      getPleaseCommissionOrderList: this.financeApiPrefix + 'signedReceivables/getList', // 请佣收款单接口
      cancelReceivables: this.financeApiPrefix + 'signedReceivables/cancel', // 取消收款接口
      saveReceivables: this.financeApiPrefix + 'signedReceivables/save', // 确认收款接口
      getPleaseCommissionOrderDetails: this.financeApiPrefix + 'signedReceivables/getDetails', // 收款单详情接口
      detailDialog: this.financePrefix + 'signedReceivables/_details', // 详情框地址
      gatheringDialog: this.financePrefix + 'signedReceivables/_gathering', // 收款框地址
    },
    audit: {
      getGrouponList: this.financeApiPrefix + 'audit/getList', // 获取表格内容
      approve: this.financeApiPrefix + 'audit/approve', // 团购款审批通过
      reject: this.financeApiPrefix + 'audit/reject' // 团购款审批驳回
    },
    public: {
      getCity: this.frameApiPrefix + 'combo/city.action', // sso的接口
      getCityLocal: this.financeApiPrefix + 'common/getCityListByUser', // 项目自己提供的
    },
    vouchermgt: {
      getCityListByUser: this.financeApiPrefix + 'common/getCityListByUser', // 获取城市树菜单
      groupMoneyData: this.financeApiPrefix + 'voucherMgt/grouponFee/getList', // 团购款获取表格
      groupServiceFeeData: this.financeApiPrefix + 'voucherMgt/serviceFee/getList', // 团购费转服务费
      uploadVouchers: this.financeApiPrefix + 'voucherMgt/uploadVouchers', // 团购费转服务费，上传凭证
      serviceFeeOrderData: this.financeApiPrefix + 'voucherMgt/serviceFeeOrder/getList' // 获取成交客户服务费发票表格数据
    },
    position: {
      getList: this.financeApiPrefix + 'position/getList',
      getDetails: this.financeApiPrefix + 'position/getDetails',
      edit: this.financeApiPrefix + 'position/edit'
    },
    employee: {
      getList: this.financeApiPrefix + 'employee/getList',
      getDetails: this.financeApiPrefix + 'employee/getDetails',
      edit: this.financeApiPrefix + 'employee/edit'
    },
    common: {
      getPositions: this.financeApiPrefix + 'common/getPositions',
      getDepartments: this.financeApiPrefix + 'common/getDepartments',
      getCompanies: this.financeApiPrefix + 'common/getCompanies',
      getAgentList: this.financeApiPrefix + 'common/getAgentList' // 获取经纪人搜索列表

    },
    customer: {
      getConsumerReceivablesList: this.financeApiPrefix + 'customerReceivables/getList', // 客户收款单接口
      getConsumerReceivablesDetails: this.financeApiPrefix + 'customerReceivables/getDetails', // 详情接口
      exportConsumerReceivablesList: this.financePrefix + 'customerReceivables/export', //
      detailDialog: this.financePrefix + 'customerReceivables/_details', // 详情框地址
      getList: this.financeApiPrefix + 'customer/getList',
      getDetails: this.financeApiPrefix + 'customer/getDetails',
      checkNameExist: this.financeApiPrefix + 'customer/checkNameExist',
      add: this.financeApiPrefix + 'customer/add',
      edit: this.financeApiPrefix + 'customer/edit',
      editDialog: this.financePrefix + 'customer/_edit',
      addDialog: this.financePrefix + 'customer/_add'
    },
    department: {
      getList: this.financeApiPrefix + 'department/getList',
      getDetails: this.financeApiPrefix + 'department/getDetails',
      edit: this.financeApiPrefix + 'department/edit',
      editDialog: this.financePrefix + 'department/_edit'
    },
    newHouseProject: {
      indexGetList: this.financeApiPrefix + 'newHouseProject/indexGetList', // 获取城市树菜单
      addDialogGetList: this.financeApiPrefix + 'newHouseProject/addDialogGetList', // 新增对话框，获取表格列表
      editSave: this.financeApiPrefix + 'newHouseProject/editSave', // 编辑对话框点击保存按钮
      importSave: this.financeApiPrefix + 'newHouseProject/importSave' // 导入对话框点击保存
    },
    expenditureMgt: { // 出款管理
      getList: this.financeApiPrefix + 'expenditureMgt/getList', // 获取列表
      getPeopleList: this.financeApiPrefix + 'expenditureMgt/getInvitedList', // 获取已邀请人数据
      approve: this.financeApiPrefix + 'expenditureMgt/approval', // 审批接口
      getApproveResult: this.financeApiPrefix + 'expenditureMgt/getApprovalDetails', // 查看审批结果接口
      approvalDialog: this.financePrefix + 'expenditureMgt/_approval', // 审批弹框
      approvalDetailDialog: this.financePrefix + 'expenditureMgt/_approvalDetail', // 查看审批详情弹框
      invitedDialog: this.financePrefix + 'expenditureMgt/_invited' // 查看已邀请人弹框
    },
    incomeMgt: { // 收款管理
      getList: this.financeApiPrefix + 'incomeMgt/getList', // 获取表格列表
    },
    agentMgt: {
      getList: this.financeApiPrefix + 'agentMgt/getList', // 获取列表
      setStatus: this.financeApiPrefix + 'agentMgt/edit', // 设置取款状态
      getLogsList: this.financeApiPrefix + 'agentMgt/getLogsList', // 获取历史操作记录
      editlDialog: this.financePrefix + 'agentMgt/_edit' // 审批弹框
    }
  }

  this.redirectUrl = {
    position: {
      details: this.financePrefix + 'position/_details'
    },
    employee: {
      details: this.financePrefix + 'employee/_details'
    }
  }
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  新增模态框的公共方法，是下面的this.dialog和this.tips两个方法的基础方法
  1. 使用方法：
      this.createModalDialog({
          "type" : "dialog" ,  //模态框类型，值为：dialog | tips | confirm
          "id" : "my-modal-dialog" ,  //模态框ID值
          "effect" : true ,  //弹出dialog的时候是否需要fade效果
          "tabindex" : 1 ,  //模态框的tabindex值
          "dimension" : "lg"  //模态框的尺寸，可以是："sm" | "lg" 分别指小模态框和大模态框
      }) 
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.createModalDialog = function (params) {
    var type = (params === null || params.type === null || params.type === undefined) ? 'dialog' : params.type
    var effect = (params === null || params.effect === null || params.effect === undefined) ? true : params.effect
    var tabindex = (params === null || params.tabindex === null || params.tabindex === undefined) ? null : params.tabindex
    var dimension = (params === null || params.dimension === null || params.dimension === undefined) ? '' : params.dimension
    var id = params.id
    if (type === 'tips') id = this.tipsDialogId
    else if (type === 'confirm') id = this.confirmDialogId
    var modal = $(document.createElement('DIV')).attr('id', id).attr('role', 'dialog').attr('aria-labelledby', 'myModalLabel').addClass('modal')
    if (effect) $(modal).addClass('fade')
    if (tabindex) $(modal).attr('tabindex', tabindex)
    var modalDialog = $(document.createElement('DIV')).attr('role', 'document').addClass('modal-dialog').append($(document.createElement('DIV')).addClass('modal-content'))
    if (dimension) {
      $(modal).addClass('bs-example-modal-' + dimension)
      $(modalDialog).addClass('modal-' + dimension)
    }
    $(modal).append(modalDialog)
    $('body').prepend(modal)

    $(modal).on('hidden.bs.modal', function () {
      if ($('.modal-backdrop').length > 0) {
        $('body').addClass('modal-open')
      }
    })
  }
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  弹出普通的内容为某个url的html结构的模态框，始终都是先干掉先前如果存在的同样ID的模态框再新增
  备注：这个方法只能打开同域名下的页面
  使用方法：
  this.dialog({
      "id" : id ,
      "url" : url ,
      "tabindex" : tabindex        
  }) 
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.dialog = function (params) {
    var tabindex = (params === null || params.tabindex === null || params.tabindex === undefined) ? null : params.tabindex
    var dimension = (params === null || params.dimension === null || params.dimension === undefined) ? '' : params.dimension
    if ($('#' + params.id).size() > 0) $('#' + params.id).remove()
    this.createModalDialog({
      'type': 'dialog',
      'id': params.id,
      'tabindex': tabindex,
      'dimension': dimension
    })
    $('#' + params.id).modal({
      remote: params.url,
      isSync: true
    })
    $.fn.modal.Constructor.prototype.enforceFocus = function () {}
  }
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  弹出tips提示框，参数：
  @content：提示的html信息
  @time：表示多少秒之后关闭，如果为0表示不关闭，单位为秒
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.tips = function (content, time, callback) {
    var classSelf = this
    if ($('#' + this.tipsDialogId).size() > 0) {
      /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
      如果提示框html结构已经存在，就改变内容再显示
      -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
      $('#' + this.tipsDialogId + ' .modal-tips').html(content)
      $('#' + this.tipsDialogId).modal('show')
    } else {
      /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
      如果先前页面都没有提示过就先创建模态框
      -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
      this.createModalDialog({
        'type': 'tips'
      })
      $('#' + this.tipsDialogId).addClass('bs-example-modal-sm')
      $('#' + this.tipsDialogId + ' .modal-dialog').addClass('modal-sm')
      $('#' + this.tipsDialogId + ' .modal-content').append($(document.createElement('DIV')).addClass('modal-tips').html(content))
      $('#' + this.tipsDialogId).modal({
        'keyboard': true
      })
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    最后根据需要决定是否关闭
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    if (time) {
      window.setTimeout(function () {
        $('#' + classSelf.tipsDialogId).modal('hide')
        if (callback) callback()
      }, time * 1000)
    }
  }
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  确认框
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.confirm = function (params) {
    var classSelf = this
    var title = (params === null || params.title === null || params.title === undefined) ? '系统确认' : params.title
    var content = (params === null || params.content === null || params.content === undefined) ? '' : params.content
    var showConfirmBtn = (params === null || params.showConfirmBtn === null || params.showConfirmBtn === undefined) ? true : params.showConfirmBtn
    var confirmLabel = (params === null || params.confirmLabel === null || params.confirmLabel === undefined) ? '确认' : params.confirmLabel
    var showCancelBtn = (params === null || params.showCancelBtn === null || params.showCancelBtn === undefined) ? true : params.showCancelBtn
    var cancelLabel = (params === null || params.cancelLabel === null || params.cancelLabel === undefined) ? '取消' : params.cancelLabel
    var confirmInterface = (params === null || params.confirmInterface === null || params.confirmInterface === undefined) ? null : params.confirmInterface
    var cancelInterface = (params === null || params.cancelInterface === null || params.cancelInterface === undefined) ? null : params.cancelInterface
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    如果先前有这个dialog就删除
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    if ($('#' + this.confirmDialogId).size() > 0) $('#' + this.confirmDialogId).remove()
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    先创建一个dialog
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    this.createModalDialog({
      'type': 'confirm'
    })
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    再将节点贴进去
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    $('#' + this.confirmDialogId + ' .modal-content').append($(document.createElement('DIV')).addClass('modal-header').append('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">' + title + '</h4>'))
    $('#' + this.confirmDialogId + ' .modal-content').append($(document.createElement('DIV')).addClass('modal-confirm').html(content))
    var confirmFooter = $(document.createElement('DIV')).addClass('modal-footer')
    if (showConfirmBtn) {
      var confirmBtn = $(document.createElement('BUTTON')).attr('type', 'button').addClass('btn btn-primary btn-sm').text(confirmLabel)
      $(confirmBtn).click(function () {
        if (confirmInterface) confirmInterface()
        $('#' + classSelf.confirmDialogId).modal('hide')
      })
      $(confirmFooter).append(confirmBtn)
    }
    if (showCancelBtn) {
      var cancelBtn = $(document.createElement('BUTTON')).attr('type', 'button').addClass('btn btn-default btn-sm').attr('data-dismiss', 'modal').text(cancelLabel)
      $(cancelBtn).click(function () {
        $('#' + classSelf.confirmDialogId).modal('hide')
        if (cancelInterface) cancelInterface()
      })
      $(confirmFooter).append(cancelBtn)
    }
    $('#' + this.confirmDialogId + ' .modal-content').append(confirmFooter)
    $('#' + this.confirmDialogId).modal({
      'keyboard': true
    })
  }
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  发送Ajax请求的方法：
  @apiUrl：请求的url地址
  @data：请求附带发送的参数数据
  @params：{
      @type：请求的类型，可以是：GET|POST，但是如果apiDataType参数指为jsonp的话，这里设置为POST有没有任何意义，因为jsonp只能是GET
      @apiDataType：接口数据类型，可以是：json|jsonp|script等
      @showLoadingTips：加载过程中是否显示提示信息，可以为null，默认显示，如果要关闭，请设置值为 false
      @loadingTips：加载过程中显示的提示信息内容，默认为："正在加载数据，请稍等..."
      @process：code==200的时候的回调接口方法
      @onExceptionInterface：发生错误的时候的回调接口方法
  }    
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.request = function (apiUrl, data, params) {
    var classSelf = this
    var type = (params === null || params.type === null || params.type === undefined) ? 'GET' : params.type
    var contentType = (params === null || params.contentType === null || params.contentType === undefined) ? 'application/x-www-form-urlencoded' : params.contentType

    // if (this.environment === "dev") type = "GET"; //只要是jsonp请求，type肯定为GET
    var process = (params === null || params.process === null || params.process === undefined) ? null : params.process
    var showLoadingTips = (params === null || params.showLoadingTips === null || params.showLoadingTips === undefined) ? true : params.showLoadingTips
    var loadingTips = (params === null || params.loadingTips === null || params.loadingTips === undefined) ? '正在加载数据，请稍等...' : params.loadingTips
    var apiDataType = (params === null || params.apiDataType === null || params.apiDataType === undefined) ? this.apiDataType : params.apiDataType
    var onExceptionInterface = (params === null || params.onExceptionInterface === null || params.onExceptionInterface === undefined) ? null : params.onExceptionInterface
    if (this.showLoadingTips) this.tips(loadingTips)
    var options = {
      url: apiUrl,
      type: type,
      data: data,
      dataType: apiDataType,
      contentType: contentType,
      error: function (e) {
        classSelf.tips('调用数据接口失败！请测试您的数据接口！', 3)
      },
      success: function (data) {
        $('#' + classSelf.tipsDialogId).modal('hide')
        if (data.status.toString() === '1') {
          if (process) process(data); // 没有问题，就处理数据
        } else if (data.status.toString() === '1502') {
          parent.window.location.reload()
        } else {
          if (loadingTips) classSelf.tips(data.message, 3)
          if (onExceptionInterface) onExceptionInterface(data.status, data.message)
        }
      }
    }
    try {
      $.ajax(options)
    } catch (e) {
      classSelf.tips('错误名称：' + e.name + '\n错误描述：' + e.message, 3)
    }
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  整个try-catch块结束
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  }

  /*-----------------------------------------------------------------------------------------------------------
  表单数据序列换成object
  -----------------------------------------------------------------------------------------------------------*/
  $.fn.serializeObject = function () {
    var o = {}
    var a = this.serializeArray()
    $.each(a, function () {
      if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]]
        }
        o[this.name].push(this.value || '')
      } else {
        o[this.name] = this.value || ''
      }
    })
    return o
  }

  /*-----------------------------------------------------------------------------------------------------------
   验证数字
   -----------------------------------------------------------------------------------------------------------*/
  this.checkNumber = function (text) {
    var regu = '^[0-9]*$',
      re = new RegExp(regu)
    return re.test(text)
  }

  // 获取url search参数值方法
  this.getQueryString = function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg); // 获取url中"?"符后的字符串并正则匹配
    var context = ''
    if (r != null)
      context = r[2]
    reg = null
    r = null
    return context == null || context == '' || context == 'undefined' ? '' : context
  }
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  页面加载的时候执行的公共逻辑
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.onload = function () {
  }
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  整个基类逻辑结束
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.onload()
}
