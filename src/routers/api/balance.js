/**
 * desc:个人帐户相关的api 定义
 */

import express from 'express'
import logger from '../../utils/logger';

let router = express.Router()

/**
 * 获取个人帐户明细
 */
router.get("/get",async (req,res,next)=>{
    try{
        let pageIndex=req.query.pageIndex;
        let pageSize=req.query.pageSize;
        let memberId=req.session.member.member.id;

        let resp=await requestHelper.get({
            "moduleName":"hulk_service",
            "controller":"balance",
            "action":"find",
            "data":{
               pageIndex,
               pageSize,
               memberId
            }
        })

        res.json(resp);

    }catch(e){
        logger.error(`api_balance_get_error=>${JSON.stringify(e)}`);
    }
})

/**
 * 获取个人帐户余额
 */
router.get("/total",async (req,res,next)=>{
    try{
        let memberId=req.session.member.member.id;

        let resp=await requestHelper.get({
            "moduleName":"hulk_service",
            "controller":"banlance",
            "action":"total",
            "data":{
               memberId
            }
        })

        res.json(resp);

    }catch(e){
        logger.error(`api_balance_total_error=>${JSON.stringify(e)}`);
    }
})

module.exports = router