import express from 'express'
import logger from '../../utils/logger'
import routerUtil from '../../utils/router'
import wechatPay from 'wechat-pay'
import config from '../../utils/config'
import PaymentNotify from '../../utils/paymentNotify'

let router = express.Router()

let wechatConfig = config.getWechat()
// wechat pay unifiedorder 基本参数
let paymentConfig = new wechatPay.Payment({
  'appId': wechatConfig.appid,
  'mchId': wechatConfig.mch_id,
  'partnerKey': wechatConfig.partnerKey,
  'notifyUrl': `${wechatConfig.host}/notify/wechat`
})

// wechat pay notify middleware
let middleware = wechatPay.middleware

/**
 * desc:接收微信支付回调请求
 * @see https://api.mch.weixin.qq.com/pay/unifiedorder
 */

router.all('/wechat', middleware(paymentConfig).getNotify().done(function (message, req, res, next) {
  console.log('wechat payNotify=============' + JSON.stringify(message))
  let openid = message.openid
  let order_id = message.out_trade_no; // 订单号
  let memberId = message.attach; // 商家的数据包

  // memberId, type, amount, source, sourceNo, remark, status
  try {
  } catch (e) {
    logger.error('wechat_payNotify_error' + e)
  }

  /**
   * 查询订单，在自己系统里把订单标为已处理
   * 如果订单之前已经处理过了直接返回成功
   */
  res.reply('success')

  next()

/**
 * 有错误返回错误，不然微信会在一段时间里以一定频次请求你
 * res.reply(new Error('...'))
 */
}), (req, res, next) => {
  try {
    console.log('this is in pay_wechatNotif.......................')
  } catch (e) {
    logger.error('pay_wechatNotify_error:' + e)
  }
})

module.exports = router
