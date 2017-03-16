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
        let name=req.body.name;
        let phoneNo=req.body.phoneNo;
        let idCardNo=req.body.idCardNo;
        let wechatOpenId=req.session.user.openid;
        let nickName=req.session.user.nickname;
        let headImgUrl=req.session.user.headimgurl;

        let resp=await requestHelper.post({
            "moduleName":"hulk_service",
            "controller":"member",
            "action":"create",
            "data":{
                name,
                phoneNo,
                idCardNo,
                wechatOpenId,
                nickName,
                headImgUrl
            }
        })

        res.json(resp);

    }catch(e){
        logger.error(`api_account_add_error=>${JSON.stringify(e)}`);
    }
})


/**
 * 签到
 */
router.get("/signIn",async (req,res,next)=>{
    try{
        let memberId=req.session.member.member.id
        let resp=await requestHelper.post({
            "moduleName":"hulk_service",
            "controller":"signIn",
            "action":"create",
            "data":{
               memberId
            }
        })

        res.json(resp);

    }catch(e){
        logger.error(`api_account_signIn_error=>${JSON.stringify(e)}`)
    }
})

module.exports = router