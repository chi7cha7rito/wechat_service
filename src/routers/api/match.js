/**
 * desc:比赛相关的api 定义
 */

import express from 'express'
import logger from '../../utils/logger'
import moment from 'moment'
let router = express.Router()

/**
 * 获取在线报名赛事信息
 */
router.get("/getOnline",async (req,res,next)=>{
    try{
        let pageIndex=req.query.pageIndex
        let pageSize=req.query.pageSize

        let resp=await requestHelper.get({
            "moduleName":"hulk_service",
            "controller":"match",
            "action":"find",
            "data":{
               applyOnline:true,
               status:1,
               startClosing:moment().format(),
               pageIndex,
               pageSize
            }
        })

        res.json(resp)

    }catch(e){
        logger.error(`api_match_get_error=>${e}`)
    }
})

/**
 * 获取在线报名赛事信息
 */
router.get("/getAll",async (req,res,next)=>{
    try{
        let pageIndex=req.query.pageIndex
        let pageSize=req.query.pageSize

        let resp=await requestHelper.get({
            "moduleName":"hulk_service",
            "controller":"match",
            "action":"find",
            "data":{
               status:1,
               startClosing:moment().format(),
               pageIndex,
               pageSize
            }
        })

        res.json(resp)

    }catch(e){
        logger.error(`api_match_get_error=>${e}`)
    }
})

/**
 * 获取比赛结果
 */
router.get("/result",async (req,res,next)=>{
    try{
        let pageIndex=req.query.pageIndex
        let pageSize=req.query.pageSize
        let memberId=req.session.user.member.id

        let resp=await requestHelper.get({
            "moduleName":"hulk_service",
            "controller":"match",
            "action":"result",
            "data":{
               pageIndex,
               pageSize,
               memberId
            }
        })

        res.json(resp)

    }catch(e){
        logger.error(`api_match_result_error=>${e}`)
    }
})

/**
 * 报名参赛
 */
router.post("/apply",async (req,res,next)=>{
    try{
        let memberId=req.session.user.member.id
        let matchId = req.body.matchId
        let matchPriceId = req.body.matchPriceId
        let payType=req.body.payType
        let resp=await requestHelper.post({
            "moduleName":"hulk_service",
            "controller":"match",
            "action":"apply",
            "data":{
               memberId,
               matchId,
               matchPriceId,
               payType
            }
        })

        res.json(resp);

    }catch(e){
        logger.error(`api_match_apply_error=>${e}`)
    }
})

module.exports = router