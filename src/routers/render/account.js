import express from "express";
import Logger from '../../utils/logger';
import routerUtil from "../../utils/router";


let router = express.Router();

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

module.exports = router