import express from 'express'
import logger from '../../utils/logger'
import captchapng from 'captchapng'
import moment from 'moment';


let router = express.Router()

/**
 * @desc 生成数字验证码
 */
router.get('/genVerifyCodeImg', (req, res, next) => {
  var verifyCode = parseInt(Math.random() * 9000 + 1000)
  var p = new captchapng(80, 30, verifyCode); // width,height,numeric captcha 
  p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha) 
  p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 

  var img = p.getBase64()
  var imgbase64 = new Buffer(img, 'base64')
  res.writeHead(200, {
    'Content-Type': 'image/png'
  })

  // store verify code in session for check 
  req.session.verifyCode = verifyCode

  res.end(imgbase64)
})

/**
 * @desc 获取短信验证码
 */
router.post('/getSmsCode', async (req, res, next) => {
  try {
    let verifyCode = req.body.verifyCode
    let phoneNo = req.body.phoneNo
    let code = Math.random().toString().slice(-6);

    req.session.smsCode = code;
    req.session.smsCodeGenDate=moment().unix();

    if (verifyCode && verifyCode != req.session.verifyCode) {
      return res.json({
        'status': '0',
        'message': '验证码不正确',
        'data': null
      })
    }

    let codeResp = await requestHelper.post({
      "moduleName": "sms_service",
      "controller": "sms",
      "action": "verifyCode",
      "data": {
        phoneNo,
        code
      }
    })

    if (codeResp.status == "1" && codeResp.message.length == 0) {
      res.json({
        'status': '1',
        'message': '',
        'data': null
      })
    }
    else{
      res.json({
        'status': '0',
        'message': '短信获取失败，请稍后再试',
        'data': null
      })
    }

  } catch (e) {
    logger.error('api_common_error' + e);
  }
})

module.exports = router
