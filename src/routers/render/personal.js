import express from 'express'
import Logger from '../../utils/logger'
import routerUtil from '../../utils/router'

let router = express.Router()

router.get('/list', (req, res, next) => {
  let param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  }

  let templateData = routerUtil.getTemplateBasicData(param);

  Object.assign(templateData, { "title": "个人中心" });

  return res.render("personal/list", templateData);
})


router.get('/consume', (req, res, next) => {
  let param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  }

  let templateData = routerUtil.getTemplateBasicData(param);

  Object.assign(templateData, { "title": "消费记录查询" });

  return res.render("personal/consume", templateData);
})

router.get('/info', (req, res, next) => {
  let param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  }

  let templateData = routerUtil.getTemplateBasicData(param);

  Object.assign(templateData, { "title": "修改个人信息" });

  return res.render("personal/info", templateData);
})

router.get('/recharge', (req, res, next) => {
  let param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  }

  let templateData = routerUtil.getTemplateBasicData(param);

  Object.assign(templateData, { "title": "充值记录" });

  return res.render("personal/recharge", templateData);
})



module.exports = router
