import rp from 'request-promise'
import config from '../utils/config'
import logger from './logger';


class Http_Request {

    /**
     * @param  {} module
     * @param  {} name
     * @param  {} data
     */
    async get(moduleName, action, data) {
        try {
            let resp;
            let uri = config.getApi(moduleName, action);

            let options = {
                method: "GET",
                uri: uri,
                qs: data,
                json: true
            }

            logger.info(`${moduleName}_${action}_request_data:${JSON.stringify(options)}`)

            resp = await rp(options);

            logger.info(`${moduleName}_${action}_response_data:${JSON.stringify(resp)}`)

            return resp;
        }
        catch (e) {
            logger.error(`${moduleName}_${action}_error:${JSON.stringify(e)}`)
        }
    }
    /**
     * @param  {} module
     * @param  {} action
     * @param  {} contentType
     * @param  {} data
     */
    async post(moduleName, action, data,contentType = "application/json") {
        try {
            let resp;
            let uri = config.getApi(moduleName, action);

            console.log(uri)

            let options = {
                method: "POST",
                uri: uri,
                body: data
            }

            logger.info(`${moduleName}_${action}_request_data:${JSON.stringify(options)}`)

            resp = await rp(options);

            logger.info(`${moduleName}_${action}_response_data:${JSON.stringify(resp)}`)

            return resp;
        }
        catch (e) {
            logger.error(`${moduleName}_${action}_error:${JSON.stringify(e)}`)
        }
    }
}

export default Http_Request;