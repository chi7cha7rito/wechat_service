import express from "express";
import Logger from '../../utils/logger';
import routerUtil from "../../utils/router";


let router = express.Router();

//注册
router.get('/register', (req, res, next) => {
  let param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  }

  let templateData = routerUtil.getTemplateBasicData(param);

  Object.assign(templateData, { "title": "在线注册" });

  return res.render("account/register", templateData);
})

//在线充值
router.get('/recharge', (req, res, next) => {
  let param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  }

  let templateData = routerUtil.getTemplateBasicData(param);

  Object.assign(templateData, { "title": "在线充值" });

  return res.render("account/recharge", templateData);
})

//签到
router.get('/signIn', (req, res, next) => {
  let param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  }

  let templateData = routerUtil.getTemplateBasicData(param);

  Object.assign(templateData, { "title": "在线签到" });

  return res.render("account/signIn", templateData);
})

module.exports = router