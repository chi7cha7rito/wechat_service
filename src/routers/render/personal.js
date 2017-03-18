import express from 'express'
import logger from '../../utils/logger'
import routerUtil from '../../utils/router'

let router = express.Router()

router.get('/list', async (req, res, next) => {
  try {
    let param = {
      req: req,
      matchJavascript: true,
      matchStylesheet: true
    }

    let templateData = routerUtil.getTemplateBasicData(param)

    let memberId = req.session.member.member.id

    let balance = await requestHelper.get({
      'moduleName': 'hulk_service',
      'controller': 'balance',
      'action': 'total',
      'data': {memberId}
    })

    let points = await requestHelper.get({
      'moduleName': 'hulk_service',
      'controller': 'points',
      'action': 'total',
      'data': {memberId}
    })

    Object.assign(templateData, { 'title': '个人中心' }, {balance: balance.data || 0, points: points.data || 0 })

    return res.render('personal/list', templateData)
  } catch (e) {
    logger.error(`render_personal_list_error=>${JSON.stringify(e)}`)
    return res.render('common/error')
  }
})

// 消费记录
router.get('/balance', (req, res, next) => {
  let param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  }

  let templateData = routerUtil.getTemplateBasicData(param)

  Object.assign(templateData, { 'title': '帐户明细' })

  return res.render('personal/balance', templateData)
})

// 个人信息
router.get('/info', (req, res, next) => {
  let param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  }

  let templateData = routerUtil.getTemplateBasicData(param)

  Object.assign(templateData, { 'title': '修改个人信息' })

  return res.render('personal/info', templateData)
})

// 充值记录
// router.get('/recharge', (req, res, next) => {
//   let param = {
//     req: req,
//     matchJavascript: true,
//     matchStylesheet: true
//   }

//   let templateData = routerUtil.getTemplateBasicData(param)

//   Object.assign(templateData, { "title": "充值记录" })

//   return res.render("personal/recharge", templateData)
// })

// 积分记录
router.get('/credits', (req, res, next) => {
  let param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  }

  let templateData = routerUtil.getTemplateBasicData(param)

  Object.assign(templateData, { 'title': '积分明细' })

  return res.render('personal/credits', templateData)
})

module.exports = router
