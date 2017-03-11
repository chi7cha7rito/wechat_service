import express from 'express'
import Logger from '../../utils/logger'
import routerUtil from '../../utils/router'

let router = express.Router()

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

module.exports = router
