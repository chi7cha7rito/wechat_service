import express from 'express'
import wechat from 'wechat'
import OAuth from 'wechat-oauth'
import logger from '../../utils/logger';
import config from '../../utils/config';
import wechatPay from 'wechat-pay'



let router = express.Router()
let wechatConfig = config.getWechat();

//auth client
let client = new OAuth(wechatConfig.appid, wechatConfig.secret);

// wechat pay unifiedorder 基本参数
let payment = new wechatPay.Payment({
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

  // console.log(accessTokenInfo);
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
  // let menuOption = {
  //   "button": [
  //     {
  //       "name": "豪客服务",
  //       "sub_button": [
  //         {
  //           "type": "view",
  //           "name": "会员中心",
  //           "url": `${wechatConfig.host}/personal/list`
  //         },
  //         {
  //           "type": "view",
  //           "name": "在线充值",
  //           "url": `${wechatConfig.host}/account/recharge`
  //         },
  //         {
  //           "type": "view",
  //           "name": "在线签到",
  //           "url": `${wechatConfig.host}/account/recharge`
  //         }
  //       ]
  //     },
  //     {
  //       "name": "赛事服务",
  //       "sub_button": [
  //         {
  //           "type": "view",
  //           "name": "赛事报名",
  //           "url": `${wechatConfig.host}/match/apply`
  //         },
  //         {
  //           "type": "view",
  //           "name": "战绩查询",
  //           "url": `${wechatConfig.host}/personal/standings`
  //         }
  //       ]
  //     },
  //     {
  //       "name": "豪客积分",
  //       "sub_button": [
  //         {
  //           "type": "view",
  //           "name": "积分记录",
  //           "url": `${wechatConfig.host}/personal/credits`
  //         }
  //       ]
  //     }
  //   ]
  // }

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
      req.session.user = userInfo;

      return res.redirect('/account/register?returnUrl=' + r_url)
    }
    else {
      req.session.member = memberInfo.data;

      return res.redirect(r_url)
    }
  });
})


module.exports = router
