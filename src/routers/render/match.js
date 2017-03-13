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

  Object.assign(templateData, { "title": "比赛报名" });

  return res.render("match/apply", templateData);
})


module.exports = router