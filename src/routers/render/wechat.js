import express from 'express'
import wechat from 'wechat'
import OAuth from 'wechat-oauth'
import logger from '../../utils/logger';
import config from '../../utils/config';
import wechatPay from 'wechat-pay'
import md5 from 'md5'
import _ from 'lodash'



let router = express.Router()
let wechatConfig = config.getWechat();

//auth client
let client = new OAuth(wechatConfig.appid, wechatConfig.secret);

// wechat pay unifiedorder 基本参数
let paymentConfig = new wechatPay.Payment({
  'appId': wechatConfig.appid,
  'mchId': wechatConfig.mch_id,
  'partnerKey': wechatConfig.partnerKey,
  'notifyUrl': `${wechatConfig.host}/wechat/notify`
})

// wechat pay notify middleware
let middleware = wechatPay.middleware

/**
 * desc:微信验证Token的url
 */
router.all('/', wechat(wechatConfig.token, async (req, res, next) => {
  var message = req.weixin
  let open_id = message.FromUserName

  // let accessTokenInfo = await requestHelper.get({
  //   "moduleName": "wechat",
  //   "controller": "common",
  //   "action": "getAccessToken",
  //   "data": {
  //     "grant_type": "client_credential",
  //     "appid": wechatConfig.appid,
  //     "secret": wechatConfig.secret
  //   }
  // });

  // console.log(accessTokenInfo)

  // //menu
  let menuOption = {
    "button": [
      {
        "name": "会员服务",
        "sub_button": [
          {
            "type": "view",
            "name": "会员中心",
            "url": `${wechatConfig.host}/personal/list`
          },
          {
            "type": "view",
            "name": "在线充值",
            "url": `${wechatConfig.host}/pay/wechat`
          },
          {
            "type": "view",
            "name": "在线签到",
            "url": `${wechatConfig.host}/account/signIn`
          },
          {
            "type": "view",
            "name": "战绩查询",
            "url": `${wechatConfig.host}/match/result`
          },
        ]
      },
      {
        "name": "赛事报名",
        "sub_button": [
          {
            "type": "view",
            "name": "赛事预告",
            "url": `${wechatConfig.host}/match/apply`
          },
          {
            "type": "view",
            "name": "在线报名",
            "url": `${wechatConfig.host}/match/apply`
          }
        ]
      },
      {
        "name": "豪客专享",
        "sub_button": [
          {
            "type": "view",
            "name": "贵宾室预定",
            "url": `${wechatConfig.host}/booking/room`
          },
          {
            "type": "view",
            "name": "豪客风采",
            "url": `${wechatConfig.host}/match/share`
          }
        ]
      }
    ]
  }

  //create Menu
  // let menuResp = await requestHelper.post({
  //   "moduleName": "wechat",
  //   "controller": "common",
  //   "action": "createMenu",
  //   "data": menuOption
  // });

  // console.log(menuResp);

  res.reply('尚在建设中，请耐心等待！')
}))


/**
 * desc:微信网页授权回调url地址
 */
router.all('/auth', async (req, res, next) => {
  let r_url = req.query.state; //成功操作后的跳转url;

  client.getAccessToken(req.query.code, async function (err, result) {
    let accessToken = result.data.access_token;//网页授权access_token
    let openid = result.data.openid;

    //将token 信息 存入db
    await requestHelper.post({
      "moduleName": "hulk_service",
      "controller": "wechatToken",
      "action": "create",
      "data": {
        "access_token": accessToken,
        "openid": openid,
        "scope": result.data.scope,
        "expires_in": result.data.expires_in
      }
    })

    let memberInfo = await requestHelper.get({
      "moduleName": "hulk_service",
      "controller": "member",
      "action": "find",
      "data": {
        "wechatOpenId": openid
      }
    });

    if (!memberInfo.data) {
      //获取全局的access_token
      let accessTokenInfo = await requestHelper.get({
        "moduleName": "wechat",
        "controller": "common",
        "action": "getAccessToken",
        "data": {
          "grant_type": "client_credential",
          "appid": wechatConfig.appid,
          "secret": wechatConfig.secret
        }
      });


      //获取openid 对应的用户基本信息
      let userInfo = await requestHelper.get({
        "moduleName": "wechat",
        "controller": "common",
        "action": "getUserInfo",
        "data": {
          "access_token": accessTokenInfo.access_token,
          "openid": openid
        }
      })

      //存入session
      req.session.wechatUser = userInfo;

      return res.redirect('/account/register?returnUrl=' + r_url)
    }
    else {
      req.session.user = memberInfo.data;

      return res.redirect(r_url)
    }
  });
})

/**
 * desc:接收微信支付回调请求
 * @see https://api.mch.weixin.qq.com/pay/unifiedorder
 */
router.all('/notify', middleware(paymentConfig).getNotify().done(async function (message, req, res, next) {
  try {
    let openid = message.openid
    let out_trade_no = message.out_trade_no;//订单号
    let memberId = message.attach;
    let notifyTotalFee = message.total_fee;
    let notifySign = message.sign;
    let tmpParmas = _.clone(message);

    //先查询
    let payInfo = await requestHelper.get({
      "moduleName": "hulk_service",
      "controller": "wechatPayment",
      "action": "find",
      "data": {
        "memberId": memberId,
        "out_trade_no": out_trade_no
      }
    })

    if (payInfo && payInfo.data) {
      delete tmpParmas.sign;
      let sortedQueryString = paymentConfig._toQueryString(tmpParmas);
      let stringSignTemp = sortedQueryString + '&key=' + wechatConfig.partnerKey;
      let newSign = md5(stringSignTemp).toUpperCase();

      //签名验证,并校验返回的订单金额是否与商户侧的订单金额一致
      if (payInfo.data.total_fee == notifyTotalFee && newSign == notifySign) {
        //更新payment row status 
        let transaction_id = message.transaction_id;
        let time_end = message.time_end;
        let status = "2"

        let notifyInfo = await requestHelper.post({
          "moduleName": "hulk_service",
          "controller": "wechatPayment",
          "action": "notify",
          "data": {
            out_trade_no,
            transaction_id,
            time_end,
            status
          }
        })

        if (notifyInfo.status == "1" && !notifyInfo.message) {
          /**
         * 查询订单，在自己系统里把订单标为已处理
         * 如果订单之前已经处理过了直接返回成功
         */
          res.reply('success')
        }
        else {
          /**
         * 有错误返回错误，不然微信会在一段时间里以一定频次请求你
         * res.reply(new Error('...'))
         */
          res.reply(new Error('订单更新失败'))
        }
      } else {
        /**
       * 有错误返回错误，不然微信会在一段时间里以一定频次请求你
       * res.reply(new Error('...'))
       */
        res.reply(new Error('回调信息有误'))
      }
    }
  } catch (e) {
    logger.error('wechat_notify_error' + e)
  }
}))


module.exports = router
