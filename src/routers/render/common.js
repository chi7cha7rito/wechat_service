import express from 'express'
import logger from '../../utils/logger'
import routerUtil from '../../utils/router'
import config from '../../utils/config';

let router = express.Router()

let wechatConfig = config.getWechat();

/**
 * @desc 统一的出错页面
 */
router.get('/error', async (req, res, next) => {
  try {
    let param = {
      req: req,
      matchJavascript: true,
      matchStylesheet: true
    }

    let templateData = routerUtil.getTemplateBasicData(param);

    Object.assign(templateData, { 'title': '出错' })

    return res.render('booking/room', templateData)
  } catch (e) {
    logger.error(`render_common_error_error=>${e}`)
  }
})

/**
 * 获取微信的accessToken
 */
router.get('/getAccessToken', async (req, res, next) => {
  if (req.query.secret == wechatConfig.secret) {
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

    res.json({
      "status":"1",
      "message":"",
      "data":JSON.stringify(accessTokenInfo)
    })

  } else {
    res.json({
      status: "0",
      message: "",
      data: null
    })
  }
})

/**
 * 公司介绍
 */
router.get('/intro', (req, res, next) => {
  try {
    let param = {
      req: req,
      matchJavascript: true,
      matchStylesheet: true
    }

    let templateData = routerUtil.getTemplateBasicData(param);

    Object.assign(templateData, { 'title': '介绍' })

    return res.render('common/intro', templateData)
  } catch (e) {
    logger.error(`render_common_intro_error=>${e}`)
  }
})


module.exports = router
