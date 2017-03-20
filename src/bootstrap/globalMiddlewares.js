import loader from '../utils/loader'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import config from '../utils/config'
import appConfs from '../../configs/app'
import xmlBodyParse from 'body-parser-xml'
import _ from 'lodash'

let middlewares = loader.getModules('middlewares/global')
let middlewaresConfig = config.getMiddlewares()

export default function (app) {
  /**
   * desc:bodyParser是Connect內建的middleware，下面先加载这个中间件
   * 设置此处可以将client提交过来的post请求放入request.body中。
   */

  // xmlBodyParse(bodyParser)

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  // 解决微信支付通知回调数据
  // app.use(bodyParser.xml({
  //   limit: '1MB', // Reject payload bigger than 1 MB 
  //   xmlParseOptions: {
  //     normalize: true, // Trim whitespace inside text nodes 
  //     normalizeTags: true, // Transform tags to lowercase 
  //     explicitArray: false // Only put nodes in array if >1 
  //   }
  // }))

  /**
   * desc:将请求的cookie都解析出来
   */
  app.use(cookieParser())

  /**
   * desc:配置session
   */
  app.use(session({
    secret: appConfs.session.secret,
    cookie: appConfs.session.timeout,
    resave: false,
    saveUninitialized: true
  }))

  /**
  * desc:注册全局中间件到app中
  */
  if (_.isArray(middlewaresConfig.global) && middlewaresConfig.global.length) {
    for (let c of middlewaresConfig.global) {
      if (_.isFunction(middlewares[c]['default'])) app.use(middlewares[c]['default'])
    }
  }
}
