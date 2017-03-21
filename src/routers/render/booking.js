import express from 'express'
import logger from '../../utils/logger'
import routerUtil from '../../utils/router'

let router = express.Router()


/**
 * @desc 贵宾室预定
 */
router.get('/room', async (req, res, next) => {
  try {
    let param = {
      req: req,
      matchJavascript: true,
      matchStylesheet: true
    }

    let templateData = routerUtil.getTemplateBasicData(param);

    Object.assign(templateData, { 'title': '贵宾室预定' })

    return res.render('booking/room', templateData)
  } catch (e) {
    logger.error(`render_booking_room_error=>${JSON.stringify(e)}`)
    return res.render('common/error')
  }
})


module.exports = router
