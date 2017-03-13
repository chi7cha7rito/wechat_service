

import wechat from 'wechat'
import logger from '../../utils/logger';
import config from '../../utils/config';


export default async (req,res,next)=>{
    try{
        next();

    }catch(e){
        logger.error("userContext error"+JSON.stringify(e))
    }
}