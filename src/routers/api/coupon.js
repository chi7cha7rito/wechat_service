/**
 * desc:个人优惠券相关的api 定义
 */

import express from 'express'
import logger from '../../utils/logger';

let router = express.Router()

/**
 * 获取个人优惠券明细
 */
router.get("/get",async (req,res,next)=>{
    try{
        let pageIndex=req.query.pageIndex;
        let pageSize=req.query.pageSize;
        let phoneNo=req.session.user.phoneNo;

        let resp=await requestHelper.get({
            "moduleName":"hulk_service",
            "controller":"coupon",
            "action":"find",
            "data":{
               pageIndex,
               pageSize,
               phoneNo
            }
        })

        res.json(resp);

    }catch(e){
        logger.error(`api_coupon_get_error=>${e}`);
    }
})


module.exports = router