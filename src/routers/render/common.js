import express from 'express'
import logger from '../../utils/logger'
import routerUtil from '../../utils/router'

let router = express.Router()

/**
 * @desc 统一的出错页面
 */
router.get('/error', async (req, res, next) => {
  try {
    let param = {
      req: req,
      matchJavascript: true,
      matchStylesheet: true
    }

    let templateData = routerUtil.getTemplateBasicData(param);

    Object.assign(templateData, { 'title': '出错' })

    return res.render('booking/room', templateData)
  } catch (e) {
    logger.error(`render_common_error_error=>${JSON.stringify(e)}`)
  }
})


module.exports = router
