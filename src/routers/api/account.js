/**
 * desc:账户相关的api 定义
 */

import express from 'express'
import logger from '../../utils/logger';

let router = express.Router()

/**
 * 用户注册
 */
router.post("/add",async (req,res,next)=>{
    try{
        
    }catch(e){
        logger.error(`api_account_add_error=>${JSON.stringify(e)}`);
    }
})

module.exports = router