import express from 'express'
import wechat from 'wechat'
import OAuth from 'wechat-oauth'
import logger from '../../utils/logger';
import config from '../../utils/config';
import wechatPay from 'wechat-pay';


let router = express.Router()
let wechatConfig = config.getWechat();

//auth client
let client = new OAuth(wechatConfig.appid, wechatConfig.secret);

//wechat pay unifiedorder 基本参数
let payment = new wechatPay.Payment({
  "appId": wechatConfig.appid,
  "mchId": wechatConfig.mch_id
})

//wechat pay notify middleware
let middleware = wechatPay.middleware;


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

    let memberInfo = await requestHelper.get({
      "moduleName": "hulk_service",
      "controller": "member",
      "action": "find",
      "data": {
        "wechatOpenId": openid
      }
    });

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

/**
 * desc:微信支付调用统一下单接口，获取prepay_id
 * @see https://api.mch.weixin.qq.com/pay/unifiedorder
 */
router.get('/getPrePayInfo', (req, res, next) => {
  try {
    let body = req.body.name;
    let attach = "";
    let total_fee = req.body.price * 100;
    let spbill_create_ip = req.ip;
    let openid = req.session.member.wechat.open_id;
    let out_trade_no='hulk_club' +(new Date().valueOf());
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

    let respData={
      "status":"1",
      "message":"",
      "data":null
    }

    payment.getBrandWCPayRequestParams(order, function (err, payargs) {
      respData.data=payargs;
      res.json(respData);
    });

  } catch (e) {
    logger.error("wechat_getPrePayInfo_error:" + JSON.stringify(e));
    respData.status="0";
    respData.message="获取统一下单信息失败";
    resp.data=null;
    res.json(respData);
  }
})

/**
 * desc:接收微信付款确认请求
 * @see https://api.mch.weixin.qq.com/pay/unifiedorder
 */
router.all('/payNotify', middleware(initConfig).getNotify().done(function (message, req, res, next) {
  var openid = message.openid;
  var order_id = message.out_trade_no;
  var attach = {};
  try {
    attach = JSON.parse(message.attach);
  } catch (e) { }

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


/**
 * desc:微信付款页面，由于公众号支付页面需要支付的授权目录下面
 */
router.get("/pay",(req,res,next)=>{
  try{
    let param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  }

  let templateData = routerUtil.getTemplateBasicData(param);

  Object.assign(templateData, { "title": "在线充值" });

  return res.render("wechat/pay", templateData);
    }
    catch(e){
      logger.error("wechat_pay_page_error"+JSON.stringify(e));
    }
  
})


module.exports = router
