/**
 * desc:注册路由与路由中间件
 * author:luwei@lifang.com
 */

import loader from '../utils/loader'
import config from '../utils/config'
import _ from 'lodash'
import wechatPay from 'wechat-pay'

/**
 * desc:加载router
 */
let routers = loader.getModules('routers')

/**
 * desc:加载middlewares
 */
let middlewaresConfig = config.getMiddlewares()
let renderModules = loader.getModules('middlewares/render')
let apiModules = loader.getModules('middlewares/api')

let renderMiddlewares = []
let apiMiddlewares = []

let stageEnv = process.env.STAGE_ENV || 'dev'

let wechatConfig = config.getWechat()
// wechat pay unifiedorder 基本参数
let paymentConfig = new wechatPay.Payment({
  'appId': wechatConfig.appid,
  'mchId': wechatConfig.mch_id,
  'partnerKey': wechatConfig.partnerKey,
  'notifyUrl': `${wechatConfig.host}/pay/wechatNotify`
})

// wechat pay notify middleware
let middleware = wechatPay.middleware

/**
 * desc:根据app.json中middlewares配置顺序组装api中间件
 */
if (_.isArray(middlewaresConfig.api) && middlewaresConfig.api.length) {
  for (let c of middlewaresConfig.api) {
    if (_.isFunction(apiModules[c]['default'])) apiMiddlewares.push(apiModules[c]['default'])
  }
}

/**
 * desc:根据app.json中middlewares配置顺序组装reder中间件
 */
if (_.isArray(middlewaresConfig.render) && middlewaresConfig.render.length) {
  for (let c of middlewaresConfig.render) {
    if (_.isFunction(renderModules[c]['default'])) renderMiddlewares.push(renderModules[c]['default'])
  }
}

export default function (app) {
  let renderRoutes = routers.render
  let apiRoutes = routers.api
  let debugRoutes = routers.debug

  // 添加 render routers
  Object.keys(renderRoutes).forEach(function (key) {
    if (key === 'home') app.use('/', [...renderMiddlewares, renderRoutes[key]]); // 如果是home添加'/'路由支持
    app.use('/' + key, [...renderMiddlewares, renderRoutes[key]])
  })

  // 添加 api routers
  if (apiRoutes) {
    Object.keys(apiRoutes).forEach(function (key) {
      app.use('/api/' + key, [...apiMiddlewares, apiRoutes[key]])
    })
  }

  // 特殊处理当路由为微信支付回调的时候，加入paymentMiddleware 注册路由与路由中间件
  app.use('/pay/wechatNotify', middleware(paymentConfig).getNotify().done(function (message, req, res, next) {
    console.log(JSON.stringify(message))
    var openid = message.openid
    var order_id = message.out_trade_no
    var attach = {}
    try {
      attach = JSON.parse(message.attach)
    } catch(e) {}

    /**
     * 查询订单，在自己系统里把订单标为已处理
     * 如果订单之前已经处理过了直接返回成功
     */
    res.reply('success')
    
    next();

  /**
   * 有错误返回错误，不然微信会在一段时间里以一定频次请求你
   * res.reply(new Error('...'))
   */
  }))
}
