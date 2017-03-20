import express from 'express'
import Logger from '../../utils/logger'
import routerUtil from '../../utils/router'
import wechatPay from 'wechat-pay';
import config from '../../utils/config';

let router = express.Router()


let wechatConfig = config.getWechat();
//wechat pay unifiedorder 基本参数
let payment = new wechatPay.Payment({
  "appId": wechatConfig.appid,
  "mchId": wechatConfig.mch_id,
  "partnerKey":wechatConfig.partnerKey,
  "notifyUrl":`${wechatConfig.host}/pay/wechatNotify`
})

//wechat pay notify middleware
let middleware = wechatPay.middleware;

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


/**
 * desc:接收微信支付回调请求
 * @see https://api.mch.weixin.qq.com/pay/unifiedorder
 */
router.all('/wechatNotify', middleware(payment).getNotify().done(function (message, req, res, next) {
  console.log("wechat payNotify============="+JSON.stringify(message));
  let openid = message.openid;
  let order_id = message.out_trade_no;//订单号
  let memberId=message.attach; //商家的数据包

  //memberId, type, amount, source, sourceNo, remark, status
  try {
    
  } catch (e) { 
    logger.error('wechat_payNotify_error'+e);
  }

  /**
   * 查询订单，在自己系统里把订单标为已处理
   * 如果订单之前已经处理过了直接返回成功
   */
  res.reply('success');

  /**
   * 有错误返回错误，不然微信会在一段时间里以一定频次请求你
   * res.reply(new Error('...'))
   */
}));


module.exports = router
