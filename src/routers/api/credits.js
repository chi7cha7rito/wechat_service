/**
 * desc:个人积分相关的api 定义
 */

import express from 'express'
import logger from '../../utils/logger';

let router = express.Router()

/**
 * 获取个人积分信息
 */
router.get("/get",async (req,res,next)=>{
    try{
        let pageIndex=req.query.pageIndex;
        let pageSize=req.query.pageSize;
        let phoneNo=req.session.user.member.user.phoneNo;

        let resp=await requestHelper.get({
            "moduleName":"hulk_service",
            "controller":"points",
            "action":"find",
            "data":{
               pageIndex,
               pageSize,
               phoneNo
            }
        })

        res.json(resp);

    }catch(e){
        logger.error(`api_credits_get_error=>${JSON.stringify(e)}`);
    }
})

/**
 * 获取个人积分余额
 */
router.get("/total",async (req,res,next)=>{
    try{
        let memberId=req.session.user.member.id;

        let resp=await requestHelper.get({
            "moduleName":"hulk_service",
            "controller":"points",
            "action":"total",
            "data":{
               memberId
            }
        })

        res.json(resp);

    }catch(e){
        logger.error(`api_points_total_error=>${JSON.stringify(e)}`);
    }
})

module.exports = router