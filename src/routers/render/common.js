import express from 'express'
import logger from '../../utils/logger'
import captchapng from 'captchapng'

let router = express.Router()

// 生成数字验证码
router.get('/genCaptchapng', (req, res, next) => {
  var verifyCode=parseInt(Math.random() * 9000 + 1000);
  var p = new captchapng(80, 30,verifyCode ); // width,height,numeric captcha 
  p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha) 
  p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 

  var img = p.getBase64()
  var imgbase64 = new Buffer(img, 'base64')
  res.writeHead(200, {
    'Content-Type': 'image/png'
  })

  //store verify code in session for check 
  req.session.verifyCode=verifyCode;

  res.end(imgbase64)
})

module.exports = router
