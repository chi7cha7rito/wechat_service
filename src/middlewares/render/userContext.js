
/**
 * desc:
 */

import OAuth from 'wechat-oauth'
import logger from '../../utils/logger';
import config from '../../utils/config';

let wechatConfig = config.getWechat();
let client = new OAuth(wechatConfig.appid, wechatConfig.secret);

export default async (req, res, next) => {
    try {
        //判断路由是否是account/register
        let absoluteUrl = req.baseUrl + req.path;

        //todo:之后需要加个配置管理如下的特殊需求
        if (absoluteUrl == "/account/register"
            || absoluteUrl == "/wechat/"
            || absoluteUrl == "/wechat/auth"
            || absoluteUrl == "/pay/wechatNotify") {
            next()
        }
        else {
            if (!req.session.member) {
                var url = client.getAuthorizeURL(`${wechatConfig.host}/wechat/auth`, absoluteUrl);
                res.redirect(url);
            }
            else {
                next();
            }
        }
    } catch (e) {
        logger.error("userContext error" + JSON.stringify(e))
    }
}