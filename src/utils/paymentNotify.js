/**
 * desc 转换微信回调相关xml参数和构造微信回调返回的参数
 */

import xml2js from 'xml2js'

class PaymentNotify {
  constructor (rawBody) {
    this.rawBody = rawBody
  }

  parseData (rawBody) {
    xml2js.parseString(rawBody, {
      trim: true,
      explicitArray: false
    }, function (err, data) {
      data = json ? json.xml : {}

      return data
    })
  }

  success () {}

  error () {}
}

export default PaymentNotify
