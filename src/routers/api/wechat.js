/**
 * desc:账户相关的api 定义
 */

import express from 'express'
import logger from '../../utils/logger';
import config from '../../utils/config';
import wechatPay from 'wechat-pay';

let router = express.Router()

let wechatConfig = config.getWechat();

//wechat pay unifiedorder 基本参数
let payment = new wechatPay.Payment({
  "appId": wechatConfig.appid,
  "mchId": wechatConfig.mch_id,
  "partnerKey": wechatConfig.partnerKey,
  "notifyUrl": `${wechatConfig.host}/wechat/notify`
})

/**
 * desc:微信支付调用统一下单接口，获取prepay_id
 * @see https://api.mch.weixin.qq.com/pay/unifiedorder
 */
router.post("/getPrePayInfo", async (req, res, next) => {
  let respData = {
    "status": "1",
    "message": "",
    "data": null
  }
  try {
    let memberId = req.session.user.member.id;
    let appid = wechatConfig.appid;
    let mch_id = wechatConfig.mch_id;
    let notify_url = wechatConfig.host + '/wechat/notify';
    let body = req.body.name;
    let attach = req.session.user.member.id;
    let total_fee = req.body.price * 100;
    let spbill_create_ip = "127.0.0.1";
    let openid = req.session.user.member.wechat.wechatOpenId; //从 session 获取open_id
    let out_trade_no = req.session.user.member.id + '_' + (new Date().valueOf());
    let trade_type = "JSAPI";

    let order = {
      body,
      attach,
      out_trade_no,
      total_fee,
      spbill_create_ip,
      openid,
      trade_type
    }
    let payargs = await getBrandWCPayRequestParams(order);
    respData.data = payargs;

    //添加一条wechatPayment 记录
    let resp = requestHelper.post({
      "moduleName": "hulk_service",
      "controller": "wechatPayment",
      "action": "create",
      "data": {
        memberId,
        appid,
        body,
        mch_id,
        notify_url,
        openid,
        out_trade_no,
        spbill_create_ip,
        total_fee,
        trade_type,
        attach,
        nonce_str: payargs.payargs
      }
    })


    return res.json(respData);

    function getBrandWCPayRequestParams(order) {
      return new Promise((resolve, reject) => {
        payment.getBrandWCPayRequestParams(order, function (err, payargs) {
          if (err) { reject(err) };
          resolve(payargs);
        });
      })
    }

  } catch (e) {
    logger.error("wechat_getPrePayInfo_error:" + JSON.stringify(e));
    respData.status = "0";
    respData.message = "获取统一下单信息失败";
    respData.data = null;
    res.json(respData);
  }
})


module.exports = router