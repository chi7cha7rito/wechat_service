
/**
 * desc:微信支付回调的中间件
 */

import wechatPay from 'wechat-pay';
import logger from '../../utils/logger';
import config from '../../utils/config';

let wechatConfig = config.getWechat();

//wechat pay unifiedorder 基本参数
let payment = new wechatPay.Payment({
  "appId": wechatConfig.appid,
  "mchId": wechatConfig.mch_id,
  "partnerKey":wechatConfig.partnerKey,
  "notifyUrl":`${wechatConfig.host}/pay/wechatNotify`
})

let paymentMiddleware = wechatPay.middleware;

export default async (req, res, next) => {
    try {
        return paymentMiddleware(payment).getNotify().done
    } catch (e) {
        logger.error("paymentMiddleware error" + JSON.stringify(e))
    }
}