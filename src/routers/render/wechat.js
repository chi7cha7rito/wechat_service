import express from 'express'
import wechat from 'wechat'
import OAuth from 'wechat-oauth'
import logger from '../../utils/logger';
import config from '../../utils/config';


let router = express.Router()
let wechatConfig = config.getWechat();

let client = new OAuth(wechatConfig.appid, wechatConfig.secret);


router.all('/', wechat(wechatConfig.token, async (req, res, next) => {
  var message = req.weixin
  let open_id = message.FromUserName

  // console.log(accessTokenInfo);

  //create Menu
  // let menuResp = await requestHelper.post("wechat", "createMenu", JSON.stringify({
  //   "button": [
  //     {
  //       "name": "菜单",
  //       "sub_button": [
  //         {
  //           "type": "view",
  //           "name": "会员中心",
  //           "url": "http://xiaochenyu8065.s1.natapp.cc/personal/list"
  //         },
  //         {
  //           "type": "view",
  //           "name": "在线充值",
  //           "url": "http://xiaochenyu8065.s1.natapp.cc/account/recharge"
  //         },
  //         {
  //           "type": "view",
  //           "name": "签到",
  //           "url": "http://xiaochenyu8065.s1.natapp.cc/account/signIn"
  //         }
  //       ]
  //     }
  //   ]
  // }));

  // console.log(menuResp);

  // let userInfo = await request({
  //   uri: "https://api.weixin.qq.com/cgi-bin/user/info",
  //   qs: {
  //     "access_token": accessTokenInfo.access_token,
  //     "openid": open_id
  //   }
  // })

  // console.log(userInfo);


  // res.reply('aaa')
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
      req.session.member = memberInfo;

      return res.redirect(r_url)
    }
  });
})

module.exports = router
