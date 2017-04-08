/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：悟空找房SASS系统前端MVC框架
 2. 页面名称：Controller (每个页面的类都继承于这个控制器基类)
 3. 作者：tangxuyang@lifang.com
 4. 备注：对api的依赖：jQuery
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function Controller () {

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  一些关于cookie参数的配置
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.cookieDomain = ''; // cookie域名设置
  this.cookieExpires = 60; // 整个应用cookie的生存周期，单位为分钟
  this.cookieKeyPrefix = 'WKY_'; // cookie的key值前缀，用来区分哪个应用的cookie，比如M_表示M站，O_表示Offical website(官网)，JDY表示筋斗云管理系统
  this.cookieKeyConf = {

  }

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  整个应用Ajax请求的时候的数据类型统一为json
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.apiDataType = 'json'

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  接口的地址，把整个应用的所有接口地址写在这里，方便统一维护    
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.apiPrefix = '/api/'

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  跳转URL   
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.redirectUrlPrefix = '/'

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  系统各个模块API地址
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.apiUrl = {
    'account': {
      'register': this.apiPrefix + 'account/add',
      'signIn': this.apiPrefix + 'account/signIn'
    },
    'common': {
      'verifyCode': this.apiPrefix + 'common/genVerifyCodeImg',
      'getSmsCode': this.apiPrefix + 'common/getSmsCode'
    },
    'credits': {
      'get': this.apiPrefix + 'credits/get'
    },
    'balance': {
      'get': this.apiPrefix + 'balance/get'
    },
    'match': {
      'get': this.apiPrefix + 'match/get',
      'apply': this.apiPrefix + 'match/apply',
      'result': this.apiPrefix + 'match/result'
    },
    'wechat': {
      'getPrePayInfo': this.apiPrefix + 'wechat/getPrePayInfo',
      'createPayment': this.apiPrefix + 'wechat/createPayment'
    }
  }

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  系统客户端跳转Url的配置
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.redirectUrl = {
    'personal': {
      'list': this.redirectUrlPrefix + 'personal/list'
    },
    'pay': {
      'success': this.redirectUrlPrefix + 'pay/success'
    }
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

    var process = (params === null || params.process === null || params.process === undefined) ? null : params.process
    var showLoadingTips = (params === null || params.showLoadingTips === null || params.showLoadingTips === undefined) ? false : params.showLoadingTips
    var loadingTips = (params === null || params.loadingTips === null || params.loadingTips === undefined) ? '数据加载中...' : params.loadingTips
    var apiDataType = (params === null || params.apiDataType === null || params.apiDataType === undefined) ? this.apiDataType : params.apiDataType
    var onExceptionInterface = (params === null || params.onExceptionInterface === null || params.onExceptionInterface === undefined) ? null : params.onExceptionInterface
    var onErrorInterface = (params === null || params.onErrorInterface === null || params.onErrorInterface === undefined) ? null : params.onErrorInterface

    if (showLoadingTips) $.showLoading(loadingTips)
    var options = {
      url: apiUrl,
      type: type,
      data: data,
      dataType: apiDataType,
      contentType: contentType,
      error: function (e) {
        $.toast('调用数据接口失败！请测试您的数据接口！', 'text')
        onErrorInterface && onErrorInterface()
      },
      success: function (data) {
        if (showLoadingTips) $.hideLoading()
        if (data.status.toString() === '1') {
          if (process) process(data.data); // 没有问题，就处理数据
        }  else {
          $.toast(data.message, 'text')
          if (onExceptionInterface) {
            onExceptionInterface(data.status, data.message)
          }
        }
      }
    }
    try {
      $.ajax(options)
    } catch (e) {
      $.toast('错误名称：' + e.name + '\n错误描述：' + e.message, 'text')
    }
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

  /*-----------------------------------------------------------------------------------------------------------
    去掉字符串头尾空格
    -----------------------------------------------------------------------------------------------------------*/
  this.trim = function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  }

  /*-----------------------------------------------------------------------------------------------------------
   判断身份证号码是否合法 
   -----------------------------------------------------------------------------------------------------------*/
  this.IdCardValidate = function (idCard) {
    var classSelf = this
    var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ]; // 加权因子   
    var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]; // 身份证验证位值.10代表X

    idCard = classSelf.trim(idCard.replace(/ /g, '')); // 去掉字符串头尾空格                     
    if (idCard.length == 15) {
      return isValidityBrithBy15IdCard(idCard); // 进行15位身份证的验证    
    } else if (idCard.length == 18) {
      var a_idCard = idCard.split(''); // 得到身份证数组   
      if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) { // 进行18位身份证的基本验证和第18位的验证
        return true
      }else {
        return false
      }
    } else {
      return false
    }

    /**  
     * 判断身份证号码为18位时最后的验证位是否正确  
     * @param a_idCard 身份证号码数组  
     * @return  
     */
    function isTrueValidateCodeBy18IdCard (a_idCard) {
      var sum = 0; // 声明加权求和变量   
      if (a_idCard[17].toLowerCase() == 'x') {
        a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作   
      }
      for ( var i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i]; // 加权求和   
      }
      valCodePosition = sum % 11; // 得到验证码所位置   
      if (a_idCard[17] == ValideCode[valCodePosition]) {
        return true
      } else {
        return false
      }
    }

    /**  
    * 验证18位数身份证号码中的生日是否是有效生日  
    * @param idCard 18位书身份证字符串  
    * @return  
    */
    function isValidityBrithBy18IdCard (idCard18) {
      var year = idCard18.substring(6, 10)
      var month = idCard18.substring(10, 12)
      var day = idCard18.substring(12, 14)
      var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day))
      // 这里用getFullYear()获取年份，避免千年虫问题   
      if (temp_date.getFullYear() != parseFloat(year)
        || temp_date.getMonth() != parseFloat(month) - 1
        || temp_date.getDate() != parseFloat(day)) {
        return false
      }else {
        return true
      }
    }

    /**  
     * 验证15位数身份证号码中的生日是否是有效生日  
     * @param idCard15 15位书身份证字符串  
     * @return  
     */
    function isValidityBrithBy15IdCard (idCard15) {
      var year = idCard15.substring(6, 8)
      var month = idCard15.substring(8, 10)
      var day = idCard15.substring(10, 12)
      var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day))
      // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
      if (temp_date.getYear() != parseFloat(year)
        || temp_date.getMonth() != parseFloat(month) - 1
        || temp_date.getDate() != parseFloat(day)) {
        return false
      }else {
        return true
      }
    }
  }

  /*-----------------------------------------------------------------------------------------------------------
   判断手机号是否合法 
   -----------------------------------------------------------------------------------------------------------*/
  this.checkPhone = function (phone) {
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
      return false
    }else {
      return true
    }
  }

  /*-----------------------------------------------------------------------------------------------------------
  验证18位身份证(含X|x)
  -----------------------------------------------------------------------------------------------------------*/
  this.checkIdNumber = function (text) {
    var regu = '^([0-9]){17,18}(x|X)?$',
      re = new RegExp(regu)
    return re.test(text)
  }

  this.utcToLocal = function (utc) {
    return moment.utc(utc).local().format('YYYY-MM-DD HH:mm')
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
  this.onload = function () {}
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  整个基类逻辑结束
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  this.onload()
}
