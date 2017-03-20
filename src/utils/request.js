import rp from 'request-promise'
import config from '../utils/config'
import logger from './logger';

const service_Token = config.getServiceToken();

class Http_Request {

    /**
     * @param  {} module
     * @param  {} name
     * @param  {} data
     */
    async get({ moduleName, controller, action, data }) {
        try {
            let resp;
            let uri = config.getApi(moduleName, controller, action);
            let options = {
                method: "GET",
                uri: uri,
                qs: data,
                json: true,
                headers: {
                    "hulk_token": service_Token
                }
            }

            //目前只有调用hulk_service 需要headers 加入 token
            if (moduleName != "hulk_service") {
                delete options.headers;
            }

            logger.info(`${moduleName}_${controller}_${action}_request_data:${JSON.stringify(options)}`)

            resp = await rp(options);

            logger.info(`${moduleName}_${controller}_${action}_response_data:${JSON.stringify(resp)}`)

            return resp;
        }
        catch (e) {
            logger.error(`${moduleName}_${controller}_${action}_error:${JSON.stringify(e)}`)
        }
    }
    /**
     * @param  {} module
     * @param  {} action
     * @param  {} contentType
     * @param  {} data
     */
    async post({ moduleName, controller, action, data, contentType = "application/json" }) {
        try {
            let resp;
            let uri = config.getApi(moduleName, controller, action);

            let options = {
                headers: {
                    "hulk_token": service_Token,
                    "Content-Type": contentType
                },
                method: "POST",
                uri: uri,
                body: data,
                json: true
            }

            //目前只有调用hulk_service 需要headers 加入 token
            if (moduleName != "hulk_service") {
                delete options.headers.token;
            }

            logger.info(`${moduleName}_${controller}_${action}_request_data:${JSON.stringify(options)}`)

            resp = await rp(options);

            logger.info(`${moduleName}_${controller}_${action}_response_data:${JSON.stringify(resp)}`)

            return resp;
        }
        catch (e) {
            logger.error(`${moduleName}_${controller}_${action}_error:${JSON.stringify(e)}`)
        }
    }
}

export default Http_Request;