import express from "express";
import Logger from '../../utils/logger';
import routerUtil from "../../utils/router";


let router = express.Router();

//比赛报名
router.get('/apply', (req, res, next) => {
  let param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  }

  let templateData = routerUtil.getTemplateBasicData(param);

  Object.assign(templateData, { "title": "赛事汇总" });

  return res.render("match/apply", templateData);
})

//比赛报名
router.get('/info', (req, res, next) => {
  let param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  }

  let templateData = routerUtil.getTemplateBasicData(param);

  Object.assign(templateData, { "title": "赛事信息" });

  return res.render("match/info", templateData);
})

//比赛成绩
router.get('/result', (req, res, next) => {
  let param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  }

  let templateData = routerUtil.getTemplateBasicData(param);

  Object.assign(templateData, { "title": "战绩" });

  return res.render("match/result", templateData);
})


module.exports = router