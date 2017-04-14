import express from 'express'
import logger from '../../utils/logger'
import routerUtil from '../../utils/router'
import moment from 'moment'
let router = express.Router()

router.get('/list', async (req, res, next) => {
  try {
    let param = {
      req: req,
      matchJavascript: true,
      matchStylesheet: true
    }

    let templateData = routerUtil.getTemplateBasicData(param)

    let memberId = req.session.user.member.id

    let totalInfo = await requestHelper.get({
      'moduleName': 'hulk_service',
      'controller': 'member',
      'action': 'findTotal',
      'data': {memberId}
    })

    let memberInfo = await requestHelper.get({
      'moduleName': 'hulk_service',
      'controller': 'member',
      'action': 'find',
      'data': {wechatOpenId:req.session.user.member.wechat.wechatOpenId}
    })
    req.session.user = memberInfo.data
    Object.assign(templateData, { 'title': '个人中心' }, {
        balance: (totalInfo.data && totalInfo.data.balance) || 0, 
        points: (totalInfo.data && totalInfo.data.points) || 0 ,
        // nickName:req.session.user.member.wechat.nickName,
        // headImgUrl:req.session.user.member.wechat.headImgUrl,
        phoneNo:req.session.user.phoneNo,
        name:req.session.user.name,
        cardNo:req.session.member.cardNo,
        level:memberInfo.data.member.memberLevel.name
      })

    return res.render('personal/list', templateData)
  } catch (e) {
    logger.error(`render_personal_list_error=>${e}`)
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

  Object.assign(templateData, { 'title': '个人信息' },{
    "name":req.session.user.name,
    "idCardNo":req.session.user.idCardNo,
    "phoneNo":req.session.user.phoneNo,
    "level":req.session.user.member.memberLevel.name
  })

  return res.render('personal/info', templateData)
})


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

//我的优惠券
router.get('/coupon', (req, res, next) => {
  let param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  }

  let templateData = routerUtil.getTemplateBasicData(param)

  Object.assign(templateData, { 'title': '我的优惠券' })

  return res.render('personal/coupon', templateData)
})

/**
 * @desc 豪气排名
 */
router.get('/sprit', async (req, res, next) => {
  try {
    let param = {
      req: req,
      matchJavascript: false,
      matchStylesheet: false
    }

    let templateData = routerUtil.getTemplateBasicData(param);

    let monthRanking = await requestHelper.get({
      'moduleName': 'hulk_service',
      'controller': 'sprit',
      'action': 'find',
      'data': {
        startDatetime: moment().startOf('month').format('YYYY-MM-DD hh:mm:ss'),
        endDatetime: moment().endOf('month').format('YYYY-MM-DD hh:mm:ss')
      }
    })
    let monthTotal = await requestHelper.get({
      'moduleName': 'hulk_service',
      'controller': 'sprit',
      'action': 'totalByMemberId',
      'data': {
          startDatetime: moment().startOf('month').format('YYYY-MM-DD hh:mm:ss'),
          endDatetime: moment().endOf('month').format('YYYY-MM-DD hh:mm:ss'),
          memberId: req.session.user.member.id
        }
    })

    let yearRanking =  await requestHelper.get({
      'moduleName': 'hulk_service',
      'controller': 'sprit',
      'action': 'find',
      'data': {
        startDatetime: moment().startOf('year').format('YYYY-MM-DD hh:mm:ss'),
        endDatetime: moment().endOf('year').format('YYYY-MM-DD hh:mm:ss')
      }
    })

    let yearTotal = await requestHelper.get({
      'moduleName': 'hulk_service',
      'controller': 'sprit',
      'action': 'totalByMemberId',
      'data': {
          startDatetime: moment().startOf('year').format('YYYY-MM-DD hh:mm:ss'),
          endDatetime: moment().endOf('year').format('YYYY-MM-DD hh:mm:ss'),
          memberId: req.session.user.member.id
        }
    })
    let info = {
      monthTotal:monthTotal.data,
      yearTotal:yearTotal.data,
      monthRanking:monthRanking.data.rows,
      yearRanking:yearRanking.data.rows
    }
    Object.assign(templateData, { 'title': '豪气排名' },info)

    return res.render('personal/sprit', templateData)
  } catch (e) {
    logger.error(`render_ranking_error=>${JSON.stringify(e)}`)
    return res.render('common/error')
  }
})

module.exports = router
