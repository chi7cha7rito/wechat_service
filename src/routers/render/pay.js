import express from 'express'
import logger from '../../utils/logger'
import routerUtil from '../../utils/router'
import config from '../../utils/config'
import wechatPay from 'wechat-pay'

let router = express.Router()

/**
 * desc:微信付款页面，由于公众号支付页面需要支付的授权目录下面
 */
router.get('/wechat', (req, res, next) => {
  let param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  }

  let templateData = routerUtil.getTemplateBasicData(param)

  Object.assign(templateData, { 'title': '在线充值' })

  return res.render('pay/wechat', templateData)
})

/**
 * @desc 微信支付成功页
 */
router.get('/success', (req, res, next) => {
  let param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  }

  let templateData = routerUtil.getTemplateBasicData(param)

  Object.assign(templateData, { 'title': '支付成功' })

  return res.render('pay/success', templateData)
})

/**
 * @desc 微信支付失败页
 */
router.get('/error', (req, res, next) => {
  let param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  }

  let templateData = routerUtil.getTemplateBasicData(param)

  Object.assign(templateData, { 'title': '支付失败' })

  return res.render('pay/error', templateData)
})


module.exports = router
