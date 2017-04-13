import express from "express";
import logger from '../../utils/logger';
import routerUtil from "../../utils/router";


let router = express.Router();

//比赛报名
router.get('/apply',async (req, res, next) => {
  try {
    let param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  }
  let memberInfo = await requestHelper.get({
      'moduleName': 'hulk_service',
      'controller': 'member',
      'action': 'find',
      'data': {wechatOpenId:req.session.user.member.wechat.wechatOpenId}
  })

  let templateData = routerUtil.getTemplateBasicData(param);

  Object.assign(templateData, { "title": "在线报名" },{memberLevelId:memberInfo.data.member.memberLevel.id});

  return res.render("match/apply", templateData);
  } catch (e) {
    logger.error(`render_match_apply_error=>${JSON.stringify(e)}`)
    return res.render('common/error')
  }
})

//赛事预告
router.get('/list',async (req, res, next) => {
  try {
    let param = {
      req: req,
      matchJavascript: true,
      matchStylesheet: true
    }

    let memberInfo = await requestHelper.get({
        'moduleName': 'hulk_service',
        'controller': 'member',
        'action': 'find',
        'data': {wechatOpenId:req.session.user.member.wechat.wechatOpenId}
    })

    let templateData = routerUtil.getTemplateBasicData(param);

    Object.assign(templateData, { "title": "赛事预告" }, {memberLevelId:memberInfo.data.member.memberLevel.id});

    return res.render("match/list", templateData);
  } catch (e) {
    logger.error(`render_match_list_error=>${JSON.stringify(e)}`)
    return res.render('common/error')
  }
})

//赛事奖励
router.get('/rewards', async (req, res, next) => {
  try {
    let param = {
    req: req,
    matchJavascript: false,
    matchStylesheet: true,
    }
    let rewards = await requestHelper.get({
        'moduleName': 'hulk_service',
        'controller': 'match',
        'action': 'rewards',
        'data': { matchConfigId: req.query.matchConfigId }
    })
    let templateData = routerUtil.getTemplateBasicData(param);
    let total = 0
    if(rewards.data && rewards.data.length >0) rewards.data.forEach((x,i)=> total += x.rewardPoints || 0 )
    Object.assign(templateData, { "title": "赛事奖励" },{rewards:rewards.data,matchName:req.query.matchName,total:total});

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