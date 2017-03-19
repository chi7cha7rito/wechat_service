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
  "mchId": wechatConfig.mch_id
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
    let body = req.body.name;
    let attach = "";
    let total_fee = req.body.price * 100;
    let spbill_create_ip = req.ip;
    console.log(req.session.member.member)
    let openid = req.session.member.member.wechat.wechatOpenId; //从 session 获取open_id
    let out_trade_no = 'hulk_club' + (new Date().valueOf());
    let trade_type = "JSAPI";

    let order = {
      body,
      attach,
      total_fee,
      spbill_create_ip,
      out_trade_no,
      openid,
      trade_type
    }

    let payargs = await getBrandWCPayRequestParams(order);
    respData.data = payargs;
    return res.json(respData);

    function getBrandWCPayRequestParams(order) {
      return new Promise((resolve, reject) => {
        payment.getBrandWCPayRequestParams(order, function (err, payargs) {
          console.log('getBrandWCPayRequestParams...........................')
          if (err) { reject(err) };
          resolve(payargs);
        });
      })
    }

  } catch (e) {
    console.log(e)
    logger.error("wechat_getPrePayInfo_error:" + JSON.stringify(e));
    respData.status = "0";
    respData.message = "获取统一下单信息失败";
    respData.data = null;
    res.json(respData);
  }
})

module.exports = router