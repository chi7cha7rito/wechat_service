import express from 'express'
import wechat from 'wechat'
import logger from '../../utils/logger';
import config from '../../utils/config';


let router = express.Router()
let wechatConfig = config.getWechat();


router.all('/', wechat(wechatConfig.token, async (req, res, next) => {
  var message = req.weixin
  let open_id = message.FromUserName

  console.log(message);

  // let memberInfo = requestHelper.get("member", "find", { "wechatOpenId": open_id });
  // if (!memberInfo) {
  //   res.redirect("/account/register");
  // }

  // let accessTokenInfo = await requestHelper.get("wechat", "getAccessToken", {
  //   "grant_type": "client_credential",
  //   "appid": wechatConfig.appid,
  //   "secret": "b80729334002393f5354c5d28af1ea1c"
  // });

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


  res.reply('aaa')
}))

module.exports = router
