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

//赛事奖励
router.get('/rewards', (req, res, next) => {
  try {
    let param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
    }
    let rewards = await requestHelper.get({
        'moduleName': 'hulk_service',
        'controller': 'match',
        'action': 'rewards',
        'data': { matchId: req.query.matchId }
    })
    let templateData = routerUtil.getTemplateBasicData(param);

    Object.assign(templateData, { "title": "赛事奖励" },{rewards:rewards.data,matchName:req.query.matchName});

    return res.render("match/rewards", templateData);
  } catch (error) {
    logger.error(`render_personal_list_error=>${JSON.stringify(e)}`)
    return res.render('common/error')
  }
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

/**
 * @desc 赛事分享--豪客风采
 */
router.get('/share',async (req,res,next)=>{
   let param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  }

  let templateData = routerUtil.getTemplateBasicData(param);

  Object.assign(templateData, { "title": "豪客风采" });

  return res.render("match/share", templateData);
})

module.exports = router